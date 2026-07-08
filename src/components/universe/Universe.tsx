import { UniverseNav } from "./Nav";
import { UniverseHero } from "./Hero";
import { UniverseManifesto } from "./Manifesto";
import { UniverseAbout } from "./About";
import { UniverseWhatIDo } from "./WhatIDo";
import { UniverseSkills } from "./Skills";
import { UniverseWorks } from "./Works";
import { UniversePhilosophy } from "./Philosophy";
import { UniverseInteractionLab } from "./InteractionLab";
import { UniverseFooter } from "./Footer";
import { MagneticCursor } from "./MagneticCursor";

export function Universe() {
  return (
    <main className="min-h-screen bg-[#F9F6F0] text-[#111] selection:bg-[#DFFF00] selection:text-[#111] overflow-x-hidden" style={{ fontFamily: '"Inter Tight", "Instrument Serif", serif' }}>
      <div className="hidden md:block">
        <MagneticCursor />
      </div>
      <UniverseNav />
      <div className="relative">
        <UniverseHero />
        <UniverseAbout />
        <UniverseWhatIDo />
        <UniverseSkills />
        <UniverseManifesto />
        <UniverseWorks />
        <UniversePhilosophy />
        <UniverseInteractionLab />
        <UniverseFooter />
      </div>
    </main>
  );
}
