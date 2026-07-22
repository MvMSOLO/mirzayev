import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let installed = false;

export function useLenis() {
  useEffect(() => {
    if (installed) return;
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    installed = true;
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.55,          // 0.82 dan kamaytirish: footer tezroq
      smoothWheel: true,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 3.8,    // mobil uchun ancha tez
      wheelMultiplier: 1.8,    // mouse wheel ham tez
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    // Subtle scroll sound feedback using native scroll event
    let scrollTimeout: ReturnType<typeof setTimeout>;
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) > 80) {
        lastY = y;
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {}, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
      installed = false;
    };
  }, []);
}
