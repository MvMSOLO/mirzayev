import { useRef, type MouseEvent, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  primary?: boolean;
}

export function LiquidButton({ children, onClick, href, className = "", primary }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.setProperty("--mx", `${x * 0.35}px`);
    el.style.setProperty("--my", `${y * 0.35}px`);
    el.style.setProperty("--sx", `${1 + Math.abs(x) / r.width * 0.12}`);
    el.style.setProperty("--sy", `${1 + Math.abs(y) / r.height * 0.12}`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
    el.style.setProperty("--sx", "1");
    el.style.setProperty("--sy", "1");
  };

  const inner = (
    <span
      className={`relative inline-flex items-center justify-center px-8 py-4 rounded-full border transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        primary ? "border-[#111] bg-[#111] text-[#F9F6F0] hover:bg-[#DFFF00] hover:text-[#111] hover:border-[#DFFF00]" : "border-[#111]/40 text-[#111] hover:border-[#111]"
      }`}
      style={{
        transform: "translate(var(--mx,0), var(--my,0)) scale(var(--sx,1), var(--sy,1))",
        transformOrigin: "center",
      }}
    >
      <span className="italic text-lg" style={{ fontFamily: '"Instrument Serif", serif' }}>{children}</span>
      <span className="ml-3 h-2 w-2 rounded-full bg-current opacity-70" />
    </span>
  );

  const shared = {
    ref: ref as never,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: `inline-block ${className}`,
  };

  if (href) return <a href={href} {...shared}>{inner}</a>;
  return <button onClick={onClick} {...shared}>{inner}</button>;
}
