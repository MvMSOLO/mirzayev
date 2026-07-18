// ──────────────────────────────────────────────────────────────────────────────
//  Roblox Studio IDE Simulator — Sandboxed Luau Engine (JS subset interpreter)
//  Supports: variables, arithmetic, loops, if/else, functions, Color3, Vector3,
//  wait/task.wait, print, game.Workspace / workspace property access & mutation.
// ──────────────────────────────────────────────────────────────────────────────

import type { StudioObject, OutputLine, Vec3, Col3 } from './types';

// ─── Types ────────────────────────────────────────────────────────────────────

type LuaVal =
  | null
  | boolean
  | number
  | string
  | LuaTable
  | LuaFn
  | LuaThread;

interface LuaTable {
  _t: 'table';
  hash: Map<string | number, LuaVal>;
  arr: LuaVal[];
  meta?: LuaTable;
  // For studio proxies
  _objId?: string;
  _svc?: string;
}

interface LuaFn {
  _t: 'fn';
  call(args: LuaVal[], ctx: ExecCtx): Promise<LuaVal[]>;
}

interface LuaThread { _t: 'thread' }

class LuaAbort extends Error { constructor() { super('__ABORT__'); } }
class LuaBreak extends Error { constructor() { super('__BREAK__'); } }
class LuaContinue extends Error { constructor() { super('__CONTINUE__'); } }
class LuaReturn { vals: LuaVal[]; constructor(v: LuaVal[]) { this.vals = v; } }

interface ExecCtx {
  running: boolean;
  getObjects(): Map<string, StudioObject>;
  setProperty(id: string, prop: string, val: unknown): void;
  addOutput(line: Omit<OutputLine, 'id' | 'ts'>): void;
  scriptObjId?: string; // id of the Script object being run (for script.Parent)
}

// ─── Env (variable scope chain) ────────────────────────────────────────────────

class Env {
  private store = new Map<string, LuaVal>();
  constructor(public parent?: Env) {}
  get(name: string): LuaVal | undefined {
    if (this.store.has(name)) return this.store.get(name)!;
    return this.parent?.get(name);
  }
  set(name: string, val: LuaVal) { this.store.set(name, val); }
  assign(name: string, val: LuaVal): boolean {
    if (this.store.has(name)) { this.store.set(name, val); return true; }
    return this.parent?.assign(name, val) ?? false;
  }
}

// ─── Tokenizer ─────────────────────────────────────────────────────────────────

type TT =
  | 'NUM' | 'STR' | 'NAME'
  | 'PLUS' | 'MINUS' | 'STAR' | 'SLASH' | 'DSLASH' | 'PERCENT' | 'CARET' | 'HASH'
  | 'EQ' | 'NEQ' | 'LT' | 'LTE' | 'GT' | 'GTE'
  | 'ASSIGN' | 'DOT' | 'DOTDOT' | 'ELLIPSIS'
  | 'COLON' | 'SEMI' | 'COMMA'
  | 'LP' | 'RP' | 'LB' | 'RB' | 'LC' | 'RC'
  | 'KW' | 'EOF';

const KWS = new Set([
  'and','break','do','else','elseif','end','false','for','function',
  'if','in','local','nil','not','or','repeat','return','then','true',
  'until','while','continue',
]);

interface Tok { tt: TT; val: string | number; line: number }

function tokenize(src: string): Tok[] {
  const toks: Tok[] = [];
  let i = 0, line = 1;

  const peek = (n = 0) => src[i + n] ?? '';
  const adv = () => src[i++];

  while (i < src.length) {
    // skip ws
    while (i < src.length && ' \t\r\f\v'.includes(src[i])) i++;
    if (i >= src.length) break;
    if (src[i] === '\n') { line++; i++; continue; }

    // single-line comment
    if (src[i] === '-' && src[i+1] === '-') {
      i += 2;
      // long comment?
      if (src[i] === '[') {
        let eq = 0; let j = i + 1;
        while (j < src.length && src[j] === '=') { eq++; j++; }
        if (src[j] === '[') {
          i = j + 1;
          const close = ']' + '='.repeat(eq) + ']';
          while (i < src.length && !src.startsWith(close, i)) { if (src[i] === '\n') line++; i++; }
          i += close.length;
          continue;
        }
      }
      while (i < src.length && src[i] !== '\n') i++;
      continue;
    }

    // long string
    if (src[i] === '[' && (src[i+1] === '[' || src[i+1] === '=')) {
      let eq = 0; let j = i + 1;
      while (j < src.length && src[j] === '=') { eq++; j++; }
      if (src[j] === '[') {
        i = j + 1;
        const close = ']' + '='.repeat(eq) + ']';
        let str = '';
        if (src[i] === '\n') { line++; i++; }
        while (i < src.length && !src.startsWith(close, i)) { if (src[i] === '\n') { line++; str += '\n'; } else str += src[i]; i++; }
        i += close.length;
        toks.push({ tt: 'STR', val: str, line });
        continue;
      }
    }

    const ch = src[i];

    // numbers
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(src[i+1] ?? ''))) {
      let s = '';
      if (ch === '0' && 'xX'.includes(src[i+1] ?? '')) {
        s += src[i] + src[i+1]; i += 2;
        while (i < src.length && /[0-9a-fA-F_]/.test(src[i])) { s += src[i]; i++; }
      } else {
        while (i < src.length && /[0-9_]/.test(src[i])) { s += src[i]; i++; }
        if (src[i] === '.') { s += '.'; i++; while (i < src.length && /[0-9_]/.test(src[i])) { s += src[i]; i++; } }
        if (/[eE]/.test(src[i] ?? '')) { s += src[i]; i++; if (/[+-]/.test(src[i] ?? '')) { s += src[i]; i++; } while (i < src.length && /[0-9]/.test(src[i])) { s += src[i]; i++; } }
      }
      toks.push({ tt: 'NUM', val: parseFloat(s.replace(/_/g, '')), line });
      continue;
    }

    // strings
    if (ch === '"' || ch === "'") {
      const q = adv(); let s = '';
      while (i < src.length && src[i] !== q) {
        if (src[i] === '\\') { i++; const e = adv(); const map: Record<string,string> = {n:'\n',t:'\t',r:'\r','\\':'\\','"':'"',"'":"'"}; s += map[e] ?? e; }
        else { if (src[i] === '\n') line++; s += adv(); }
      }
      i++; // close quote
      toks.push({ tt: 'STR', val: s, line });
      continue;
    }

    // names / keywords
    if (/[a-zA-Z_]/.test(ch)) {
      let s = '';
      while (i < src.length && /[a-zA-Z0-9_]/.test(src[i])) { s += src[i]; i++; }
      toks.push({ tt: KWS.has(s) ? 'KW' : 'NAME', val: s, line });
      continue;
    }

    // operators
    i++;
    switch (ch) {
      case '+': toks.push({ tt: 'PLUS',  val: '+', line }); break;
      case '-': toks.push({ tt: 'MINUS', val: '-', line }); break;
      case '*': toks.push({ tt: 'STAR',  val: '*', line }); break;
      case '/': if (peek() === '/') { toks.push({ tt: 'DSLASH', val: '//', line }); i++; } else toks.push({ tt: 'SLASH',  val: '/', line }); break;
      case '%': toks.push({ tt: 'PERCENT', val: '%', line }); break;
      case '^': toks.push({ tt: 'CARET',  val: '^', line }); break;
      case '#': toks.push({ tt: 'HASH',   val: '#', line }); break;
      case '=': if (peek() === '=') { toks.push({ tt: 'EQ',     val: '==', line }); i++; } else toks.push({ tt: 'ASSIGN', val: '=', line }); break;
      case '~': if (peek() === '=') { toks.push({ tt: 'NEQ',    val: '~=', line }); i++; } break;
      case '<': if (peek() === '=') { toks.push({ tt: 'LTE',    val: '<=', line }); i++; } else toks.push({ tt: 'LT',  val: '<', line }); break;
      case '>': if (peek() === '=') { toks.push({ tt: 'GTE',    val: '>=', line }); i++; } else toks.push({ tt: 'GT',  val: '>', line }); break;
      case '.':
        if (peek() === '.' && src[i+1] === '.') { toks.push({ tt: 'ELLIPSIS', val: '...', line }); i += 2; }
        else if (peek() === '.') { toks.push({ tt: 'DOTDOT', val: '..', line }); i++; }
        else toks.push({ tt: 'DOT', val: '.', line });
        break;
      case ':': if (peek() === ':') { i++; } else toks.push({ tt: 'COLON', val: ':', line }); break;
      case ';': toks.push({ tt: 'SEMI',  val: ';', line }); break;
      case ',': toks.push({ tt: 'COMMA', val: ',', line }); break;
      case '(': toks.push({ tt: 'LP',    val: '(', line }); break;
      case ')': toks.push({ tt: 'RP',    val: ')', line }); break;
      case '[': toks.push({ tt: 'LB',    val: '[', line }); break;
      case ']': toks.push({ tt: 'RB',    val: ']', line }); break;
      case '{': toks.push({ tt: 'LC',    val: '{', line }); break;
      case '}': toks.push({ tt: 'RC',    val: '}', line }); break;
    }
  }

  toks.push({ tt: 'EOF', val: '', line });
  return toks;
}

