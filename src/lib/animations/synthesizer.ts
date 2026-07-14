/**
 * Multi-phase Sound Synthesizer via Web Audio API.
 * Synthesizes dynamic soundscapes during universe state transitions
 * and offers a library of 52 custom-crafted satisfying sound effects,
 * as well as a generative background ambient synthesizer loop.
 *
 * Includes:
 *  - Organic resonant hums for the Kinetic theme.
 *  - Ethereal resonant sweeps and wind filters for the Creative theme.
 *  - Real-time bubbles/swirl frequency shifts during liquid dragging.
 *  - Sparkling FM/subtractive crystal notes during the crystallization reveal phase.
 *  - **52 Unique Synthesized Sound Effects** (24 piano keys, 10 sci-fi FX, 10 retro arcade FX, 8 satisfying UX FX).
 *  - **Generative Background Ambient Synthesizer Loop** with a real-time AnalyserNode.
 */

class SoundSynthesizer {
  public ctx: AudioContext | null = null;
  public masterGain: GainNode | null = null;
  public analyser: AnalyserNode | null = null;
  private currentHumOsc: OscillatorNode | null = null;
  private currentHumGain: GainNode | null = null;

  // Generative ambient variables
  private ambientActive = false;
  private ambientIntervalId: any = null;
  private ambientNodes: AudioNode[] = [];
  private ambientStep = 0;

  constructor() {
    // Lazy initialized on first user interaction to satisfy browser security policies
  }

  public initCtx() {
    if (this.ctx) return;
    const CtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!CtxClass) return;

    try {
      this.ctx = new CtxClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
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
   * Helper to create a noise buffer
   */
  private getNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null;
    try {
      const bufferSize = this.ctx.sampleRate * 2; // 2 seconds of noise
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      return buffer;
    } catch (e) {
      return null;
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

  /**
   * PLAYS ONE OF THE 52 SATISFYING SYNTHESIZED SOUND EFFECTS
   *
   * Index breakdown:
   *  - 0 to 23: Double Octave Synthesizer Piano Keys (C3 to B4)
   *  - 24 to 33: Sci-Fi Cyber FX
   *  - 34 to 43: 8-Bit Retro Arcade FX
   *  - 44 to 51: Satisfying UI & Environmental FX
   */
  public playSynthesis(index: number) {
    if (this.isMuted()) return;
    this.initCtx();
    const ctx = this.ctx;
    const master = this.masterGain;
    if (!ctx || !master) return;

    if (ctx.state === "suspended") ctx.resume();

    // Clamp index to 0 - 51
    const idx = Math.max(0, Math.min(51, index));

    // Category 1: 24 Double Octave Synthesizer Piano Keys (0 - 23)
    if (idx < 24) {
      // Base frequency of C3 (130.81 Hz), scaling up logarithmically
      const freq = 130.81 * Math.pow(2, idx / 12);

      const osc = ctx.createOscillator();
      const oscDetuned = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // detuned saw helper for rich analog buzz
      oscDetuned.type = "sine";
      oscDetuned.frequency.setValueAtTime(freq * 1.005, ctx.currentTime);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(freq * 4, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(freq * 1.2, ctx.currentTime + 0.4);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

      osc.connect(filter);
      oscDetuned.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      osc.start(ctx.currentTime);
      oscDetuned.start(ctx.currentTime);

      osc.stop(ctx.currentTime + 0.5);
      oscDetuned.stop(ctx.currentTime + 0.5);
      return;
    }

    // Category 2: Sci-Fi Cyber FX (24 - 33)
    if (idx >= 24 && idx < 34) {
      const sfi = idx - 24;
      switch (sfi) {
        case 0: { // laser-blast
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(1200, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.28);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.28);
          break;
        }
        case 1: { // hyperspace-warp
          const osc = ctx.createOscillator();
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(120, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 1.1);
          lfo.frequency.setValueAtTime(13, ctx.currentTime); // 13Hz vibrato
          lfoGain.gain.setValueAtTime(60, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          osc.connect(gain);
          gain.connect(master);
          lfo.start(ctx.currentTime);
          osc.start(ctx.currentTime);
          lfo.stop(ctx.currentTime + 1.1);
          osc.stop(ctx.currentTime + 1.1);
          break;
        }
        case 2: { // shield-charge
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(180, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.85);
          filter.type = "peaking";
          filter.frequency.setValueAtTime(400, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.6);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.85);
          break;
        }
        case 3: { // alien-chatter
          const osc = ctx.createOscillator();
          const modulator = ctx.createOscillator();
          const modGain = ctx.createGain();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(750, ctx.currentTime);
          modulator.frequency.setValueAtTime(260, ctx.currentTime);
          modGain.gain.setValueAtTime(450, ctx.currentTime);
          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
          modulator.connect(modGain);
          modGain.connect(osc.frequency);
          osc.connect(gain);
          gain.connect(master);
          modulator.start(ctx.currentTime);
          osc.start(ctx.currentTime);
          modulator.stop(ctx.currentTime + 0.25);
          osc.stop(ctx.currentTime + 0.25);
          break;
        }
        case 4: { // sub-impact
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(90, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(25, ctx.currentTime + 0.7);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.75);
          break;
        }
        case 5: { // radar-ping
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(1450, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.45);

          // Delayed Echoes
          setTimeout(() => {
            if (this.isMuted() || !this.ctx) return;
            const echoOsc = this.ctx.createOscillator();
            const echoGain = this.ctx.createGain();
            echoOsc.type = "sine";
            echoOsc.frequency.setValueAtTime(1450, this.ctx.currentTime);
            echoGain.gain.setValueAtTime(0.02, this.ctx.currentTime);
            echoGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
            echoOsc.connect(echoGain);
            echoGain.connect(master);
            echoOsc.start(this.ctx.currentTime);
            echoOsc.stop(this.ctx.currentTime + 0.3);
          }, 160);
          break;
        }
        case 6: { // digital-disruption
          const duration = 0.32;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);

          // Fast pitch jumps
          const steps = 12;
          for (let i = 0; i < steps; i++) {
            const timeOffset = (i / steps) * duration;
            osc.frequency.setValueAtTime(100 + Math.random() * 3200, ctx.currentTime + timeOffset);
          }
          osc.stop(ctx.currentTime + duration);
          break;
        }
        case 7: { // gravity-anomaly
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(75, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.3);
          osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.6);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.6);
          break;
        }
        case 8: { // matter-phasing
          const osc = ctx.createOscillator();
          const tremolo = ctx.createOscillator();
          const tremoloGain = ctx.createGain();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(380, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(980, ctx.currentTime + 0.5);
          tremolo.frequency.setValueAtTime(18, ctx.currentTime); // 18Hz amplitude ring
          tremoloGain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          tremolo.connect(tremoloGain);
          tremoloGain.connect(gain.gain);
          osc.connect(gain);
          gain.connect(master);
          tremolo.start(ctx.currentTime);
          osc.start(ctx.currentTime);
          tremolo.stop(ctx.currentTime + 0.5);
          osc.stop(ctx.currentTime + 0.5);
          break;
        }
        case 9: { // hologram-flicker
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(290, ctx.currentTime);
          gain.gain.setValueAtTime(0.06, ctx.currentTime);
          gain.gain.setValueAtTime(0.01, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.05, ctx.currentTime + 0.14);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.3);
          break;
        }
      }
      return;
    }

