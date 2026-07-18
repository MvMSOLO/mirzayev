import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SecretTerminal } from "./SecretTerminal";
import { GipnosGallery } from "./GipnosGallery";
import { RobloxStudioIDE } from "@/components/studio";

/** Hidden command-terminal easter egg, mounted once at the app shell level. */
export function SecretConsole() {
  const [gipnosOpen, setGipnosOpen] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);

  return (
    <>
      <SecretTerminal
        onGipnos={() => setGipnosOpen(true)}
        onRobloxStudio={() => setStudioOpen(true)}
      />
      <GipnosGallery open={gipnosOpen} onClose={() => setGipnosOpen(false)} />

      <AnimatePresence>
        {studioOpen && (
          <RobloxStudioIDE onClose={() => setStudioOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
