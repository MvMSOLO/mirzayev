import { useCallback, useEffect, useState } from "react";

export function useSound() {
  const [isMuted, setIsMuted] = useState(true); // Default muted as per instructions
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sound_muted");
      if (stored !== null) {
        setIsMuted(stored === "true");
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("sound_muted", String(next));
      } catch (e) {}
      return next;
    });
  }, []);

  const getCtx = useCallback(() => {
    if (audioCtx) return audioCtx;
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (Ctx) {
      const ctx = new Ctx();
      setAudioCtx(ctx);
      return ctx;
    }
    return null;
  }, [audioCtx]);

  const playHover = useCallback(() => {
    if (isMuted) return;
    const ctx = getCtx();
    if (!ctx) return;

    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }, [isMuted, getCtx]);

  const playClick = useCallback(() => {
    if (isMuted) return;
    const ctx = getCtx();
    if (!ctx) return;

    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }, [isMuted, getCtx]);

  const playReveal = useCallback(() => {
    if (isMuted) return;
    const ctx = getCtx();
    if (!ctx) return;

    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  }, [isMuted, getCtx]);

  const playTone = useCallback(
    (
      freqStart: number,
      freqEnd: number,
      duration: number,
      type: OscillatorType,
      gainPeak: number,
    ) => {
      if (isMuted) return;
      const ctx = getCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 1), ctx.currentTime + duration);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(gainPeak, ctx.currentTime + Math.min(0.02, duration / 4));
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    },
    [isMuted, getCtx],
  );

  /** Generic named sound trigger used by richer UI (FutureCompiler console, etc). */
  const play = useCallback(
    (name: "boot" | "scan" | "type" | "success" | "error" | "submit") => {
      switch (name) {
        case "boot":
          return playTone(120, 480, 0.35, "sawtooth", 0.04);
        case "scan":
          return playTone(600, 900, 0.12, "sine", 0.03);
        case "type":
          return playTone(300, 340, 0.03, "square", 0.02);
        case "success":
          return playTone(400, 1200, 0.3, "sine", 0.05);
        case "error":
          return playTone(180, 60, 0.25, "sawtooth", 0.06);
        case "submit":
          return playTone(200, 700, 0.18, "triangle", 0.05);
        default:
          return playClick();
      }
    },
    [playTone, playClick],
  );

  const getMuted = useCallback(() => isMuted, [isMuted]);

  const playOpen = useCallback(() => {
    playTone(300, 400, 0.1, "sine", 0.05);
    setTimeout(() => playTone(400, 500, 0.2, "sine", 0.05), 100);
  }, [playTone]);

  const playClose = useCallback(() => {
    playTone(400, 300, 0.1, "sine", 0.05);
    setTimeout(() => playTone(300, 200, 0.2, "sine", 0.05), 100);
  }, [playTone]);

  return {
    isMuted,
    toggleMute,
    playHover,
    playClick,
    playReveal,
    playOpen,
    playClose,
    play,
    getMuted,
  };
}

/** @deprecated kept for backward-compat import paths; use `useSound` instead. */
export const useSoundEffects = useSound;