    // Category 3: 8-Bit Retro Arcade FX (34 - 43)
    if (idx >= 34 && idx < 44) {
      const rti = idx - 34;
      switch (rti) {
        case 0: { // coin-chime
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5 Note
          osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6 Note
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.01);
          gain.gain.setValueAtTime(0.07, ctx.currentTime + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.28);
          break;
        }
        case 1: { // player-jump
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(150, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 0.16);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.16);
          break;
        }
        case 2: { // powerup-tune
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.05); // E5
          osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.10); // G5
          osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.15); // C6
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.01);
          gain.gain.setValueAtTime(0.06, ctx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.32);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.32);
          break;
        }
        case 3: { // enemy-hit
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(250, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.12);
          filter.type = "bandpass";
          filter.frequency.setValueAtTime(600, ctx.currentTime);
          gain.gain.setValueAtTime(0.12, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.12);
          break;
        }
        case 4: { // game-over
          const notes = [493.88, 392.00, 329.63, 311.13]; // B4, G4, E4, D#4
          const noteDur = 0.16;
          notes.forEach((freq, i) => {
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "square";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * noteDur);
            gain.gain.setValueAtTime(0, ctx.currentTime + i * noteDur);
            gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + i * noteDur + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (i + 1) * noteDur);
            osc.connect(gain);
            gain.connect(master);
            osc.start(ctx.currentTime + i * noteDur);
            osc.stop(ctx.currentTime + (i + 1) * noteDur);
          });
          break;
        }
        case 5: { // lazer-gun
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(780, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.12);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.12);
          break;
        }
        case 6: { // teleport-in
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "square";
          const subNotes = [523.25, 1046.50, 587.33, 1174.66, 659.25, 1318.51, 698.46, 1396.91];
          subNotes.forEach((freq, idx) => {
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.03);
          });
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.25);
          break;
        }
        case 7: { // heartbeat-low
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(55, ctx.currentTime);
          filter.type = "lowpass";
          filter.frequency.setValueAtTime(100, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

          gain.gain.setValueAtTime(0, ctx.currentTime + 0.2);
          gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.22);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.4);
          break;
        }
        case 8: { // synth-snare
          const noiseBuffer = this.getNoiseBuffer();
          if (!noiseBuffer) return;
          const noise = ctx.createBufferSource();
          noise.buffer = noiseBuffer;
          const noiseFilter = ctx.createBiquadFilter();
          const noiseGain = ctx.createGain();

          noiseFilter.type = "bandpass";
          noiseFilter.frequency.setValueAtTime(1200, ctx.currentTime);

          noiseGain.gain.setValueAtTime(0.12, ctx.currentTime);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

          noise.connect(noiseFilter);
          noiseFilter.connect(noiseGain);
          noiseGain.connect(master);
          noise.start(ctx.currentTime);
          noise.stop(ctx.currentTime + 0.16);
          break;
        }
        case 9: { // sparkle-magic
          const steps = 6;
          for (let i = 0; i < steps; i++) {
            const time = ctx.currentTime + i * 0.04;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(1000 + i * 280, time);
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.04, time + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
            osc.connect(gain);
            gain.connect(master);
            osc.start(time);
            osc.stop(time + 0.22);
          }
          break;
        }
      }
      return;
    }

    // Category 4: Satisfying UI & Environmental UX FX (44 - 51)
    if (idx >= 44) {
      const uii = idx - 44;
      switch (uii) {
        case 0: { // bubble-pop
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(320, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1150, ctx.currentTime + 0.04);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.04);
          break;
        }
        case 1: { // woody-tock
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(210, ctx.currentTime);
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.004);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          osc.connect(gain);
          gain.connect(master);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.05);
          break;
        }
        case 2: { // metal-ping
          const osc = ctx.createOscillator();
          const fm = ctx.createOscillator();
          const fmGain = ctx.createGain();
          const gain = ctx.createGain();

          osc.type = "sine";
          osc.frequency.setValueAtTime(2400, ctx.currentTime);

          fm.type = "sine";
          fm.frequency.setValueAtTime(1400, ctx.currentTime);
          fmGain.gain.setValueAtTime(600, ctx.currentTime);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.005);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);

          fm.connect(fmGain);
          fmGain.connect(osc.frequency);
          osc.connect(gain);
          gain.connect(master);

          fm.start(ctx.currentTime);
          osc.start(ctx.currentTime);

          fm.stop(ctx.currentTime + 0.75);
          osc.stop(ctx.currentTime + 0.75);
          break;
        }
        case 3: { // paper-slide
          const noiseBuffer = this.getNoiseBuffer();
          if (!noiseBuffer) return;
          const noise = ctx.createBufferSource();
          noise.buffer = noiseBuffer;
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          filter.type = "bandpass";
          filter.frequency.setValueAtTime(750, ctx.currentTime);
          filter.frequency.linearRampToValueAtTime(850, ctx.currentTime + 0.28);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.1);
          gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.28);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(master);

          noise.start(ctx.currentTime);
          noise.stop(ctx.currentTime + 0.28);
          break;
        }
        case 4: { // success-bell
          const freqs = [523.25, 659.25, 783.99, 987.77]; // C5, E5, G5, B5 (C Major 7th)
          freqs.forEach((freq, idx) => {
            if (!ctx) return;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.02);
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + idx * 0.02 + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6 + idx * 0.02);
            osc.connect(gain);
            gain.connect(master);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.65);
          });
          break;
        }
        case 5: { // error-buzz
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          osc1.type = "sawtooth";
          osc1.frequency.setValueAtTime(130, ctx.currentTime);

          osc2.type = "sawtooth";
          osc2.frequency.setValueAtTime(132, ctx.currentTime); // detuned buzz

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(280, ctx.currentTime);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);

          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(master);

          osc1.start(ctx.currentTime);
          osc2.start(ctx.currentTime);

          osc1.stop(ctx.currentTime + 0.22);
          osc2.stop(ctx.currentTime + 0.22);
          break;
        }
        case 6: { // scanner-beam
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          osc.type = "triangle";
          osc.frequency.setValueAtTime(400, ctx.currentTime);
          osc.frequency.linearRampToValueAtTime(900, ctx.currentTime + 0.15);
          osc.frequency.linearRampToValueAtTime(300, ctx.currentTime + 0.3);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(800, ctx.currentTime);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(master);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.3);
          break;
        }
        case 7: { // ambient-ocean
          const noiseBuffer = this.getNoiseBuffer();
          if (!noiseBuffer) return;
          const noise = ctx.createBufferSource();
          noise.buffer = noiseBuffer;
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(150, ctx.currentTime);
          filter.frequency.linearRampToValueAtTime(450, ctx.currentTime + 0.6);
          filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 1.2);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.5);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.25);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(master);

          noise.start(ctx.currentTime);
          noise.stop(ctx.currentTime + 1.25);
          break;
        }
      }
    }
  }

  /**
   * GENERATIVE BACKGROUND AMBIENT SYNTHESIZER LOOP
   * Creates a live generative audio-reactive stream
   */
  public isAmbientActive(): boolean {
    return this.ambientActive;
  }

  public startGenerativeAmbient() {
    if (this.ambientActive) return;
    this.ambientActive = true;
    this.initCtx();
    const ctx = this.ctx;
    const master = this.masterGain;
    if (!ctx || !master) return;

    if (ctx.state === "suspended") ctx.resume();

    // Reset loop index
    this.ambientStep = 0;
    this.ambientNodes = [];

    // Trigger immediate notes
    this.triggerAmbientTick();

    // Schedule tick every 1.5 seconds
    this.ambientIntervalId = setInterval(() => {
      this.triggerAmbientTick();
    }, 1500);
  }

  private triggerAmbientTick() {
    if (!this.ambientActive || this.isMuted() || !this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const master = this.masterGain;

    try {
      const step = this.ambientStep;
      this.ambientStep = (this.ambientStep + 1) % 16;

      // 1. DRONE PAD CHORDS (Plays on step 0, 4, 8, 12)
      if (step % 4 === 0) {
        const chords = [
          [130.81, 164.81, 196.00, 246.94], // C3 - E3 - G3 - B3 (Cmaj7)
          [146.83, 174.61, 220.00, 261.63], // D3 - F3 - A3 - C4 (Dm7)
          [164.81, 196.00, 246.94, 293.66], // E3 - G3 - B3 - D4 (Em7)
          [174.61, 220.00, 261.63, 329.63], // F3 - A3 - C4 - E4 (Fmaj7)
        ];
        const activeChord = chords[Math.floor(step / 4) % chords.length];

        activeChord.forEach((freq) => {
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          const filter = ctx.createBiquadFilter();

          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(250, ctx.currentTime);

          // slow swell attack/decay
          oscGain.gain.setValueAtTime(0, ctx.currentTime);
          oscGain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 1.2);
          oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5);

          osc.connect(filter);
          filter.connect(oscGain);
          oscGain.connect(master);

          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 4.6);

          this.ambientNodes.push(osc);
        });
      }

      // 2. SOFT MELODIC ARPEGGIATOR (Plays on step 0, 2, 4, 6, 8, 10, 12, 14)
      if (step % 2 === 0) {
        const arpeggioPattern = [261.63, 329.63, 392.00, 493.88, 523.25, 493.88, 392.00, 329.63];
        const freq = arpeggioPattern[step % arpeggioPattern.length];

        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.4);

        oscGain.gain.setValueAtTime(0, ctx.currentTime);
        oscGain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.05);
        oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.65);

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(master);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.7);

        this.ambientNodes.push(osc);
      }

      // 3. LOW THUMP BEAT (Plays on step 0, 4, 8, 12)
      if (step % 4 === 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(80, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.15);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(master);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.2);

        this.ambientNodes.push(osc);
      }

      // 4. SOFT SYNTH HIGH-HAT BRUSH (Plays on step 2, 6, 10, 14)
      if (step % 4 === 2) {
        const noiseBuffer = this.getNoiseBuffer();
        if (noiseBuffer) {
          const noise = ctx.createBufferSource();
          noise.buffer = noiseBuffer;
          const filter = ctx.createBiquadFilter();
          const gain = ctx.createGain();

          filter.type = "bandpass";
          filter.frequency.setValueAtTime(8000, ctx.currentTime);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.008, ctx.currentTime + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

          noise.connect(filter);
          filter.connect(gain);
          gain.connect(master);

          noise.start(ctx.currentTime);
          noise.stop(ctx.currentTime + 0.08);
        }
      }

      // Cleanup finished ambient node references periodically
      if (this.ambientNodes.length > 50) {
        this.ambientNodes = this.ambientNodes.slice(-20);
      }
    } catch (e) {
      console.warn("Generative ambient synth loop error:", e);
    }
  }

  public stopGenerativeAmbient() {
    this.ambientActive = false;
    if (this.ambientIntervalId) {
      clearInterval(this.ambientIntervalId);
      this.ambientIntervalId = null;
    }

    // Stop active osc nodes
    this.ambientNodes.forEach((node: any) => {
      try {
        node.stop();
      } catch {}
    });
    this.ambientNodes = [];
  }
}

export const transitionSynth = new SoundSynthesizer();
export default transitionSynth;
