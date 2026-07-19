// ──────────────────────────────────────────────────
// Roblox Studio IDE Simulator — shared types
// ──────────────────────────────────────────────────

export type ObjectType =
  | 'Workspace' | 'Lighting' | 'ReplicatedStorage' | 'StarterGui'
  | 'StarterPack' | 'SoundService' | 'Teams' | 'Players'
  | 'Part' | 'SpawnLocation' | 'Baseplate' | 'Model' | 'Folder'
  | 'Script' | 'LocalScript' | 'ModuleScript'
  | 'Humanoid' | 'NPCModel' | 'PointLight' | 'SurfaceGui' | 'ScreenGui';

export type PartShape = 'Block' | 'Sphere' | 'Wedge' | 'Cylinder';

export interface Vec3 { x: number; y: number; z: number }
export interface Col3 { r: number; g: number; b: number } // 0-1 each

export interface StudioObject {
  id: string;
  type: ObjectType;
  name: string;
  parentId: string | null;
  properties: Record<string, unknown> & {
    Position?: Vec3;
    Size?: Vec3;
    Rotation?: Vec3;
    Color?: Col3;
    Anchored?: boolean;
    CanCollide?: boolean;
    Transparency?: number;
    Material?: string;
    Source?: string; // Script source
    BrickColor?: string;
    Locked?: boolean;
    Shape?: PartShape;
    Velocity?: Vec3; // For physics engine simulation
    Mass?: number;
    GlowIntensity?: number;
    Flicker?: boolean;
  };
  children: string[]; // child IDs ordered
}

export type RunState = 'stopped' | 'running' | 'paused';

export interface OutputLine {
  id: string;
  kind: 'print' | 'error' | 'warn' | 'info';
  text: string;
  ts: number;
}

// ── AI pending ops ──────────────────────────────────

export interface AIChange {
  objectId: string;
  objectName: string;
  property: string;
  oldValue: unknown;
  newValue: unknown;
  label: string; // human-readable description
}

export interface AIPendingOp {
  id: string;
  userMessage: string;
  aiThinking: string;
  changes: AIChange[];
  status: 'pending' | 'approved' | 'rejected';
}

// ── Toolbox presets ─────────────────────────────────

export interface PresetChildDef {
  type: ObjectType;
  name: string;
  properties: Record<string, unknown>;
  offsetParent?: Vec3; // relative offset
}

export interface Preset {
  id: string;
  name: string;
  icon: string;
  category: 'Parts' | 'Spawns' | 'NPCs' | 'Effects' | 'Scripts' | 'Models' | 'Audio' | 'UI' | 'Weapons' | 'Structures';
  properties: Record<string, unknown>;
  type: ObjectType;
  children?: PresetChildDef[];
}

// ── Studio Preferences ──────────────────────────────

export type StudioTheme = 'dark' | 'light';
export type TransformTool = 'select' | 'move' | 'scale' | 'rotate';

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  previewUrl?: string;
}
