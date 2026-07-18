import { useState, useRef, useEffect, useCallback } from 'react';
import { Send, Bot, CheckCircle, XCircle, Clock, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import type { StudioObject, AIPendingOp, AIChange } from './types';

// ─── Heuristic NLP AI ─────────────────────────────────────────────────────────

const NAMED_COLORS: Record<string, [number, number, number]> = {
  red: [1, 0.15, 0.1], blue: [0.05, 0.4, 0.8], green: [0.28, 0.72, 0.28],
  yellow: [0.96, 0.8, 0.18], white: [0.95, 0.95, 0.95], black: [0.1, 0.16, 0.2],
  orange: [1, 0.55, 0.0], purple: [0.6, 0.2, 0.8], pink: [1, 0.4, 0.7],
  cyan: [0.0, 0.85, 0.9], gray: [0.6, 0.6, 0.6], grey: [0.6, 0.6, 0.6],
  brown: [0.55, 0.35, 0.2], teal: [0.1, 0.7, 0.6], lime: [0.4, 0.9, 0.1],
  gold: [1.0, 0.84, 0.0], silver: [0.75, 0.75, 0.75], navy: [0.0, 0.0, 0.5],
};

const MATERIAL_NAMES: Record<string, string> = {
  neon: 'Neon', glass: 'Glass', metal: 'Metal', wood: 'Wood',
  plastic: 'SmoothPlastic', concrete: 'Concrete', brick: 'Brick',
  grass: 'Grass', sand: 'Sand', ice: 'Ice', marble: 'Marble',
  granite: 'Granite', fabric: 'Fabric', slate: 'Slate',
};

function findObjects(msg: string, objects: Map<string, StudioObject>): StudioObject[] {
  const lower = msg.toLowerCase();
  const allObjs = Array.from(objects.values()).filter(
    o => !['Workspace','Lighting','ReplicatedStorage','StarterGui','StarterPack',
           'SoundService','Teams','Players'].includes(o.type)
  );

  // Check for "all parts", "everything", "all objects"
  if (/\b(all|every(thing)?|each)\b/.test(lower)) return allObjs;

  // Find by exact name mention
  const named = allObjs.filter(o => lower.includes(o.name.toLowerCase()));
  if (named.length) return named;

  // Find by type
  const typeMatches: Record<string, string[]> = {
    part: ['Part', 'Baseplate'], spawn: ['SpawnLocation'],
    npc: ['NPCModel'], light: ['PointLight'], script: ['Script','LocalScript'],
  };
  for (const [kw, types] of Object.entries(typeMatches)) {
    if (lower.includes(kw)) {
      const matches = allObjs.filter(o => types.includes(o.type));
      if (matches.length) return matches;
    }
  }

  return [];
}

function generateChanges(msg: string, objs: StudioObject[]): AIChange[] {
  const lower = msg.toLowerCase();
  const changes: AIChange[] = [];

  for (const obj of objs) {
    // Color change
    for (const [colorName, [r, g, b]] of Object.entries(NAMED_COLORS)) {
      if (lower.includes(colorName)) {
        changes.push({
          objectId: obj.id, objectName: obj.name,
          property: 'Color',
          oldValue: obj.properties.Color,
          newValue: { r, g, b },
          label: `Set ${obj.name}.Color → ${colorName}`,
        });
        break;
      }
    }

    // Material change
    for (const [kw, mat] of Object.entries(MATERIAL_NAMES)) {
      if (lower.includes(kw)) {
        changes.push({
          objectId: obj.id, objectName: obj.name,
          property: 'Material',
          oldValue: obj.properties.Material,
          newValue: mat,
          label: `Set ${obj.name}.Material → ${mat}`,
        });
        break;
      }
    }

    // Transparency
    const transMatch = lower.match(/transparent(?:cy)?[^0-9]*([0-9]*\.?[0-9]+)?/);
    if (transMatch || lower.includes('invisible') || lower.includes('ghost')) {
      const val = transMatch?.[1] ? parseFloat(transMatch[1]) : lower.includes('invisible') ? 1 : 0.7;
      changes.push({
        objectId: obj.id, objectName: obj.name,
        property: 'Transparency',
        oldValue: obj.properties.Transparency,
        newValue: Math.min(1, Math.max(0, val)),
        label: `Set ${obj.name}.Transparency → ${val.toFixed(2)}`,
      });
    }
    if (lower.includes('opaque') || lower.includes('solid') || lower.includes('visible')) {
      changes.push({
        objectId: obj.id, objectName: obj.name,
        property: 'Transparency',
        oldValue: obj.properties.Transparency,
        newValue: 0,
        label: `Set ${obj.name}.Transparency → 0 (opaque)`,
      });
    }

    // Position changes
    const posMatch = lower.match(/move\s+(?:\w+\s+)?(?:to|at)?\s*\(?(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)\)?/);
    if (posMatch) {
      changes.push({
        objectId: obj.id, objectName: obj.name,
        property: 'Position',
        oldValue: obj.properties.Position,
        newValue: { x: parseFloat(posMatch[1]), y: parseFloat(posMatch[2]), z: parseFloat(posMatch[3]) },
        label: `Set ${obj.name}.Position → (${posMatch[1]}, ${posMatch[2]}, ${posMatch[3]})`,
      });
    } else {
      const pos = (obj.properties.Position as {x:number;y:number;z:number}) ?? {x:0,y:0,z:0};
      if (/move\s+up|raise|lift/.test(lower)) {
        const by = parseFloat(lower.match(/by\s*([0-9.]+)/)?.[1] ?? '5');
        changes.push({ objectId: obj.id, objectName: obj.name, property: 'Position',
          oldValue: pos, newValue: { ...pos, y: pos.y + by }, label: `Move ${obj.name} up by ${by}` });
      }
      if (/move\s+down|lower|sink/.test(lower)) {
        const by = parseFloat(lower.match(/by\s*([0-9.]+)/)?.[1] ?? '5');
        changes.push({ objectId: obj.id, objectName: obj.name, property: 'Position',
          oldValue: pos, newValue: { ...pos, y: pos.y - by }, label: `Move ${obj.name} down by ${by}` });
      }
    }

    // Size changes
    const sizeMatch = lower.match(/resize\s+(?:\w+\s+)?to\s*\(?([0-9.]+)[,\s]+([0-9.]+)[,\s]+([0-9.]+)\)?/);
    if (sizeMatch) {
      changes.push({
        objectId: obj.id, objectName: obj.name, property: 'Size',
        oldValue: obj.properties.Size,
        newValue: { x: parseFloat(sizeMatch[1]), y: parseFloat(sizeMatch[2]), z: parseFloat(sizeMatch[3]) },
        label: `Resize ${obj.name} → (${sizeMatch[1]}, ${sizeMatch[2]}, ${sizeMatch[3]})`,
      });
    } else {
      const size = (obj.properties.Size as {x:number;y:number;z:number}) ?? {x:4,y:1,z:4};
      const scaleMatch = lower.match(/(?:scale|multiply)\s+by\s*([0-9.]+)/);
      if (scaleMatch) {
        const factor = parseFloat(scaleMatch[1]);
        changes.push({ objectId: obj.id, objectName: obj.name, property: 'Size',
          oldValue: size, newValue: { x: size.x*factor, y: size.y*factor, z: size.z*factor },
          label: `Scale ${obj.name} × ${factor}` });
      } else if (/bigger|larger|grow|double/.test(lower)) {
        const factor = lower.includes('double') ? 2 : 1.5;
        changes.push({ objectId: obj.id, objectName: obj.name, property: 'Size',
          oldValue: size, newValue: { x: size.x*factor, y: size.y*factor, z: size.z*factor },
          label: `Scale ${obj.name} × ${factor}` });
      } else if (/smaller|shrink|halve/.test(lower)) {
        const factor = lower.includes('halve') ? 0.5 : 0.66;
        changes.push({ objectId: obj.id, objectName: obj.name, property: 'Size',
          oldValue: size, newValue: { x: size.x*factor, y: size.y*factor, z: size.z*factor },
          label: `Scale ${obj.name} × ${factor.toFixed(2)}` });
      }
    }

    // Anchored toggle
    if (/unanchor|un-anchor|anchored\s*=\s*false/.test(lower)) {
      changes.push({ objectId: obj.id, objectName: obj.name, property: 'Anchored',
        oldValue: obj.properties.Anchored, newValue: false, label: `Set ${obj.name}.Anchored → false` });
    }
    if (/^anchor|anchored\s*=\s*true/.test(lower)) {
      changes.push({ objectId: obj.id, objectName: obj.name, property: 'Anchored',
        oldValue: obj.properties.Anchored, newValue: true, label: `Set ${obj.name}.Anchored → true` });
    }
  }

  return changes;
}

function buildAIThinking(objs: StudioObject[], changes: AIChange[]): string {
  if (objs.length === 0) return 'No matching objects found in the Explorer tree.';
  if (changes.length === 0) return `Found ${objs.length} matching object(s) but no recognizable property change in your request.`;
  const names = [...new Set(changes.map(c => c.objectName))];
  const props = [...new Set(changes.map(c => c.property))];
  return `Analysed Explorer tree with ${Array.from(arguments[2]?.size ?? 0)} objects. Targeting: ${names.join(', ')}. Changes: ${props.join(', ')}.`;
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  objects: Map<string, StudioObject>;
  pendingOps: AIPendingOp[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onNewOp: (op: AIPendingOp) => void;
}

export function StudioAIChat({ objects, pendingOps, onApprove, onReject, onNewOp }: Props) {
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [expandedOps, setExpandedOps] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [pendingOps]);

  const handleSend = useCallback(async () => {
    const msg = input.trim();
    if (!msg) return;
    setInput('');
    setThinking(true);

    // Simulate AI thinking delay
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400));

    const matchedObjs = findObjects(msg, objects);
    const changes = generateChanges(msg, matchedObjs);
    const thinking_text = buildAIThinking(matchedObjs, changes, objects);

    const op: AIPendingOp = {
      id: `ai-${Date.now()}`,
      userMessage: msg,
      aiThinking: thinking_text,
      changes,
      status: 'pending',
    };

    onNewOp(op);
    setThinking(false);
  }, [input, objects, onNewOp]);

  const toggleExpand = (id: string) => {
    setExpandedOps(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const pendingCount = pendingOps.filter(o => o.status === 'pending').length;

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-[#3c3c3c]">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#3c3c3c] bg-[#2d2d30] shrink-0 flex items-center gap-2">
        <Sparkles className="size-3 text-purple-400" />
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Studio AI</span>
        {pendingCount > 0 && (
          <span className="ml-auto px-1.5 py-0.5 bg-yellow-600 text-[9px] font-mono text-white rounded-full">
            {pendingCount} pending
          </span>
        )}
      </div>

      {/* Ops list */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 p-2 space-y-2">
        {pendingOps.length === 0 && !thinking && (
          <div className="text-[10px] text-gray-500 font-mono p-3 text-center leading-relaxed">
            <Bot className="size-6 text-purple-400 mx-auto mb-2" />
            Describe changes in plain English.<br />
            <span className="text-[9px] text-gray-600">e.g. "make Block red" · "move Spawn up by 5"</span>
          </div>
        )}

        {pendingOps.map(op => (
          <div
            key={op.id}
            className={`rounded border text-[10px] font-mono overflow-hidden
              ${op.status === 'pending'   ? 'border-yellow-800/60 bg-yellow-900/10'
              : op.status === 'approved'  ? 'border-green-800/60 bg-green-900/10'
              : 'border-red-800/60 bg-red-900/10'}`}
          >
            {/* User message */}
            <div className="px-2 py-1.5 bg-black/20 flex items-start gap-1.5">
              <span className="text-purple-400 shrink-0">▶</span>
              <span className="text-gray-200 flex-1">{op.userMessage}</span>
              <button onClick={() => toggleExpand(op.id)} className="text-gray-500 hover:text-gray-300 shrink-0">
                {expandedOps.has(op.id) ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
              </button>
            </div>

            {/* AI thinking */}
            <div className="px-2 py-1 text-[9px] text-gray-500 italic">
              {op.aiThinking}
            </div>

            {/* Changes list */}
            {(expandedOps.has(op.id) || op.status === 'pending') && op.changes.length > 0 && (
              <div className="px-2 pb-1 space-y-0.5">
                {op.changes.map((c, i) => (
                  <div key={i} className="flex items-center gap-1 text-[9px] py-0.5 border-b border-white/5 last:border-0">
                    <span className="text-gray-500 shrink-0">•</span>
                    <span className="text-gray-300 flex-1 truncate">{c.label}</span>
                  </div>
                ))}
              </div>
            )}

            {op.changes.length === 0 && (
              <div className="px-2 pb-1.5 text-[9px] text-yellow-600/70">
                No applicable changes generated.
              </div>
            )}

            {/* Action buttons */}
            {op.status === 'pending' && op.changes.length > 0 && (
              <div className="flex gap-1 px-2 pb-2 pt-1">
                <button
                  onClick={() => onApprove(op.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-1 bg-green-700/50 hover:bg-green-700 text-green-300 rounded text-[9px] uppercase tracking-wider transition-colors"
                >
                  <CheckCircle className="size-3" /> Approve
                </button>
                <button
                  onClick={() => onReject(op.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-1 bg-red-700/30 hover:bg-red-700/60 text-red-400 rounded text-[9px] uppercase tracking-wider transition-colors"
                >
                  <XCircle className="size-3" /> Reject
                </button>
              </div>
            )}

            {/* Status badge */}
            {op.status !== 'pending' && (
              <div className={`px-2 pb-2 pt-0.5 flex items-center gap-1 text-[9px]
                ${op.status === 'approved' ? 'text-green-400' : 'text-red-400'}`}>
                {op.status === 'approved' ? <CheckCircle className="size-3" /> : <XCircle className="size-3" />}
                {op.status === 'approved' ? 'Applied' : 'Rejected'}
              </div>
            )}
          </div>
        ))}

        {/* Thinking indicator */}
        {thinking && (
          <div className="flex items-center gap-2 px-2 py-2 text-[10px] text-purple-400 font-mono animate-pulse">
            <Bot className="size-3" />
            Analysing scene…
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-2 border-t border-[#3c3c3c] shrink-0">
        <div className="flex items-center gap-1.5 bg-[#2d2d30] rounded border border-[#3c3c3c] focus-within:border-purple-600 px-2 py-1.5">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder='e.g. "make Block1 red"'
            className="flex-1 bg-transparent text-gray-200 text-[10px] font-mono outline-none placeholder:text-gray-600"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || thinking}
            className="shrink-0 p-1 rounded hover:bg-purple-600 text-gray-400 hover:text-white transition-colors disabled:opacity-30"
          >
            <Send className="size-3" />
          </button>
        </div>
        <p className="text-[8px] text-gray-600 font-mono mt-1 text-center">
          Changes require approval before execution
        </p>
      </div>
    </div>
  );
}
