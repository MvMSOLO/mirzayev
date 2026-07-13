/**
 * Multi-dimensional Spring Physics Engine
 * Handles high-fidelity, elastic physics animations for floating coordinates,
 * magnetic UI components, and liquid boundaries.
 *
 * Uses Euler integration to compute spring forces in real time.
 * Formula: Force = -stiffness * (position - target) - damping * velocity
 */

export interface SpringConfig {
  stiffness: number; // Spring tension
  damping: number; // Air resistance / friction
  mass: number; // Inertia factor
  precision?: number; // Stop calculation threshold
}

export const SPRING_PRESETS = {
  gentle: { stiffness: 120, damping: 14, mass: 1 },
  bouncy: { stiffness: 180, damping: 12, mass: 0.8 },
  wobbly: { stiffness: 220, damping: 10, mass: 0.6 },
  stiff: { stiffness: 300, damping: 28, mass: 1 },
  magnetic: { stiffness: 400, damping: 18, mass: 0.5 },
};

export class Spring {
  public value: number;
  public target: number;
  public velocity: number;

  private stiffness: number;
  private damping: number;
  private mass: number;
  private precision: number;

  constructor(
    initialValue: number,
    config: SpringConfig = SPRING_PRESETS.gentle
  ) {
    this.value = initialValue;
    this.target = initialValue;
    this.velocity = 0;

    this.stiffness = config.stiffness;
    this.damping = config.damping;
    this.mass = config.mass;
    this.precision = config.precision ?? 0.001;
  }

  public setTarget(newTarget: number) {
    this.target = newTarget;
  }

  public setValue(newValue: number) {
    this.value = newValue;
    this.velocity = 0;
  }

  /**
   * Advances the physical spring state by dt seconds.
   */
  public update(dt: number = 0.016): boolean {
    const displacement = this.value - this.target;

    // Spring Force hooke's law: F = -k*x
    const springForce = -this.stiffness * displacement;

    // Damping Force: F = -c*v
    const dampingForce = -this.damping * this.velocity;

    // Acceleration: a = F/m
    const acceleration = (springForce + dampingForce) / this.mass;

    // Euler-Cromer integration (more stable than plain Euler)
    this.velocity += acceleration * dt;
    this.value += this.velocity * dt;

    // Check if the system has fully settled
    const isAtRest =
      Math.abs(this.value - this.target) < this.precision &&
      Math.abs(this.velocity) < this.precision;

    if (isAtRest) {
      this.value = this.target;
      this.velocity = 0;
      return false; // Not moving
    }

    return true; // Still active
  }
}

/**
 * 2D Spring Vector (X, Y)
 */
export class Spring2D {
  public x: Spring;
  public y: Spring;

  constructor(initialX: number, initialY: number, config?: SpringConfig) {
    this.x = new Spring(initialX, config);
    this.y = new Spring(initialY, config);
  }

  public setTarget(tx: number, ty: number) {
    this.x.setTarget(tx);
    this.y.setTarget(ty);
  }

  public setValue(vx: number, vy: number) {
    this.x.setValue(vx);
    this.y.setValue(vy);
  }

  public update(dt: number = 0.016): boolean {
    const mx = this.x.update(dt);
    const my = this.y.update(dt);
    return mx || my;
  }

  public get value(): { x: number; y: number } {
    return { x: this.x.value, y: this.y.value };
  }
}