// ─── AST ───────────────────────────────────────────────────────────────────────

type Expr =
  | { k: 'num'; v: number }
  | { k: 'str'; v: string }
  | { k: 'bool'; v: boolean }
  | { k: 'nil' }
  | { k: 'name'; n: string }
  | { k: 'unop'; op: string; e: Expr }
  | { k: 'binop'; op: string; l: Expr; r: Expr }
  | { k: 'field'; obj: Expr; f: string }
  | { k: 'index'; obj: Expr; key: Expr }
  | { k: 'call'; fn: Expr; args: Expr[] }
  | { k: 'method'; obj: Expr; m: string; args: Expr[] }
  | { k: 'table'; fields: TField[] }
  | { k: 'fn'; params: string[]; body: Stmt[]; vararg: boolean };

type TField =
  | { k: 'name'; key: string; val: Expr }
  | { k: 'idx';  key: Expr;   val: Expr }
  | { k: 'val';  val: Expr };

type Stmt =
  | { k: 'do';    body: Stmt[] }
  | { k: 'while'; cond: Expr; body: Stmt[] }
  | { k: 'repeat';body: Stmt[]; cond: Expr }
  | { k: 'if';    cond: Expr; body: Stmt[]; elseifs: {c:Expr;b:Stmt[]}[]; els?: Stmt[] }
  | { k: 'nfor';  v: string; start: Expr; limit: Expr; step?: Expr; body: Stmt[] }
  | { k: 'gfor';  vars: string[]; iters: Expr[]; body: Stmt[] }
  | { k: 'local'; names: string[]; vals: Expr[] }
  | { k: 'assign'; targets: Expr[]; vals: Expr[] }
  | { k: 'call';   e: Expr }
  | { k: 'return'; vals: Expr[] }
  | { k: 'break' }
  | { k: 'continue' }
  | { k: 'fn';    name: string; func: Expr; local?: boolean };

// ─── Parser ─────────────────────────────────────────────────────────────────────

class Parser {
  private pos = 0;
  constructor(private toks: Tok[]) {}
  private cur() { return this.toks[this.pos]; }
  private peek(n = 1) { return this.toks[this.pos + n]; }
  private adv() { return this.toks[this.pos++]; }
  private check(tt: TT, val?: string | number) {
    const t = this.cur();
    return t.tt === tt && (val === undefined || t.val === val);
  }
  private eat(tt: TT, val?: string | number) {
    if (!this.check(tt, val)) throw new Error(`Parse error at line ${this.cur().line}: expected ${tt}${val ? ' "'+val+'"' : ''} got ${this.cur().tt} "${this.cur().val}"`);
    return this.adv();
  }
  private kw(v: string) { return this.cur().tt === 'KW' && this.cur().val === v; }
  private eatKw(v: string) { this.eat('KW', v); }

  parseBlock(): Stmt[] {
    const stmts: Stmt[] = [];
    while (true) {
      while (this.check('SEMI')) this.adv();
      const t = this.cur();
      if (t.tt === 'EOF') break;
      if (t.tt === 'KW' && ['end','else','elseif','until'].includes(t.val as string)) break;
      const s = this.parseStat();
      if (s) stmts.push(s);
      if (s && s.k === 'return') break;
    }
    return stmts;
  }

  private parseStat(): Stmt | null {
    const t = this.cur();

    if (t.tt === 'KW') {
      switch (t.val) {
        case 'do':      return this.parseDo();
        case 'while':   return this.parseWhile();
        case 'repeat':  return this.parseRepeat();
        case 'if':      return this.parseIf();
        case 'for':     return this.parseFor();
        case 'function':return this.parseFuncStat(false);
        case 'local':   return this.parseLocal();
        case 'return':  return this.parseReturn();
        case 'break':   this.adv(); return { k: 'break' };
        case 'continue':this.adv(); return { k: 'continue' };
        default: return null;
      }
    }

    // assignment or call
    return this.parseExprStat();
  }

