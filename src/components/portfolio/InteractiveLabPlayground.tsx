/* eslint-disable @typescript-eslint/no-explicit-any, prefer-const */
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useSound } from "@/hooks/useSound";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Square,
  Music,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronRight,
  RefreshCw,
  Layers,
  Sliders,
  Activity,
} from "lucide-react";

interface Preset {
  id: number;
  name: { uz: string; en: string };
  desc: { uz: string; en: string };
}

const PRESETS: Preset[] = [
  {
    id: 1,
    name: { uz: "Suyuqlik Oqimi (Flow Field)", en: "Fluid Flow Field" },
    desc: {
      uz: "Matematik oqim maydonida suzuvchi rasm va zarrachalar.",
      en: "Floating vector particles swirling through sinusoidal fields.",
    },
  },
  {
    id: 2,
    name: { uz: "Elastik Blueprint Tarmoq (Elastic Grid)", en: "Elastic Blueprint Grid" },
    desc: {
      uz: "Sichqonchadan qochadigan va tortiladigan kordinata kataklari.",
      en: "Coordinate grid crosses warping dynamically based on cursor mass.",
    },
  },
  {
    id: 3,
    name: { uz: "Portlovchi Tipografiya (Shatter)", en: "Shattered Typography" },
    desc: {
      uz: "Matnni bo'laklarga sochib yuboradigan va qayta yig'adigan fizik kuchlar.",
      en: "Explodes text into physics debris which then satisfies gravity.",
    },
  },
  {
    id: 4,
    name: { uz: "Gravitatsion Girdob (Vortex)", en: "Gravitational Vortex" },
    desc: {
      uz: "Markaziy qora tuynuk atrofida aylanuvchi yulduzlar tizimi.",
      en: "Concentric rings of space stars spiraling into a dynamic center.",
    },
  },
  {
    id: 5,
    name: { uz: "Magnit Tugunlar (Magnetic Network)", en: "Magnetic Node Network" },
    desc: {
      uz: "Bir-biri bilan chiziqlar orqali bog'lanuvchi erkin elektronlar.",
      en: "Translucent nodes floating and bonding with lines based on proximity.",
    },
  },
  {
    id: 6,
    name: { uz: "Raqamli Matrix Yomg'iri (Matrix)", en: "Digital Matrix Rain" },
    desc: {
      uz: "Kaskadli yashil neon raqamlar va kod oqimi.",
      en: "Cascading streams of green binary code dripping down columns.",
    },
  },
  {
    id: 7,
    name: { uz: "Kvant Chigalligi (Quantum Entanglement)", en: "Quantum Entanglement" },
    desc: {
      uz: "Kursor bosilganda vibratsiya beruvchi kvant iplari.",
      en: "Spawned orbit nodes linked with interactive vibrating physical strings.",
    },
  },
  {
    id: 8,
    name: { uz: "Fraktal Daraxt (Fractal Tree)", en: "Generative Fractal Tree" },
    desc: {
      uz: "Shamol ta'sirida tebranuvchi va barg to'kuvchi matematik daraxt.",
      en: "Recursive branching tree swaying dynamically in sinusoidal winds.",
    },
  },
  {
    id: 9,
    name: { uz: "Suyuq Shisha Pufaklar (Liquid Metaballs)", en: "Liquid Glass Bubbles" },
    desc: {
      uz: "Bir-biri bilan qo'shilib ketadigan elastik suyuq sharchalar.",
      en: "Elastic floating bubbles merging together on contact with glass gradients.",
    },
  },
  {
    id: 10,
    name: { uz: "Live Ovoz To'lqini (Soundwave Ripples)", en: "Soundwave Spectrum Ripples" },
    desc: {
      uz: "Musiqa to'lqinlari va kursor bosilishiga javob beruvchi konsentrik tebranishlar.",
      en: "Audio-reactive spectrum circles rippling with synthesized sounds.",
    },
  },
  {
    id: 11,
    name: { uz: "Simmetrik Kaleydoskop (Kaleidoscope)", en: "Symmetric Kaleidoscope" },
    desc: {
      uz: "Sichqoncha bilan simmetrik neon naqshlar chizish laboratoriyasi.",
      en: "Interactive drawing board mirroring strokes in 8 radial axes.",
    },
  },
  {
    id: 12,
    name: { uz: "3D Kinetic Globus (3D Globe)", en: "3D Kinetic Globe" },
    desc: {
      uz: "Sichqoncha bilan aylantiriladigan 3D nuqtali matrisa.",
      en: "Projected 3D wireframe globe rotating in vector computer space.",
    },
  },
  {
    id: 13,
    name: { uz: "Konvey Hayot O'yini (Game of Life)", en: "Cellular Game of Life" },
    desc: {
      uz: "Hujayralar evolutsiyasi algoritmi. Chizish va kuzatish mumkin.",
      en: "Classic cellular automata grid evolving and allowing custom draws.",
    },
  },
  {
    id: 14,
    name: { uz: "Xromatik Aberratsiya (Aberration Lens)", en: "Chromatic Aberration Lens" },
    desc: {
      uz: "Kursor atrofidagi rang qatlamlarini bo'lib yuboradigan optik linza.",
      en: "Interactive mouse lens splitting red, green and blue channels underneath.",
    },
  },
  {
    id: 15,
    name: { uz: "Garmonik Mayatniklar (Pendulums)", en: "Harmonic Pendulums" },
    desc: {
      uz: "Sinusoidal oqim hosil qiluvchi aylanma mayatniklar zanjiri.",
      en: "Row of hanging swinging spheres tracing beautiful sine contours.",
    },
  },
  {
    id: 16,
    name: { uz: "Lorenz Xaos Atraktori (Lorenz Chaos)", en: "Chaos Lorenz Attractor" },
    desc: {
      uz: "Matematik xaos tenglamasining uch o'lchamli cheksiz chizig'i.",
      en: "Mesmerizing infinite light ribbon tracing a 3D chaos equation.",
    },
  },
  {
    id: 17,
    name: { uz: "Elastik Fizik Arqon (Spring Rope)", en: "Spring Physics Rope" },
    desc: {
      uz: "Sichqoncha bilan ushlab silkitiladigan elastik prujinali zanjir.",
      en: "Dangling rope made of spring nodes that can be whipped with momentum.",
    },
  },
  {
    id: 18,
    name: { uz: "Voronoy Mozaikasi (Voronoi Cells)", en: "Voronoi Mosaic Cells" },
    desc: {
      uz: "Erkin nuqtalar orqali shakllanuvchi interaktiv geometrik kataklar.",
      en: "Splitting Voronoi cellular partitions updating with mouse vectors.",
    },
  },
  {
    id: 19,
    name: { uz: "Cheksiz Tunnel (Hyperspace Warp)", en: "Hyperspace Warp Tunnel" },
    desc: {
      uz: "Koinot tunnelidan o'ta yuqori tezlikda uchish simulyatsiyasi.",
      en: "Racing through a infinite tunnel of stars, speed increases on drag.",
    },
  },
  {
    id: 20,
    name: { uz: "L-Tizim G'unchasi (L-System Bloom)", en: "L-System Organic Bloom" },
    desc: {
      uz: "Matematik formulalar yordamida o'suvchi spiralsimon geometriya.",
      en: "Procedural recursive growth tracing fractal spirals that swell.",
    },
  },
  {
    id: 21,
    name: { uz: "Izometrik Bloklar (Isometric Voxel Grid)", en: "Isometric Voxel Grid" },
    desc: {
      uz: "Kursor masofasiga qarab ko'tariladigan va tushadigan 3D bloklar.",
      en: "Isometric grid terrain rising and falling like waves under the mouse.",
    },
  },
];

