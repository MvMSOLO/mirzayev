import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/lib/i18n";
import { UniverseProvider, useUniverse } from "@/lib/universe";
import { useLenis } from "@/hooks/useLenis";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { TechnicalOverlay } from "@/components/portfolio/TechnicalOverlay";
import { KineticCursor } from "@/components/portfolio/KineticCursor";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { PortalSwitcher } from "@/components/portfolio/PortalSwitcher";
import { UniverseTransition } from "@/components/UniverseTransition";
import { SecretConsole } from "@/components/secret/SecretConsole";
import { Universe } from "@/components/universe/Universe";
import { NeuralTimeline } from "@/components/portfolio/NeuralTimeline";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

// ─── Lazy-loaded below-fold components (code-split at route level) ────────────
const WhatIDo          = lazy(() => import("@/components/portfolio/WhatIDo").then(m => ({ default: m.WhatIDo })));
const SkillsMarquee    = lazy(() => import("@/components/portfolio/SkillsMarquee").then(m => ({ default: m.SkillsMarquee })));
const SkillsDetail     = lazy(() => import("@/components/portfolio/SkillsDetail").then(m => ({ default: m.SkillsDetail })));
const ToolkitGrid      = lazy(() => import("@/components/portfolio/ToolkitGrid").then(m => ({ default: m.ToolkitGrid })));
const AetherFlow       = lazy(() => import("@/components/portfolio/AetherFlow").then(m => ({ default: m.AetherFlow })));
const Work             = lazy(() => import("@/components/portfolio/Work").then(m => ({ default: m.Work })));
const ProjectShowroom  = lazy(() => import("@/components/portfolio/ProjectShowroom").then(m => ({ default: m.ProjectShowroom })));
const FutureCompiler   = lazy(() => import("@/components/portfolio/FutureCompiler").then(m => ({ default: m.FutureCompiler })));
const InteractiveLab   = lazy(() => import("@/components/portfolio/InteractiveLabPlayground").then(m => ({ default: m.InteractiveLabPlayground })));
const Philosophy       = lazy(() => import("@/components/portfolio/Philosophy").then(m => ({ default: m.Philosophy })));
const LabLog           = lazy(() => import("@/components/portfolio/LabLog").then(m => ({ default: m.LabLog })));
const Updates          = lazy(() => import("@/components/portfolio/Updates").then(m => ({ default: m.Updates })));
const ParallelContact  = lazy(() => import("@/components/portfolio/ParallelContact").then(m => ({ default: m.ParallelContact })));
const Contact          = lazy(() => import("@/components/portfolio/Contact").then(m => ({ default: m.Contact })));

export const Route = createFileRoute("/")({
  component: Index,
});

/**
 * Defers mounting until the section is within 300px of the viewport.
 *
 * Uses `content-visibility: auto` + `contain-intrinsic-size` so the browser
 * reserves approximate layout space even before the section mounts, preventing
 * Cumulative Layout Shift (CLS) from sections popping in as the user scrolls.
 */
function LazySection({
  children,
  minHeight = "600px",
}: {
  children: ReactNode;
  minHeight?: string;
}) {
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

  const style: CSSProperties = mounted
    ? {}
    : {
        contentVisibility: "auto" as CSSProperties["contentVisibility"],
        containIntrinsicSize: `0 ${minHeight}`,
      };

  return (
    <div ref={ref} style={style}>
      {mounted ? (
        <Suspense fallback={null}>{children}</Suspense>
      ) : null}
    </div>
  );
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
          {/* Below-fold: mount + code-split only when near viewport */}
          <LazySection minHeight="700px"><WhatIDo /></LazySection>
          <LazySection minHeight="220px"><SkillsMarquee /></LazySection>
          <LazySection minHeight="800px"><SkillsDetail /></LazySection>
          <LazySection minHeight="600px"><ToolkitGrid /></LazySection>
          <LazySection minHeight="320px"><AetherFlow /></LazySection>
          <LazySection minHeight="900px"><Work /></LazySection>
          <LazySection minHeight="700px"><ProjectShowroom /></LazySection>
          <LazySection minHeight="900px"><FutureCompiler /></LazySection>
          <LazySection minHeight="900px"><InteractiveLab /></LazySection>
          <LazySection minHeight="600px"><Philosophy /></LazySection>
          <LazySection minHeight="700px"><LabLog /></LazySection>
          <LazySection minHeight="500px"><Updates /></LazySection>
          <LazySection minHeight="700px"><ParallelContact /></LazySection>
          <LazySection minHeight="500px"><Contact /></LazySection>
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