  private parseDo(): Stmt { this.eatKw('do'); const body = this.parseBlock(); this.eatKw('end'); return { k: 'do', body }; }
  private parseWhile(): Stmt {
    this.eatKw('while'); const cond = this.parseExpr(); this.eatKw('do');
    const body = this.parseBlock(); this.eatKw('end');
    return { k: 'while', cond, body };
  }
  private parseRepeat(): Stmt {
    this.eatKw('repeat'); const body = this.parseBlock();
    this.eatKw('until'); const cond = this.parseExpr();
    return { k: 'repeat', body, cond };
  }
  private parseIf(): Stmt {
    this.eatKw('if'); const cond = this.parseExpr(); this.eatKw('then');
    const body = this.parseBlock();
    const elseifs: {c:Expr;b:Stmt[]}[] = [];
    let els: Stmt[] | undefined;
    while (this.kw('elseif')) {
      this.adv(); const c = this.parseExpr(); this.eatKw('then');
      const b = this.parseBlock();
      elseifs.push({ c, b });
    }
    if (this.kw('else')) { this.adv(); els = this.parseBlock(); }
    this.eatKw('end');
    return { k: 'if', cond, body, elseifs, els };
  }
  private parseFor(): Stmt {
    this.eatKw('for');
    const name = this.eat('NAME').val as string;
    if (this.check('ASSIGN')) {
      this.adv();
      const start = this.parseExpr(); this.eat('COMMA');
      const limit = this.parseExpr();
      let step: Expr | undefined;
      if (this.check('COMMA')) { this.adv(); step = this.parseExpr(); }
      this.eatKw('do'); const body = this.parseBlock(); this.eatKw('end');
      return { k: 'nfor', v: name, start, limit, step, body };
    } else {
      const vars = [name];
      while (this.check('COMMA')) { this.adv(); vars.push(this.eat('NAME').val as string); }
      this.eatKw('in');
      const iters = this.parseExprList(); this.eatKw('do');
      const body = this.parseBlock(); this.eatKw('end');
      return { k: 'gfor', vars, iters, body };
    }
  }
  private parseFuncStat(local: boolean): Stmt {
    this.eatKw('function');
    const name = this.eat('NAME').val as string;
    const func = this.parseFuncBody();
    return { k: 'fn', name, func, local };
  }
  private parseLocal(): Stmt {
    this.eatKw('local');
    if (this.kw('function')) return this.parseFuncStat(true);
    const names: string[] = [this.eat('NAME').val as string];
    while (this.check('COMMA')) { this.adv(); names.push(this.eat('NAME').val as string); }
    let vals: Expr[] = [];
    if (this.check('ASSIGN')) { this.adv(); vals = this.parseExprList(); }
    return { k: 'local', names, vals };
  }
  private parseReturn(): Stmt {
    this.eatKw('return');
    const t = this.cur();
    const end = t.tt === 'EOF' || (t.tt === 'KW' && ['end','else','elseif','until'].includes(t.val as string)) || t.tt === 'SEMI';
    let vals: Expr[] = [];
    if (!end) vals = this.parseExprList();
    if (this.check('SEMI')) this.adv();
    return { k: 'return', vals };
  }
  private parseExprStat(): Stmt {
    const e = this.parseSuffixExpr();
    if (this.check('ASSIGN') || this.check('COMMA')) {
      const targets: Expr[] = [e];
      while (this.check('COMMA')) { this.adv(); targets.push(this.parseSuffixExpr()); }
      this.eat('ASSIGN');
      const vals = this.parseExprList();
      return { k: 'assign', targets, vals };
    }
    if (e.k !== 'call' && e.k !== 'method') throw new Error(`Expected statement at line ${this.cur().line}`);
    return { k: 'call', e };
  }

  private parseExprList(): Expr[] {
    const es: Expr[] = [this.parseExpr()];
    while (this.check('COMMA')) { this.adv(); es.push(this.parseExpr()); }
    return es;
  }

  parseExpr(): Expr { return this.parseOr(); }
  private parseOr():  Expr { let l = this.parseAnd();  while (this.check('KW','or'))  { this.adv(); l = { k:'binop', op:'or',  l, r: this.parseAnd() }; } return l; }
  private parseAnd(): Expr { let l = this.parseCmp();  while (this.check('KW','and')) { this.adv(); l = { k:'binop', op:'and', l, r: this.parseCmp() }; } return l; }
  private parseCmp(): Expr {
    let l = this.parseConcat();
    const ops: TT[] = ['LT','LTE','GT','GTE','EQ','NEQ'];
    while (ops.includes(this.cur().tt)) { const op = this.adv().val as string; l = { k:'binop', op, l, r: this.parseConcat() }; }
    return l;
  }
  private parseConcat(): Expr {
    const l = this.parseAdd();
    if (this.check('DOTDOT')) { this.adv(); return { k:'binop', op:'..', l, r: this.parseConcat() }; }
    return l;
  }
  private parseAdd(): Expr {
    let l = this.parseMul();
    while (this.cur().tt === 'PLUS' || this.cur().tt === 'MINUS') { const op = this.adv().val as string; l = { k:'binop', op, l, r: this.parseMul() }; }
    return l;
  }
  private parseMul(): Expr {
    let l = this.parseUnary();
    const mops: TT[] = ['STAR','SLASH','DSLASH','PERCENT'];
    while (mops.includes(this.cur().tt)) { const op = this.adv().val as string; l = { k:'binop', op, l, r: this.parseUnary() }; }
    return l;
  }
  private parseUnary(): Expr {
    if (this.check('KW','not')) { this.adv(); return { k:'unop', op:'not', e: this.parseUnary() }; }
    if (this.cur().tt === 'MINUS') { this.adv(); return { k:'unop', op:'-', e: this.parseUnary() }; }
    if (this.cur().tt === 'HASH')  { this.adv(); return { k:'unop', op:'#', e: this.parseUnary() }; }
    return this.parsePow();
  }
  private parsePow(): Expr {
    const l = this.parseSuffixExpr();
    if (this.cur().tt === 'CARET') { this.adv(); return { k:'binop', op:'^', l, r: this.parseUnary() }; }
    return l;
  }
  private parseSuffixExpr(): Expr {
    let e = this.parsePrimaryExpr();
    while (true) {
      if (this.cur().tt === 'DOT') {
        this.adv(); const f = this.eat('NAME').val as string;
        e = { k:'field', obj: e, f };
      } else if (this.cur().tt === 'LB') {
        this.adv(); const key = this.parseExpr(); this.eat('RB');
        e = { k:'index', obj: e, key };
      } else if (this.cur().tt === 'COLON') {
        this.adv(); const m = this.eat('NAME').val as string;
        const args = this.parseArgs();
        e = { k:'method', obj: e, m, args };
      } else if (this.cur().tt === 'LP' || this.cur().tt === 'LC' || this.cur().tt === 'STR') {
        const args = this.parseArgs();
        e = { k:'call', fn: e, args };
      } else break;
    }
    return e;
  }
  private parseArgs(): Expr[] {
    if (this.cur().tt === 'LP') {
      this.adv();
      if (this.cur().tt === 'RP') { this.adv(); return []; }
      const args = this.parseExprList();
      this.eat('RP');
      return args;
    }
    if (this.cur().tt === 'LC') return [this.parseTableCtor()];
    if (this.cur().tt === 'STR') { const v = this.adv(); return [{ k:'str', v: v.val as string }]; }
    return [];
  }
  private parsePrimaryExpr(): Expr {
    const t = this.cur();
    if (t.tt === 'NAME') { this.adv(); return { k:'name', n: t.val as string }; }
    if (t.tt === 'LP') { this.adv(); const e = this.parseExpr(); this.eat('RP'); return e; }
    if (t.tt === 'NUM') { this.adv(); return { k:'num', v: t.val as number }; }
    if (t.tt === 'STR') { this.adv(); return { k:'str', v: t.val as string }; }
    if (t.tt === 'KW' && t.val === 'true')  { this.adv(); return { k:'bool', v: true }; }
    if (t.tt === 'KW' && t.val === 'false') { this.adv(); return { k:'bool', v: false }; }
    if (t.tt === 'KW' && t.val === 'nil')   { this.adv(); return { k:'nil' }; }
    if (t.tt === 'KW' && t.val === 'function') { this.adv(); return this.parseFuncBody(); }
    if (t.tt === 'LC') return this.parseTableCtor();
    if (t.tt === 'ELLIPSIS') { this.adv(); return { k:'name', n:'...' }; }
    throw new Error(`Unexpected token ${t.tt} "${t.val}" at line ${t.line}`);
  }
  private parseFuncBody(): Expr {
    this.eat('LP');
    const params: string[] = [];
    let vararg = false;
    while (!this.check('RP')) {
      if (this.cur().tt === 'ELLIPSIS') { this.adv(); vararg = true; break; }
      params.push(this.eat('NAME').val as string);
      if (this.check('COMMA')) this.adv();
    }
    this.eat('RP');
    const body = this.parseBlock();
    this.eatKw('end');
    return { k:'fn', params, body, vararg };
  }
  private parseTableCtor(): Expr {
    this.eat('LC');
    const fields: TField[] = [];
    while (!this.check('RC')) {
      if (this.cur().tt === 'LB') {
        this.adv(); const key = this.parseExpr(); this.eat('RB');
        this.eat('ASSIGN'); const val = this.parseExpr();
        fields.push({ k:'idx', key, val });
      } else if (this.cur().tt === 'NAME' && this.peek().tt === 'ASSIGN') {
        const key = this.adv().val as string; this.adv();
        const val = this.parseExpr();
        fields.push({ k:'name', key, val });
      } else {
        fields.push({ k:'val', val: this.parseExpr() });
      }
      if (this.check('COMMA') || this.check('SEMI')) this.adv();
    }
    this.eat('RC');
    return { k:'table', fields };
  }
}

