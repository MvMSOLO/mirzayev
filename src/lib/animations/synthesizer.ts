/**
 * Multi-phase Sound Synthesizer via Web Audio API.
 * Synthesizes dynamic soundscapes during universe state transitions
 * without requiring external bulky audio asset downloads.
 *
 * Includes:
 *  - Organic resonant hums for the Kinetic theme.
 *  - Ethereal resonant sweeps and wind filters for the Creative theme.
 *  - Real-time bubbles/swirl frequency shifts during liquid dragging.
 *  - Sparkling FM/subtractive crystal notes during the crystallization reveal phase.
 */

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private currentHumOsc: OscillatorNode | null = null;
  private currentHumGain: GainNode | null = null;

  constructor() {
    // Lazy initialized on first user interaction to satisfy browser security policies
  }

  private initCtx() {
    if (this.ctx) return;
    const CtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!CtxClass) return;

    try {
      this.ctx = new CtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn("Failed to initialize Web Audio API:", e);
    }
  }

  private isMuted(): boolean {
    if (typeof window === "undefined") return true;
    try {
      const stored = localStorage.getItem("sound_muted");
      return stored === "true";
    } catch {
      return true;
    }
  }

  /**
   * Generates a sub-frequency deconstruct rumble sound.
   */
  public playDeconstructRumble() {
    if (this.isMuted()) return;
    this.initCtx();
    const ctx = this.ctx;
    const master = this.masterGain;
    if (!ctx || !master) return;

    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(65, ctx.currentTime); // C2 Note
    osc.frequency.linearRampToValueAtTime(35, ctx.currentTime + 1.2);

    osc2.type = "square";
    osc2.frequency.setValueAtTime(65.4, ctx.currentTime); // Slight detune
    osc2.frequency.linearRampToValueAtTime(32, ctx.currentTime + 1.2);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(150, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 1.0);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(master);

    osc.start(ctx.currentTime);
    osc2.start(ctx.currentTime);

    osc.stop(ctx.currentTime + 1.2);
    osc2.stop(ctx.currentTime + 1.2);
  }

  /**
   * Starts a continuous ambient flow hum that can be frequency-modulated.
   */
  public startAmbientHum(freq: number = 110) {
    if (this.isMuted()) return;
    this.initCtx();
    const ctx = this.ctx;
    const master = this.masterGain;
    if (!ctx || !master) return;

    if (ctx.state === "suspended") ctx.resume();
    this.stopAmbientHum();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(220, ctx.currentTime);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);

    osc.start(ctx.currentTime);

    this.currentHumOsc = osc;
    this.currentHumGain = gain;
  }

  /**
   * Modulates the active ambient hum frequency based on a ratio (e.g. mouse drag speed).
   */
  public modulateHum(ratio: number) {
    if (this.isMuted() || !this.ctx || !this.currentHumOsc) return;
    const baseFreq = 110;
    const targetFreq = baseFreq + ratio * 150;

    this.currentHumOsc.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.15);
  }

  /**
   * Stops the active hum.
   */
  public stopAmbientHum() {
    if (!this.ctx) return;
    const osc = this.currentHumOsc;
    const gain = this.currentHumGain;

    if (gain && osc) {
      try {
        gain.gain.setValueAtTime(gain.gain.value, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
        setTimeout(() => {
          try {
            osc.stop();
          } catch {}
        }, 350);
      } catch {}
    }

    this.currentHumOsc = null;
    this.currentHumGain = null;
  }

  /**
   * Dynamic bubble drop chirp for swiping/dragging during liquid phase.
   */
  public playBubbleChirp(px: number, py: number) {
    if (this.isMuted()) return;
    this.initCtx();
    const ctx = this.ctx;
    const master = this.masterGain;
    if (!ctx || !master) return;

    const baseFreq = 400 + px * 600;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(master);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  }

  /**
   * Volumetric sweep riser for the Flash/Rebuild reconstruction phase.
   */
  public playWormholeSweep() {
    if (this.isMuted()) return;
    this.initCtx();
    const ctx = this.ctx;
    const master = this.masterGain;
    if (!ctx || !master) return;

    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.2);

    filter.type = "bandpass";
    filter.Q.setValueAtTime(3, ctx.currentTime);
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 1.2);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  }

  /**
   * Crystal sparkles (arpeggiated bells) representing final crystalline reconstruction.
   */
  public playCrystallizeSparkles() {
    if (this.isMuted()) return;
    this.initCtx();
    const ctx = this.ctx;
    const master = this.masterGain;
    if (!ctx || !master) return;

    const notes = [523.25, 659.25, 783.99, 987.77, 1174.66]; // C E G B D (C Major 9th arpeggio)
    const delayStep = 0.08;

    notes.forEach((freq, idx) => {
      const time = ctx.currentTime + idx * delayStep;
      const osc = ctx.createOscillator();
      const oscMod = ctx.createOscillator(); // FM modulator for metallic ring
      const modGain = ctx.createGain();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);

      oscMod.type = "sine";
      oscMod.frequency.setValueAtTime(freq * 1.5, time); // Ring modulator ratio

      modGain.gain.setValueAtTime(freq * 0.4, time);
      modGain.gain.exponentialRampToValueAtTime(0.1, time + 0.35);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.04, time + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

      oscMod.connect(modGain);
      modGain.connect(osc.frequency); // Frequency Modulation
      osc.connect(gain);
      gain.connect(master);

      oscMod.start(time);
      osc.start(time);

      oscMod.stop(time + 0.4);
      osc.stop(time + 0.4);
    });
  }
}

export const transitionSynth = new SoundSynthesizer();
export default transitionSynth;
