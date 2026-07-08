import { UniverseNav } from "./Nav";
import { UniverseHero } from "./Hero";
import { UniverseManifesto } from "./Manifesto";
import { UniverseWorks } from "./Works";
import { UniverseInteractionLab } from "./InteractionLab";
import { UniverseFooter } from "./Footer";
import { MagneticCursor } from "./MagneticCursor";

export function Universe() {
  return (
    <main className="min-h-screen bg-[#F9F6F0] text-[#111] cursor-none md:cursor-none" style={{ fontFamily: '"Inter Tight", "Instrument Serif", serif' }}>
      <MagneticCursor />
      <UniverseNav />
      <UniverseHero />
      <UniverseManifesto />
      <UniverseWorks />
      <UniverseInteractionLab />
      <UniverseFooter />
    </main>
  );
}