// ─── Evaluator ──────────────────────────────────────────────────────────────────

async function sleep(ms: number, ctx: ExecCtx) {
  await new Promise<void>(r => setTimeout(r, Math.min(ms, 10000)));
  if (!ctx.running) throw new LuaAbort();
}

function mkTable(init?: Record<string,LuaVal>): LuaTable {
  const t: LuaTable = { _t:'table', hash: new Map(), arr: [] };
  if (init) for (const [k,v] of Object.entries(init)) t.hash.set(k,v);
  return t;
}

function tableGet(t: LuaTable, k: string | number): LuaVal {
  if (typeof k === 'number' && Number.isInteger(k) && k >= 1 && k <= t.arr.length) return t.arr[k-1] ?? null;
  return t.hash.get(k) ?? null;
}
function tableSet(t: LuaTable, k: string | number, v: LuaVal) {
  if (typeof k === 'number' && Number.isInteger(k) && k >= 1) { t.arr[k-1] = v; } else t.hash.set(k, v);
}

function luaToString(v: LuaVal): string {
  if (v === null) return 'nil';
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  if (typeof v === 'number') return Number.isInteger(v) ? String(v) : v.toFixed(6).replace(/\.?0+$/, '');
  if (typeof v === 'string') return v;
  if ((v as LuaTable)._t === 'table') return 'table';
  if ((v as LuaFn)._t === 'fn') return 'function';
  return 'userdata';
}

function luaTruth(v: LuaVal): boolean { return v !== null && v !== false; }

function luaArith(op: string, a: LuaVal, b: LuaVal): LuaVal {
  const n = (v: LuaVal) => typeof v === 'number' ? v : parseFloat(String(v));
  switch (op) {
    case '+': return n(a) + n(b);
    case '-': return n(a) - n(b);
    case '*': return n(a) * n(b);
    case '/': return n(a) / n(b);
    case '//': return Math.floor(n(a) / n(b));
    case '%': return ((n(a) % n(b)) + n(b)) % n(b);
    case '^': return Math.pow(n(a), n(b));
    case '..': return luaToString(a) + luaToString(b);
    case '==': return a === b || (typeof a === 'number' && typeof b === 'number' && a === b);
    case '~=': return !(a === b);
    case '<':  return (n(a) < n(b)) || (typeof a === 'string' && typeof b === 'string' && a < b);
    case '<=': return (n(a) <= n(b)) || (typeof a === 'string' && typeof b === 'string' && a <= b);
    case '>':  return luaArith('<', b, a);
    case '>=': return luaArith('<=', b, a);
    case 'and': return luaTruth(a) ? b : a;
    case 'or':  return luaTruth(a) ? a : b;
    default: return null;
  }
}

// Build the game / workspace proxy so scripts can read/write object props
function buildGameProxy(ctx: ExecCtx, scriptParentId?: string): LuaTable {
  function makeObjProxy(id: string): LuaTable {
    const proxy: LuaTable = { _t: 'table', hash: new Map(), arr: [], _objId: id };

    // Virtual properties via Proxy mechanics (we simulate via a table + __index)
    // Instead of real JS Proxy we use the "get" helper called from evalField/evalIndex
    proxy.hash.set('__luastudio_obj__', id as unknown as LuaVal);
    return proxy;
  }

  const workspace: LuaTable = { _t: 'table', hash: new Map(), arr: [], _svc: 'Workspace' };
  const game: LuaTable = { _t: 'table', hash: new Map(), arr: [], _svc: 'game' };
  game.hash.set('Workspace', workspace);
  game.hash.set('workspace', workspace);

  // script.Parent
  const scriptProxy = mkTable();
  if (scriptParentId) {
    scriptProxy.hash.set('Parent', makeObjProxy(scriptParentId));
  }

  return game;
}

