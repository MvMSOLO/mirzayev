import { cn } from "@/lib/utils";

export function PenroseStairsIllusion({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative w-full h-full overflow-hidden bg-[#f5f5f0] flex items-center justify-center",
        className,
      )}
    >
      <svg
        viewBox="0 0 400 400"
        width="min(88%, 480px)"
        height="min(88%, 480px)"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/*
          Penrose Stairs (Schroeder staircase / impossible loop).
          Drawn in isometric-style axonometric projection.
          4 flights of stairs, each turning 90°, forming a closed impossible loop.
          Each step has: top face (lightest), front face (mid), side face (darkest).
          Colors: top=#e8e8e0, front=#a0a098, side=#606058
        */}

        {/* ── FLIGHT 1: bottom-left, ascending right ── */}
        <polygon points="50,280 110,245 150,268 90,303" fill="#e8e8e0" />
        <polygon points="50,280 90,303 90,318 50,295" fill="#606058" />
        <polygon points="90,303 150,268 150,283 90,318" fill="#a0a098" />

        <polygon points="90,260 150,225 190,248 130,283" fill="#e8e8e0" />
        <polygon points="90,260 130,283 130,298 90,275" fill="#606058" />
        <polygon points="130,283 190,248 190,263 130,298" fill="#a0a098" />

        <polygon points="130,240 190,205 230,228 170,263" fill="#e8e8e0" />
        <polygon points="130,240 170,263 170,278 130,255" fill="#606058" />
        <polygon points="170,263 230,228 230,243 170,278" fill="#a0a098" />

        <polygon points="170,220 230,185 270,208 210,243" fill="#e8e8e0" />
        <polygon points="170,220 210,243 210,258 170,235" fill="#606058" />
        <polygon points="210,243 270,208 270,223 210,258" fill="#a0a098" />

        {/* ── FLIGHT 2: bottom-right, ascending left (rotated 90°) ── */}
        <polygon points="270,208 310,231 310,191 270,168" fill="#e8e8e0" />
        <polygon points="270,208 270,168 285,160 285,200" fill="#606058" />
        <polygon points="270,168 310,191 285,200 285,160" fill="#a0a098" />

        <polygon points="290,198 330,221 330,181 290,158" fill="#e8e8e0" />
        <polygon points="290,198 290,158 305,150 305,190" fill="#606058" />
        <polygon points="290,158 330,181 305,190 305,150" fill="#a0a098" />

        <polygon points="310,188 350,211 350,171 310,148" fill="#e8e8e0" />
        <polygon points="310,188 310,148 325,140 325,180" fill="#606058" />
        <polygon points="310,148 350,171 325,180 325,140" fill="#a0a098" />

        <polygon points="330,178 370,201 370,161 330,138" fill="#e8e8e0" />
        <polygon points="330,178 330,138 345,130 345,170" fill="#606058" />
        <polygon points="330,138 370,161 345,170 345,130" fill="#a0a098" />

        {/* ── FLIGHT 3: top-right, descending left ── */}
        <polygon points="230,108 270,85 310,108 270,131" fill="#e8e8e0" />
        <polygon points="230,108 270,131 270,146 230,123" fill="#606058" />
        <polygon points="270,131 310,108 310,123 270,146" fill="#a0a098" />

        <polygon points="210,120 250,97 290,120 250,143" fill="#e8e8e0" />
        <polygon points="210,120 250,143 250,158 210,135" fill="#606058" />
        <polygon points="250,143 290,120 290,135 250,158" fill="#a0a098" />

        <polygon points="190,132 230,109 270,132 230,155" fill="#e8e8e0" />
        <polygon points="190,132 230,155 230,170 190,147" fill="#606058" />
        <polygon points="230,155 270,132 270,147 230,170" fill="#a0a098" />

        <polygon points="170,144 210,121 250,144 210,167" fill="#e8e8e0" />
        <polygon points="170,144 210,167 210,182 170,159" fill="#606058" />
        <polygon points="210,167 250,144 250,159 210,182" fill="#a0a098" />

        {/* ── FLIGHT 4: top-left, descending right ── */}
        <polygon points="50,228 90,205 130,228 90,251" fill="#e8e8e0" />
        <polygon points="50,228 90,251 90,266 50,243" fill="#606058" />
        <polygon points="90,251 130,228 130,243 90,266" fill="#a0a098" />

        <polygon points="50,248 90,225 130,248 90,271" fill="#e8e8e0" />
        <polygon points="50,248 90,271 90,286 50,263" fill="#606058" />
        <polygon points="90,271 130,248 130,263 90,286" fill="#a0a098" />

        <polygon points="50,268 90,245 130,268 90,291" fill="#e8e8e0" />
        <polygon points="50,268 90,291 90,306 50,283" fill="#606058" />
        <polygon points="90,291 130,268 130,283 90,306" fill="#a0a098" />

        {/* Closing connector steps that sell the impossible loop */}
        <polygon points="50,228 110,193 150,216 90,251" fill="#e8e8e0" />
        <polygon points="50,228 90,251 90,266 50,243" fill="#606058" />

        <polygon points="170,144 170,220 130,243 130,167" fill="#e8e8e0" />
        <polygon points="130,243 130,167 145,159 145,235" fill="#606058" />
      </svg>
    </div>
  );
}
