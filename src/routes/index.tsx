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

export const Route = createFileRoute("/")({
  component: Index,
});

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
          <TechnicalOverlay />
          <Nav />
          <Hero />
          <About />
          <WhatIDo />
          <SkillsMarquee />
          <SkillsDetail />
          <ToolkitGrid />
          <AetherFlow />
          <Work />
          <ProjectShowroom />
          <FutureCompiler />
          <Philosophy />
          <LabLog />
          <Updates />
          <ParallelContact />
          <Contact />
        </main>
      ) : (
        <Universe />
      )}
      <UniverseTransition />
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