// Resolve a "field" access on a lua value
function resolveGet(obj: LuaVal, key: string, ctx: ExecCtx): LuaVal {
  if (obj === null) return null;
  const t = obj as LuaTable;
  if (t._t !== 'table') return null;

  // Workspace service: find child by name
  if (t._svc === 'Workspace' || t._svc === 'game') {
    if (key === 'Workspace' || key === 'workspace') {
      const ws = t.hash.get('Workspace') ?? t.hash.get('workspace');
      return ws ?? null;
    }
    if (t._svc === 'Workspace') {
      // Try to find an object with this name in workspace
      const objs = ctx.getObjects();
      for (const [, obj] of objs) {
        if (obj.name === key) {
          const proxy = mkTable();
          proxy._objId = obj.id;
          copyObjProps(proxy, obj, ctx);
          return proxy;
        }
      }
    }
    return t.hash.get(key) ?? null;
  }

  // Object proxy
  if (t._objId) {
    const objs = ctx.getObjects();
    const stObj = objs.get(t._objId);
    if (!stObj) return null;

    // Direct properties
    if (key in stObj.properties) {
      return propToLua(stObj.properties[key]);
    }

    // Child lookup
    for (const cid of stObj.children) {
      const child = objs.get(cid);
      if (child?.name === key) {
        const childProxy = mkTable();
        childProxy._objId = child.id;
        copyObjProps(childProxy, child, ctx);
        return childProxy;
      }
    }

    return t.hash.get(key) ?? null;
  }

  return t.hash.get(key) ?? null;
}

function copyObjProps(proxy: LuaTable, obj: StudioObject, ctx: ExecCtx) {
  proxy._objId = obj.id;
  for (const [k, v] of Object.entries(obj.properties)) {
    if (k !== 'Source') proxy.hash.set(k, propToLua(v));
  }
  // Methods as functions
  proxy.hash.set('FindFirstChild', {
    _t: 'fn',
    call: async ([name]: LuaVal[]) => {
      const objs = ctx.getObjects();
      for (const cid of obj.children) {
        const child = objs.get(cid);
        if (child?.name === luaToString(name)) {
          const p = mkTable(); copyObjProps(p, child, ctx); return [p];
        }
      }
      return [null];
    },
  } as LuaFn);
  proxy.hash.set('GetChildren', {
    _t: 'fn',
    call: async () => {
      const arr: LuaVal[] = [];
      const objs = ctx.getObjects();
      for (const cid of obj.children) {
        const child = objs.get(cid);
        if (child) { const p = mkTable(); copyObjProps(p, child, ctx); arr.push(p); }
      }
      const t = mkTable(); t.arr = arr; return [t];
    },
  } as LuaFn);
}

function propToLua(v: unknown): LuaVal {
  if (v === null || v === undefined) return null;
  if (typeof v === 'boolean' || typeof v === 'number' || typeof v === 'string') return v;
  if (typeof v === 'object' && 'x' in (v as object)) {
    const vec = v as Vec3;
    return mkTable({ x: vec.x, y: vec.y, z: vec.z });
  }
  if (typeof v === 'object' && 'r' in (v as object)) {
    const col = v as Col3;
    return mkTable({ r: col.r, g: col.g, b: col.b });
  }
  return null;
}

function luaToNative(v: LuaVal, prop: string): unknown {
  if (v === null) return undefined;
  if (typeof v === 'boolean' || typeof v === 'number' || typeof v === 'string') return v;
  const t = v as LuaTable;
  if (t._t !== 'table') return undefined;
  // Vec3
  if (prop === 'Position' || prop === 'Size' || prop === 'Rotation') {
    return { x: (t.hash.get('x') as number) ?? 0, y: (t.hash.get('y') as number) ?? 0, z: (t.hash.get('z') as number) ?? 0 };
  }
  // Color
  if (prop === 'Color') {
    return { r: (t.hash.get('r') as number) ?? 0, g: (t.hash.get('g') as number) ?? 0, b: (t.hash.get('b') as number) ?? 0 };
  }
  return undefined;
}

// ─── Main evaluate function ──────────────────────────────────────────────────────

class Evaluator {
  private osClockStart = Date.now();
  constructor(private ctx: ExecCtx) {}

