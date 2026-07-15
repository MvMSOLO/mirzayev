import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  prompt: z.string().min(3).max(4000),
});

export const compileWebsite = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.OPENROUTER_API_KEY;
    if (!key) throw new Error("Missing OPENROUTER_API_KEY");

    const system = `You are FUTURE COMPILER — a 2035-era AI that outputs ONLY vanilla HTML, CSS, and JavaScript. NO frameworks. NO libraries. NO external CDN references. Return STRICT JSON exactly matching this shape:
{"title":"short site title","html":"<!doctype html> ...","css":"...","js":"..."}
Rules:
- html must be a complete standalone document that links inline to the css and js via <style> and <script>… wait, actually keep html WITHOUT <style>/<script> tags — the viewer will inject them separately. So html should have <body> content, semantic elements, and can contain <link>-less inline style references via class names defined in css.
- css must be modern, elegant, dark-mode aware, with real typography and layout.
- js must be plain vanilla ES6+ that runs in a sandboxed iframe.
- Keep total output under 8000 characters.
- No comments explaining anything. Just code.`;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "cohere/north-mini-code:free",
        messages: [
          { role: "system", content: system },
          { role: "user", content: data.prompt },
        ],
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
    const content = json.choices?.[0]?.message?.content ?? "{}";
    let parsed: { title?: string; html?: string; css?: string; js?: string };
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = {};
    }
    return {
      title: parsed.title ?? "Untitled",
      html: parsed.html ?? "<h1>Empty</h1>",
      css: parsed.css ?? "",
      js: parsed.js ?? "",
    };
  });
