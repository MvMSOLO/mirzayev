import { useEffect, useRef } from "react";

export function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
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
      if (dotRef.current) dotRef.current.style.transform = `translate(${target.x}px, ${target.y}px)`;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${hover ? 1.8 : 1})`;
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
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[150] -ml-5 -mt-5 h-10 w-10 rounded-full border border-[#111]/40 mix-blend-difference hidden md:block transition-[transform] duration-300 ease-out"
        style={{ willChange: "transform" }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[150] -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#DFFF00] hidden md:block"
        style={{ willChange: "transform" }}
        aria-hidden
      />
    </>
  );
}
