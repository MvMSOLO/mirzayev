import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="relative min-h-screen bg-[#0a090c] text-white flex flex-col items-center justify-center px-6 overflow-hidden font-mono">
      {/* Grid backgrounds */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dots opacity-[0.08] pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/[0.07] rounded-full blur-[150px] pointer-events-none" />

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-accent/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-accent/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-accent/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-accent/30" />

      {/* Status badge */}
      <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.3em] text-accent/70 mb-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
        </span>
        SYS_ERROR // ROUTE_NOT_FOUND
      </div>

      {/* 404 display */}
      <div className="relative select-none mb-2">
        <span className="font-display text-[160px] md:text-[240px] leading-none text-white/[0.04] tracking-tighter block">
          404
        </span>
        <span
          className="absolute inset-0 font-display text-[160px] md:text-[240px] leading-none text-accent/20 tracking-tighter flex items-center justify-center"
          style={{ animation: "glitch-1 3.5s linear infinite", clipPath: "inset(0 0 85% 0)" }}
          aria-hidden
        >
          404
        </span>
      </div>

      <p className="text-[var(--cyan)] text-[10px] tracking-[0.3em] uppercase mb-4 -mt-2">
        SIGNAL_LOST // NODE_OFFLINE
      </p>
      <p className="text-white/40 text-sm mb-12 max-w-[38ch] text-center leading-relaxed font-sans">
        The route you're looking for doesn't exist in this system.
      </p>

      <Link
        to="/"
        className="group relative inline-flex items-center gap-3 px-8 py-4 border border-accent/60 bg-accent/10 text-accent uppercase tracking-[0.2em] text-xs font-bold hover:bg-accent hover:text-[#0a090c] transition-all duration-300"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-50" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-current" />
        </span>
        Return to System
      </Link>

      {/* Version footer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] text-white/20 uppercase tracking-[0.3em] whitespace-nowrap">
        KINETIC_LAB · v6.0.0 · EXPERIMENTAL
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="relative min-h-screen bg-[#0a090c] text-white flex flex-col items-center justify-center px-6 overflow-hidden font-mono">
      {/* Grid backgrounds */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dots opacity-[0.08] pointer-events-none" />

      {/* Ambient glow — cyan for errors, different from 404 accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--cyan)]/[0.05] rounded-full blur-[140px] pointer-events-none" />

      {/* Corner brackets */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-[var(--cyan)]/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t border-r border-[var(--cyan)]/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b border-l border-[var(--cyan)]/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-[var(--cyan)]/30" />

      {/* Status badge */}
      <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.3em] text-[var(--cyan)]/70 mb-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--cyan)] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--cyan)]" />
        </span>
        CRITICAL_FAULT // SYSTEM_EXCEPTION
      </div>

      {/* Error display */}
      <div className="relative select-none mb-6">
        <span className="font-display text-[100px] md:text-[160px] leading-none text-white/[0.04] tracking-tighter block text-center">
          ERR
        </span>
      </div>

      <p className="text-[var(--cyan)] text-[10px] tracking-[0.3em] uppercase mb-3">
        RENDER_FAILED // RECOVERY_AVAILABLE
      </p>
      <p className="text-white/40 text-sm mb-10 max-w-[40ch] text-center leading-relaxed font-sans">
        Something went wrong in the system. You can try restarting the process or return to base.
      </p>

      {/* Error detail (collapsed) */}
      {error?.message && (
        <details className="mb-10 max-w-[50ch] text-center">
          <summary className="text-[10px] text-white/30 uppercase tracking-[0.2em] cursor-pointer hover:text-white/50 transition-colors">
            View error details
          </summary>
          <pre className="mt-3 text-[10px] text-accent/70 bg-black/40 border border-white/10 rounded p-4 text-left overflow-auto max-h-32 leading-relaxed">
            {error.message}
          </pre>
        </details>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="inline-flex items-center gap-3 px-8 py-4 border border-[var(--cyan)]/60 bg-[var(--cyan)]/10 text-[var(--cyan)] uppercase tracking-[0.2em] text-xs font-bold hover:bg-[var(--cyan)] hover:text-[#0a090c] transition-all duration-300"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-50" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-current" />
          </span>
          Restart Process
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-3 px-8 py-4 border border-white/20 bg-white/5 text-white/60 uppercase tracking-[0.2em] text-xs font-bold hover:border-white/40 hover:text-white transition-all duration-300"
        >
          Return to Base
        </a>
      </div>

      {/* Version footer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[9px] text-white/20 uppercase tracking-[0.3em] whitespace-nowrap">
        KINETIC_LAB · v6.0.0 · EXPERIMENTAL
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Avazbek Mirzayev — Full-Stack Developer & UI Designer" },
      {
        name: "description",
        content:
          "Portfolio of Avazbek Mirzayev — 16-year-old full-stack developer, UI/UX designer, AI enthusiast and content creator from Olmaliq, Uzbekistan.",
      },
      { name: "author", content: "Avazbek Mirzayev" },
      { property: "og:title", content: "Avazbek Mirzayev — Full-Stack Developer & UI Designer" },
      {
        property: "og:description",
        content:
          "Portfolio of Avazbek Mirzayev — 16-year-old full-stack developer, UI/UX designer, AI enthusiast and content creator from Olmaliq, Uzbekistan.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@mvmsolo" },
      { name: "twitter:title", content: "Avazbek Mirzayev — Full-Stack Developer & UI Designer" },
      {
        name: "twitter:description",
        content:
          "Portfolio of Avazbek Mirzayev — 16-year-old full-stack developer, UI/UX designer, AI enthusiast and content creator from Olmaliq, Uzbekistan.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4417bf41-fddd-4ae4-b980-6cdbdc1cf524/id-preview-7c68e531--be31eb19-65ea-476c-9523-cacbbc7f7050.lovable.app-1783438766439.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4417bf41-fddd-4ae4-b980-6cdbdc1cf524/id-preview-7c68e531--be31eb19-65ea-476c-9523-cacbbc7f7050.lovable.app-1783438766439.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Cormorant+Garamond:ital,wght@0,400;1,400;1,600&family=Inter+Tight:wght@300;400;500;600&display=optional",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&family=Cormorant+Garamond:ital,wght@0,400;1,400;1,600&family=Inter+Tight:wght@300;400;500;600&display=optional",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* Skip-to-content for keyboard / screen-reader users */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-accent focus:text-white focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:font-bold focus:rounded-sm focus:shadow-lg"
        >
          Skip to content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
