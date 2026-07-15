import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  prompt: z.string().min(3).max(4000),
});

const Bundle = z.object({
  title: z.string().min(1).max(120),
  html: z.string().min(1),
  css: z.string().default(""),
  js: z.string().default(""),
});

type BundleT = z.infer<typeof Bundle>;

const SYSTEM_PROMPT = `You are FUTURE COMPILER — a 2035-era AI design engineer that outputs ONLY vanilla HTML, CSS, and JavaScript. NO frameworks. NO libraries. NO external CDN references, fonts, or images (everything must be self-contained: CSS gradients/shapes instead of images, system font stacks, inline SVG if icons are needed).

Return STRICT JSON and NOTHING else, exactly matching this shape:
{"title":"short site title","html":"...","css":"...","js":"..."}

Content rules:
- "html" is ONLY the contents that go inside <body> — semantic elements (header/main/section/footer), real copy relevant to the prompt, no lorem ipsum. No <html>/<head>/<style>/<script> wrapper tags.
- "css" is a complete, modern, production-grade stylesheet: use CSS custom properties for a coherent color system, a deliberate type scale, generous intentional spacing, responsive layout (flexbox/grid + media queries for mobile), and thoughtful hover/focus states. Pick a real color palette suited to the prompt's mood — never leave it plain black-on-white.
- "js" is plain vanilla ES6+ (no imports) that adds real interactivity relevant to the content (smooth scroll, toggle states, simple animations via requestAnimationFrame/CSS classes, form handling, etc.) — never empty filler, but only what's genuinely useful.
- Add tasteful micro-interactions: transitions on hover/focus, subtle entrance animations (CSS @keyframes or IntersectionObserver-triggered classes), never gratuitous.
- Design like a senior product designer: strong visual hierarchy, consistent spacing scale, restrained but deliberate accent color, real typography pairing (system font stacks are fine), accessible contrast.
- Keep total output under 14000 characters combined.
- No comments explaining anything, no markdown fences. Just the JSON object.`;

async function callOpenRouter(key: string, prompt: string, retryHint?: string) {
  const messages: Array<{ role: "system" | "user"; content: string }> = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: prompt },
  ];
  if (retryHint) {
    messages.push({ role: "user", content: retryHint });
  }

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "cohere/north-mini-code:free",
      messages,
      temperature: 0.8,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    if (res.status === 429) throw new Error("Rate limit reached. Try again in a moment.");
    if (res.status === 402) throw new Error("AI credits exhausted. Add credits to continue.");
    throw new Error(`AI error ${res.status}: ${text.slice(0, 200)}`);
  }

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return json.choices?.[0]?.message?.content ?? "{}";
}

function parseBundle(content: string): BundleT | null {
  let raw = content.trim();
  // Strip markdown code fences if the model added them anyway.
  raw = raw.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "");
  try {
    const result = Bundle.safeParse(JSON.parse(raw));
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export const compileWebsite = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) throw new Error("Missing OPENROUTER_API_KEY");

    const content = await callOpenRouter(key, data.prompt);
    let bundle = parseBundle(content);

    // One retry with a corrective nudge if the model returned malformed JSON.
    if (!bundle) {
      const retryContent = await callOpenRouter(
        key,
        data.prompt,
        "Your previous reply was not valid JSON matching the required shape. Reply again with ONLY the raw JSON object — no prose, no markdown fences.",
      );
      bundle = parseBundle(retryContent);
    }

    if (!bundle) {
      throw new Error("The AI returned an unexpected response. Try rephrasing your prompt.");
    }

    return bundle;
  });
