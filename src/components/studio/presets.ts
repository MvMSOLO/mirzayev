import type { Preset, ProjectTemplate } from './types';

export const TEMPLATES: ProjectTemplate[] = [
  {
    id: 't-classic',
    name: 'Classic Baseplate',
    description: 'The standard sandbox baseplate with neutral workspace lighting and starter blocks.',
    icon: '🗺️',
  },
  {
    id: 't-neon-disco',
    name: 'Synthwave Neon Disco',
    description: 'An immersive night-time world filled with flashing neon spheres, lasers, and a color-pulsing dancefloor.',
    icon: '🌆',
  },
  {
    id: 't-obby',
    name: 'Obstacle Course (Obby)',
    description: 'A skill-based course featuring unanchored moving pillars, rotating wedges, and glowing lava blocks.',
    icon: '🏃',
  },
  {
    id: 't-physics',
    name: 'Physics Sandbox',
    description: 'A clean room featuring stacked unanchored blocks, physical spheres, and customizable gravity fields.',
    icon: '⚖️',
  },
];

export const PRESETS: Preset[] = [
  // ── PARTS ────────────────────────────────────────────
  {
    id: 'p-block',
    name: 'Block Part',
    icon: '🟦',
    category: 'Parts',
    type: 'Part',
    properties: {
      Size: { x: 4, y: 1, z: 4 },
      Color: { r: 0.639, g: 0.635, b: 0.647 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
      Shape: 'Block',
    },
  },
  {
    id: 'p-sphere',
    name: 'Sphere Part',
    icon: '🟡',
    category: 'Parts',
    type: 'Part',
    properties: {
      Size: { x: 3, y: 3, z: 3 },
      Color: { r: 0.961, g: 0.804, b: 0.188 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
      Shape: 'Sphere',
    },
  },
  {
    id: 'p-wedge',
    name: 'Wedge Part',
    icon: '📐',
    category: 'Parts',
    type: 'Part',
    properties: {
      Size: { x: 4, y: 4, z: 4 },
      Color: { r: 0.188, g: 0.376, b: 0.792 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
      Shape: 'Wedge',
    },
  },
  {
    id: 'p-cylinder',
    name: 'Cylinder Part',
    icon: '🔋',
    category: 'Parts',
    type: 'Part',
    properties: {
      Size: { x: 2, y: 6, z: 2 },
      Color: { r: 0.412, g: 0.753, b: 0.365 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
      Shape: 'Cylinder',
    },
  },
  {
    id: 'p-brick',
    name: 'Brick',
    icon: '🟥',
    category: 'Parts',
    type: 'Part',
    properties: {
      Size: { x: 2, y: 1.2, z: 4 },
      Color: { r: 0.769, g: 0.157, b: 0.110 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
      Shape: 'Block',
    },
  },
  {
    id: 'p-platform',
    name: 'Platform',
    icon: '🟫',
    category: 'Parts',
    type: 'Part',
    properties: {
      Size: { x: 10, y: 0.5, z: 10 },
      Color: { r: 0.6, g: 0.5, b: 0.4 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
      Shape: 'Block',
    },
  },
  {
    id: 'p-neon-block',
    name: 'Neon Block',
    icon: '💡',
    category: 'Parts',
    type: 'Part',
    properties: {
      Size: { x: 2, y: 2, z: 2 },
      Color: { r: 0.0, g: 1.0, b: 0.498 },
      Material: 'Neon',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
      Shape: 'Block',
    },
  },
  {
    id: 'p-glass',
    name: 'Glass Panel',
    icon: '🪟',
    category: 'Parts',
    type: 'Part',
    properties: {
      Size: { x: 6, y: 4, z: 0.2 },
      Color: { r: 0.639, g: 0.825, b: 0.953 },
      Material: 'Glass',
      Anchored: true,
      CanCollide: true,
      Transparency: 0.5,
      Shape: 'Block',
    },
  },
  {
    id: 'p-lava',
    name: 'Lava Block',
    icon: '🔥',
    category: 'Parts',
    type: 'Part',
    properties: {
      Size: { x: 6, y: 1, z: 6 },
      Color: { r: 1.0, g: 0.2, b: 0.0 },
      Material: 'Neon',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
      Shape: 'Block',
    },
  },
  // ── SPAWNS ───────────────────────────────────────────
  {
    id: 's-spawn',
    name: 'Spawn Location',
    icon: '🟩',
    category: 'Spawns',
    type: 'SpawnLocation',
    properties: {
      Size: { x: 6, y: 1, z: 6 },
      Color: { r: 0.106, g: 0.165, b: 0.208 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
    },
  },
  {
    id: 's-team-red',
    name: 'Red Team Spawn',
    icon: '🔴',
    category: 'Spawns',
    type: 'SpawnLocation',
    properties: {
      Size: { x: 6, y: 1, z: 6 },
      Color: { r: 0.769, g: 0.157, b: 0.110 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
    },
  },
  {
    id: 's-team-blue',
    name: 'Blue Team Spawn',
    icon: '🔵',
    category: 'Spawns',
    type: 'SpawnLocation',
    properties: {
      Size: { x: 6, y: 1, z: 6 },
      Color: { r: 0.188, g: 0.376, b: 0.792 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
    },
  },
  // ── NPCS ─────────────────────────────────────────────
  {
    id: 'n-dummy',
    name: 'Dummy NPC',
    icon: '🤖',
    category: 'NPCs',
    type: 'NPCModel',
    properties: {
      Color: { r: 0.973, g: 0.761, b: 0.561 },
    },
  },
  {
    id: 'n-enemy',
    name: 'Enemy NPC',
    icon: '👾',
    category: 'NPCs',
    type: 'NPCModel',
    properties: {
      Color: { r: 0.769, g: 0.157, b: 0.110 },
    },
  },
  {
    id: 'n-friendly',
    name: 'Friendly NPC',
    icon: '😊',
    category: 'NPCs',
    type: 'NPCModel',
    properties: {
      Color: { r: 0.412, g: 0.753, b: 0.365 },
    },
  },
  // ── EFFECTS ──────────────────────────────────────────
  {
    id: 'e-pointlight',
    name: 'Point Light',
    icon: '💡',
    category: 'Effects',
    type: 'PointLight',
    properties: {
      Color: { r: 1.0, g: 0.9, b: 0.7 },
      Brightness: 5,
      Range: 16,
    },
  },
  // ── SCRIPTS ──────────────────────────────────────────
  {
    id: 'sc-color',
    name: 'Color Loop',
    icon: '🎨',
    category: 'Scripts',
    type: 'Script',
    properties: {
      Source: `-- Color cycling script
local part = script.Parent

while true do
  part.Color = Color3.fromRGB(
    math.random(0, 255),
    math.random(0, 255),
    math.random(0, 255)
  )
  task.wait(0.5)
end`,
    },
  },
  {
    id: 'sc-bounce',
    name: 'Bounce Animation',
    icon: '⬆️',
    category: 'Scripts',
    type: 'Script',
    properties: {
      Source: `-- Bounce animation
local part = script.Parent
local startY = part.Position.y
local height = 4
local speed = 2

while true do
  local t = os.clock() * speed
  local offsetY = math.abs(math.sin(t)) * height
  part.Position = Vector3.new(
    part.Position.x,
    startY + offsetY,
    part.Position.z
  )
  task.wait(0.05)
end`,
    },
  },
  {
    id: 'sc-spin',
    name: 'Spin Part',
    icon: '🔄',
    category: 'Scripts',
    type: 'Script',
    properties: {
      Source: `-- Spinning part script
local part = script.Parent
local speed = 90 -- degrees per second

while true do
  part.Rotation = Vector3.new(
    part.Rotation.x,
    part.Rotation.y + speed * 0.05,
    part.Rotation.z
  )
  task.wait(0.05)
end`,
    },
  },
  {
    id: 'sc-glow',
    name: 'Glow Pulse',
    icon: '✨',
    category: 'Scripts',
    type: 'Script',
    properties: {
      Source: `-- Glow pulse
local part = script.Parent
part.Material = "Neon"
local step = 0

while true do
  step = step + 0.1
  local v = (math.sin(step) + 1) / 2
  part.Transparency = v * 0.5
  task.wait(0.05)
end`,
    },
  },
  {
    id: 'sc-physics',
    name: 'Physics Booster',
    icon: '🚀',
    category: 'Scripts',
    type: 'Script',
    properties: {
      Source: `-- Physics Booster Script
local part = script.Parent
part.Anchored = false

-- Apply custom velocity force upward
part.Velocity = Vector3.new(0, 15, 0)
print("Applied initial physics forces!")
`,
    },
  },
  // ── MODELS (Expanded) ─────────────────────────────────
  {
    id: 'm-campfire',
    name: 'Cozy Campfire Set',
    icon: '🔥',
    category: 'Models',
    type: 'Part',
    properties: {
      Size: { x: 4, y: 0.5, z: 4 },
      Color: { r: 0.4, g: 0.25, b: 0.1 },
      Material: 'Wood',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
    },
  },
  {
    id: 'm-portal',
    name: 'Ethereal Portal',
    icon: '🌀',
    category: 'Models',
    type: 'Part',
    properties: {
      Size: { x: 1, y: 8, z: 6 },
      Color: { r: 0.6, g: 0.1, b: 0.9 },
      Material: 'ForceField',
      Anchored: true,
      CanCollide: false,
      Transparency: 0.3,
    },
  },
  {
    id: 'm-treasure',
    name: 'Treasure Chest',
    icon: '🪙',
    category: 'Models',
    type: 'Part',
    properties: {
      Size: { x: 3, y: 2, z: 2 },
      Color: { r: 0.85, g: 0.65, b: 0.15 },
      Material: 'Metal',
      Anchored: true,
      CanCollide: true,
    },
  },
  {
    id: 'm-turbine',
    name: 'Wind Turbine',
    icon: '🌬️',
    category: 'Models',
    type: 'Part',
    properties: {
      Size: { x: 2, y: 15, z: 2 },
      Color: { r: 0.95, g: 0.95, b: 0.95 },
      Material: 'SmoothPlastic',
      Anchored: true,
    },
  },
  // ── WEAPONS (Expanded) ────────────────────────────────
  {
    id: 'w-sword',
    name: 'Classic Linked Sword',
    icon: '⚔️',
    category: 'Weapons',
    type: 'Part',
    properties: {
      Size: { x: 1, y: 5, z: 1 },
      Color: { r: 0.7, g: 0.7, b: 0.8 },
      Material: 'Metal',
      Anchored: false,
    },
  },
  {
    id: 'w-laser',
    name: 'Sci-Fi Laser Gun',
    icon: '🔫',
    category: 'Weapons',
    type: 'Part',
    properties: {
      Size: { x: 0.8, y: 1.5, z: 3 },
      Color: { r: 0.2, g: 0.8, b: 1 },
      Material: 'Glass',
      Anchored: false,
    },
  },
  {
    id: 'w-rocket',
    name: 'Rocket Launcher',
    icon: '🚀',
    category: 'Weapons',
    type: 'Part',
    properties: {
      Size: { x: 1.5, y: 1.5, z: 6 },
      Color: { r: 0.15, g: 0.15, b: 0.15 },
      Material: 'SmoothPlastic',
      Anchored: false,
    },
  },
  // ── STRUCTURES (Expanded) ─────────────────────────────
  {
    id: 'st-house',
    name: 'Red Brick House Set',
    icon: '🏠',
    category: 'Structures',
    type: 'Part',
    properties: {
      Size: { x: 12, y: 8, z: 12 },
      Color: { r: 0.7, g: 0.3, b: 0.25 },
      Material: 'Brick',
      Anchored: true,
    },
  },
  {
    id: 'st-bridge',
    name: 'Suspension Bridge Set',
    icon: '🌉',
    category: 'Structures',
    type: 'Part',
    properties: {
      Size: { x: 40, y: 2, z: 6 },
      Color: { r: 0.35, g: 0.35, b: 0.35 },
      Material: 'Metal',
      Anchored: true,
    },
  },
  {
    id: 'st-pillar',
    name: 'Ancient Temple Pillar',
    icon: '🏛️',
    category: 'Structures',
    type: 'Part',
    properties: {
      Size: { x: 3, y: 14, z: 3 },
      Color: { r: 0.85, g: 0.85, b: 0.8 },
      Material: 'Marble',
      Anchored: true,
    },
  },
  {
    id: 'st-arch',
    name: 'Neon Arch Gateway',
    icon: '⛩️',
    category: 'Structures',
    type: 'Part',
    properties: {
      Size: { x: 16, y: 1, z: 4 },
      Color: { r: 1, g: 0, b: 0.5 },
      Material: 'Neon',
      Anchored: true,
    },
  },
  // ── AUDIO (Expanded) ──────────────────────────────────
  {
    id: 'au-ambient',
    name: 'Synthwave Ambient loop',
    icon: '🎵',
    category: 'Audio',
    type: 'Part',
    properties: {
      Size: { x: 1, y: 1, z: 1 },
      Color: { r: 0.9, g: 0.3, b: 0.9 },
      Material: 'Neon',
      Anchored: true,
    },
  },
  {
    id: 'au-nature',
    name: 'Forest Birds Sounds',
    icon: '🐦',
    category: 'Audio',
    type: 'Part',
    properties: {
      Size: { x: 1, y: 1, z: 1 },
      Color: { r: 0.3, g: 0.8, b: 0.3 },
      Material: 'SmoothPlastic',
      Anchored: true,
    },
  },
  // ── UI (Expanded) ────────────────────────────────────
  {
    id: 'ui-leaderboard',
    name: 'Global Leaderboard Panel',
    icon: '📊',
    category: 'UI',
    type: 'Part',
    properties: {
      Size: { x: 12, y: 8, z: 0.5 },
      Color: { r: 0.1, g: 0.1, b: 0.15 },
      Material: 'Glass',
      Anchored: true,
    },
  },
  {
    id: 'ui-dialog',
    name: 'Interactive NPC Dialogue UI',
    icon: '💬',
    category: 'UI',
    type: 'Part',
    properties: {
      Size: { x: 8, y: 3, z: 0.2 },
      Color: { r: 0.95, g: 0.95, b: 0.95 },
      Material: 'SmoothPlastic',
      Anchored: true,
    },
  }
];

export const PRESET_CATEGORIES = ['Parts', 'Spawns', 'NPCs', 'Effects', 'Scripts', 'Models', 'Audio', 'UI', 'Weapons', 'Structures'] as const;
export type PresetCategory = typeof PRESET_CATEGORIES[number];
