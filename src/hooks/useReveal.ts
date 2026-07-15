import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useReveal<T extends HTMLElement = HTMLElement>(opts?: {
  y?: number;
  stagger?: number;
  selector?: string;
  once?: boolean;
}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);
    const targets = opts?.selector
      ? ref.current.querySelectorAll<HTMLElement>(opts.selector)
      : [ref.current];

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        // Offset +30% (40→52px) and duration +25% (1→1.25s): reveal reads clearly without feeling slow.
        y: opts?.y ?? 52,
        opacity: 0,
        duration: 1.25,
        ease: "expo.out",
        // Stagger widened ~30% so multi-element cascades (lists/grids) are more visible.
        stagger: opts?.stagger ?? 0.1,
        scrollTrigger: {
          trigger: ref.current!,
          start: "top 85%",
          toggleActions: opts?.once === false ? "play none none reverse" : "play none none none",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [opts?.y, opts?.stagger, opts?.selector, opts?.once]);

  return ref;
}
