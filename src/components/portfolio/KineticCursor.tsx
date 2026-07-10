import { useEffect, useRef, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export function KineticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    const ringPos = { ...target };
    let raf = 0;
    let hover = false;
    let clicking = false;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement | null;
      hover = !!el?.closest("a,button,[data-cursor]");

      // Add trail point
      idRef.current++;
      const id = idRef.current;
      setTrail((prev) => {
        const next = [...prev, { x: e.clientX, y: e.clientY, id }];
        return next.slice(-8); // keep last 8 points
      });
    };

    const onDown = () => { clicking = true; };
    const onUp = () => { clicking = false; };

    const loop = () => {
      // Main cursor - fast follow
      pos.x += (target.x - pos.x) * 0.25;
      pos.y += (target.y - pos.y) * 0.25;

      // Ring - slower follow
      ringPos.x += (target.x - ringPos.x) * 0.1;
      ringPos.y += (target.y - ringPos.y) * 0.1;

      if (cursorRef.current) {
        const scale = clicking ? 0.7 : hover ? 0.5 : 1;
        cursorRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${scale}) rotate(${hover ? 45 : 0}deg)`;
      }

      if (ringRef.current) {
        const scale = hover ? 2 : clicking ? 0.8 : 1;
        ringRef.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) scale(${scale})`;
        ringRef.current.style.opacity = hover ? "0.6" : "0.3";
      }

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {trail.map((point, i) => (
        <div
          key={point.id}
          className="pointer-events-none fixed top-0 left-0 z-[148] rounded-full bg-accent hidden md:block"
          style={{
            width: `${2 + i * 0.5}px`,
            height: `${2 + i * 0.5}px`,
            transform: `translate(${point.x}px, ${point.y}px) translate(-50%, -50%)`,
            opacity: (i + 1) / trail.length * 0.25,
            transition: "opacity 0.1s",
          }}
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
