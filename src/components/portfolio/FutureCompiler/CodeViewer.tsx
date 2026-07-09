import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import JSZip from "jszip";
import { useLang } from "@/lib/i18n";

interface Bundle {
  title: string;
  html: string;
  css: string;
  js: string;
}

export function CodeViewer({ bundle }: { bundle: Bundle }) {
  const { lang } = useLang();
  const [tab, setTab] = useState<"preview" | "html" | "css" | "js">("preview");
  const [copied, setCopied] = useState<string | null>(null);

  const srcDoc = `<!doctype html><html><head><meta charset="utf-8"><title>${bundle.title}</title><style>${bundle.css}</style></head><body>${bundle.html}<script>${bundle.js}<\/script></body></html>`;

  const copy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    } catch {}
  };

  const download = async () => {
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

  const code =
    tab === "html" ? bundle.html : tab === "css" ? bundle.css : tab === "js" ? bundle.js : "";
  const language = tab === "html" ? "markup" : tab === "css" ? "css" : "javascript";

  return (
    <div className="border border-accent/40 bg-black/60 backdrop-blur">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-accent/30 overflow-x-auto">
        <div className="flex">
          {(["preview", "html", "css", "js"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`px-4 py-3 text-[10px] uppercase tracking-widest font-mono border-r border-accent/20 transition-colors ${
                tab === k ? "bg-accent text-background" : "text-accent hover:bg-accent/10"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <div className="flex gap-2 pr-3 shrink-0">
          {tab !== "preview" && (
            <button
              onClick={() => copy(tab, code)}
              className="text-[10px] uppercase tracking-widest text-accent hover:text-white font-mono px-2"
            >
              {copied === tab ? "✓ COPIED" : "COPY"}
            </button>
          )}
          <button
            onClick={download}
            className="text-[10px] uppercase tracking-widest text-accent hover:text-white font-mono px-2"
          >
            .ZIP
          </button>
        </div>
      </div>

      {/* Body */}
      {tab === "preview" ? (
        <iframe
          title="preview"
          sandbox="allow-scripts"
          srcDoc={srcDoc}
          className="w-full h-[500px] bg-white"
        />
      ) : (
        <div className="max-h-[500px] overflow-auto">
          <Highlight theme={themes.nightOwl} code={code || "// empty"} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={className + " text-[11px] p-4 leading-relaxed"}
                style={{ ...style, background: "transparent" }}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    <span className="text-white/20 mr-4 select-none">
                      {String(i + 1).padStart(3, "0")}
                    </span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      )}

      <div className="text-[9px] font-mono text-accent/50 uppercase tracking-widest px-4 py-2 border-t border-accent/20">
        ◉ {bundle.title} · {lang === "uz" ? "TAYYOR" : "READY"} · VANILLA · NO FRAMEWORKS
      </div>
    </div>
  );
}
