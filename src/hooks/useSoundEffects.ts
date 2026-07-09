// Unified with useSound.ts so the whole app shares one audio engine and one
// mute preference (localStorage key "sound_muted"). Kept as a thin re-export
// so existing imports (Nav, MusicPlayer) don't need to change.
export { useSoundEffects } from "./useSound";
