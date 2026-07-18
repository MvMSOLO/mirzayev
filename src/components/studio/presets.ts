import type { Preset } from './types';

export const PRESETS: Preset[] = [
  // ── PARTS ────────────────────────────────────────────
  {
    id: 'p-block',
    name: 'Block',
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
    },
  },
  {
    id: 'p-ramp',
    name: 'Ramp (Wedge)',
    icon: '🔺',
    category: 'Parts',
    type: 'Part',
    properties: {
      Size: { x: 4, y: 4, z: 4 },
      Color: { r: 0.412, g: 0.753, b: 0.365 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
    },
  },
  {
    id: 'p-pillar',
    name: 'Pillar',
    icon: '🏛️',
    category: 'Parts',
    type: 'Part',
    properties: {
      Size: { x: 1, y: 10, z: 1 },
      Color: { r: 0.9, g: 0.9, b: 0.9 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
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
];

export const PRESET_CATEGORIES = ['Parts', 'Spawns', 'NPCs', 'Effects', 'Scripts'] as const;
export type PresetCategory = typeof PRESET_CATEGORIES[number];
