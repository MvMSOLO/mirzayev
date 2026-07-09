import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useSound } from "@/hooks/useSound";
import { useMagnetic } from "@/hooks/useMagnetic";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  primary?: boolean;
}

export function KineticButton({ children, onClick, href, className = "", primary }: Props) {
  const { playHover, playClick } = useSound();
  const ref = useMagnetic<any>(0.2);

  const shared = {
    ref,
    onMouseEnter: playHover,
    onClick: (e: any) => {
      playClick();
      onClick?.();
    },
    className: `group relative inline-flex items-center justify-center px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold transition-colors duration-300 ${
      primary
        ? "border border-accent/60 bg-accent/10 text-accent hover:bg-accent hover:text-background"
        : "border border-border bg-background text-white/70 hover:border-accent hover:text-accent"
    } ${className}`,
    style: { willChange: "transform" },
  };

  const inner = (
    <motion.span
      whileTap={{ scale: 0.9 }}
      className="flex items-center gap-4 w-full justify-center pointer-events-none"
    >
      {primary && (
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-50" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-current" />
        </span>
      )}
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        {...shared}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" {...shared}>
      {inner}
    </button>
  );
}
