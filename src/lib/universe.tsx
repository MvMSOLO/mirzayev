import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Mode = "kinetic" | "creative";
export type Phase = "idle" | "deconstruct" | "liquid" | "flash" | "rebuild";

interface Ctx {
  mode: Mode;
  phase: Phase;
  enter: () => void;
  exit: () => void;
}

const UniverseCtx = createContext<Ctx | null>(null);

export function UniverseProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("kinetic");
  const [phase, setPhase] = useState<Phase>("idle");

  const run = useCallback(
    (target: Mode) => {
      if (phase !== "idle") return;
      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.body.style.overflow = "hidden";

      if (reduced) {
        setPhase("flash");
        setTimeout(() => {
          setMode(target);
          window.scrollTo({ top: 0 });
        }, 200);
        setTimeout(() => {
          setPhase("idle");
          document.body.style.overflow = "";
        }, 500);
        return;
      }

      setPhase("deconstruct");
      setTimeout(() => setPhase("liquid"), 1000);
      setTimeout(() => setPhase("flash"), 2000);
      setTimeout(() => {
        setMode(target);
        window.scrollTo({ top: 0 });
        setPhase("rebuild");
      }, 3000);
      setTimeout(() => {
        setPhase("idle");
        document.body.style.overflow = "";
      }, 5000);
    },
    [phase],
  );

  const enter = useCallback(() => run("creative"), [run]);
  const exit = useCallback(() => run("kinetic"), [run]);

  useEffect(() => {
    document.documentElement.setAttribute("data-universe", mode);
  }, [mode]);

  return (
    <UniverseCtx.Provider value={{ mode, phase, enter, exit }}>{children}</UniverseCtx.Provider>
  );
}

export function useUniverse() {
  const ctx = useContext(UniverseCtx);
  if (!ctx) throw new Error("useUniverse outside provider");
  return ctx;
}
