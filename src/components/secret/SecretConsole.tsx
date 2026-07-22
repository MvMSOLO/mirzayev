import { useState } from "react";
import { SecretTerminal } from "./SecretTerminal";
import { GipnosGallery } from "./GipnosGallery";
import { ScriptsHub } from "./ScriptsHub";

/** Hidden command-terminal easter egg, mounted once at the app shell level. */
export function SecretConsole() {
  const [gipnosOpen, setGipnosOpen] = useState(false);
  const [scriptsOpen, setScriptsOpen] = useState(false);

  return (
    <>
      <SecretTerminal
        onGipnos={() => setGipnosOpen(true)}
        onScripts={() => setScriptsOpen(true)}
      />
      <GipnosGallery open={gipnosOpen} onClose={() => setGipnosOpen(false)} />
      <ScriptsHub open={scriptsOpen} onClose={() => setScriptsOpen(false)} />
    </>
  );
}
