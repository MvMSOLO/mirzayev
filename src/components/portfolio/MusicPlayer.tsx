/* eslint-disable @typescript-eslint/no-explicit-any, no-useless-escape */
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { Search, Play, Pause, X, Music } from "lucide-react";

const TRACKS = [
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
  const { t } = useLang();
  const { playHover, playClick } = useSoundEffects();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedTracks, setSearchedTracks] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ytPlayer, setYtPlayer] = useState<any>(null);

  const playerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef(currentTrack);
  const ytInitialized = useRef(false);
  const ytInstanceRef = useRef<any>(null);

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

  // Lazily create the (invisible) YouTube player only once the user has
  // actually opened the menu — avoids loading the iframe API / spinning up a
  // player instance for every visitor who never touches the music feature.
  const ensureYouTubePlayer = () => {
    if (ytInitialized.current || typeof window === "undefined") return;
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
            setIsPlaying(e.data === YT.PlayerState.PLAYING);
          },
        },
      });
    });
  };

  useEffect(() => {
    if (isMenuOpen) ensureYouTubePlayer();
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      if (ytInstanceRef.current?.destroy) {
        ytInstanceRef.current.destroy();
      }
    };
  }, []);

  // Web Media Session API to register active background playback in Chrome and support system/keyboard media keys
  useEffect(() => {
    if (typeof window === "undefined" || !("mediaSession" in navigator)) return;

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        artwork: [
          {
            src: currentTrack.thumb,
            sizes: "120x90",
            type: "image/jpeg",
          },
          {
            src: currentTrack.thumb.replace("mqdefault", "hqdefault"),
            sizes: "480x360",
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
        if (ytPlayer && typeof ytPlayer.playVideo === "function") {
          ytPlayer.playVideo();
        } else {
          setIsPlaying(true);
        }
      });

      navigator.mediaSession.setActionHandler("pause", () => {
        if (ytPlayer && typeof ytPlayer.pauseVideo === "function") {
          ytPlayer.pauseVideo();
        } else {
          setIsPlaying(false);
        }
      });

      navigator.mediaSession.setActionHandler("stop", () => {
        if (ytPlayer && typeof ytPlayer.stopVideo === "function") {
          ytPlayer.stopVideo();
        } else {
          setIsPlaying(false);
        }
      });
    } catch (e) {
      console.warn("Failed to set MediaSession action handlers:", e);
    }
  }, [isPlaying, ytPlayer]);

  const handlePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    playClick();
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
    if (ytPlayer && typeof ytPlayer.loadVideoById === "function") {
      ytPlayer.loadVideoById(track.id);
      setIsPlaying(true);
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
      {/* Hidden YT Player - positioned offscreen and made microscopic to prevent Chrome/browser background audio suspension */}
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
            className="mb-4 w-72 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header / Search */}
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
                          {currentTrack.id === track.id && isPlaying && (
                            <div className="flex gap-[2px] items-end h-3 mr-1">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-[3px] bg-accent rounded-t-[1px]"
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
                      ))
                    : // Default TRACKS
                      TRACKS.map((track) => (
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
                          {currentTrack.id === track.id && isPlaying && (
                            <div className="flex gap-[2px] items-end h-3 mr-1">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-[3px] bg-accent rounded-t-[1px]"
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
        className="group relative flex items-center gap-3 bg-black/80 backdrop-blur-md border border-white/20 p-2 pr-4 rounded-full hover:border-accent/50 transition-colors cursor-pointer shadow-xl overflow-hidden"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-white/10">
          <img
            src={currentTrack.thumb}
            alt={currentTrack.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ${isPlaying ? "scale-110" : "scale-100"}`}
          />
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
              className={`w-[2px] rounded-t-[1px] ${isPlaying ? "bg-accent" : "bg-white/20"}`}
              animate={{ height: isPlaying ? ["20%", "100%", "40%", "80%", "20%"] : "20%" }}
              transition={{ repeat: Infinity, duration: 0.5 + i * 0.1, ease: "easeInOut" }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