  private makeGlobalEnv(): Env {
    const ctx = this.ctx;
    const env = new Env();

    // Math library
    const math = mkTable({
      pi: Math.PI, huge: Infinity,
      abs:   fn1(x => Math.abs(x as number)),
      ceil:  fn1(x => Math.ceil(x as number)),
      floor: fn1(x => Math.floor(x as number)),
      sqrt:  fn1(x => Math.sqrt(x as number)),
      sin:   fn1(x => Math.sin(x as number)),
      cos:   fn1(x => Math.cos(x as number)),
      tan:   fn1(x => Math.tan(x as number)),
      exp:   fn1(x => Math.exp(x as number)),
      log:   fn1(x => Math.log(x as number)),
      max:   fnN((...a) => Math.max(...a.map(n => n as number))),
      min:   fnN((...a) => Math.min(...a.map(n => n as number))),
      random: { _t:'fn', call: async (args: LuaVal[]) => {
        if (!args.length) return [Math.random()];
        const a = args[0] as number; const b = (args[1] ?? a) as number;
        return [Math.floor(Math.random() * (b - a + 1)) + a];
      }} as LuaFn,
      randomseed: fn1(() => null),
      fmod: { _t:'fn', call: async ([a,b]: LuaVal[]) => [((a as number) % (b as number) + (b as number)) % (b as number)] } as LuaFn,
      modf:  { _t:'fn', call: async ([a]:LuaVal[]) => { const n=a as number; return [Math.trunc(n), n - Math.trunc(n)]; }} as LuaFn,
      clamp: { _t:'fn', call: async ([v,mn,mx]:LuaVal[]) => [Math.min(Math.max(v as number, mn as number), mx as number)] } as LuaFn,
    });

    // String library
    const string = mkTable({
      format: { _t:'fn', call: async ([fmt,...args]: LuaVal[]) => {
        let s = luaToString(fmt); let i = 0;
        s = s.replace(/%[sdif%]/g, (m) => {
          if (m === '%%') return '%';
          const v = args[i++] ?? null;
          if (m === '%s') return luaToString(v);
          if (m === '%d' || m === '%i') return String(Math.floor(v as number));
          if (m === '%f') return (v as number).toFixed(6);
          return m;
        });
        return [s];
      }} as LuaFn,
      len:    fn1(s => (s as string).length),
      sub:    { _t:'fn', call: async ([s,i,j]:LuaVal[]) => { const str=s as string; const a=(i as number)-1; const b=j as number ?? str.length; return [str.slice(a<0?str.length+a+1:a, b<0?str.length+b+1:b)]; }} as LuaFn,
      upper:  fn1(s => (s as string).toUpperCase()),
      lower:  fn1(s => (s as string).toLowerCase()),
      rep:    { _t:'fn', call: async ([s,n]:LuaVal[]) => [(s as string).repeat(n as number)] } as LuaFn,
      reverse:fn1(s => (s as string).split('').reverse().join('')),
      byte:   fn1(s => (s as string).charCodeAt(0)),
      char:   fn1(n => String.fromCharCode(n as number)),
      find:   { _t:'fn', call: async ([s,p]:LuaVal[]) => { const idx=(s as string).indexOf(p as string); return idx<0?[null]:[idx+1,idx+(p as string).length]; }} as LuaFn,
      gsub:   { _t:'fn', call: async ([s,p,r]:LuaVal[]) => { const result=(s as string).replace(new RegExp(p as string,'g'),r as string); return [result, 0]; }} as LuaFn,
      gmatch: { _t:'fn', call: async ([s,p]:LuaVal[]) => {
        const matches = Array.from((s as string).matchAll(new RegExp(p as string,'g'))).map(m=>m[0]);
        let idx = 0;
        return [{ _t:'fn', call: async () => idx < matches.length ? [matches[idx++]] : [null] } as LuaFn];
      }} as LuaFn,
    });

    // table library
    const tableLib = mkTable({
      insert: { _t:'fn', call: async ([t,v]:LuaVal[]) => { (t as LuaTable).arr.push(v); return []; }} as LuaFn,
      remove: { _t:'fn', call: async ([t,i]:LuaVal[]) => { const arr=(t as LuaTable).arr; const idx=i!=null?(i as number)-1:arr.length-1; return [arr.splice(idx,1)[0]??null]; }} as LuaFn,
      concat: { _t:'fn', call: async ([t,sep]:LuaVal[]) => [(t as LuaTable).arr.map(luaToString).join(sep as string??',')] } as LuaFn,
      sort:   { _t:'fn', call: async ([t,fn]:LuaVal[]) => {
        (t as LuaTable).arr.sort((a,b) => {
          if (!fn) return (a as number) < (b as number) ? -1 : 1;
          return 0; // simplified
        });
        return [];
      }} as LuaFn,
      unpack: { _t:'fn', call: async ([t]:LuaVal[]) => (t as LuaTable).arr } as LuaFn,
    });

    // Color3
    const Color3 = mkTable({
      new: { _t:'fn', call: async ([r,g,b]:LuaVal[]) => [mkTable({r:r??0,g:g??0,b:b??0})] } as LuaFn,
      fromRGB: { _t:'fn', call: async ([r,g,b]:LuaVal[]) => [mkTable({r:(r as number)/255,g:(g as number)/255,b:(b as number)/255})] } as LuaFn,
    });

    // Vector3
    const Vector3 = mkTable({
      new: { _t:'fn', call: async ([x,y,z]:LuaVal[]) => [mkTable({x:x??0,y:y??0,z:z??0})] } as LuaFn,
      zero: mkTable({x:0,y:0,z:0}),
      one:  mkTable({x:1,y:1,z:1}),
    });

    // CFrame (simplified)
    const CFrame = mkTable({
      new: { _t:'fn', call: async ([x,y,z]:LuaVal[]) => [mkTable({x:x??0,y:y??0,z:z??0})] } as LuaFn,
      Angles: { _t:'fn', call: async () => [mkTable({x:0,y:0,z:0})] } as LuaFn,
    });

    const BRICK_COLORS: Record<string,[number,number,number]> = {
      'Bright red':     [0.769,0.157,0.110],
      'Bright blue':    [0.050,0.406,0.671],
      'Bright green':   [0.294,0.592,0.294],
      'Bright yellow':  [0.961,0.804,0.188],
      'Medium stone grey': [0.639,0.635,0.647],
      'White':          [0.950,0.950,0.950],
      'Black':          [0.106,0.165,0.208],
    };
    const BrickColor = mkTable({
      new: { _t:'fn', call: async ([name]:LuaVal[]) => {
        const [r,g,b] = BRICK_COLORS[name as string] ?? [0.6,0.6,0.6];
        return [mkTable({r,g,b})];
      }} as LuaFn,
      Random: { _t:'fn', call: async () => [mkTable({r:Math.random(),g:Math.random(),b:Math.random()})] } as LuaFn,
    });

    // task library
    const self = this;
    const task = mkTable({
      wait: { _t:'fn', call: async ([n]:LuaVal[]) => { await sleep(((n as number)??0)*1000, ctx); return []; }} as LuaFn,
      spawn: { _t:'fn', call: async ([f]:LuaVal[]) => {
        if ((f as LuaFn)?._t === 'fn') (f as LuaFn).call([],ctx).catch(()=>{});
        return [];
      }} as LuaFn,
      delay: { _t:'fn', call: async ([n,f]:LuaVal[]) => {
        sleep(((n as number)??0)*1000, ctx).then(() => (f as LuaFn).call([],ctx)).catch(()=>{});
        return [];
      }} as LuaFn,
    });

    // os library
    const os = mkTable({
      clock: { _t:'fn', call: async () => [(Date.now() - self.osClockStart) / 1000] } as LuaFn,
      time:  { _t:'fn', call: async () => [Math.floor(Date.now()/1000)] } as LuaFn,
    });

    // Game proxy
    const game = buildGameProxy(ctx);
    const workspace = game.hash.get('Workspace') as LuaTable;

    // script proxy (parent = the Part the script is child of)
    const scriptProxy = mkTable();
    if (ctx.scriptObjId) {
      const objs = ctx.getObjects();
      const scriptObj = objs.get(ctx.scriptObjId);
      if (scriptObj?.parentId) {
        const parentObj = objs.get(scriptObj.parentId);
        if (parentObj) {
          const p = mkTable(); copyObjProps(p, parentObj, ctx);
          scriptProxy.hash.set('Parent', p);
        }
      }
    }

    env.set('math', math);
    env.set('string', string);
    env.set('table', tableLib);
    env.set('Color3', Color3);
    env.set('Vector3', Vector3);
    env.set('CFrame', CFrame);
    env.set('BrickColor', BrickColor);
    env.set('task', task);
    env.set('os', os);
    env.set('game', game);
    env.set('workspace', workspace);
    env.set('script', scriptProxy);
    env.set('print', {
      _t: 'fn',
      call: async (args: LuaVal[]) => {
        ctx.addOutput({ kind: 'print', text: args.map(luaToString).join('\t') });
        return [];
      },
    } as LuaFn);
    env.set('warn', {
      _t: 'fn',
      call: async (args: LuaVal[]) => {
        ctx.addOutput({ kind: 'warn', text: args.map(luaToString).join('\t') });
        return [];
      },
    } as LuaFn);
    env.set('error', {
      _t: 'fn',
      call: async (args: LuaVal[]) => {
        throw new Error(luaToString(args[0]));
      },
    } as LuaFn);
    env.set('wait', {
      _t: 'fn',
      call: async ([n]: LuaVal[]) => { await sleep(((n as number) ?? 0) * 1000, ctx); return []; },
    } as LuaFn);
    env.set('tostring', { _t:'fn', call: async ([v]:LuaVal[]) => [luaToString(v)] } as LuaFn);
    env.set('tonumber', { _t:'fn', call: async ([v]:LuaVal[]) => { const n=parseFloat(String(v)); return [isNaN(n)?null:n]; }} as LuaFn);
    env.set('type', { _t:'fn', call: async ([v]:LuaVal[]) => {
      if (v===null) return ['nil'];
      if (typeof v === 'boolean') return ['boolean'];
      if (typeof v === 'number') return ['number'];
      if (typeof v === 'string') return ['string'];
      if ((v as LuaFn)._t==='fn') return ['function'];
      return ['table'];
    }} as LuaFn);
    env.set('pairs', { _t:'fn', call: async ([t]:LuaVal[]) => {
      const keys = [...(t as LuaTable).hash.keys()];
      let i = 0;
      return [{ _t:'fn', call: async () => { const k = keys[i++]; return k!==undefined ? [k, tableGet(t as LuaTable, k)] : [null]; } } as LuaFn];
    }} as LuaFn);
    env.set('ipairs', { _t:'fn', call: async ([t]:LuaVal[]) => {
      let i = 0;
      return [{ _t:'fn', call: async () => { i++; const v = (t as LuaTable).arr[i-1]; return v!==undefined ? [i, v] : [null]; } } as LuaFn];
    }} as LuaFn);
    env.set('select', { _t:'fn', call: async ([n,...rest]:LuaVal[]) => {
      if (n === '#') return [rest.length];
      return rest.slice((n as number)-1);
    }} as LuaFn);
    env.set('unpack', { _t:'fn', call: async ([t]:LuaVal[]) => (t as LuaTable).arr } as LuaFn);
    env.set('rawget', { _t:'fn', call: async ([t,k]:LuaVal[]) => [(t as LuaTable).hash.get(k as string | number) ?? null] } as LuaFn);
    env.set('rawset', { _t:'fn', call: async ([t,k,v]:LuaVal[]) => { (t as LuaTable).hash.set(k as string|number, v); return [t]; }} as LuaFn);
    env.set('setmetatable', { _t:'fn', call: async ([t,m]:LuaVal[]) => { (t as LuaTable).meta = m as LuaTable; return [t]; }} as LuaFn);
    env.set('getmetatable', { _t:'fn', call: async ([t]:LuaVal[]) => [(t as LuaTable).meta ?? null] } as LuaFn);
    env.set('pcall', { _t:'fn', call: async ([f,...a]:LuaVal[]) => {
      try { await (f as LuaFn).call(a, ctx); return [true]; }
      catch(e) { return [false, String(e instanceof Error ? e.message : e)]; }
    }} as LuaFn);

    return env;
  }