export function InteractiveLabPlayground() {
  const { lang } = useLang();
  const {
    playHover,
    playClick,
    playSynthesis,
    startGenerativeAmbient,
    stopGenerativeAmbient,
    isAmbientActive,
    isMuted,
    toggleMute,
  } = useSound();

  const [activePreset, setActivePreset] = useState<Preset>(PRESETS[0]);
  const [activeSoundTab, setActiveSoundTab] = useState<"piano" | "scifi" | "arcade" | "ux">(
    "piano",
  );
  const [ambientLoopPlaying, setAmbientLoopPlaying] = useState(false);
  const [canvasEnergy, setCanvasEnergy] = useState(0);

  // ADSR Sound Synthesis Console state
  const [attack, setAttack] = useState(0.2);
  const [decay, setDecay] = useState(0.35);
  const [sustain, setSustain] = useState(0.6);
  const [release, setRelease] = useState(0.45);
  const [lfoRate, setLfoRate] = useState(6.0);
  const [lfoDepth, setLfoDepth] = useState(40);
  const [waveShape, setWaveShape] = useState<"sine" | "triangle" | "square" | "sawtooth">(
    "sawtooth",
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    px: -1000,
    py: -1000,
    isDown: false,
    vx: 0,
    vy: 0,
  });
  const presetStateRef = useRef<any>({});
  const animationFrameRef = useRef<number | null>(null);

  // Sync ambient loop state
  useEffect(() => {
    setAmbientLoopPlaying(isAmbientActive());
  }, [isAmbientActive]);

  // Track canvas mouse coordinates
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const mouse = mouseRef.current;
    mouse.vx = x - mouse.x;
    mouse.vy = y - mouse.y;
    mouse.px = mouse.x;
    mouse.py = mouse.y;
    mouse.x = x;
    mouse.y = y;
  };

  const handleMouseDown = () => {
    mouseRef.current.isDown = true;
    setCanvasEnergy(1.0);
    playSynthesis(44); // Trigger bubble pop on canvas click
  };

  const handleMouseUp = () => {
    mouseRef.current.isDown = false;
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
    mouseRef.current.isDown = false;
  };

  // Sound board triggers
  const handleTriggerSound = (idx: number) => {
    playSynthesis(idx);
    setCanvasEnergy(1.0); // Send sound wave energy to canvas!
  };

  // Toggle background loop
  const handleToggleAmbient = () => {
    playClick();
    if (ambientLoopPlaying) {
      stopGenerativeAmbient();
      setAmbientLoopPlaying(false);
    } else {
      startGenerativeAmbient();
      setAmbientLoopPlaying(true);
    }
  };

  // Dynamic ADSR graphic path calculations
  const getAdsrPath = () => {
    const startX = 10;
    const startY = 85;

    // Scale Attack, Decay, Sustain, Release into beautiful pixel coordinate points
    const attX = startX + attack * 60;
    const attY = 15; // Peak level (inverse coordinates)

    const decX = attX + decay * 60;
    const decY = startY - sustain * 70; // Sustain level

    const susX = decX + 50; // Horizontal line for sustain duration
    const susY = decY;

    const relX = susX + release * 60;
    const relY = startY; // Back to zero level

    return `M ${startX} ${startY} L ${attX} ${attY} L ${decX} ${decY} L ${susX} ${susY} L ${relX} ${relY}`;
  };

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = Math.max(380, parent.clientHeight);
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize preset state
    presetStateRef.current = {};
    const mouse = mouseRef.current;
    const preset = activePreset.id;

    // --- PRESET INITIALIZATION LOGIC ---
    if (preset === 1) {
      // Flow Field
      const particles: any[] = [];
      for (let i = 0; i < 200; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 0,
          speed: 1 + Math.random() * 2,
          color: `hsl(${15 + Math.random() * 30}, 100%, 55%)`,
        });
      }
      presetStateRef.current = { particles };
    } else if (preset === 2) {
      // Elastic grid
      const gridPoints: any[] = [];
      const spacing = 30;
      for (let x = spacing; x < canvas.width; x += spacing) {
        for (let y = spacing; y < canvas.height; y += spacing) {
          gridPoints.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
        }
      }
      presetStateRef.current = { gridPoints };
    } else if (preset === 3) {
      // Shatter Typography
      const particles: any[] = [];
      const text = lang === "uz" ? "KINETIK LAB" : "CYBER LAB";
      ctx.font = "bold 50px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      const step = 8;
      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          const alphaIdx = (y * canvas.width + x) * 4 + 3;
          if (data[alphaIdx] > 128) {
            particles.push({
              ox: x,
              oy: y,
              x: x + (Math.random() * 40 - 20),
              y: y + (Math.random() * 40 - 20),
              vx: 0,
              vy: 0,
              size: 2 + Math.random() * 3,
            });
          }
        }
      }
      presetStateRef.current = { particles };
    } else if (preset === 4) {
      // Vortex
      const particles: any[] = [];
      for (let i = 0; i < 300; i++) {
        particles.push({
          angle: Math.random() * Math.PI * 2,
          distance: 50 + Math.random() * 250,
          speed: 0.005 + Math.random() * 0.015,
          size: 1 + Math.random() * 2,
          color: `hsl(${350 + Math.random() * 30}, 100%, 60%)`,
        });
      }
      presetStateRef.current = { particles, cx: canvas.width / 2, cy: canvas.height / 2 };
    } else if (preset === 5) {
      // Magnetic Network
      const nodes: any[] = [];
      for (let i = 0; i < 75; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() * 2 - 1) * 0.5,
          vy: (Math.random() * 2 - 1) * 0.5,
          radius: 2 + Math.random() * 2,
        });
      }
      presetStateRef.current = { nodes };
    } else if (preset === 6) {
      // Matrix
      const cols = Math.floor(canvas.width / 15);
      const drops: number[] = [];
      for (let i = 0; i < cols; i++) {
        drops[i] = Math.random() * -30;
      }
      presetStateRef.current = { drops };
    } else if (preset === 7) {
      // Quantum Entanglement
      presetStateRef.current = { nodes: [], strings: [] };
    } else if (preset === 8) {
      // Fractal Tree
      presetStateRef.current = { windAngle: 0, leaves: [] };
    } else if (preset === 9) {
      // Metaballs
      const balls: any[] = [];
      for (let i = 0; i < 15; i++) {
        balls.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() * 2 - 1) * 1.5,
          vy: (Math.random() * 2 - 1) * 1.5,
          radius: 30 + Math.random() * 40,
        });
      }
      presetStateRef.current = { balls };
    } else if (preset === 11) {
      // Kaleidoscope
      presetStateRef.current = { points: [] };
    } else if (preset === 10) {
      // Soundwave Spectrum
      presetStateRef.current = { ringScale: 1.0 };
    } else if (preset === 12) {
      // 3D Globe
      const globePoints: any[] = [];
      const total = 180;
      for (let i = 0; i < total; i++) {
        const theta = Math.acos(Math.random() * 2 - 1);
        const phi = Math.random() * Math.PI * 2;
        const r = 140;
        globePoints.push({
          x: r * Math.sin(theta) * Math.cos(phi),
          y: r * Math.sin(theta) * Math.sin(phi),
          z: r * Math.cos(theta),
        });
      }
      presetStateRef.current = { globePoints, rx: 0, ry: 0 };
    } else if (preset === 13) {
      // Game of life
      const size = 12;
      const rows = Math.ceil(canvas.height / size);
      const cols = Math.ceil(canvas.width / size);
      const grid = Array(cols)
        .fill(0)
        .map(() => Array(rows).fill(0));
      // randomize some initial cells
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          if (Math.random() < 0.22) grid[x][y] = 1;
        }
      }
      presetStateRef.current = { grid, rows, cols, cellSize: size, tickCount: 0 };
    } else if (preset === 14) {
      // Chromatic Lens
      presetStateRef.current = { lensRadius: 100 };
    } else if (preset === 15) {
      // Pendulums
      const count = 12;
      const pendulums: any[] = [];
      for (let i = 0; i < count; i++) {
        pendulums.push({
          length: 120 + i * 15,
          angle: 0.5,
          speed: 0.015 + (count - i) * 0.002,
        });
      }
      presetStateRef.current = { pendulums };
    } else if (preset === 16) {
      // Lorenz Attractor
      presetStateRef.current = {
        x: 0.1,
        y: 0.0,
        z: 0.0,
        s: 10.0,
        r: 28.0,
        b: 8.0 / 3.0,
        points: [],
      };
    } else if (preset === 17) {
      // Spring rope
      const nodes: any[] = [];
      const total = 16;
      for (let i = 0; i < total; i++) {
        nodes.push({
          x: canvas.width / 2,
          y: 30 + i * 18,
          ox: canvas.width / 2,
          oy: 30 + i * 18,
          vx: 0,
          vy: 0,
        });
      }
      presetStateRef.current = { nodes };
    } else if (preset === 18) {
      // Voronoi
      const seeds: any[] = [];
      for (let i = 0; i < 15; i++) {
        seeds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() * 2 - 1) * 0.8,
          vy: (Math.random() * 2 - 1) * 0.8,
        });
      }
      presetStateRef.current = { seeds };
    } else if (preset === 19) {
      // Hyperspace tunnel
      const stars: any[] = [];
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
          ox: 0,
          oy: 0,
        });
      }
      presetStateRef.current = { stars };
    } else if (preset === 20) {
      // L-System Organic Bloom
      presetStateRef.current = { angleOffset: 0, branches: [] };
    } else if (preset === 21) {
      // Isometric voxel grid
      presetStateRef.current = { time: 0 };
    }

    // --- ANIMATION LOOP RENDER ---
    const tick = () => {
      // Clear canvas with trace/decay effect for satisfy motion blur
      ctx.fillStyle = "rgba(10, 10, 10, 0.22)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Interpolate canvasEnergy decay
      setCanvasEnergy((prev) => Math.max(0, prev - 0.025));
      const energy = canvasEnergy;

      // Draw subtle energy grid border
      if (energy > 0.05) {
        ctx.strokeStyle = `rgba(255, 69, 0, ${energy * 0.4})`;
        ctx.lineWidth = 2;
        ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
      }

      const state = presetStateRef.current;

      if (preset === 1) {
        // Flow Field
        const { particles } = state;
        particles.forEach((p: any) => {
          // Flow vector math
          const angle = Math.sin(p.x * 0.006) * Math.cos(p.y * 0.006) * Math.PI * 2;
          const forceX = Math.cos(angle) * p.speed * (1 + energy * 3);
          const forceY = Math.sin(angle) * p.speed * (1 + energy * 3);

          p.vx += forceX * 0.1;
          p.vy += forceY * 0.1;
          p.x += p.vx;
          p.y += p.vy;

          p.vx *= 0.92;
          p.vy *= 0.92;

          // Mouse influence
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const pull = (100 - dist) * 0.02;
            p.x -= dx * pull * 0.2;
            p.y -= dy * pull * 0.2;
          }

          // Boundaries wrap
          if (p.x < 0) p.x = canvas.width;
          if (p.x > canvas.width) p.x = 0;
          if (p.y < 0) p.y = canvas.height;
          if (p.y > canvas.height) p.y = 0;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.5 + energy * 4, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (preset === 2) {
        // Elastic Blueprint Grid
        const { gridPoints } = state;
        gridPoints.forEach((p: any) => {
          const dx = mouse.x - p.ox;
          const dy = mouse.y - p.oy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let tx = p.ox;
          let ty = p.oy;

          if (dist < 120) {
            // Push away from mouse
            const force = (120 - dist) * 0.4 * (1 + energy * 1.5);
            tx = p.ox - (dx / dist) * force;
            ty = p.oy - (dy / dist) * force;
          }

          // Spring physics toward target
          const ax = (tx - p.x) * 0.15;
          const ay = (ty - p.y) * 0.15;
          p.vx += ax;
          p.vy += ay;
          p.vx *= 0.8;
          p.vy *= 0.8;
          p.x += p.vx;
          p.y += p.vy;

          // Draw grid coordinate crosses
          ctx.strokeStyle = `rgba(255, 69, 0, ${0.15 + energy * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x - 4, p.y);
          ctx.lineTo(p.x + 4, p.y);
          ctx.moveTo(p.x, p.y - 4);
          ctx.lineTo(p.x, p.y + 4);
          ctx.stroke();
        });
      } else if (preset === 3) {
        // Shattered typography
        const { particles } = state;
        particles.forEach((p: any) => {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let tx = p.ox;
          let ty = p.oy;

          if (dist < 70) {
            // Explode away
            const force = (70 - dist) * 0.6 * (1 + energy * 2);
            tx = p.x - (dx / dist) * force;
            ty = p.y - (dy / dist) * force;
          }

          const ax = (tx - p.x) * 0.08;
          const ay = (ty - p.y) * 0.08;
          p.vx += ax;
          p.vy += ay;
          p.vx *= 0.85;
          p.vy *= 0.85;
          p.x += p.vx;
          p.y += p.vy;

          ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + energy * 0.6})`;
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
        });
      } else if (preset === 4) {
        // Vortex
        const { particles } = state;
        if (mouse.x > 0 && mouse.y > 0) {
          state.cx += (mouse.x - state.cx) * 0.1;
          state.cy += (mouse.y - state.cy) * 0.1;
        } else {
          state.cx += (canvas.width / 2 - state.cx) * 0.05;
          state.cy += (canvas.height / 2 - state.cy) * 0.05;
        }

        particles.forEach((p: any) => {
          p.angle += p.speed * (1 + energy * 3);
          const x = state.cx + Math.cos(p.angle) * p.distance;
          const y = state.cy + Math.sin(p.angle) * p.distance;

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(x, y, p.size + energy * 2, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (preset === 5) {
        // Magnetic network
        const { nodes } = state;
        nodes.forEach((n: any) => {
          n.x += n.vx * (1 + energy * 3);
          n.y += n.vy * (1 + energy * 3);

          if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
          if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

          // Mouse magnet influence
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const pull = (120 - dist) * 0.0003;
            n.vx += dx * pull;
            n.vy += dy * pull;
          }

          ctx.fillStyle = `rgba(255, 69, 0, ${0.5 + energy * 0.5})`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + energy * 2, 0, Math.PI * 2);
          ctx.fill();
        });

        // draw links
        ctx.strokeStyle = "rgba(255, 69, 0, 0.15)";
        ctx.lineWidth = 0.5;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 60) {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }
      } else if (preset === 6) {
        // Matrix Rain
        const { drops } = state;
        ctx.fillStyle = "rgba(0, 255, 100, 0.4)";
        ctx.font = "bold 13px monospace";
        for (let i = 0; i < drops.length; i++) {
          const char = Math.random() < 0.5 ? "1" : "0";
          const x = i * 15;
          const y = drops[i] * 15;
          ctx.fillText(char, x, y);

          drops[i] += 0.75 * (1 + energy * 2);
          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
        }
      } else if (preset === 7) {
        // Quantum Entanglement
        const { nodes, strings } = state;
        // spawn nodes on mouse drag
        if (mouse.isDown && Math.random() < 0.3) {
          nodes.push({
            x: mouse.x,
            y: mouse.y,
            ox: mouse.x,
            oy: mouse.y,
            radius: 3 + Math.random() * 4,
            angle: Math.random() * Math.PI * 2,
            orbit: 30 + Math.random() * 50,
            color: `hsl(${180 + Math.random() * 60}, 100%, 55%)`,
          });
        }

        nodes.forEach((n: any, idx: number) => {
          n.angle += 0.04 * (1 + energy * 2);
          n.x = n.ox + Math.cos(n.angle) * n.orbit;
          n.y = n.oy + Math.sin(n.angle) * n.orbit;

          ctx.fillStyle = n.color;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + energy * 3, 0, Math.PI * 2);
          ctx.fill();

          // draw orbits
          ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
          ctx.beginPath();
          ctx.arc(n.ox, n.oy, n.orbit, 0, Math.PI * 2);
          ctx.stroke();
        });

        // draw entanglement connections
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + energy * 0.4})`;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100) {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.quadraticCurveTo(mouse.x, mouse.y, nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
        }

        if (nodes.length > 40) nodes.shift();
      } else if (preset === 8) {
        // Fractal Tree
        state.windAngle += 0.015;
        const wind = Math.sin(state.windAngle) * 0.1 * (1 + energy * 2);

        const drawBranch = (sx: number, sy: number, len: number, angle: number, depth: number) => {
          if (depth === 0) return;
          const ex = sx + Math.cos(angle) * len;
          const ey = sy + Math.sin(angle) * len;

          ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 + (depth / 10) * 0.5})`;
          ctx.lineWidth = depth * 0.8;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.stroke();

          // Spurt glowing leaves
          if (depth < 4 && Math.random() < 0.02) {
            state.leaves.push({
              x: ex,
              y: ey,
              vx: (Math.random() - 0.5) * 2,
              vy: 1 + Math.random(),
            });
          }

          drawBranch(ex, ey, len * 0.78, angle - 0.4 + wind, depth - 1);
          drawBranch(ex, ey, len * 0.78, angle + 0.4 + wind, depth - 1);
        };

        drawBranch(canvas.width / 2, canvas.height - 20, 85 + energy * 30, -Math.PI / 2, 10);

        // draw and update falling leaves
        state.leaves.forEach((l: any, idx: number) => {
          l.x += l.vx;
          l.y += l.vy;
          ctx.fillStyle = "rgba(255, 69, 0, 0.7)";
          ctx.beginPath();
          ctx.arc(l.x, l.y, 2.5, 0, Math.PI * 2);
          ctx.fill();

          if (l.y > canvas.height - 10) state.leaves.splice(idx, 1);
        });

        if (state.leaves.length > 60) state.leaves.shift();
      } else if (preset === 9) {
        // Metaballs
        const { balls } = state;
        balls.forEach((b: any) => {
          b.x += b.vx * (1 + energy * 2);
          b.y += b.vy * (1 + energy * 2);

          if (b.x - b.radius < 0 || b.x + b.radius > canvas.width) b.vx *= -1;
          if (b.y - b.radius < 0 || b.y + b.radius > canvas.height) b.vy *= -1;

          // Drag to pull them
          if (mouse.x > 0) {
            const dx = mouse.x - b.x;
            const dy = mouse.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              b.vx += dx * 0.001;
              b.vy += dy * 0.001;
            }
          }

          const grad = ctx.createRadialGradient(b.x, b.y, b.radius * 0.1, b.x, b.y, b.radius);
          grad.addColorStop(0, "rgba(255, 69, 0, 0.45)");
          grad.addColorStop(1, "rgba(255, 69, 0, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (preset === 11) {
        // Kaleidoscope
        const { points } = state;
        if (mouse.x > 0 && mouse.isDown) {
          points.push({
            x: mouse.x - canvas.width / 2,
            y: mouse.y - canvas.height / 2,
            color: `hsl(${(Date.now() / 20) % 360}, 100%, 60%)`,
          });
        }

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        const segments = 8;
        for (let s = 0; s < segments; s++) {
          ctx.rotate((Math.PI * 2) / segments);
          points.forEach((p: any) => {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3 + energy * 8, 0, Math.PI * 2);
            ctx.fill();
          });
        }
        ctx.restore();

        if (points.length > 250) points.shift();
      } else if (preset === 10) {
        // Soundwave Spectrum
        const ringCount = 5;
        const count = 60;
        const time = Date.now() * 0.0025;

        for (let r = 0; r < ringCount; r++) {
          const radius = 40 + r * 30 + energy * 40;
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.15 / (r + 1)})`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();

          for (let i = 0; i <= count; i++) {
            const angle = (i / count) * Math.PI * 2;
            // Simulated live frequencies
            const offset = Math.sin(i * 0.3 + time + r) * 12 * (energy + 0.1);
            const x = canvas.width / 2 + Math.cos(angle) * (radius + offset);
            const y = canvas.height / 2 + Math.sin(angle) * (radius + offset);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } else if (preset === 12) {
        // 3D Globe
        const { globePoints } = state;
        state.rx += 0.005 + (mouse.x > 0 ? (mouse.x - canvas.width / 2) * 0.00005 : 0);
        state.ry += 0.004 + (mouse.y > 0 ? (mouse.y - canvas.height / 2) * 0.00005 : 0);

        const cosX = Math.cos(state.rx);
        const sinX = Math.sin(state.rx);
        const cosY = Math.cos(state.ry);
        const sinY = Math.sin(state.ry);

        globePoints.forEach((p: any) => {
          // 3D rotations
          const y1 = p.y * cosX - p.z * sinX;
          const z1 = p.z * cosX + p.y * sinX;
          const x2 = p.x * cosY - z1 * sinY;
          const z2 = z1 * cosY + p.x * sinY;

          // Projection
          const scale = 250 / (250 + z2);
          const px = canvas.width / 2 + x2 * scale;
          const py = canvas.height / 2 + y1 * scale;

          ctx.fillStyle = `rgba(255, 69, 0, ${scale * (0.3 + energy * 0.7)})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.5 * scale * (1 + energy * 2), 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (preset === 13) {
        // Game of Life
        const { grid, rows, cols, cellSize } = state;
        state.tickCount++;

        // draw grid
        for (let x = 0; x < cols; x++) {
          for (let y = 0; y < rows; y++) {
            if (grid[x][y] === 1) {
              ctx.fillStyle = `rgba(0, 255, 120, ${0.45 + energy * 0.55})`;
              ctx.fillRect(x * cellSize, y * cellSize, cellSize - 1, cellSize - 1);
            }
          }
        }

        // Draw custom trigger drag
        if (mouse.isDown && mouse.x > 0) {
          const gx = Math.floor(mouse.x / cellSize);
          const gy = Math.floor(mouse.y / cellSize);
          if (gx >= 0 && gx < cols && gy >= 0 && gy < rows) {
            grid[gx][gy] = 1;
          }
        }

        // update grid rules on interval ticks
        const updateRate = Math.max(2, 8 - Math.floor(energy * 6));
        if (state.tickCount % updateRate === 0) {
          const nextGrid = Array(cols)
            .fill(0)
            .map(() => Array(rows).fill(0));
          for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
              let neighbors = 0;
              for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                  if (i === 0 && j === 0) continue;
                  const nx = (x + i + cols) % cols;
                  const ny = (y + j + rows) % rows;
                  neighbors += grid[nx][ny];
                }
              }

              if (grid[x][y] === 1) {
                nextGrid[x][y] = neighbors === 2 || neighbors === 3 ? 1 : 0;
              } else {
                nextGrid[x][y] = neighbors === 3 ? 1 : 0;
              }
            }
          }
          state.grid = nextGrid;
        }
      } else if (preset === 14) {
        // Chromatic Lens
        const { lensRadius } = state;
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw test grids
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 1;
        const spacing = 40;
        for (let x = spacing; x < canvas.width; x += spacing) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        for (let y = spacing; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }

        if (mouse.x > 0) {
          const displacement = 5 * (1 + energy * 4);

          // RED channel shift
          ctx.strokeStyle = "rgba(255, 0, 0, 0.75)";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(mouse.x - displacement, mouse.y, lensRadius, 0, Math.PI * 2);
          ctx.stroke();

          // BLUE channel shift
          ctx.strokeStyle = "rgba(0, 0, 255, 0.75)";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(mouse.x + displacement, mouse.y, lensRadius, 0, Math.PI * 2);
          ctx.stroke();

          // GREEN central channel
          ctx.strokeStyle = "rgba(0, 255, 0, 0.75)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, lensRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else if (preset === 15) {
        // Pendulums
        const { pendulums } = state;
        const cx = canvas.width / 2;
        const cy = 20;

        pendulums.forEach((p: any, idx: number) => {
          p.angle = Math.sin(Date.now() * p.speed) * 0.8 * (1 + energy * 1.5);
          const px = cx + Math.sin(p.angle) * p.length;
          const py = cy + Math.cos(p.angle) * p.length;

          // cord line
          ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.stroke();

          // sphere
          const colors = ["#ff4500", "#ff00ff", "#00ffff", "#ffff00", "#00ff00"];
          ctx.fillStyle = colors[idx % colors.length];
          ctx.beginPath();
          ctx.arc(px, py, 8 + energy * 6, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (preset === 16) {
        // Lorenz Attractor
        let { x, y, z, s, r, b, points } = state;
        const dt = 0.012 * (1 + energy * 3);

        // Calculate next 4 steps
        for (let i = 0; i < 4; i++) {
          const dx = s * (y - x) * dt;
          const dy = (x * (r - z) - y) * dt;
          const dz = (x * y - b * z) * dt;
          x += dx;
          y += dy;
          z += dz;
          points.push({ x, y, z });
        }

        state.x = x;
        state.y = y;
        state.z = z;

        // draw points projecting to 2D
        ctx.strokeStyle = "rgba(255, 69, 0, 0.5)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        points.forEach((p: any, idx: number) => {
          const px = canvas.width / 2 + p.x * 7;
          const py = canvas.height / 2 + (p.y - 25) * 6;
          if (idx === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();

        if (points.length > 400) points.splice(0, 4);
      } else if (preset === 17) {
        // Spring rope
        const { nodes } = state;

        // Pin first node to top anchor
        nodes[0].x = canvas.width / 2;
        nodes[0].y = 30;

        // Mouse drag can pull nodes
        if (mouse.x > 0 && mouse.isDown) {
          nodes[nodes.length - 1].x = mouse.x;
          nodes[nodes.length - 1].y = mouse.y;
        }

        for (let i = 1; i < nodes.length; i++) {
          const p1 = nodes[i - 1];
          const p2 = nodes[i];

          // gravity and spring tension forces
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const restLength = 15;
          const springForce = (dist - restLength) * 0.15;

          const fx = (dx / dist) * springForce;
          const fy = (dy / dist) * springForce;

          p2.vx += fx;
          p2.vy += fy + 0.15; // +gravity

          p2.vx *= 0.85;
          p2.vy *= 0.85;

          p2.x += p2.vx;
          p2.y += p2.vy;
        }

        // draw spring nodes
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 + energy * 0.7})`;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        nodes.forEach((n: any, i: number) => {
          if (i === 0) ctx.moveTo(n.x, n.y);
          else ctx.lineTo(n.x, n.y);
        });
        ctx.stroke();

        nodes.forEach((n: any) => {
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (preset === 18) {
        // Voronoi Cell lines
        const { seeds } = state;
        seeds.forEach((s: any) => {
          s.x += s.vx * (1 + energy * 2);
          s.y += s.vy * (1 + energy * 2);

          if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
          if (s.y < 0 || s.y > canvas.height) s.vy *= -1;
        });

        // Add mouse coordinates as a seed
        if (mouse.x > 0) {
          seeds[seeds.length - 1] = { x: mouse.x, y: mouse.y, vx: 0, vy: 0 };
        }

        // Draw grid boundaries relative to seeds
        const step = 15;
        for (let y = 0; y < canvas.height; y += step) {
          for (let x = 0; x < canvas.width; x += step) {
            let minDist = 999999;
            let minIdx = -1;
            seeds.forEach((s: any, idx: number) => {
              const dx = s.x - x;
              const dy = s.y - y;
              const d = dx * dx + dy * dy;
              if (d < minDist) {
                minDist = d;
                minIdx = idx;
              }
            });

            ctx.fillStyle = `hsl(${minIdx * 25}, 80%, ${2 + energy * 15}%)`;
            ctx.fillRect(x, y, step, step);
          }
        }
      } else if (preset === 19) {
        // Hyperspace tunnel
        const { stars } = state;
        stars.forEach((s: any) => {
          s.z -= 4 * (1 + energy * 10);
          if (s.z <= 0) {
            s.z = canvas.width;
            s.x = Math.random() * canvas.width - canvas.width / 2;
            s.y = Math.random() * canvas.height - canvas.height / 2;
          }

          const k = 150 / s.z;
          const px = s.x * k + canvas.width / 2;
          const py = s.y * k + canvas.height / 2;

          const size = (1 - s.z / canvas.width) * 3 + energy * 4;

          ctx.fillStyle = `rgba(255, 255, 255, ${1 - s.z / canvas.width})`;
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.2, size), 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (preset === 20) {
        // L-system organic spirals
        state.angleOffset += 0.005 * (1 + energy * 4);
        const segments = 120;
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let len = 4;
        let angle = 0;

        ctx.strokeStyle = `rgba(0, 255, 255, ${0.4 + energy * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x, y);

        for (let i = 0; i < segments; i++) {
          angle += 0.35 + state.angleOffset;
          len += 0.9 + energy * 1.5;
          x += Math.cos(angle) * len;
          y += Math.sin(angle) * len;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else if (preset === 21) {
        // Isometric Grid
        state.time += 0.04 * (1 + energy * 4);
        const gridW = 16;
        const gridH = 16;
        const tileW = 20;
        const tileH = 10;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2 - 40;

        for (let x = 0; x < gridW; x++) {
          for (let y = 0; y < gridH; y++) {
            // Isometric math projection
            const isoX = cx + (x - y) * tileW;
            const isoY = cy + (x + y) * tileH;

            // wave elevation
            const dx = isoX - mouse.x;
            const dy = isoY - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const wave = Math.sin(dist * 0.05 - state.time) * 12;

            ctx.strokeStyle = "rgba(255, 69, 0, 0.2)";
            ctx.fillStyle = `rgba(255, 69, 0, ${0.08 + (wave + 12) / 100})`;
            ctx.beginPath();
            ctx.moveTo(isoX, isoY + wave);
            ctx.lineTo(isoX + tileW, isoY + tileH + wave);
            ctx.lineTo(isoX, isoY + tileH * 2 + wave);
            ctx.lineTo(isoX - tileW, isoY + tileH + wave);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [activePreset, canvasEnergy, lang]);

  return (
    <section
      id="cyber-lab"
      className="px-5 md:px-20 lg:px-32 py-16 md:py-24 border-t border-border relative bg-[#070707] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-blueprint opacity-[0.02] pointer-events-none" />
      <div className="absolute top-10 right-10 flex gap-1 font-mono text-[8px] text-accent/30 tracking-widest hidden md:flex uppercase">
        <span>CYBER_SYNTHESIS_MATRIX</span>
        <span>//</span>
        <span>VIRTUAL_PLAYGROUND_V2</span>
      </div>

      <div className="mb-10 flex gap-2 items-center">
        <div className="h-[1px] w-8 bg-accent animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-accent">
          // SYNTHESIS PLAYGROUND & SATISFYING TOOLS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 items-stretch">
        {/* Left: Interactive Canvas Port */}
        <div className="flex flex-col border border-white/10 bg-black/40 rounded-xl overflow-hidden relative group">
          {/* Top terminal banner */}
          <div className="px-4 py-3 border-b border-white/10 bg-white/3 flex items-center justify-between font-mono text-[9px] text-white/50">
            <div className="flex items-center gap-2">
              <span className="size-2 bg-accent rounded-full animate-ping" />
              <span className="font-bold tracking-widest uppercase">
                {lang === "uz" ? "PORT_AKTIV" : "VIEWPORT_ACTIVE"}
              </span>
            </div>
            <div className="flex items-center gap-4 uppercase tracking-widest">
              <span>
                Preset: 0{activePreset.id} // {activePreset.name[lang]}
              </span>
              {canvasEnergy > 0.05 && (
                <span className="text-accent animate-pulse font-bold">
                  Energy: {Math.round(canvasEnergy * 100)}%
                </span>
              )}
            </div>
          </div>

          {/* Core Interactive Canvas Area */}
          <div className="flex-1 min-h-[440px] relative bg-[#090909] cursor-crosshair overflow-hidden">
            <canvas
              ref={canvasRef}
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className="absolute inset-0 w-full h-full block"
            />

            {/* Visual feedback overlay */}
            <div className="absolute inset-0 pointer-events-none border border-accent/0 group-hover:border-accent/15 transition-all duration-700 shadow-[inset_0_0_40px_rgba(255,69,0,0)] group-hover:shadow-[inset_0_0_40px_rgba(255,69,0,0.06)]" />

            {/* Instruction tooltip inside canvas */}
            <div className="absolute bottom-4 left-4 font-mono text-[9px] text-white/30 uppercase tracking-wider pointer-events-none">
              {lang === "uz"
                ? "Klip yoki sudrab chizib ko'ring (Ovoz + Effektlar)"
                : "Click / drag to warp (Synthesis sound + ripple triggered)"}
            </div>
          </div>

          {/* Bottom detail card */}
          <div className="p-4 bg-[#0a0a0a] border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-mono text-accent uppercase tracking-widest block mb-1">
                // {lang === "uz" ? "Faol tajriba tavsifi" : "Active schematic description"}
              </span>
              <p className="text-xs text-white/70">{activePreset.desc[lang]}</p>
            </div>
            <button
              onClick={() => {
                playClick();
                setCanvasEnergy(1.0);
              }}
              className="px-3 py-1.5 border border-white/15 hover:border-accent hover:text-accent font-mono text-[10px] uppercase tracking-widest transition-all shrink-0 flex items-center gap-1.5 cursor-pointer bg-white/2"
            >
              <RefreshCw className="size-3 animate-spin-slow" />
              {lang === "uz" ? "Impuls berish" : "Trigger impulse"}
            </button>
          </div>
        </div>

        {/* Right: Synthesis Controls & Preset Selectors */}
        <div className="flex flex-col gap-6">
          {/* 1. Preset Selector Hub */}
          <div className="border border-white/10 bg-black/40 rounded-xl p-5 flex flex-col">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 block flex items-center gap-1">
              <Layers className="size-3 text-accent" />
              {lang === "uz"
                ? "21 x INTERAKTIV ANIMATSIYALAR"
                : "21 x SATISFYING VIRTUAL ANIMATIONS"}
            </span>

            {/* Grid selector of 21 animation presets */}
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 max-h-[160px] overflow-y-auto pr-1">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setActivePreset(preset);
                    setCanvasEnergy(1.0);
                  }}
                  className={`px-2 py-2 border font-mono text-[10px] text-left uppercase tracking-tight transition-all truncate cursor-pointer ${
                    activePreset.id === preset.id
                      ? "border-accent bg-accent/15 text-accent font-bold shadow-[0_0_15px_rgba(255,69,0,0.15)]"
                      : "border-white/5 hover:border-white/25 hover:bg-white/5 text-white/60"
                  }`}
                >
                  0{preset.id} · {preset.name[lang].split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* 2. LIVE INTERACTIVE SOUND DESIGN STUDIO (ADSR & LFO GRAPHICS) */}
          <div className="border border-white/10 bg-black/50 rounded-xl p-5 flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
                <Sliders className="size-3 text-accent" />
                {lang === "uz" ? "SYNTH OVOZ ARXITEKTURASI (ADSR)" : "LIVE ADSR SYNTH CONSOLE"}
              </span>
              <div className="flex items-center gap-1.5">
                {["sine", "triangle", "square", "sawtooth"].map((shape) => (
                  <button
                    key={shape}
                    onClick={() => {
                      playClick();
                      setWaveShape(shape as any);
                    }}
                    className={`px-1.5 py-0.5 border font-mono text-[8px] uppercase rounded-sm cursor-pointer ${
                      waveShape === shape
                        ? "border-accent text-accent bg-accent/5"
                        : "border-white/5 text-white/40 hover:text-white"
                    }`}
                  >
                    {shape.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            {/* Live SVG Graph Visualizing Envelope */}
            <div className="h-28 bg-[#09090b] border border-white/5 rounded-md mb-4 relative overflow-hidden flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 280 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="adsr-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255, 69, 0, 0.25)" />
                    <stop offset="100%" stopColor="rgba(255, 69, 0, 0.0)" />
                  </linearGradient>
                </defs>
                {/* Visual grid lines inside SVG */}
                <line
                  x1="10"
                  y1="0"
                  x2="10"
                  y2="100"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                />
                <line
                  x1="70"
                  y1="0"
                  x2="70"
                  y2="100"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                />
                <line
                  x1="130"
                  y1="0"
                  x2="130"
                  y2="100"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                />
                <line
                  x1="190"
                  y1="0"
                  x2="190"
                  y2="100"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                />
                <line
                  x1="250"
                  y1="0"
                  x2="250"
                  y2="100"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="50"
                  x2="280"
                  y2="50"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                />

                {/* Dynamic fill area */}
                <path d={`${getAdsrPath()} L 270 85 Z`} fill="url(#adsr-grad)" />
                {/* Primary dynamic SVG stroke line */}
                <path
                  d={getAdsrPath()}
                  fill="none"
                  stroke="#FF4500"
                  strokeWidth="2.5"
                  className="stroke-accent"
                  style={{ filter: "drop-shadow(0px 0px 4px rgba(255, 69, 0, 0.5))" }}
                />
              </svg>
              {/* Overlay labels */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5 font-mono text-[8px] text-white/30 uppercase tracking-widest">
                <Activity className="size-3 text-accent animate-pulse" />
                <span>
                  Envelope: {attack.toFixed(2)}s A · {decay.toFixed(2)}s D ·{" "}
                  {(sustain * 100).toFixed(0)}% S · {release.toFixed(2)}s R
                </span>
              </div>
            </div>

            {/* ADSR Slider Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[8px] text-white/50">
                  <span>ATTACK ({attack}s)</span>
                  <span className="text-accent">A</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.5"
                  step="0.05"
                  value={attack}
                  onChange={(e) => setAttack(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[8px] text-white/50">
                  <span>DECAY ({decay}s)</span>
                  <span className="text-accent">D</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.5"
                  step="0.05"
                  value={decay}
                  onChange={(e) => setDecay(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[8px] text-white/50">
                  <span>SUSTAIN ({Math.round(sustain * 100)}%)</span>
                  <span className="text-accent">S</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.05"
                  value={sustain}
                  onChange={(e) => setSustain(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between font-mono text-[8px] text-white/50">
                  <span>RELEASE ({release}s)</span>
                  <span className="text-accent">R</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="2.0"
                  step="0.05"
                  value={release}
                  onChange={(e) => setRelease(parseFloat(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                />
              </div>
            </div>

            {/* LFO Modulation Sub-panel */}
            <div className="border border-white/5 bg-black/40 p-2.5 rounded-md flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[8px] text-accent font-bold tracking-widest">
                  LFO MODULATION ENGINE
                </span>
                <span className="font-mono text-[8px] text-white/30 uppercase">
                  Depth: {lfoDepth}% @ {lfoRate.toFixed(1)}Hz
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col gap-1 items-end">
                  <span className="font-mono text-[7px] text-white/40">RATE</span>
                  <input
                    type="range"
                    min="1.0"
                    max="15.0"
                    step="0.5"
                    value={lfoRate}
                    onChange={(e) => setLfoRate(parseFloat(e.target.value))}
                    className="w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="font-mono text-[7px] text-white/40">DEPTH</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={lfoDepth}
                    onChange={(e) => setLfoDepth(parseInt(e.target.value))}
                    className="w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-accent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. 52-Key Soundboard Matrix Keyboard */}
          <div className="border border-white/10 bg-black/40 rounded-xl p-5 flex flex-col relative overflow-hidden">
            {/* Background cyber wire */}
            <div className="absolute -bottom-10 -right-10 size-32 bg-accent/5 blur-2xl rounded-full pointer-events-none" />

            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="size-3 text-accent" />
                {lang === "uz" ? "52-KANALLI OVOZ SINTEZATORI" : "52-KEY SOUNDBOARD SYNTHESIZER"}
              </span>
              <button
                onClick={() => {
                  playClick();
                  toggleMute();
                }}
                className="text-[9px] font-mono uppercase tracking-widest text-white/50 hover:text-accent flex items-center gap-1 cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="size-3 text-red-500" />
                ) : (
                  <Volume2 className="size-3 text-green-500" />
                )}
                {isMuted ? "MUTED" : "SOUND ON"}
              </button>
            </div>

            {/* Categorized sound board tabs */}
            <div className="flex gap-1.5 mb-4">
              {[
                {
                  id: "piano",
                  label: lang === "uz" ? "PIANINO" : "SYNTH KEYS",
                  keys: 24,
                  offset: 0,
                },
                { id: "scifi", label: "SCI-FI FX", keys: 10, offset: 24 },
                { id: "arcade", label: "RETRO 8-BIT", keys: 10, offset: 34 },
                { id: "ux", label: "UI / UX", keys: 8, offset: 44 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playClick();
                    setActiveSoundTab(tab.id as any);
                  }}
                  className={`flex-1 py-1 px-1 border font-mono text-[9px] text-center uppercase tracking-wider transition-all cursor-pointer ${
                    activeSoundTab === tab.id
                      ? "border-accent text-accent bg-accent/5 font-bold"
                      : "border-white/5 text-white/40 hover:text-white/80 hover:border-white/15"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Soundboard trigger matrix */}
            <div className="flex-1 min-h-[120px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {activeSoundTab === "piano" && (
                  <motion.div
                    key="piano"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="grid grid-cols-6 gap-1.5 w-full"
                  >
                    {Array.from({ length: 24 }).map((_, i) => (
                      <button
                        key={i}
                        onMouseEnter={playHover}
                        onClick={() => handleTriggerSound(i)}
                        className="aspect-square border border-white/5 hover:border-accent bg-white/2 hover:bg-accent/10 transition-all font-mono text-[10px] text-white/40 hover:text-accent font-bold flex flex-col items-center justify-center cursor-pointer group rounded-sm"
                      >
                        <span className="text-[8px] opacity-40 group-hover:opacity-100">KEY</span>
                        {i + 1}
                      </button>
                    ))}
                  </motion.div>
                )}

                {activeSoundTab === "scifi" && (
                  <motion.div
                    key="scifi"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="grid grid-cols-5 gap-2 w-full"
                  >
                    {[
                      "laser",
                      "warp",
                      "shield",
                      "alien",
                      "impact",
                      "radar",
                      "disrupt",
                      "anomaly",
                      "phase",
                      "flicker",
                    ].map((name, i) => (
                      <button
                        key={name}
                        onMouseEnter={playHover}
                        onClick={() => handleTriggerSound(24 + i)}
                        className="h-14 border border-white/5 hover:border-accent bg-white/2 hover:bg-accent/10 transition-all font-mono text-[8px] text-white/50 hover:text-accent flex flex-col items-center justify-center gap-1 cursor-pointer uppercase rounded-sm"
                      >
                        <span className="text-[12px]">📡</span>
                        {name}
                      </button>
                    ))}
                  </motion.div>
                )}

                {activeSoundTab === "arcade" && (
                  <motion.div
                    key="arcade"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="grid grid-cols-5 gap-2 w-full"
                  >
                    {[
                      "coin",
                      "jump",
                      "powerup",
                      "hit",
                      "gameover",
                      "lazer",
                      "teleport",
                      "heartbeat",
                      "snare",
                      "sparkle",
                    ].map((name, i) => (
                      <button
                        key={name}
                        onMouseEnter={playHover}
                        onClick={() => handleTriggerSound(34 + i)}
                        className="h-14 border border-white/5 hover:border-accent bg-white/2 hover:bg-accent/10 transition-all font-mono text-[8px] text-white/50 hover:text-accent flex flex-col items-center justify-center gap-1 cursor-pointer uppercase rounded-sm"
                      >
                        <span className="text-[12px]">👾</span>
                        {name}
                      </button>
                    ))}
                  </motion.div>
                )}

                {activeSoundTab === "ux" && (
                  <motion.div
                    key="ux"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="grid grid-cols-4 gap-2 w-full"
                  >
                    {["bubble", "woody", "metal", "paper", "success", "error", "scan", "ocean"].map(
                      (name, i) => (
                        <button
                          key={name}
                          onMouseEnter={playHover}
                          onClick={() => handleTriggerSound(44 + i)}
                          className="h-14 border border-white/5 hover:border-accent bg-white/2 hover:bg-accent/10 transition-all font-mono text-[8px] text-white/50 hover:text-accent flex flex-col items-center justify-center gap-1 cursor-pointer uppercase rounded-sm"
                        >
                          <span className="text-[12px]">✨</span>
                          {name}
                        </button>
                      ),
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 4. Generative Ambient Music Synthesizer Control */}
          <div className="border border-white/10 bg-black/40 rounded-xl p-5 flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 border border-accent/20 rounded-lg text-accent">
                <Music
                  className={`size-5 ${ambientLoopPlaying ? "animate-spin-slow text-accent" : "opacity-60"}`}
                />
              </div>
              <div>
                <span className="text-[9px] font-mono text-accent uppercase tracking-widest block mb-1">
                  // {lang === "uz" ? "Premium generator" : "Premium generator"}
                </span>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {lang === "uz" ? "Algoritmik Cyber-Sinfoniya" : "Generative Cyber-Symphony"}
                </h4>
                <p className="text-[10px] text-white/40 font-mono uppercase mt-0.5">
                  {ambientLoopPlaying
                    ? lang === "uz"
                      ? "Sintezlanmoqda (Web Audio API)"
                      : "Active Realtime (Web Audio API)"
                    : lang === "uz"
                      ? "To'xtatilgan"
                      : "Loop off"}
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleAmbient}
              className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-all cursor-pointer flex items-center gap-1.5 rounded-sm ${
                ambientLoopPlaying
                  ? "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20"
                  : "bg-accent text-background font-bold hover:bg-accent/80"
              }`}
            >
              {ambientLoopPlaying ? (
                <>
                  <Square className="size-3 fill-current" />
                  {lang === "uz" ? "To'xtatish" : "Stop Loop"}
                </>
              ) : (
                <>
                  <Play className="size-3 fill-current" />
                  {lang === "uz" ? "Yoqish" : "Play Loop"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
