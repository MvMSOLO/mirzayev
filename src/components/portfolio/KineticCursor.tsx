import { useEffect, useRef } from "react";

export function KineticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let raf = 0;
    let hover = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement | null;
      hover = !!el?.closest("a,button,[data-cursor]");
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${hover ? 1.5 : 1}) rotate(${hover ? 45 : 0}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[150] -ml-4 -mt-4 h-8 w-8 hidden md:flex items-center justify-center transition-[transform] duration-75 mix-blend-difference"
      style={{ willChange: "transform" }}
      aria-hidden
    >
      <div className="absolute w-full h-[1px] bg-accent/80" />
      <div className="absolute h-full w-[1px] bg-accent/80" />
      <div className="absolute w-1.5 h-1.5 bg-accent rounded-full" />
    </div>
  );
}
