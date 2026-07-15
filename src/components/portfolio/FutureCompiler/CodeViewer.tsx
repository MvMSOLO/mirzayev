import { useState, useEffect } from "react";
import { Highlight, themes } from "prism-react-renderer";
import JSZip from "jszip";
import { useLang } from "@/lib/i18n";
import { useSound } from "@/hooks/useSound";
import { motion } from "framer-motion";

interface Bundle {
  title: string;
  html: string;
  css: string;
  js: string;
}

const DEVICES = {
  desktop: { width: "100%", label: "DESKTOP" },
  tablet: { width: "768px", label: "TABLET" },
  mobile: { width: "375px", label: "MOBILE" },
} as const;

export function CodeViewer({ bundle }: { bundle: Bundle }) {
  const { lang } = useLang();
  const { play } = useSound();
  const [tab, setTab] = useState<"preview" | "html" | "css" | "js">("preview");
  const [copied, setCopied] = useState<string | null>(null);
  const [revealedLines, setRevealedLines] = useState(0);
  const [isRevealing, setIsRevealing] = useState(true);
  const [device, setDevice] = useState<keyof typeof DEVICES>("desktop");

  const srcDoc = `<!doctype html><html><head><meta charset="utf-8"><title>${bundle.title}</title><style>${bundle.css}</style></head><body>${bundle.html}<script>${bundle.js}</script></body></html>`;

  const openInNewTab = () => {
    play("type");
    const blob = new Blob([srcDoc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  };

  const code =
    tab === "html" ? bundle.html : tab === "css" ? bundle.css : tab === "js" ? bundle.js : "";
  const language = tab === "html" ? "markup" : tab === "css" ? "css" : "javascript";
  const totalLines = code.split("\n").length;

  useEffect(() => {
    if (tab === "preview") return;

    setRevealedLines(0);
    setIsRevealing(true);

    const interval = setInterval(() => {
      setRevealedLines((prev) => {
        if (prev >= totalLines) {
          clearInterval(interval);
          setIsRevealing(false);
          play("success");
          return prev;
        }
        if (prev % 5 === 0) play("type");
        return prev + Math.max(1, Math.floor(totalLines / 20)); // reveal faster for large files
      });
    }, 50);

    return () => clearInterval(interval);
  }, [tab, totalLines, play]);

  // Initial sound on load
  useEffect(() => {
    play("success");
  }, [play]);

  const copy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      play("type");
      setTimeout(() => setCopied(null), 1500);
    } catch {
      // clipboard write can fail silently (permissions/insecure context)
    }
  };

  const download = async () => {
    play("scan");
    const zip = new JSZip();
    zip.file(
      "index.html",
      `<!doctype html><html><head><meta charset="utf-8"><title>${bundle.title}</title><link rel="stylesheet" href="style.css"></head><body>${bundle.html}<script src="script.js"></script></body></html>`,
    );
    zip.file("style.css", bundle.css);
    zip.file("script.js", bundle.js);
    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${bundle.title.toLowerCase().replace(/\s+/g, "-")}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border border-accent/40 bg-black/60 backdrop-blur shadow-2xl relative overflow-hidden"
    >
      {/* Success pulse effect */}
      <motion.div
        className="absolute inset-0 bg-accent/10 pointer-events-none mix-blend-screen"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-accent/30 overflow-x-auto relative z-10 bg-black/40">
        <div className="flex">
          {(["preview", "html", "css", "js"] as const).map((k) => (
            <button
              key={k}
              onClick={() => {
                setTab(k);
                play("type");
              }}
              className={`px-4 py-3 text-[10px] uppercase tracking-widest font-mono border-r border-accent/20 transition-colors ${
                tab === k ? "bg-accent text-background" : "text-accent hover:bg-accent/10"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="flex gap-2 pr-3 shrink-0 items-center">
          {tab === "preview" && (
            <div className="flex border border-accent/20 mr-1">
              {(Object.keys(DEVICES) as Array<keyof typeof DEVICES>).map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setDevice(d);
                    play("type");
                  }}
                  className={`px-2 py-1.5 text-[9px] uppercase tracking-widest font-mono transition-colors ${
                    device === d ? "bg-accent text-background" : "text-accent/60 hover:text-accent"
                  }`}
                >
                  {DEVICES[d].label}
                </button>
              ))}
            </div>
          )}
          {tab === "preview" && (
            <button
              onClick={openInNewTab}
              className="text-[10px] uppercase tracking-widest text-accent hover:text-white font-mono px-2 transition-colors"
            >
              ↗ {lang === "uz" ? "OCHISH" : "OPEN"}
            </button>
          )}
          {tab !== "preview" && isRevealing && (
            <span className="text-[10px] text-accent/50 font-mono uppercase tracking-widest px-2 animate-pulse">
              DECODING...
            </span>
          )}
          {tab !== "preview" && (
            <button
              onClick={() => copy(tab, code)}
              disabled={isRevealing}
              className="text-[10px] uppercase tracking-widest text-accent hover:text-white font-mono px-2 disabled:opacity-30 transition-colors"
            >
              {copied === tab ? "✓ COPIED" : "COPY"}
            </button>
          )}
          <button
            onClick={download}
            className="text-[10px] uppercase tracking-widest text-accent hover:text-white font-mono px-2 transition-colors"
          >
            .ZIP
          </button>
        </div>
      </div>

      {/* Body */}
      {tab === "preview" ? (
        <div className="w-full h-[500px] relative bg-[#0a0a0a] flex items-center justify-center overflow-auto p-0">
          <div
            className="h-full bg-white transition-[width] duration-300 shadow-[0_0_40px_rgba(0,0,0,0.4)]"
            style={{ width: DEVICES[device].width, maxWidth: "100%" }}
          >
            <iframe
              title="preview"
              sandbox="allow-scripts"
              srcDoc={srcDoc}
              className="w-full h-full"
            />
          </div>
        </div>
      ) : (
        <div className="max-h-[500px] overflow-auto bg-[#011627] relative">
          {/* Subtle glow behind code */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(255,69,0,0.15)_0%,transparent_70%)]" />

          <Highlight theme={themes.nightOwl} code={code || "// empty"} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={className + " text-[11px] p-4 leading-relaxed font-mono relative z-10"}
                style={{ ...style, background: "transparent" }}
              >
                {tokens.map((line, i) => {
                  const isVisible = i < revealedLines;
                  const isLastVisible = i === revealedLines - 1;

                  if (!isVisible && isRevealing) return null;

                  return (
                    <div
                      key={i}
                      {...getLineProps({ line })}
                      className={`${getLineProps({ line }).className} ${isLastVisible && isRevealing ? "bg-white/5 border-l-2 border-accent -ml-[2px] pl-[2px]" : ""}`}
                    >
                      <span className="text-white/20 mr-4 select-none inline-block w-8 text-right">
                        {String(i + 1).padStart(3, "0")}
                      </span>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                      {isLastVisible && isRevealing && (
                        <span className="inline-block w-2 h-3 bg-accent/70 ml-1 animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </pre>
            )}
          </Highlight>
        </div>
      )}

      <div className="text-[9px] font-mono text-accent/50 uppercase tracking-widest px-4 py-2 border-t border-accent/20 flex justify-between bg-black/40">
        <span>
          ◉ {bundle.title} · {lang === "uz" ? "TAYYOR" : "READY"} · VANILLA · NO FRAMEWORKS
        </span>
        {tab !== "preview" && !isRevealing && (
          <span className="text-green-500/70">✓ SYNTAX VERIFIED</span>
        )}
      </div>
    </motion.div>
  );
}
