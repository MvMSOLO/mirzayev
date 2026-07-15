import { useCallback, useEffect, useState } from "react";
import { transitionSynth } from "@/lib/animations/synthesizer";

export function useSound() {
  const [isMuted, setIsMuted] = useState(true);

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
      } catch {
        // storage may be unavailable (private mode, disabled storage)
      }
      // Sync to the synthesizer's context initialization
      if (!next) {
        transitionSynth.initCtx();
      }
      return next;
    });
  }, []);

  const playHover = useCallback(() => {
    if (isMuted) return;
    transitionSynth.playSynthesis(44); // bubble pop as a satisfying hover
  }, [isMuted]);

  const playClick = useCallback(() => {
    if (isMuted) return;
    transitionSynth.playSynthesis(45); // woody tock as a satisfying click
  }, [isMuted]);

  const playReveal = useCallback(() => {
    if (isMuted) return;
    transitionSynth.playSynthesis(26); // shield-charge sweep
  }, [isMuted]);

  const playOpen = useCallback(() => {
    if (isMuted) return;
    transitionSynth.playSynthesis(36); // powerup arpeggio
  }, [isMuted]);

  const playClose = useCallback(() => {
    if (isMuted) return;
    transitionSynth.playSynthesis(38); // descending notes
  }, [isMuted]);

  const play = useCallback(
    (name: "boot" | "scan" | "type" | "success" | "error" | "submit" | "click") => {
      if (isMuted) return;
      switch (name) {
        case "boot":
          transitionSynth.playSynthesis(34); // coin-chime
          break;
        case "scan":
          transitionSynth.playSynthesis(50); // scanner-beam
          break;
        case "type":
          transitionSynth.playSynthesis(45); // woody-tock
          break;
        case "success":
          transitionSynth.playSynthesis(48); // success-bell
          break;
        case "error":
          transitionSynth.playSynthesis(49); // error-buzz
          break;
        case "submit":
          transitionSynth.playSynthesis(28); // sub-impact
          break;
        case "click":
          transitionSynth.playSynthesis(45); // woody-tock
          break;
        default:
          playClick();
      }
    },
    [isMuted, playClick],
  );

  const getMuted = useCallback(() => isMuted, [isMuted]);

  // NEW EXTENDED API: Trigger 52 unique synthesizer sound effects
  const playSynthesis = useCallback(
    (index: number) => {
      if (isMuted) return;
      transitionSynth.playSynthesis(index);
    },
    [isMuted],
  );

  // NEW EXTENDED API: Generative Ambient Loops
  const startGenerativeAmbient = useCallback(() => {
    transitionSynth.startGenerativeAmbient();
  }, []);

  const stopGenerativeAmbient = useCallback(() => {
    transitionSynth.stopGenerativeAmbient();
  }, []);

  const isAmbientActive = useCallback(() => {
    return transitionSynth.isAmbientActive();
  }, []);

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
    playSynthesis,
    startGenerativeAmbient,
    stopGenerativeAmbient,
    isAmbientActive,
  };
}

/** @deprecated kept for backward-compat import paths; use `useSound` instead. */
export const useSoundEffects = useSound;
