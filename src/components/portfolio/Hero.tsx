import { useLang } from "@/lib/i18n";
import { ParticleField } from "./ParticleField";
import { HeroRails } from "./HeroRails";
import { motion, type Variants } from "framer-motion";
import { WordReveal, RevealBox, BlurReveal } from "./TextReveal";
import { useSound } from "@/hooks/useSound";
import { useEffect, useState, useRef, memo } from "react";
import { Cpu, Zap, Activity, Sliders, Play, Square, Terminal } from "lucide-react";

export const Hero = memo(function Hero() {
  const { t, lang } = useLang();
  const { playHover, playClick, playSynthesis } = useSound();

  // Quantum Cyber Console State
  const [cpuLoad, setCpuLoad] = useState(30);
  const [temp, setTemp] = useState(42);
  const [logs, setLogs] = useState<string[]>([
    "// QUANTUM SYSTEM V6.12.0 INITIALIZED",
    "// NEURAL INTERFACE STATUS: CONNECTED",
    "// READY FOR HUMAN COMMAND INPUT...",
  ]);
  const [waveOffset, setWaveOffset] = useState(0);

  // Smooth ticking for simulated CPU load variation
  useEffect(() => {
    const id = setInterval(() => {
      setCpuLoad((prev) => {
        const delta = Math.floor(Math.random() * 7 - 3);
        const next = Math.max(10, Math.min(95, prev + delta));
        return next;
      });
    }, 2500);
    return () => clearInterval(id);
  }, []);

  // Update temperature based on CPU load
  useEffect(() => {
    setTemp(Math.floor(35 + (cpuLoad / 100) * 45));
  }, [cpuLoad]);

  // Sine Wave movement loop
  useEffect(() => {
    let animId = 0;
    const animateWave = () => {
      setWaveOffset((prev) => (prev + 0.15) % (Math.PI * 2));
      animId = requestAnimationFrame(animateWave);
    };
    animId = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Trigger sound feedback when sliding CPU slider
  const handleSliderChange = (val: number) => {
    setCpuLoad(val);
    if (Math.random() > 0.8) {
      playSynthesis(Math.floor(Math.random() * 12)); // Satisfying synth chime on drag
    }
    const timeStr = new Date().toLocaleTimeString().split(" ")[0];
    setLogs((prev) => [
      ...prev.slice(-3),
      `[${timeStr}] LOAD MANUAL_SET: ${val}% (TEMP: ${Math.floor(35 + (val / 100) * 45)}°C)`,
    ]);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22, scale: 0.97, filter: "blur(9px)" },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.62,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Generate interactive wave path for graph HUD
  const getWavePath = () => {
    const points = [];
    const amp = 8 + (cpuLoad / 100) * 22; // higher load = bigger waves!
    const freq = 0.05 + (cpuLoad / 100) * 0.05; // higher load = higher frequency!
    for (let x = 0; x <= 220; x += 4) {
      const y = 30 + Math.sin(x * freq + waveOffset) * amp;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(" L ")}`;
  };

  return (
    <section
      id="top"
      className="relative pt-24 md:pt-40 pb-16 md:pb-32 overflow-hidden border-b border-white/[0.06] min-h-[95vh] flex flex-col justify-center bg-atmosphere-dual"
    >
      <ParticleField className="opacity-80" />
      <HeroRails />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background pointer-events-none" />

      {/* Top marquee */}
      <div className="absolute -top-10 left-0 whitespace-nowrap flex pointer-events-none select-none">
        <div className="flex animate-marquee shrink-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[140px] md:text-[220px] leading-none uppercase pr-10 opacity-[0.04]"
            >
              {t("hero.marquee")}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="absolute bottom-8 left-0 whitespace-nowrap flex pointer-events-none select-none">
        <div className="flex animate-marquee-reverse shrink-0">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="font-display text-[100px] md:text-[180px] leading-none uppercase pr-10 opacity-[0.03] text-accent"
            >
              KINETIC LAB · KINETIC LAB · KINETIC LAB ·
            </span>
          ))}
        </div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [-6, 6, -6], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-12 hidden lg:flex flex-col items-center gap-1 text-[8px] font-mono text-[var(--cyan)]/40 uppercase tracking-widest pointer-events-none"
      >
        <span>SYS</span>
        <div className="w-px h-8 bg-[var(--cyan)]/20" />
        <span>ONLINE</span>
      </motion.div>

      <motion.div
        animate={{ y: [5, -5, 5], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-1/3 right-24 hidden lg:block text-[8px] font-mono text-white/20 uppercase tracking-widest pointer-events-none"
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-[var(--cyan)]/60 rounded-full animate-pulse" />
          <span>AI READY</span>
        </div>
      </motion.div>

      {/* Corner accent elements */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-32 right-8 md:right-16 lg:right-32 pointer-events-none"
      >
        <div className="relative w-16 h-16">
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent/40" />
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="absolute top-1 right-1 w-2 h-2 bg-[var(--cyan)]/40 rounded-full"
          />
        </div>
      </motion.div>

      <motion.div
        className="px-5 md:px-20 lg:px-32 relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* LEFT COLUMN: Hero content info */}
          <div className="space-y-8">
            {/* Chip */}
            <motion.div
              variants={itemVariants}
              className="inline-block bg-gradient-to-r from-accent to-[#ff7700] px-5 py-2.5 mb-2 relative group cursor-default shadow-glow-orange border border-white/10 backdrop-blur-sm rounded-sm"
              onMouseEnter={playHover}
            >
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/50" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/50" />
              <div className="absolute inset-0 animate-shimmer opacity-50 pointer-events-none" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] relative z-10 text-white drop-shadow-md">
                {t("hero.chip")}
              </span>
            </motion.div>

            {/* Name */}
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] uppercase leading-[0.82] tracking-tighter mb-6">
              <span className="relative group inline-block">
                <WordReveal text={t("hero.first")} sound />
                {/* Glitch layers on hover */}
                <span
                  className="absolute inset-0 font-display text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] uppercase leading-[0.82] tracking-tighter text-accent opacity-0 group-hover:opacity-100 pointer-events-none select-none drop-shadow-[0_0_20px_rgba(255,69,0,0.8)]"
                  style={{
                    animation: "glitch-1 0.4s linear infinite",
                    clipPath: "inset(0 0 90% 0)",
                  }}
                >
                  {t("hero.first")}
                </span>
              </span>{" "}
              <br />
              <span
                className="relative group inline-block"
                style={{
                  background: "linear-gradient(155deg, #ff8a4c 0%, #ff4500 40%, #c41e00 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <WordReveal text={t("hero.last")} delay={0.2} />
                {/* Subtle glow behind gradient text */}
                <span
                  className="absolute inset-0 blur-[30px] opacity-40 pointer-events-none"
                  style={{
                    background: "linear-gradient(155deg, #ff8a4c, #ff4500)",
                    WebkitTextFillColor: "initial",
                  }}
                />
              </span>
            </h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="max-w-[40ch] text-base md:text-xl text-white/80 leading-relaxed font-sans font-light"
            >
              {t("hero.sub")}
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-5 text-[11px] uppercase tracking-[0.2em] text-white/50 font-bold"
            >
              <span className="text-[var(--cyan)]">{t("hero.scroll")}</span>
              <div className="relative h-12 w-px bg-white/10 overflow-hidden">
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-[var(--cyan)] to-transparent"
                />
              </div>
              <span>{t("hero.est")}</span>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Quantum Cyber Console Widget */}
          <motion.div
            variants={itemVariants}
            className="w-full relative glass-dark border-gradient-cyan rounded-2xl p-7 shadow-glow-cyan overflow-hidden"
          >
            {/* Tech scanner bar inside the widget */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--cyan)] to-transparent shadow-[0_0_15px_var(--cyan)] animate-[scan-y_4s_linear_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan)]/5 to-transparent pointer-events-none" />

            {/* Header banner */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-5 relative z-10">
              <div className="flex items-center gap-3">
                <div className="size-2.5 bg-[var(--cyan)] rounded-full animate-ping" />
                <span className="font-mono text-[10px] text-[var(--cyan)] font-bold tracking-widest uppercase drop-shadow-[0_0_5px_rgba(0,212,255,0.8)]">
                  QUANTUM_CYBER_CONSOLE // V6.12
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[9px] text-white/40 font-semibold">
                <Activity className="size-3.5 text-[var(--cyan)] animate-pulse" />
                <span>REALTIME CORE SYNCED</span>
              </div>
            </div>

            {/* Main Interactive Screen with Wave & Cooling Fan */}
            <div className="grid grid-cols-[1fr_110px] gap-5 mb-6 items-center glass-card border border-white/10 rounded-xl p-5 relative z-10 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)]">
              {/* SVG Live Wave HUD */}
              <div className="h-20 flex flex-col justify-between relative overflow-hidden">
                <span className="font-mono text-[9px] text-white/40 tracking-widest uppercase font-semibold">
                  WAVEFORM ANALYSIS: <span className="text-[var(--cyan)]">{cpuLoad}% LOAD</span>
                </span>
                <svg className="w-full h-12" viewBox="0 0 220 60" preserveAspectRatio="none">
                  <path
                    d={getWavePath()}
                    fill="none"
                    stroke="var(--cyan)"
                    strokeWidth="2"
                    style={{ filter: "drop-shadow(0 0 6px rgba(0, 212, 255, 0.6))" }}
                  />
                  {/* Subtle static grid crosslines in background */}
                  <line x1="55" y1="0" x2="55" y2="60" stroke="rgba(255,255,255,0.05)" />
                  <line x1="110" y1="0" x2="110" y2="60" stroke="rgba(255,255,255,0.05)" />
                  <line x1="165" y1="0" x2="165" y2="60" stroke="rgba(255,255,255,0.05)" />
                </svg>
              </div>

              {/* Dynamic Cooling Fan Vector (Speed scales with CPU load!) */}
              <div className="flex flex-col items-center justify-center gap-2 border-l border-white/10 pl-5">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: Math.max(0.18, 2.5 - (cpuLoad / 100) * 2.3),
                  }}
                  className="w-14 h-14 flex items-center justify-center text-[var(--cyan)] drop-shadow-[0_0_10px_rgba(0,212,255,0.4)]"
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="8 6" />
                    <circle cx="50" cy="50" r="12" />
                    <path d="M50,15 C45,28 40,38 50,38 C60,38 55,28 50,15 Z" />
                    <path d="M50,85 C45,72 40,62 50,62 C60,62 55,72 50,85 Z" />
                    <path d="M15,50 C28,45 38,40 38,50 C38,60 28,55 15,50 Z" />
                    <path d="M85,50 C72,45 62,40 62,50 C62,60 72,55 85,50 Z" />
                  </svg>
                </motion.div>
                <span className="font-mono text-[8px] text-white/50 uppercase tracking-widest text-center font-bold">
                  FAN: {temp > 60 ? <span className="text-accent">MAX_COOL</span> : "OPTIMAL"}
                </span>
              </div>
            </div>

            {/* Slider Engine Controls */}
            <div className="space-y-3 mb-6 relative z-10">
              <div className="flex justify-between font-mono text-[10px] text-white/60 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Sliders className="size-3.5 text-accent" />
                  CPU OVERCLOCK FREQUENCY
                </span>
                <span className="text-accent font-bold drop-shadow-[0_0_5px_rgba(255,69,0,0.8)]">
                  {(3.2 + (cpuLoad / 100) * 5.3).toFixed(2)} GHz ({temp}°C)
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 blur-sm rounded-full" />
                <input
                  type="range"
                  min="10"
                  max="95"
                  step="1"
                  value={cpuLoad}
                  onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                  className="w-full h-2 bg-black/50 border border-white/10 rounded-lg appearance-none cursor-pointer accent-accent relative z-10"
                />
              </div>
            </div>

            {/* Core Processor Trigger Matrix */}
            <div className="space-y-3 mb-6 relative z-10">
              <span className="font-mono text-[9px] text-white/50 tracking-[0.2em] uppercase block font-semibold flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-accent/50 rounded-full" />
                // SYSTEM CORE TRIGGER GRID
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <button
                    key={i}
                    onMouseEnter={playHover}
                    onClick={() => {
                      playSynthesis(24 + (i % 10));
                      const timeStr = new Date().toLocaleTimeString().split(" ")[0];
                      setLogs((prev) => [
                        ...prev.slice(-3),
                        `[${timeStr}] SYNAPSE CORE_0${i + 1} SIGNAL_EMITTED`,
                      ]);
                    }}
                    className="p-2.5 border border-white/10 bg-white/5 hover:border-accent hover:bg-accent/15 transition-all font-mono text-[10px] text-white/50 hover:text-white font-bold flex flex-col items-center justify-center cursor-pointer rounded-md shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_0_15px_rgba(255,69,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                  >
                    <span className="text-[7px] opacity-50 mb-0.5 text-[var(--cyan)]">NODE</span>
                    C0{i + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Floating Live Ticker Console */}
            <div className="border border-white/10 bg-black/60 rounded-xl p-4 font-mono text-[10px] text-[var(--cyan)]/90 space-y-1.5 max-h-28 overflow-y-auto leading-relaxed select-none shadow-[inset_0_5px_15px_rgba(0,0,0,0.8)] relative z-10">
              <div className="flex items-center gap-2 border-b border-[var(--cyan)]/20 pb-2 mb-2">
                <Terminal className="size-3.5 text-[var(--cyan)]" />
                <span className="text-[var(--cyan)] uppercase tracking-[0.2em] text-[9px] font-bold">
                  HOLOGRAPHIC_PROCESS_STREAM
                </span>
              </div>
              {logs.map((log, i) => (
                <div key={i} className="truncate tracking-wide drop-shadow-[0_0_2px_rgba(0,212,255,0.5)]">
                  {log}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Animated corner brackets that appear on load */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 1.2 }}
        className="absolute bottom-12 left-5 md:left-20 lg:left-32 pointer-events-none"
      >
        <motion.div
          animate={{ width: ["0%", "100%"] }}
          transition={{ delay: 2.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-[2px] bg-gradient-to-r from-accent to-transparent w-32"
        />
      </motion.div>
    </section>
  );
});