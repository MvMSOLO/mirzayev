import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, TerminalSquare, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useUniverse } from "@/lib/universe";
import { useSound } from "@/hooks/useSound";
import { useNavigate } from "@tanstack/react-router";

interface SecretTerminalProps {
  onGipnos: () => void;
  onRobloxStudio: () => void;
}

type Line = { kind: "in" | "out" | "err" | "ok"; text: string };

const SECTIONS: Record<string, string> = {
  hero: "hero",
  about: "about",
  services: "services",
  skills: "skills",
  work: "work",
  lab: "lab",
  philosophy: "philosophy",
  contact: "contact",
  timeline: "neural-timeline",
};

const KNOWN_COMMANDS = [
  "help",
  "clear",
  "whoami",
  "about",
  "skills",
  "social",
  "contact",
  "date",
  "mode",
  "lang",
  "mute",
  "unmute",
  "ls",
  "cd",
  "sudo",
  "matrix",
  "gipnos",
  "zen",
  "robloxstudio",
  "exit",
  "close",
];

function scrollTo(id: string) {
  if (id === "hero" || id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  }
  return false;
}

export function SecretTerminal({ onGipnos, onRobloxStudio }: SecretTerminalProps) {
  const { lang, setLang } = useLang();
  const { mode, enter, exit, phase } = useUniverse();
  const { play, playClick, playOpen, playClose, toggleMute, isMuted } = useSound();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [seenBefore, setSeenBefore] = useState(true);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [showMatrix, setShowMatrix] = useState(false);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const cmdHistory = useRef<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      setSeenBefore(localStorage.getItem("secret_terminal_seen") === "true");
    } catch {
      /* ignore */
    }
  }, []);

  const banner = useCallback((): Line[] => {
    return [
      {
        kind: "out",
        text: lang === "uz" ? "AVAZBEK.OS v6.0 — MAXFIY SHELL" : "AVAZBEK.OS v6.0 — SECRET SHELL",
      },
      {
        kind: "out",
        text:
          lang === "uz"
            ? "Buyruqlar ro'yxati uchun 'help' yozing."
            : "Type 'help' to see the command list.",
      },
    ];
  }, [lang]);

  const openTerminal = useCallback(() => {
    setOpen(true);
    play("boot");
    try {
      localStorage.setItem("secret_terminal_seen", "true");
    } catch {
      /* ignore */
    }
    setSeenBefore(true);
    setLines((prev) => (prev.length ? prev : banner()));
    setTimeout(() => inputRef.current?.focus(), 350);
  }, [banner, play]);

  const closeTerminal = useCallback(() => {
    setOpen(false);
    playClose();
  }, [playClose]);

  // Global "`" toggle, ignoring when user is typing elsewhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (e.key === "`" && !typing) {
        e.preventDefault();
        setOpen((o) => {
          const next = !o;
          if (next) openTerminal();
          else playClose();
          return next;
        });
      } else if (e.key === "Escape" && open && !typing) {
        closeTerminal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, openTerminal, closeTerminal, playClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const print = useCallback((text: string, kind: Line["kind"] = "out") => {
    setLines((prev) => [...prev, { kind, text }]);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;
      cmdHistory.current.push(trimmed);
      setHistIdx(null);
      setLines((prev) => [...prev, { kind: "in", text: trimmed }]);

      const [cmd, ...args] = trimmed.split(/\s+/);
      const c = cmd.toLowerCase();
      const arg = args.join(" ").toLowerCase();

      switch (c) {
        case "help": {
          playClick();
          print(
            lang === "uz"
              ? "help · clear · whoami · about · skills · social · contact · date · mode [kinetic|creative] · lang [uz|en] · mute · ls · cd <bo'lim> · matrix · gipnos · exit"
              : "help · clear · whoami · about · skills · social · contact · date · mode [kinetic|creative] · lang [uz|en] · mute · ls · cd <section> · matrix · gipnos · exit",
          );
          break;
        }
        case "clear": {
          playClick();
          setLines([]);
          break;
        }
        case "whoami": {
          playClick();
          print(
            lang === "uz"
              ? "mehmon@avazbek-mirzayev — sen bu yerni topding."
              : "guest@avazbek-mirzayev — you found this place.",
          );
          break;
        }
        case "about": {
          playClick();
          print(
            lang === "uz"
              ? "Avazbek Mirzayev · 16 yosh · Full-stack dasturchi & UI/UX dizayner · Olmaliq, O'zbekiston."
              : "Avazbek Mirzayev · 16 years old · Full-stack developer & UI/UX designer · Olmaliq, Uzbekistan.",
          );
          break;
        }
        case "skills": {
          playClick();
          print(
            "React · TypeScript · Next.js · TanStack · Node.js · Python · AI/LLM · UI/UX · WebGL",
          );
          break;
        }
        case "social":
        case "contact": {
          playClick();
          scrollTo("contact");
          print(lang === "uz" ? "Aloqa bo'limiga o'tildi." : "Jumped to the contact section.");
          break;
        }
        case "date": {
          playClick();
          print(new Date().toString());
          break;
        }
        case "sudo": {
          play("error");
          print(
            lang === "uz"
              ? `Ruxsat berilmadi: siz admin emassiz. (lekin urinish yaxshi edi 😏)`
              : `Permission denied: you are not root. (nice try though 😏)`,
            "err",
          );
          break;
        }
        case "mode": {
          if (phase !== "idle") {
            print(
              lang === "uz" ? "O'tish davom etmoqda, kuting..." : "Transition in progress, wait...",
              "err",
            );
            break;
          }
          const target = arg || (mode === "kinetic" ? "creative" : "kinetic");
          if (target.startsWith("cre") || target.startsWith("uni")) {
            if (mode !== "creative") {
              play("success");
              enter();
              print(
                lang === "uz"
                  ? "→ Kreativ olamga o'tilmoqda..."
                  : "→ Switching to the creative universe...",
                "ok",
              );
            } else {
              print(lang === "uz" ? "Allaqachon kreativ rejimda." : "Already in creative mode.");
            }
          } else if (target.startsWith("kin")) {
            if (mode !== "kinetic") {
              play("success");
              exit();
              print(
                lang === "uz"
                  ? "→ Kinetik rejimga qaytilmoqda..."
                  : "→ Returning to kinetic mode...",
                "ok",
              );
            } else {
              print(lang === "uz" ? "Allaqachon kinetik rejimda." : "Already in kinetic mode.");
            }
          } else {
            print(
              lang === "uz"
                ? "Foydalanish: mode [kinetic|creative]"
                : "Usage: mode [kinetic|creative]",
              "err",
            );
          }
          break;
        }
        case "lang": {
          if (arg === "uz" || arg === "en") {
            play("success");
            setLang(arg as "uz" | "en");
            print(arg === "uz" ? "→ Til: O'zbekcha" : "→ Language: English", "ok");
          } else {
            print(`lang: ${lang}`);
          }
          break;
        }
        case "mute":
        case "unmute": {
          toggleMute();
          print(
            !isMuted
              ? lang === "uz"
                ? "🔇 Ovoz o'chirildi."
                : "🔇 Sound muted."
              : lang === "uz"
                ? "🔊 Ovoz yoqildi."
                : "🔊 Sound on.",
          );
          break;
        }
        case "ls": {
          playClick();
          print(Object.keys(SECTIONS).join("  "));
          break;
        }
        case "cd": {
          const target = SECTIONS[arg] ?? arg;
          if (target && scrollTo(target)) {
            play("success");
            print(lang === "uz" ? `→ '${arg}' bo'limiga o'tildi.` : `→ Jumped to '${arg}'.`, "ok");
          } else {
            play("error");
            print(
              lang === "uz"
                ? `cd: '${arg || ""}' topilmadi. 'ls' bilan bo'limlarni ko'ring.`
                : `cd: '${arg || ""}' not found. Try 'ls' to see sections.`,
              "err",
            );
          }
          break;
        }
        case "matrix": {
          play("scan");
          setShowMatrix(true);
          print(lang === "uz" ? "Matritsaga xush kelibsiz." : "Welcome to the matrix.");
          setTimeout(() => setShowMatrix(false), 4200);
          break;
        }
        case "robloxstudio": {
          play("scan");
          print(
            lang === "uz"
              ? "→ Roblox Studio IDE yuklanmoqda... 🟥"
              : "→ Loading Roblox Studio IDE... 🟥",
            "ok",
          );
          setTimeout(() => {
            closeTerminal();
            navigate({ to: "/studio" });
          }, 600);
          break;
        }
        case "gipnos":
        case "gipnoz":
        case "hypnos": {
          play("scan");
          print(
            lang === "uz"
              ? "Gipnoz protokoli ishga tushirilmoqda... ⚠ ko'zlaringizni tayyorlang."
              : "Initiating gipnos protocol... ⚠ prepare your eyes.",
            "ok",
          );
          setTimeout(() => {
            playOpen();
            onGipnos();
            setOpen(false);
          }, 900);
          break;
        }
        case "zen": {
          play("success");
          if (mode !== "creative") {
            enter();
            print(
              lang === "uz"
                ? "→ Kreativ olamdagi Zen Bog'iga o'tilmoqda..."
                : "→ Switching to Zen Garden in Creative Universe...",
              "ok",
            );
            setTimeout(() => {
              scrollTo("uni-zen");
            }, 1000);
          } else {
            const el = document.getElementById("uni-zen");
            const rect = el?.getBoundingClientRect();
            const isAtZen = rect && rect.top >= -100 && rect.top < window.innerHeight / 2;
            if (isAtZen) {
              scrollTo("top");
              print(lang === "uz" ? "→ Zen Bog'idan chiqildi." : "→ Exited Zen Garden.", "ok");
            } else {
              scrollTo("uni-zen");
              print(lang === "uz" ? "→ Zen Bog'iga kirildi." : "→ Entered Zen Garden.", "ok");
            }
          }
          closeTerminal();
          break;
        }
        case "exit":
        case "close":
        case "quit": {
          closeTerminal();
          break;
        }
        default: {
          play("error");
          print(
            lang === "uz"
              ? `buyruq topilmadi: '${cmd}'. Yordam uchun 'help' yozing.`
              : `command not found: '${cmd}'. Type 'help' for a list.`,
            "err",
          );
        }
      }
    },
    [
      lang,
      mode,
      phase,
      enter,
      exit,
      setLang,
      toggleMute,
      isMuted,
      play,
      playClick,
      playOpen,
      closeTerminal,
      onGipnos,
      onRobloxStudio,
      print,
    ],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const hist = cmdHistory.current;
      if (!hist.length) return;
      const nextIdx = histIdx === null ? hist.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(nextIdx);
      setInput(hist[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const hist = cmdHistory.current;
      if (histIdx === null) return;
      const nextIdx = histIdx + 1;
      if (nextIdx >= hist.length) {
        setHistIdx(null);
        setInput("");
      } else {
        setHistIdx(nextIdx);
        setInput(hist[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const match = KNOWN_COMMANDS.find(
        (k) => k.startsWith(input.toLowerCase()) && input.length > 0,
      );
      if (match) setInput(match + " ");
    }
  };

  return (
    <>
      {/* Matrix rain easter egg */}
      <AnimatePresence>
        {showMatrix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[250] bg-black pointer-events-none overflow-hidden"
          >
            {Array.from({ length: 40 }).map((_, i) => {
              const left = (i / 40) * 100;
              const delay = Math.random() * 1.2;
              const dur = 2.2 + Math.random() * 1.6;
              const chars = Array.from({ length: 22 })
                .map(() => String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96)))
                .join("");
              return (
                <div
                  key={i}
                  className="absolute top-0 text-[#00ff22] font-mono text-[13px] leading-[15px] whitespace-pre"
                  style={{
                    left: `${left}%`,
                    animation: `matrix-drop ${dur}s linear ${delay}s infinite`,
                    textShadow: "0 0 6px rgba(0,255,34,0.8)",
                  }}
                >
                  {chars.split("").map((ch, j) => (
                    <div key={j} style={{ opacity: 1 - j / chars.length }}>
                      {ch}
                    </div>
                  ))}
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab handle */}
      {!open && (
        <button
          onClick={openTerminal}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[120] flex items-center gap-1.5 rounded-t-md border border-b-0 border-border glass-dark px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/35 hover:text-accent hover:border-accent/40 transition-colors group"
          aria-label="Open secret terminal"
        >
          <TerminalSquare className="size-3" />
          <span className="hidden sm:inline">{"❯_"}</span>
          <ChevronUp className="size-3 opacity-50 group-hover:-translate-y-0.5 transition-transform" />
          {!seenBefore && (
            <span className="absolute -top-1.5 -right-1.5 size-2 rounded-full bg-accent animate-ping" />
          )}
        </button>
      )}

      {/* Terminal panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 z-[120] w-full sm:w-[560px] max-w-full px-0 sm:px-0"
          >
            <div className="glass-dark border border-border border-b-0 sm:rounded-t-xl shadow-premium flex flex-col h-[60vh] sm:h-96 overflow-hidden animate-terminal-flicker">
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-border shrink-0">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/50">
                  <span className="size-1.5 rounded-full bg-[#00ff22] animate-pulse" />
                  SECRET_SHELL
                </div>
                <button
                  onClick={closeTerminal}
                  aria-label="Close terminal"
                  className="text-white/40 hover:text-accent transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-3.5 py-2.5 font-mono text-[12px] space-y-1"
              >
                {lines.map((l, i) => (
                  <div
                    key={i}
                    className={
                      l.kind === "in"
                        ? "text-white/70"
                        : l.kind === "err"
                          ? "text-red-400/80"
                          : l.kind === "ok"
                            ? "text-accent"
                            : "text-white/45"
                    }
                  >
                    {l.kind === "in" ? (
                      <span>
                        <span className="text-accent/70">guest@avazbek:~$</span> {l.text}
                      </span>
                    ) : (
                      l.text
                    )}
                  </div>
                ))}
              </div>

              <form
                onSubmit={onSubmit}
                className="flex items-center gap-2 px-3.5 py-2.5 border-t border-border shrink-0"
              >
                <span className="font-mono text-[12px] text-accent/80 shrink-0">
                  guest@avazbek:~$
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  className="flex-1 bg-transparent outline-none font-mono text-[12px] text-white caret-accent"
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