  async evalBlock(stmts: Stmt[], env: Env): Promise<LuaVal[] | null> {
    for (const s of stmts) {
      const res = await this.evalStmt(s, env);
      if (res) return res;
    }
    return null;
  }

  private async evalStmt(s: Stmt, env: Env): Promise<LuaVal[] | null> {
    if (!this.ctx.running) throw new LuaAbort();

    switch (s.k) {
      case 'do': {
        const inner = new Env(env);
        return this.evalBlock(s.body, inner);
      }
      case 'while': {
        const inner = new Env(env);
        while (luaTruth(await this.evalExpr(s.cond, inner))) {
          if (!this.ctx.running) throw new LuaAbort();
          try { const res = await this.evalBlock(s.body, new Env(inner)); if (res) return res; }
          catch (e) { if (e instanceof LuaBreak) break; if (e instanceof LuaContinue) continue; throw e; }
        }
        return null;
      }
      case 'repeat': {
        const inner = new Env(env);
        do {
          if (!this.ctx.running) throw new LuaAbort();
          try { const res = await this.evalBlock(s.body, new Env(inner)); if (res) return res; }
          catch (e) { if (e instanceof LuaBreak) break; if (e instanceof LuaContinue) {} else throw e; }
        } while (!luaTruth(await this.evalExpr(s.cond, inner)));
        return null;
      }
      case 'if': {
        if (luaTruth(await this.evalExpr(s.cond, env))) return this.evalBlock(s.body, new Env(env));
        for (const {c,b} of s.elseifs) {
          if (luaTruth(await this.evalExpr(c, env))) return this.evalBlock(b, new Env(env));
        }
        if (s.els) return this.evalBlock(s.els, new Env(env));
        return null;
      }
      case 'nfor': {
        let cur = await this.evalExpr(s.start, env) as number;
        const lim = await this.evalExpr(s.limit, env) as number;
        const step = s.step ? (await this.evalExpr(s.step, env) as number) : 1;
        while ((step > 0 ? cur <= lim : cur >= lim)) {
          if (!this.ctx.running) throw new LuaAbort();
          const inner = new Env(env); inner.set(s.v, cur);
          try { const res = await this.evalBlock(s.body, inner); if (res) return res; }
          catch (e) { if (e instanceof LuaBreak) break; if (e instanceof LuaContinue) {} else throw e; }
          cur += step;
        }
        return null;
      }
      case 'gfor': {
        const iters = await this.evalExprs(s.iters, env);
        const iter = iters[0]; const state = iters[1]; let ctrl = iters[2] ?? null;
        while (true) {
          if (!this.ctx.running) throw new LuaAbort();
          const vals = await (iter as LuaFn).call([state, ctrl], this.ctx);
          if (vals[0] === null || vals[0] === undefined) break;
          ctrl = vals[0];
          const inner = new Env(env);
          s.vars.forEach((v, i) => inner.set(v, vals[i] ?? null));
          try { const res = await this.evalBlock(s.body, inner); if (res) return res; }
          catch (e) { if (e instanceof LuaBreak) break; if (e instanceof LuaContinue) {} else throw e; }
        }
        return null;
      }
      case 'local': {
        const vals = s.vals.length ? await this.evalExprs(s.vals, env) : [];
        s.names.forEach((n, i) => env.set(n, vals[i] ?? null));
        return null;
      }
      case 'assign': {
        const vals = await this.evalExprs(s.vals, env);
        for (let i = 0; i < s.targets.length; i++) {
          await this.evalAssign(s.targets[i], vals[i] ?? null, env);
        }
        return null;
      }
      case 'call': {
        await this.evalExpr(s.e, env);
        return null;
      }
      case 'return': {
        const vals = await this.evalExprs(s.vals, env);
        throw new LuaReturn(vals);
      }
      case 'break':    throw new LuaBreak();
      case 'continue': throw new LuaContinue();
      case 'fn': {
        const func = await this.evalExpr(s.func, env);
        if (s.local) env.set(s.name, func);
        else if (!env.assign(s.name, func)) env.set(s.name, func);
        return null;
      }
    }
  }

