/* eslint-disable @typescript-eslint/no-explicit-any, no-useless-escape */
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { useSound } from "@/hooks/useSound";
import { transitionSynth } from "@/lib/animations/synthesizer";
import { Search, Play, Pause, X, Music, Sparkles } from "lucide-react";

const TRACKS = [
  {
    id: "generative_ambient",
    title: "Cyber Space Ambient",
    artist: "Algoritmik Synth",
    thumb: "generative", // Special keyword to render interactive animated cover
    isGenerative: true,
  },
  {
    id: "V1Pl8CzNzCw",
    title: "Lovely",
    artist: "Billie Eilish & Khalid",
    thumb: "https://img.youtube.com/vi/V1Pl8CzNzCw/mqdefault.jpg",
  },
  {
    id: "34Na4j8HLjc",
    title: "Starboy",
    artist: "The Weeknd",
    thumb: "https://img.youtube.com/vi/34Na4j8HLjc/mqdefault.jpg",
  },
  {
    id: "4NRXx6U8ABQ",
    title: "Blinding Lights",
    artist: "The Weeknd",
    thumb: "https://img.youtube.com/vi/4NRXx6U8ABQ/mqdefault.jpg",
  },
  {
    id: "JGwWNGJdvx8",
    title: "Shape of You",
    artist: "Ed Sheeran",
    thumb: "https://img.youtube.com/vi/JGwWNGJdvx8/mqdefault.jpg",
  },
  {
    id: "fJ9rUzIMcZQ",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    thumb: "https://img.youtube.com/vi/fJ9rUzIMcZQ/mqdefault.jpg",
  },
];

const INVIDIOUS_INSTANCES = ["https://invidious.flokinet.to", "https://yt.chocolatemoo53.com"];

async function searchInvidious(query: string): Promise<any[]> {
  if (!query.trim()) return [];
  const q = encodeURIComponent(query.trim());

  for (const instance of INVIDIOUS_INSTANCES) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      const response = await fetch(`${instance}/api/v1/search?q=${q}&type=video`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          return data
            .filter((item: any) => item.type === "video" && item.videoId)
            .map((item: any) => ({
              id: item.videoId,
              title: item.title,
              artist: item.author || "Unknown Artist",
              thumb:
                item.videoThumbnails?.find((t: any) => t.quality === "medium")?.url ||
                `https://img.youtube.com/vi/${item.videoId}/mqdefault.jpg`,
            }));
        }
      }
    } catch (e) {
      console.warn(`Failed searching with Invidious instance ${instance}:`, e);
    }
  }
  return [];
}

