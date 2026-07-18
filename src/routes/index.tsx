import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/lib/i18n";
import { UniverseProvider, useUniverse } from "@/lib/universe";
import { useLenis } from "@/hooks/useLenis";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { WhatIDo } from "@/components/portfolio/WhatIDo";
import { SkillsMarquee } from "@/components/portfolio/SkillsMarquee";
import { SkillsDetail } from "@/components/portfolio/SkillsDetail";
import { Work } from "@/components/portfolio/Work";
import { AetherFlow } from "@/components/portfolio/AetherFlow";
import { TechnicalOverlay } from "@/components/portfolio/TechnicalOverlay";
import { Philosophy } from "@/components/portfolio/Philosophy";
import { Contact } from "@/components/portfolio/Contact";
import { LabLog } from "@/components/portfolio/LabLog";
import { ToolkitGrid } from "@/components/portfolio/ToolkitGrid";
import { FutureCompiler } from "@/components/portfolio/FutureCompiler";
import { ProjectShowroom } from "@/components/portfolio/ProjectShowroom";
import { ParallelContact } from "@/components/portfolio/ParallelContact";
import { Updates } from "@/components/portfolio/Updates";
import { Universe } from "@/components/universe/Universe";
import { UniverseTransition } from "@/components/UniverseTransition";
import { KineticCursor } from "@/components/portfolio/KineticCursor";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { InteractiveLabPlayground } from "@/components/portfolio/InteractiveLabPlayground";
import { NeuralTimeline } from "@/components/portfolio/NeuralTimeline";
import { SecretConsole } from "@/components/secret/SecretConsole";
import { PortalSwitcher } from "@/components/portfolio/PortalSwitcher";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

/** Defer mounting until the element is near the viewport.
 *  SSR-safe: renders nothing on the server (Suspense boundary not needed),
 *  then activates on the client when scrolled into view (rootMargin: 300px).
 */
function LazySection({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{mounted ? children : null}</div>;
}

function Shell() {
  const { mode } = useUniverse();
  useLenis();
  return (
    <>
      {mode === "kinetic" ? (
        <main className="min-h-screen bg-background text-foreground font-mono relative overflow-hidden">
          <ScrollProgress />
          <KineticCursor />
          <div className="fixed inset-0 bg-grid-blueprint opacity-[0.03] pointer-events-none" />
          <div className="fixed inset-0 bg-grid-dots opacity-[0.1] pointer-events-none" />
          <div className="fixed inset-0 bg-grid-fine pointer-events-none" />
          {/* Film grain noise texture — adds cinematic texture depth */}
          <div
            className="fixed inset-0 pointer-events-none z-[200] opacity-[0.035] animate-grain"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "256px 256px",
            }}
          />
          <TechnicalOverlay />
          <Nav />
          {/* Above-fold: load immediately */}
          <Hero />
          <About />
          <NeuralTimeline />
          {/* Below-fold: mount only when near viewport */}
          <LazySection><WhatIDo /></LazySection>
          <LazySection><SkillsMarquee /></LazySection>
          <LazySection><SkillsDetail /></LazySection>
          <LazySection><ToolkitGrid /></LazySection>
          <LazySection><AetherFlow /></LazySection>
          <LazySection><Work /></LazySection>
          <LazySection><ProjectShowroom /></LazySection>
          <LazySection><FutureCompiler /></LazySection>
          <LazySection><InteractiveLabPlayground /></LazySection>
          <LazySection><Philosophy /></LazySection>
          <LazySection><LabLog /></LazySection>
          <LazySection><Updates /></LazySection>
          <LazySection><ParallelContact /></LazySection>
          <LazySection><Contact /></LazySection>
        </main>
      ) : (
        <Universe />
      )}
      <UniverseTransition />
      <PortalSwitcher />
      <SecretConsole />
    </>
  );
}

function Index() {
  return (
    <LangProvider>
      <UniverseProvider>
        <Shell />
      </UniverseProvider>
    </LangProvider>
  );
}
