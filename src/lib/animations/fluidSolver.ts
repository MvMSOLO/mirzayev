/**
 * High-performance 2D Navier-Stokes Fluid Dynamics Simulation
 * Based on Jos Stam's "Real-Time Fluid Dynamics for Games" and adapted for
 * modern, highly interactive creative web applications.
 *
 * Features:
 *  - Incompressible flow simulation (mass conservation via Poisson equation solver).
 *  - Real-time mouse/pointer force application (velocity injection and dye addition).
 *  - Hybrid grid-particle advection: thousands of dynamic stardust particles drift along
 *    the velocity fields, creating organic vortices and smooth flow trails.
 *  - Multi-dye color interpolation to transition between "Kinetic" and "Creative" palettes.
 */

export class FluidSimulation {
  private size: number;
  private numCells: number;
  private dt: number;
  private diff: number;
  private visc: number;

  // Fluid fields: current and previous states
  private s: Float32Array; // Density (dye) source
  private density: Float32Array; // Density (dye) current

  private Vx: Float32Array; // Velocity X current
  private Vy: Float32Array; // Velocity Y current

  private Vx0: Float32Array; // Velocity X previous
  private Vy0: Float32Array; // Velocity Y previous

  // Hybrid flow particles
  public particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    age: number;
    life: number;
    color: string;
    size: number;
  }> = [];

  constructor(size: number = 64, diffusion: number = 0.0001, viscosity: number = 0.0001, dt: number = 0.1) {
    this.size = size;
    this.numCells = (size + 2) * (size + 2);
    this.dt = dt;
    this.diff = diffusion;
    this.visc = viscosity;

    this.s = new Float32Array(this.numCells);
    this.density = new Float32Array(this.numCells);

    this.Vx = new Float32Array(this.numCells);
    this.Vy = new Float32Array(this.numCells);

    this.Vx0 = new Float32Array(this.numCells);
    this.Vy0 = new Float32Array(this.numCells);
  }

  // Linear index calculation with boundary safety
  private IX(x: number, y: number): number {
    const clampedX = Math.max(0, Math.min(this.size + 1, x));
    const clampedY = Math.max(0, Math.min(this.size + 1, y));
    return clampedX + clampedY * (this.size + 2);
  }

  /**
   * Adds density/dye into the simulation at a given cellular coordinate.
   */
  public addDensity(x: number, y: number, amount: number) {
    const idx = this.IX(x, y);
    this.density[idx] = Math.min(255, this.density[idx] + amount);
  }

  /**
   * Injects velocity into the fluid field at a given cell.
   */
  public addVelocity(x: number, y: number, amountX: number, amountY: number) {
    const idx = this.IX(x, y);
    this.Vx[idx] += amountX;
    this.Vy[idx] += amountY;
  }

  /**
   * Boundary handler to simulate solid walls or wrap-around boundaries.
   * b = 1: bounce X velocity
   * b = 2: bounce Y velocity
   * b = 0: normal scalar bounce (density)
   */
  private setBoundary(b: number, xArr: Float32Array) {
    const N = this.size;

    // Set edges
    for (let i = 1; i <= N; i++) {
      xArr[this.IX(i, 0)] = b === 2 ? -xArr[this.IX(i, 1)] : xArr[this.IX(i, 1)];
      xArr[this.IX(i, N + 1)] = b === 2 ? -xArr[this.IX(i, N)] : xArr[this.IX(i, N)];
      xArr[this.IX(0, i)] = b === 1 ? -xArr[this.IX(1, i)] : xArr[this.IX(1, i)];
      xArr[this.IX(N + 1, i)] = b === 1 ? -xArr[this.IX(N, i)] : xArr[this.IX(N, i)];
    }

    // Set corners as averages of neighboring edges
    xArr[this.IX(0, 0)] = 0.5 * (xArr[this.IX(1, 0)] + xArr[this.IX(0, 1)]);
    xArr[this.IX(0, N + 1)] = 0.5 * (xArr[this.IX(1, N + 1)] + xArr[this.IX(0, N)]);
    xArr[this.IX(N + 1, 0)] = 0.5 * (xArr[this.IX(N, 0)] + xArr[this.IX(N + 1, 1)]);
    xArr[this.IX(N + 1, N + 1)] = 0.5 * (xArr[this.IX(N, N + 1)] + xArr[this.IX(N + 1, N)]);
  }

  /**
   * Iterative Gauss-Seidel relaxation solver for diffusion and Poisson pressure equations.
   */
  private linearSolve(b: number, x: Float32Array, x0: Float32Array, a: number, c: number) {
    const cRecip = 1.0 / c;
    const N = this.size;
    const iterations = 16; // Balance between speed and visual quality

    for (let k = 0; k < iterations; k++) {
      for (let j = 1; j <= N; j++) {
        for (let i = 1; i <= N; i++) {
          x[this.IX(i, j)] =
            (x0[this.IX(i, j)] +
              a *
                (x[this.IX(i + 1, j)] +
                  x[this.IX(i - 1, j)] +
                  x[this.IX(i, j + 1)] +
                  x[this.IX(i, j - 1)])) *
            cRecip;
        }
      }
      this.setBoundary(b, x);
    }
  }

  /**
   * Diffuses density or velocity fields across cells over time.
   */
  private diffuse(b: number, x: Float32Array, x0: Float32Array, diff: number) {
    const N = this.size;
    const a = this.dt * diff * N * N;
    this.linearSolve(b, x, x0, a, 1 + 4 * a);
  }

  /**
   * Project method: Enforces incompressibility (divergence-free flow).
   * This is what creates beautiful circular vortices and swirling eddies,
   * by solving the Poisson pressure equation and subtracting pressure gradient from velocity.
   */
  private project(velocX: Float32Array, velocY: Float32Array, p: Float32Array, div: Float32Array) {
    const N = this.size;

    for (let j = 1; j <= N; j++) {
      for (let i = 1; i <= N; i++) {
        div[this.IX(i, j)] =
          (-0.5 *
            (velocX[this.IX(i + 1, j)] -
              velocX[this.IX(i - 1, j)] +
              velocY[this.IX(i, j + 1)] -
              velocY[this.IX(i, j - 1)])) /
          N;
        p[this.IX(i, j)] = 0;
      }
    }

    this.setBoundary(0, div);
    this.setBoundary(0, p);
    this.linearSolve(0, p, div, 1, 4);

    for (let j = 1; j <= N; j++) {
      for (let i = 1; i <= N; i++) {
        velocX[this.IX(i, j)] -= 0.5 * N * (p[this.IX(i + 1, j)] - p[this.IX(i - 1, j)]);
        velocY[this.IX(i, j)] -= 0.5 * N * (p[this.IX(i, j + 1)] - p[this.IX(i, j - 1)]);
      }
    }

    this.setBoundary(1, velocX);
    this.setBoundary(2, velocY);
  }

  /**
   * Advection: Traces fluid values backwards in time along the velocity vectors
   * to find their original source cells (Semi-Lagrangian method).
   */
  private advect(b: number, d: Float32Array, d0: Float32Array, velocX: Float32Array, velocY: Float32Array) {
    const N = this.size;
    let i0, i1, j0, j1;

    const dtx = this.dt * N;
    const dty = this.dt * N;

    let s0, s1, t0, t1;
    let tmp1, tmp2, x, y;

    const Nfloat = N;
    let ifloat, jfloat;

    for (let j = 1; j <= N; j++) {
      jfloat = j;
      for (let i = 1; i <= N; i++) {
        ifloat = i;
        tmp1 = dtx * velocX[this.IX(i, j)];
        tmp2 = dty * velocY[this.IX(i, j)];
        x = ifloat - tmp1;
        y = jfloat - tmp2;

        if (x < 0.5) x = 0.5;
        if (x > Nfloat + 0.5) x = Nfloat + 0.5;
        i0 = Math.floor(x);
        i1 = i0 + 1;

        if (y < 0.5) y = 0.5;
        if (y > Nfloat + 0.5) y = Nfloat + 0.5;
        j0 = Math.floor(y);
        j1 = j0 + 1;

        s1 = x - i0;
        s0 = 1 - s1;
        t1 = y - j0;
        t0 = 1 - t1;

        d[this.IX(i, j)] =
          s0 * (t0 * d0[this.IX(i0, j0)] + t1 * d0[this.IX(i0, j1)]) +
          s1 * (t0 * d0[this.IX(i1, j0)] + t1 * d0[this.IX(i1, j1)]);
      }
    }
    this.setBoundary(b, d);
  }

  /**
   * Advances the fluid simulation by one time-step.
   */
  public step() {
    const visc = this.visc;
    const diff = this.diff;
    const vX = this.Vx;
    const vY = this.Vy;
    const vX0 = this.Vx0;
    const vY0 = this.Vy0;
    const dens = this.density;
    const dens0 = this.s;

    // Diffuse & Project velocity fields
    this.diffuse(1, vX0, vX, visc);
    this.diffuse(2, vY0, vY, visc);
    this.project(vX0, vY0, vX, vY);

    // Advect velocity fields along themselves
    this.advect(1, vX, vX0, vX0, vY0);
    this.advect(2, vY, vY0, vX0, vY0);
    this.project(vX, vY, vX0, vY0);

    // Diffuse & Advect density field (the dye)
    this.diffuse(0, dens0, dens, diff);
    this.advect(0, dens, dens0, vX, vY);

    // Fade density slowly to prevent stagnant pools of dye
    for (let i = 0; i < this.numCells; i++) {
      this.density[i] *= 0.985;
    }

    // Step dynamic particles along the velocity grid
    this.updateParticles();
  }

  /**
   * Retrieves fluid velocity at screen normalized coordinate (0-1).
   */
  public getVelocityAt(nx: number, ny: number): { vx: number; vy: number } {
    const x = Math.floor(nx * this.size) + 1;
    const y = Math.floor(ny * this.size) + 1;
    const idx = this.IX(x, y);
    return {
      vx: this.Vx[idx] || 0,
      vy: this.Vy[idx] || 0,
    };
  }

  /**
   * Spawns flow-following particles.
   */
  public spawnParticle(x: number, y: number, color: string, life: number = 100) {
    this.particles.push({
      x,
      y,
      vx: 0,
      vy: 0,
      age: 0,
      life: life + Math.random() * 40,
      color,
      size: 0.8 + Math.random() * 1.5,
    });
  }

  /**
   * Updates dynamic flow particles following the fluid's velocity vectors.
   */
  private updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.age++;

      if (p.age >= p.life) {
        this.particles.splice(i, 1);
        continue;
      }

      // Sample velocity from grid
      const vel = this.getVelocityAt(p.x, p.y);

      // Apply inert force + fluid force
      p.vx = p.vx * 0.8 + vel.vx * 0.04;
      p.vy = p.vy * 0.8 + vel.vy * 0.04;

      p.x += p.vx;
      p.y += p.vy;

      // Bounce/Wrap borders
      if (p.x < 0) p.x = 1;
      if (p.x > 1) p.x = 0;
      if (p.y < 0) p.y = 1;
      if (p.y > 1) p.y = 0;
    }
  }

  /**
   * Custom renderer: draws fluid density and floating stardust particles onto a 2D canvas.
   */
  public draw(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    primaryColor: { r: number; g: number; b: number },
    secondaryColor: { r: number; g: number; b: number }
  ) {
    const size = this.size;
    const cellW = width / size;
    const cellH = height / size;

    // Render continuous flow grid via density mapping
    for (let y = 1; y <= size; y++) {
      for (let x = 1; x <= size; x++) {
        const d = this.density[this.IX(x, y)];
        if (d > 0.4) {
          const alpha = Math.min(d / 45, 0.45);

          // Interpolate fluid color depending on localized density and turbulence
          const interpRatio = Math.min(1, d / 120);
          const r = Math.round(primaryColor.r * (1 - interpRatio) + secondaryColor.r * interpRatio);
          const g = Math.round(primaryColor.g * (1 - interpRatio) + secondaryColor.g * interpRatio);
          const b = Math.round(primaryColor.b * (1 - interpRatio) + secondaryColor.b * interpRatio);

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.fillRect(
            Math.round((x - 1) * cellW),
            Math.round((y - 1) * cellH),
            Math.ceil(cellW),
            Math.ceil(cellH)
          );
        }
      }
    }

    // Render dynamic stardust flow particles
    ctx.shadowBlur = 0;
    for (const p of this.particles) {
      const px = p.x * width;
      const py = p.y * height;
      const lifeRatio = 1 - p.age / p.life;

      ctx.fillStyle = p.color;
      ctx.globalAlpha = lifeRatio * 0.75;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
  }
}
