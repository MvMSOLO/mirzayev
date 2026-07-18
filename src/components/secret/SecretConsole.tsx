import { useState } from "react";
import { SecretTerminal } from "./SecretTerminal";
import { GipnosGallery } from "./GipnosGallery";

/** Hidden command-terminal easter egg, mounted once at the app shell level. */
export function SecretConsole() {
  const [gipnosOpen, setGipnosOpen] = useState(false);

  return (
    <>
      <SecretTerminal onGipnos={() => setGipnosOpen(true)} />
      <GipnosGallery open={gipnosOpen} onClose={() => setGipnosOpen(false)} />
    </>
  );
}
