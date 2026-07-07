import { createFileRoute } from "@tanstack/react-router";
import { LangProvider } from "@/lib/i18n";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { WhatIDo } from "@/components/portfolio/WhatIDo";
import { SkillsMarquee } from "@/components/portfolio/SkillsMarquee";
import { SkillsDetail } from "@/components/portfolio/SkillsDetail";
import { Work } from "@/components/portfolio/Work";
import { AetherFlow } from "@/components/portfolio/AetherFlow";
import { Philosophy } from "@/components/portfolio/Philosophy";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <LangProvider>
      <main className="min-h-screen bg-background text-foreground font-mono">
        <Nav />
        <Hero />
        <About />
        <WhatIDo />
        <SkillsMarquee />
        <SkillsDetail />
        <AetherFlow />
        <Work />
        <Philosophy />
        <Contact />
      </main>
    </LangProvider>
  );
}
