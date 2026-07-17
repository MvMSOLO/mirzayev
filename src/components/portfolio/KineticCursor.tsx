import { useEffect, useRef } from "react";

const TRAIL_LEN = 8;

export function KineticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const histX = useRef<number[]>(Array(TRAIL_LEN).fill(0));
  const histY = useRef<number[]>(Array(TRAIL_LEN).fill(0));

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    histX.current.fill(cx);
    histY.current.fill(cy);

    const target = { x: cx, y: cy };
    const pos = { x: cx, y: cy };
    const ringPos = { x: cx, y: cy };
    let raf = 0;
    let hover = false;
    let clicking = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement | null;
      hover = !!el?.closest("a,button,[data-cursor]");
      // Shift trail — pure array mutation, zero React re-renders
      for (let i = TRAIL_LEN - 1; i > 0; i--) {
        histX.current[i] = histX.current[i - 1];
        histY.current[i] = histY.current[i - 1];
      }
      histX.current[0] = e.clientX;
      histY.current[0] = e.clientY;
    };
    const onDown = () => { clicking = true; };
    const onUp = () => { clicking = false; };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.25;
      pos.y += (target.y - pos.y) * 0.25;
      ringPos.x += (target.x - ringPos.x) * 0.1;
      ringPos.y += (target.y - ringPos.y) * 0.1;

      if (cursorRef.current) {
        const scale = clicking ? 0.7 : hover ? 0.5 : 1;
        cursorRef.current.style.transform = `translate(${pos.x}px,${pos.y}px) scale(${scale}) rotate(${hover ? 45 : 0}deg)`;
      }
      if (ringRef.current) {
        const scale = hover ? 2 : clicking ? 0.8 : 1;
        ringRef.current.style.transform = `translate(${ringPos.x}px,${ringPos.y}px) scale(${scale})`;
        ringRef.current.style.opacity = hover ? "0.6" : "0.3";
      }

      // Update trail dots directly — no React state, no re-renders
      const refs = trailRefs.current;
      const xs = histX.current;
      const ys = histY.current;
      for (let i = 0; i < TRAIL_LEN; i++) {
        const el = refs[i];
        if (!el) continue;
        const sz = 2 + i * 0.5;
        el.style.transform = `translate(${xs[i]}px,${ys[i]}px) translate(-50%,-50%)`;
        el.style.opacity = String(((i + 1) / TRAIL_LEN) * 0.25);
        el.style.width = `${sz}px`;
        el.style.height = `${sz}px`;
      }

      raf = requestAnimationFrame(loop);
    };

    // Hide the native cursor — KineticCursor replaces it
    document.body.classList.add("kinetic-cursor-active");

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("kinetic-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* Trail dots — pre-rendered, zero React re-renders, updated via DOM refs in rAF */}
      {Array.from({ length: TRAIL_LEN }, (_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          className="pointer-events-none fixed top-0 left-0 z-[148] rounded-full bg-accent hidden md:block"
          aria-hidden
        />
      ))}

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[149] -ml-5 -mt-5 h-10 w-10 hidden md:block rounded-full border border-accent/30 transition-[opacity] duration-200"
        style={{ willChange: "transform" }}
        aria-hidden
      />

      {/* Main crosshair cursor */}
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
    </>
  );
}
