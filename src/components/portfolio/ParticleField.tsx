import { useEffect, useRef } from "react";

interface P {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

// Spatial grid for O(n) nearest-neighbor lookup instead of O(n²)
const CELL = 75; // slightly larger than connection threshold √5000≈70.7

function buildGrid(pts: { x: number; y: number; s: number; a: number }[], W: number) {
  const cols = Math.ceil(W / CELL) + 2;
  const grid = new Map<number, number[]>();
  for (let i = 0; i < pts.length; i++) {
    const cx = Math.floor(pts[i].x / CELL);
    const cy = Math.floor(pts[i].y / CELL);
    const key = cx + cy * 10000;
    const bucket = grid.get(key);
    if (bucket) bucket.push(i);
    else grid.set(key, [i]);
  }
  return { grid, cols };
}

export function ParticleField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Skip canvas entirely on mobile — saves ~15ms of main-thread work on load
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile || reduced) {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const particles: P[] = [];
    // 60 particles: dense enough visually, ~33% fewer than before
    const COUNT = 60;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      for (let i = 0; i < COUNT; i++) {
        particles.push({
          x: (Math.random() - 0.5) * W,
          y: (Math.random() - 0.5) * H,
          z: Math.random() * 800 + 100,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          vz: -0.4 - Math.random() * 0.8,
        });
      }
    };

    resize();
    seed();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left - W / 2;
      mouse.current.y = e.clientY - rect.top - H / 2;
      mouse.current.active = true;
    };
    const onLeave = () => { mouse.current.active = false; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0 });
    io.observe(canvas);

    const draw = () => {
      if (!visible) { raf = requestAnimationFrame(draw); return; }

      ctx.fillStyle = "rgba(13,12,16,0.35)";
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2, cy = H / 2;
      const mx = mouse.current.active ? mouse.current.x * 0.0006 : 0;
      const my = mouse.current.active ? mouse.current.y * 0.0006 : 0;

      const pts: { x: number; y: number; s: number; a: number }[] = [];

      for (const p of particles) {
        p.z += p.vz;
        p.x += p.vx + mx * p.z;
        p.y += p.vy + my * p.z;
        if (p.z < 20) {
          p.z = 900;
          p.x = (Math.random() - 0.5) * W;
          p.y = (Math.random() - 0.5) * H;
        }
        const f = 400 / p.z;
        const sx = cx + p.x * f;
        const sy = cy + p.y * f;
        if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;
        const size = Math.max(0.4, (1 - p.z / 900) * 2.6);
        const alpha = Math.min(1, (1 - p.z / 900) * 1.4);
        pts.push({ x: sx, y: sy, s: size, a: alpha });
      }

      // Spatial grid: O(n) connections instead of O(n²)
      const { grid } = buildGrid(pts, W);
      ctx.strokeStyle = "rgba(255,69,0,0.35)";
      ctx.lineWidth = 0.4;

      for (let i = 0; i < pts.length; i++) {
        const gcx = Math.floor(pts[i].x / CELL);
        const gcy = Math.floor(pts[i].y / CELL);
        // Check only 9 neighboring cells
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const bucket = grid.get((gcx + dx) + (gcy + dy) * 10000);
            if (!bucket) continue;
            for (const j of bucket) {
              if (j <= i) continue; // avoid double-drawing
              const ddx = pts[i].x - pts[j].x;
              const ddy = pts[i].y - pts[j].y;
              const d2 = ddx * ddx + ddy * ddy;
              if (d2 < 5000) {
                ctx.globalAlpha = (1 - d2 / 5000) * 0.35 * Math.min(pts[i].a, pts[j].a);
                ctx.beginPath();
                ctx.moveTo(pts[i].x, pts[i].y);
                ctx.lineTo(pts[j].x, pts[j].y);
                ctx.stroke();
              }
            }
          }
        }
      }
      ctx.globalAlpha = 1;

      for (const p of pts) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
        if (p.s > 1.8) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(255,69,0,${p.a * 0.9})`;
          ctx.arc(p.x, p.y, p.s * 0.55, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`absolute inset-0 w-full h-full ${className}`} />;
}
