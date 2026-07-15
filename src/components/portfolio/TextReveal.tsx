import { motion } from "framer-motion";
import { useSound } from "@/hooks/useSound";
import { useEffect, useRef, useState } from "react";

// Shared easing — fast exponential out (snappy but not stiff)
const EXPO = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 480, damping: 34 } as const;

export function WordReveal({
  text,
  className = "",
  delay = 0,
  sound = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  sound?: boolean;
}) {
  const { playReveal } = useSound();
  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8%" }}
      onViewportEnter={() => sound && playReveal()}
      variants={{
        // Stagger +29% (0.014→0.018s) so the word-by-word cascade reads more distinctly.
        visible: { transition: { staggerChildren: 0.018, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-[0.1em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "108%", opacity: 0, rotateZ: 2, scale: 0.97 },
              visible: {
                y: "0%",
                opacity: 1,
                rotateZ: 0,
                scale: 1,
                // Duration +25% (0.52→0.65s): headline words settle in with a touch more weight.
                transition: { duration: 0.65, ease: EXPO },
              },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function RevealBox({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      // Offset +33% (18→24px) and duration +25% (0.52→0.65s): more noticeable entrance on scroll.
      initial={{ opacity: 0, y: 24, scale: 0.995 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.65, ease: EXPO, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ClipReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", opacity: 0 }}
      whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.78, ease: EXPO, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Blur-to-clear reveal */
export function BlurReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.75, ease: EXPO, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Slide-from-direction reveal */
export function SlideReveal({
  children,
  className = "",
  delay = 0,
  direction = "left",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up";
}) {
  const initial =
    direction === "left"
      ? { opacity: 0, x: -46 }
      : direction === "right"
        ? { opacity: 0, x: 46 }
        : { opacity: 0, y: 46 };
  const animate =
    direction === "left" || direction === "right" ? { opacity: 1, x: 0 } : { opacity: 1, y: 0 };
  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.65, ease: EXPO, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Scale-in with spring physics */
export function ScaleReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.78, rotateX: 10 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ ...SPRING, opacity: { duration: 0.35 }, delay }}
      className={className}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

/** Animated number counter */
export function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 1.1,
  className = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const startTime = performance.now();
          const step = (now: number) => {
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(end);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, started]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

/** Character-by-character glitch reveal — faster iteration */
export function GlitchReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  const [displayed, setDisplayed] = useState(text.split("").map(() => "·"));
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let intervalId: ReturnType<typeof setInterval>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          timeoutId = setTimeout(() => {
            let iteration = 0;
            intervalId = setInterval(() => {
              setDisplayed(
                text.split("").map((letter, i) => {
                  if (i < iteration) return letter;
                  if (letter === " ") return " ";
                  return chars[Math.floor(Math.random() * chars.length)];
                }),
              );
              if (iteration >= text.length) clearInterval(intervalId);
              iteration += 0.7; // faster resolution
            }, 22); // was 30ms
          }, delay * 1000);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, delay, started]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {displayed.join("")}
    </span>
  );
}