export function MusicPlayer({ isMenuOpen }: { isMenuOpen: boolean }) {
  const { t, lang } = useLang();
  const { playHover, playClick, startGenerativeAmbient, stopGenerativeAmbient, isAmbientActive } = useSound();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedTracks, setSearchedTracks] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<any>(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ytPlayer, setYtPlayer] = useState<any>(null);

  const playerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef(currentTrack);
  const ytInitialized = useRef(false);
  const ytInstanceRef = useRef<any>(null);
  const visualizerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const visualizerAnimRef = useRef<number | null>(null);

  // Close the expanded panel when the main menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setIsOpen(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    trackRef.current = currentTrack;
  }, [currentTrack]);

  // Debounced search watcher for Invidious search
  useEffect(() => {
    if (!search.trim()) {
      setSearchedTracks([]);
      setIsSearching(false);
      return;
    }

    const ytRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    if (ytRegex.test(search)) {
      return;
    }

    setIsSearching(true);

    const delayDebounce = setTimeout(async () => {
      const results = await searchInvidious(search);
      setSearchedTracks(results);
      setIsSearching(false);
    }, 600);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  // Lazy create YouTube player
  const ensureYouTubePlayer = () => {
    if (ytInitialized.current || typeof window === "undefined" || currentTrack.isGenerative) return;
    ytInitialized.current = true;

    const loadYT = () => {
      return new Promise((resolve) => {
        if ((window as any).YT && (window as any).YT.Player) {
          resolve((window as any).YT);
          return;
        }
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        } else {
          document.head.appendChild(tag);
        }
        (window as any).onYouTubeIframeAPIReady = () => {
          resolve((window as any).YT);
        };
      });
    };

    loadYT().then((YT: any) => {
      if (!playerRef.current) return;
      playerRef.current.innerHTML = '<div id="yt-player-container"></div>';

      ytInstanceRef.current = new YT.Player("yt-player-container", {
        height: "1",
        width: "1",
        videoId: trackRef.current.id,
        playerVars: { autoplay: 0, controls: 0, playsinline: 1 },
        events: {
          onReady: (e: any) => setYtPlayer(e.target),
          onStateChange: (e: any) => {
            if (!trackRef.current.isGenerative) {
              setIsPlaying(e.data === YT.PlayerState.PLAYING);
            }
          },
        },
      });
    });
  };

  useEffect(() => {
    if (isMenuOpen) ensureYouTubePlayer();
  }, [isMenuOpen, currentTrack]);

  useEffect(() => {
    return () => {
      if (ytInstanceRef.current?.destroy) {
        ytInstanceRef.current.destroy();
      }
      if (visualizerAnimRef.current) {
        cancelAnimationFrame(visualizerAnimRef.current);
      }
      stopGenerativeAmbient();
    };
  }, []);

  // Web Media Session API to register active background playback in Chrome
  useEffect(() => {
    if (typeof window === "undefined" || !("mediaSession" in navigator)) return;

    try {
      const artSrc = currentTrack.thumb === "generative"
        ? "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4417bf41-fddd-4ae4-b980-6cdbdc1cf524/id-preview-7c68e531--be31eb19-65ea-476c-9523-cacbbc7f7050.lovable.app-1783438766439.png"
        : currentTrack.thumb;

      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        artwork: [
          {
            src: artSrc,
            sizes: "120x90",
            type: "image/jpeg",
          },
        ],
      });
    } catch (e) {
      console.warn("Failed to set MediaSession metadata:", e);
    }
  }, [currentTrack]);

  useEffect(() => {
    if (typeof window === "undefined" || !("mediaSession" in navigator)) return;

    try {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";

      navigator.mediaSession.setActionHandler("play", () => {
        if (currentTrack.isGenerative) {
          startGenerativeAmbient();
          setIsPlaying(true);
        } else if (ytPlayer && typeof ytPlayer.playVideo === "function") {
          ytPlayer.playVideo();
        } else {
          setIsPlaying(true);
        }
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        if (currentTrack.isGenerative) {
          stopGenerativeAmbient();
          setIsPlaying(false);
        } else if (ytPlayer && typeof ytPlayer.pauseVideo === "function") {
          ytPlayer.pauseVideo();
        } else {
          setIsPlaying(false);
        }
      });
    } catch (e) {
      console.warn("Failed to set MediaSession action handlers:", e);
    }
  }, [isPlaying, ytPlayer, currentTrack]);

  // LIVE GRAPHICS AUDIO VISUALIZER
  useEffect(() => {
    const canvas = visualizerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 280;
    canvas.height = 70;

    let bars: number[] = Array(32).fill(0);

    const drawLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isGen = currentTrack.isGenerative;
      const active = isPlaying;

      if (isGen && active && transitionSynth.analyser) {
        // High-fidelity accurate spectrum visualization from live Web Audio API!
        const bufferLength = transitionSynth.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        transitionSynth.analyser.getByteFrequencyData(dataArray);

        const barWidth = (canvas.width / 24);
        ctx.fillStyle = "rgba(255, 69, 0, 0.75)";

        for (let i = 0; i < 24; i++) {
          // get average frequency values
          const val = dataArray[i * 2] / 255;
          bars[i] += (val * 55 - bars[i]) * 0.25;

          const x = i * barWidth;
          const y = canvas.height - bars[i];
          ctx.fillRect(x, y, barWidth - 2, bars[i]);

          // glowing edge reflection
          ctx.shadowColor = "rgba(255, 69, 0, 0.5)";
          ctx.shadowBlur = 4;
        }
        ctx.shadowBlur = 0; // reset
      } else {
        // High-fidelity realistic simulated visualizer for YT streams!
        const barWidth = (canvas.width / 24);
        ctx.fillStyle = "rgba(0, 255, 240, 0.6)";

        for (let i = 0; i < 24; i++) {
          let val = 0;
          if (active) {
            // Sinusoidal simulated bounce
            val = Math.sin(Date.now() * 0.005 + i * 0.4) * 20 + 25 + Math.random() * 8;
          } else {
            val = Math.max(1, bars[i] * 0.9); // decay to flatline
          }
          bars[i] += (val - bars[i]) * 0.2;

          const x = i * barWidth;
          const y = canvas.height - bars[i];
          ctx.fillRect(x, y, barWidth - 2, bars[i]);
        }
      }

      visualizerAnimRef.current = requestAnimationFrame(drawLoop);
    };

    visualizerAnimRef.current = requestAnimationFrame(drawLoop);

    return () => {
      if (visualizerAnimRef.current) {
        cancelAnimationFrame(visualizerAnimRef.current);
      }
    };
  }, [isPlaying, currentTrack, isOpen]);

  const handlePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClick();

    if (currentTrack.isGenerative) {
      if (isPlaying) {
        stopGenerativeAmbient();
        setIsPlaying(false);
      } else {
        startGenerativeAmbient();
        setIsPlaying(true);
      }
      return;
    }

    if (!ytPlayer) return;
    if (isPlaying) {
      ytPlayer.pauseVideo();
    } else {
      ytPlayer.playVideo();
    }
  };

  const handleSelectTrack = (track: any) => {
    playClick();
    setCurrentTrack(track);

    if (track.isGenerative) {
      // Pause YouTube player
      if (ytPlayer && typeof ytPlayer.pauseVideo === "function") {
        ytPlayer.pauseVideo();
      }
      startGenerativeAmbient();
      setIsPlaying(true);
    } else {
      // Stop generative ambient loop
      stopGenerativeAmbient();
      setIsPlaying(false);

      if (ytPlayer && typeof ytPlayer.loadVideoById === "function") {
        ytPlayer.loadVideoById(track.id);
        setIsPlaying(true);
      } else {
        // fallback in case player is lazily loading
        ensureYouTubePlayer();
        setTimeout(() => {
          if (ytInstanceRef.current && typeof ytInstanceRef.current.loadVideoById === "function") {
            ytInstanceRef.current.loadVideoById(track.id);
            setIsPlaying(true);
          }
        }, 1200);
      }
    }
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    const ytRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
    const match = val.match(ytRegex);
    if (match) {
      const id = match[1];
      handleSelectTrack({
        id,
        title: "Custom Track",
        artist: "YouTube Link",
        thumb: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
      });
      setSearch("");
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!search.trim()) return;

      const ytRegex =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
      if (ytRegex.test(search)) return;

      setIsSearching(true);
      const results = await searchInvidious(search);
      setSearchedTracks(results);
      setIsSearching(false);
    }
  };

  return (
    <div
      className={`fixed bottom-6 right-6 lg:bottom-12 lg:right-12 z-[60] flex flex-col items-end transition-all duration-700 ${
        isMenuOpen
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      {/* Hidden YT Player */}
      <div
        ref={playerRef}
        className="absolute pointer-events-none"
        style={{
          width: "1px",
          height: "1px",
          opacity: 0.01,
          overflow: "hidden",
          left: "-9999px",
          top: "-9999px",
        }}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 w-72 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Live visualizer header inside card */}
            <div className="relative h-[70px] bg-white/2 border-b border-white/5 flex flex-col justify-end p-2 overflow-hidden">
              <canvas ref={visualizerCanvasRef} className="absolute inset-0 w-full h-full" />
              <div className="relative z-10 flex items-center justify-between pointer-events-none">
                <span className="text-[8px] font-mono tracking-widest text-white/40 uppercase">
                  {isPlaying ? t("music.playing") : t("music.paused")}
                </span>
                {currentTrack.isGenerative && (
                  <span className="text-[8px] font-mono text-accent uppercase font-bold flex items-center gap-1">
                    <Sparkles className="size-2 animate-spin-slow" />
                    LIVE SYNTH
                  </span>
                )}
              </div>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-white/10 flex items-center gap-2">
              <Search className="w-4 h-4 text-white/50" />
              <input
                type="text"
                placeholder={t("music.search")}
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/40 flex-1 font-mono tracking-wide"
              />
              <button
                onClick={() => {
                  playClick();
                  setIsOpen(false);
                }}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Track List */}
            <div className="max-h-48 overflow-y-auto p-2 space-y-1">
              {isSearching ? (
                <div className="flex flex-col items-center justify-center py-6 gap-2">
                  <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  <p className="text-[10px] text-white/50 font-mono uppercase tracking-widest">
                    Searching...
                  </p>
                </div>
              ) : (
                <>
                  {search.trim()
                    ? // Searched Tracks
                      searchedTracks.map((track) => (
                        <button
                          key={track.id}
                          onMouseEnter={playHover}
                          onClick={() => handleSelectTrack(track)}
                          className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all text-left ${currentTrack.id === track.id ? "bg-accent/20" : "hover:bg-white/5"}`}
                        >
                          <img
                            src={track.thumb}
                            alt={track.title}
                            className="w-10 h-10 object-cover rounded-md"
                          />
                          <div className="flex-1 overflow-hidden">
                            <p
                              className={`text-xs font-bold truncate ${currentTrack.id === track.id ? "text-accent" : "text-white"}`}
                            >
                              {track.title}
                            </p>
                            <p className="text-[10px] text-white/50 truncate font-mono uppercase">
                              {track.artist}
                            </p>
                          </div>
                        </button>
                      ))
                    : // Default TRACKS
                      TRACKS.map((track) => (
                        <button
                          key={track.id}
                          onMouseEnter={playHover}
                          onClick={() => handleSelectTrack(track)}
                          className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all text-left ${currentTrack.id === track.id ? "bg-accent/20" : "hover:bg-white/5"}`}
                        >
                          {track.thumb === "generative" ? (
                            <div className="w-10 h-10 bg-accent/15 border border-accent/20 flex items-center justify-center rounded-md font-bold text-accent text-xs">
                              {isPlaying && currentTrack.id === track.id ? "⚡" : "🎹"}
                            </div>
                          ) : (
                            <img
                              src={track.thumb}
                              alt={track.title}
                              className="w-10 h-10 object-cover rounded-md"
                            />
                          )}
                          <div className="flex-1 overflow-hidden">
                            <p
                              className={`text-xs font-bold truncate ${currentTrack.id === track.id ? "text-accent" : "text-white"}`}
                            >
                              {track.title}
                            </p>
                            <p className="text-[10px] text-white/50 truncate font-mono uppercase">
                              {track.artist}
                            </p>
                          </div>
                          {currentTrack.id === track.id && isPlaying && (
                            <div className="flex gap-[2px] items-end h-3 mr-1">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className={`w-[3px] rounded-t-[1px] ${track.isGenerative ? "bg-accent" : "bg-cyan-400"}`}
                                  animate={{ height: ["20%", "100%", "40%", "80%", "20%"] }}
                                  transition={{
                                    repeat: Infinity,
                                    duration: 0.4 + i * 0.15,
                                    ease: "easeInOut",
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </button>
                      ))}

                  {search.trim() && searchedTracks.length === 0 && (
                    <p className="text-xs text-white/40 text-center py-4 font-mono">
                      No tracks found
                    </p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini Docked Player */}
      <motion.div
        layout
        role="button"
        aria-label={isOpen ? t("music.collapse") : t("music.expand")}
        aria-expanded={isOpen}
        tabIndex={0}
        onClick={() => {
          playClick();
          setIsOpen(!isOpen);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            playClick();
            setIsOpen(!isOpen);
          }
        }}
        onMouseEnter={playHover}
        className={`group relative flex items-center gap-3 bg-black/80 backdrop-blur-md border p-2 pr-4 rounded-full transition-colors cursor-pointer shadow-xl overflow-hidden ${
          currentTrack.isGenerative ? "border-accent/30 hover:border-accent" : "border-white/20 hover:border-cyan-500/50"
        }`}
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-white/10">
          {currentTrack.thumb === "generative" ? (
            <div className="absolute inset-0 bg-accent/20 flex items-center justify-center font-bold text-accent text-sm">
              {isPlaying ? "⚡" : "🎹"}
            </div>
          ) : (
            <img
              src={currentTrack.thumb}
              alt={currentTrack.title}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? "scale-110" : "scale-100"}`}
            />
          )}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
            <button
              type="button"
              aria-label={isPlaying ? t("music.pause") : t("music.play")}
              onClick={(e) => {
                e.stopPropagation();
                handlePlayPause(e);
              }}
              className="p-1 text-white hover:text-accent transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-3 h-3 fill-current" />
              ) : (
                <Play className="w-3 h-3 fill-current ml-[2px]" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start max-w-[120px] overflow-hidden text-left">
          <span className="text-[10px] font-bold text-white truncate w-full uppercase tracking-widest leading-tight">
            {currentTrack.title}
          </span>
          <span className="text-[8px] text-white/50 truncate w-full font-mono uppercase tracking-widest leading-tight">
            {currentTrack.artist}
          </span>
        </div>

        <div className="ml-2 flex gap-[2px] items-end h-3 w-3">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-[2px] rounded-t-[1px] ${isPlaying ? (currentTrack.isGenerative ? "bg-accent" : "bg-cyan-400") : "bg-white/20"}`}
              animate={{ height: isPlaying ? ["20%", "100%", "40%", "80%", "20%"] : "20%" }}
              transition={{ repeat: Infinity, duration: 0.5 + i * 0.1, ease: "easeInOut" }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