  private async evalAssign(target: Expr, val: LuaVal, env: Env) {
    if (target.k === 'name') {
      if (!env.assign(target.n, val)) env.set(target.n, val);
      return;
    }
    if (target.k === 'field') {
      const obj = await this.evalExpr(target.obj, env) as LuaTable;
      if (!obj || obj._t !== 'table') return;
      if (obj._objId) {
        // Writing to a studio object property
        const nativeVal = luaToNative(val, target.f);
        this.ctx.setProperty(obj._objId, target.f, nativeVal ?? val);
        obj.hash.set(target.f, val);
      } else if (obj._svc === 'Workspace') {
        // Can't assign to workspace root
      } else {
        obj.hash.set(target.f, val);
      }
      return;
    }
    if (target.k === 'index') {
      const obj = await this.evalExpr(target.obj, env) as LuaTable;
      const key = await this.evalExpr(target.key, env);
      if (obj?._t === 'table') tableSet(obj, key as string | number, val);
    }
  }

  private async evalExprs(exprs: Expr[], env: Env): Promise<LuaVal[]> {
    if (!exprs.length) return [];
    const results: LuaVal[] = [];
    for (let i = 0; i < exprs.length - 1; i++) {
      results.push(await this.evalExpr(exprs[i], env));
    }
    // last expr may be multi-return
    const last = await this.evalExprMulti(exprs[exprs.length - 1], env);
    results.push(...last);
    return results;
  }

  async evalExpr(expr: Expr, env: Env): Promise<LuaVal> {
    const r = await this.evalExprMulti(expr, env);
    return r[0] ?? null;
  }

  private async evalExprMulti(expr: Expr, env: Env): Promise<LuaVal[]> {
    switch (expr.k) {
      case 'num':  return [expr.v];
      case 'str':  return [expr.v];
      case 'bool': return [expr.v];
      case 'nil':  return [null];
      case 'name': return [env.get(expr.n) ?? null];
      case 'unop': {
        const v = await this.evalExpr(expr.e, env);
        if (expr.op === '-') return [-(v as number)];
        if (expr.op === 'not') return [!luaTruth(v)];
        if (expr.op === '#') {
          if (typeof v === 'string') return [v.length];
          if ((v as LuaTable)?._t === 'table') return [(v as LuaTable).arr.length];
          return [0];
        }
        return [null];
      }
      case 'binop': {
        return [luaArith(expr.op, await this.evalExpr(expr.l, env), await this.evalExpr(expr.r, env))];
      }
      case 'field': {
        const obj = await this.evalExpr(expr.obj, env);
        return [resolveGet(obj, expr.f, this.ctx)];
      }
      case 'index': {
        const obj = await this.evalExpr(expr.obj, env) as LuaTable;
        const key = await this.evalExpr(expr.key, env);
        if (obj?._t === 'table') return [tableGet(obj, key as string | number)];
        return [null];
      }
      case 'call': {
        const fn = await this.evalExpr(expr.fn, env) as LuaFn;
        const args = await this.evalExprs(expr.args, env);
        if (!fn || fn._t !== 'fn') {
          const name = expr.fn.k === 'name' ? expr.fn.n : expr.fn.k === 'field' ? expr.fn.f : '?';
          throw new Error(`attempt to call a non-function value '${name}'`);
        }
        try { return await fn.call(args, this.ctx); }
        catch(e) { if (e instanceof LuaReturn) return e.vals; throw e; }
      }
      case 'method': {
        const obj = await this.evalExpr(expr.obj, env) as LuaTable;
        const method = resolveGet(obj, expr.m, this.ctx) as LuaFn;
        const args = await this.evalExprs(expr.args, env);
        if (!method || method._t !== 'fn') return [null];
        try { return await method.call([obj, ...args], this.ctx); }
        catch(e) { if (e instanceof LuaReturn) return e.vals; throw e; }
      }
      case 'table': {
        const t = mkTable(); let arrIdx = 1;
        for (const f of expr.fields) {
          if (f.k === 'name') { t.hash.set(f.key, await this.evalExpr(f.val, env)); }
          else if (f.k === 'idx') { const k = await this.evalExpr(f.key, env); t.hash.set(k as string|number, await this.evalExpr(f.val, env)); }
          else { t.arr[arrIdx-1] = await this.evalExpr(f.val, env); arrIdx++; }
        }
        return [t];
      }
      case 'fn': {
        const self = this;
        return [{ _t:'fn', call: async (args: LuaVal[], _ctx: ExecCtx) => {
          const inner = new Env(env);
          expr.params.forEach((p, i) => inner.set(p, args[i] ?? null));
          try { await self.evalBlock(expr.body, inner); return []; }
          catch(e) { if (e instanceof LuaReturn) return e.vals; throw e; }
        }} as LuaFn];
      }
    }
    return [null];
  }

  async run(src: string) {
    let toks: Tok[];
    try { toks = tokenize(src); }
    catch (e) { this.ctx.addOutput({ kind: 'error', text: `Tokenize error: ${e instanceof Error ? e.message : e}` }); return; }
    let block: Stmt[];
    try { const p = new Parser(toks); block = p.parseBlock(); }
    catch (e) { this.ctx.addOutput({ kind: 'error', text: `Parse error: ${e instanceof Error ? e.message : e}` }); return; }
    const env = this.makeGlobalEnv();
    try { await this.evalBlock(block, env); }
    catch (e) {
      if (e instanceof LuaAbort) return;
      if (e instanceof LuaReturn) return;
      this.ctx.addOutput({ kind: 'error', text: `Runtime error: ${e instanceof Error ? e.message : String(e)}` });
    }
  }
}

// ─── Helpers ────────────────────────────────────────────────────────────────────

function fn1(f: (a: LuaVal) => LuaVal): LuaFn {
  return { _t:'fn', call: async ([a]:LuaVal[]) => [f(a)] };
}
function fnN(f: (...a: LuaVal[]) => LuaVal): LuaFn {
  return { _t:'fn', call: async (args:LuaVal[]) => [f(...args)] };
}

// ─── Public API ─────────────────────────────────────────────────────────────────

export interface RunScriptOptions {
  source: string;
  scriptObjId?: string;
  getObjects: () => Map<string, StudioObject>;
  setProperty: (id: string, prop: string, val: unknown) => void;
  addOutput: (line: Omit<OutputLine, 'id' | 'ts'>) => void;
}

export function runScript(opts: RunScriptOptions): { stop: () => void } {
  const ctx: ExecCtx = {
    running: true,
    getObjects: opts.getObjects,
    setProperty: opts.setProperty,
    addOutput: opts.addOutput,
    scriptObjId: opts.scriptObjId,
  };
  const ev = new Evaluator(ctx);
  ev.run(opts.source).catch(() => {});
  return { stop: () => { ctx.running = false; } };
}
