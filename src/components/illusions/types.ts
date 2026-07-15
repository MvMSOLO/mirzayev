import type { ComponentType } from "react";

/**
 * Shared contract for every optical-illusion visual shown in the "gipnos"
 * secret-terminal easter egg. Illusion components are pure, self-contained
 * visuals — no bilingual copy, no shared mutable state. All copy (title,
 * fixation instruction, suggested stare duration) lives centrally in
 * `registry.tsx`, owned by the main integration pass.
 */
export interface IllusionVisualProps {
  /** Extra classes merged onto the component's root element. */
  className?: string;
}

export type IllusionVisual = ComponentType<IllusionVisualProps>;

export interface IllusionDef {
  /** kebab-case, unique, matches the file name in src/components/illusions/. */
  id: string;
  title: { uz: string; en: string };
  /** The fixation instruction shown to the viewer, e.g. "Look at the center dot for 20s". */
  instruction: { uz: string; en: string };
  /** What (if anything) the viewer should notice happening. */
  effect: { uz: string; en: string };
  /** Suggested stare duration in seconds, used to drive the fixation ring countdown. */
  duration: number;
  Component: IllusionVisual;
}
