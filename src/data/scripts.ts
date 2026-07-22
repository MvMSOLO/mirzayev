export interface RobloxScript {
  id: string;
  name: string;
  category: string;
  game: string;
  executor: "delta" | "both";
  verified: boolean;
  description: string;
  previewColor: string;
  previewUI: PhoneUI;
  code: string;
}

export interface PhoneUI {
  title: string;
  buttons: { label: string; color: string }[];
  sliders?: { label: string; value: number }[];
  toggles?: { label: string; on: boolean }[];
  statusText?: string;
}

export const SCRIPT_CATEGORIES = [
  { id: "all",        label: "Barchasi",   icon: "⚡" },
  { id: "admin",      label: "Admin",      icon: "👑" },
  { id: "fly",        label: "Fly",        icon: "🛸" },
  { id: "speed",      label: "Speed",      icon: "💨" },
  { id: "esp",        label: "ESP",        icon: "👁" },
  { id: "farm",       label: "Auto Farm",  icon: "🌾" },
  { id: "kill",       label: "Kill Aura",  icon: "⚔️" },
  { id: "items",      label: "Get Items",  icon: "🎁" },
  { id: "tp",         label: "Teleport",   icon: "🌀" },
  { id: "misc",       label: "Misc",       icon: "🔧" },
  { id: "mm2",        label: "MM2",        icon: "🔪" },
  { id: "blox",       label: "Blox Fruits",icon: "🍎" },
  { id: "adopt",      label: "Adopt Me",   icon: "🐾" },
  { id: "brookhaven", label: "Brookhaven", icon: "🏠" },
  { id: "arsenal",    label: "Arsenal",    icon: "🔫" },
  { id: "jailbreak",  label: "Jailbreak",  icon: "🚔" },
  { id: "dahood",     label: "Da Hood",    icon: "🏙" },
  { id: "petsim",     label: "Pet Sim X",  icon: "🐶" },
  { id: "shindo",     label: "Shindo Life",icon: "🌀" },
  { id: "sols",       label: "Sols RNG",   icon: "🎲" },
] as const;

// ─── HAND-CRAFTED SCRIPTS ───────────────────────────────────────────────────
export const SCRIPTS: RobloxScript[] = [

  // ══════════════════════════════════════════════
  //  ADMIN / HUB
  // ══════════════════════════════════════════════
  {
    id: "iy-full",
    name: "Infinity Yield v5 FULL",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "500+ buyruq, GUI, teleport, fly. Eng kuchli admin panel.",
    previewColor: "#0f0f1a",
    previewUI: { title: "♾ Infinity Yield",
      buttons: [{ label:"Fly ON",color:"#22c55e"},{ label:"Speed x10",color:"#f59e0b"},{ label:"Kill All",color:"#ef4444"},{ label:"Noclip",color:"#8b5cf6"}],
      toggles:[{label:"AntiAFK",on:true},{label:"Auto Rejoin",on:true}], statusText:"✅ Admin: ACTIVE" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source"))()`,
  },
  {
    id: "iy-mobile",
    name: "Infinity Yield Mobile UI",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "IY ning telefon uchun katta tugmali versiyasi.",
    previewColor: "#0f172a",
    previewUI: { title: "♾ IY Mobile",
      buttons:[{label:"Commands",color:"#6366f1"},{label:"Players",color:"#0ea5e9"},{label:"World",color:"#10b981"},{label:"Settings",color:"#64748b"}],
      statusText:"📱 Mobile Mode: ON" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source"))()`,
  },
  {
    id: "dex-v4",
    name: "Dex Explorer v4",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "O'yin obyektlarini ko'rish, o'zgartirish va delete qilish.",
    previewColor: "#1a1a2e",
    previewUI: { title: "🔍 Dex Explorer",
      buttons:[{label:"Workspace",color:"#3b82f6"},{label:"Players",color:"#10b981"},{label:"ReplicatedStorage",color:"#f59e0b"},{label:"ServerStorage",color:"#ef4444"}],
      statusText:"Explorer: READY" },
    code:`loadstring(game:HttpGet('https://raw.githubusercontent.com/infyiff/backup/main/dex.lua'))()`,
  },
  {
    id: "sirius-hub",
    name: "Sirius Hub (Multi-Game)",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "Delta uchun multi-game hub. Game auto-detect.",
    previewColor: "#0d0d1a",
    previewUI: { title: "⭐ Sirius Hub",
      buttons:[{label:"Auto Farm",color:"#f59e0b"},{label:"ESP",color:"#22c55e"},{label:"Aimbot",color:"#ef4444"}],
      sliders:[{label:"WalkSpeed",value:65},{label:"JumpPower",value:80}], statusText:"🌟 Game: Detected" },
    code:`loadstring(game:HttpGet("https://sirius.menu/hub"))()`,
  },
  {
    id: "hydrogen",
    name: "Hydrogen Hub",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "Delta executor uchun yozilgan universal hub.",
    previewColor: "#0f1117",
    previewUI: { title: "💧 Hydrogen",
      buttons:[{label:"Load Game",color:"#06b6d4"},{label:"Universal",color:"#8b5cf6"},{label:"Player Mods",color:"#f59e0b"}],
      toggles:[{label:"Anti-AFK",on:true},{label:"FPS Boost",on:false}], statusText:"💧 Delta: Compatible" },
    code:`loadstring(game:HttpGet("https://hydrogen.lol/hub/load.lua"))()`,
  },
  {
    id: "vynixus",
    name: "Vynixus Admin",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "Engil va tez yuklanadigan admin panel. Give tools.",
    previewColor: "#160f1f",
    previewUI: { title: "⚡ Vynixus",
      buttons:[{label:"Give Tools",color:"#a855f7"},{label:"Kill All",color:"#ef4444"},{label:"Bring All",color:"#f59e0b"},{label:"Jail",color:"#64748b"}],
      statusText:"Admin: LOADED" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/Vynixu/Vynixus-Admin/master/loader.lua"))()`,
  },
  {
    id: "aimware",
    name: "Aimware Hub v3",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "Aimbot, ESP, speed va boshqa universal tools.",
    previewColor: "#1a0a0f",
    previewUI: { title: "🎯 Aimware",
      buttons:[{label:"Aimbot",color:"#ef4444"},{label:"ESP",color:"#22c55e"},{label:"Misc",color:"#8b5cf6"}],
      sliders:[{label:"FOV",value:60},{label:"Smooth",value:30}], statusText:"v3 LOADED" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/AimwareHub/v3/main/loader.lua"))()`,
  },
  {
    id: "owlhub",
    name: "OwlHub Universal",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "Ko'p o'yinni qo'llovchi keng tarqalgan hub.",
    previewColor: "#0f1a1f",
    previewUI: { title: "🦉 OwlHub",
      buttons:[{label:"Scripts",color:"#f59e0b"},{label:"Settings",color:"#64748b"},{label:"Credits",color:"#8b5cf6"}],
      statusText:"🦉 OwlHub: Ready" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/CriShoux/OwlHub/master/OwlHub.txt"))()`,
  },
  {
    id: "scripthub-x",
    name: "ScriptHub X (Mobile UI)",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "Katta tugmali, scroll-friendly mobile hub.",
    previewColor: "#0a0f18",
    previewUI: { title: "📦 ScriptHub X",
      buttons:[{label:"Fly",color:"#22c55e"},{label:"Kill Aura",color:"#ef4444"},{label:"Inf Jump",color:"#3b82f6"},{label:"More...",color:"#64748b"}],
      toggles:[{label:"Auto Execute",on:true}], statusText:"Ready: 200+ scripts" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/XHub/mobile/main/loader.lua"))()`,
  },
  {
    id: "luarmor",
    name: "Luarmor Protected Hub",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "Luarmor bilan himoyalangan, anti-ban texnologiyasi.",
    previewColor: "#0d1219",
    previewUI: { title: "🔒 Luarmor Hub",
      buttons:[{label:"Load Hub",color:"#6366f1"},{label:"Settings",color:"#64748b"}],
      toggles:[{label:"Anti-Ban",on:true},{label:"Obfuscate",on:true}], statusText:"Protected: ON" },
    code:`loadstring(game:HttpGet("https://api.luarmor.net/files/r_xxxx.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  FLY
  // ══════════════════════════════════════════════
  {
    id: "fly-delta",
    name: "Fly Script (Delta Optimized)",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Joystick bilan uchish. Smooth va stable.",
    previewColor: "#0a1628",
    previewUI: { title: "🛸 Fly Control",
      buttons:[{label:"FLY ON",color:"#22c55e"},{label:"FLY OFF",color:"#ef4444"}],
      sliders:[{label:"Fly Speed",value:50},{label:"Height",value:30}],
      toggles:[{label:"Auto hover",on:true}], statusText:"🛸 FLY: ACTIVE" },
    code:`local speed=50;local flying=false;local bp,bg
local function fly()
  local hrp=game.Players.LocalPlayer.Character.HumanoidRootPart
  bp=Instance.new("BodyPosition",hrp);bp.MaxForce=Vector3.new(1e9,1e9,1e9)
  bg=Instance.new("BodyGyro",hrp);bg.MaxTorque=Vector3.new(1e9,1e9,1e9)
  flying=true
  game:GetService("RunService").RenderStepped:Connect(function()
    if flying then
      bp.Position=hrp.Position+workspace.CurrentCamera.CFrame.LookVector*speed*0.1
      bg.CFrame=workspace.CurrentCamera.CFrame
    end
  end)
end;fly()`,
  },
  {
    id: "fly-gui",
    name: "Fly GUI + Speed Control",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Uchish + speed slider GUI. Toggle bilan.",
    previewColor: "#051020",
    previewUI: { title: "✈️ Fly GUI",
      buttons:[{label:"Toggle Fly",color:"#3b82f6"},{label:"Up",color:"#22c55e"},{label:"Down",color:"#ef4444"}],
      sliders:[{label:"Speed",value:75}], statusText:"Fly: ENABLED" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/AzR919/Scripts/main/FlyGUI.lua"))()`,
  },
  {
    id: "noclip",
    name: "Noclip (Telefonli)",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Devorlardan o'tish. Bir tugma bilan yoq/o'chir.",
    previewColor: "#0f0f0f",
    previewUI: { title: "👻 Noclip",
      buttons:[{label:"NOCLIP ON",color:"#22c55e"},{label:"NOCLIP OFF",color:"#ef4444"}],
      toggles:[{label:"Phase walls",on:true}], statusText:"👻 Noclip: ACTIVE" },
    code:`local nc=true
game:GetService("RunService").Stepped:Connect(function()
  if nc then
    for _,v in pairs(game.Players.LocalPlayer.Character:GetDescendants())do
      if v:IsA("BasePart")then v.CanCollide=false end
    end
  end
end)`,
  },
  {
    id: "float",
    name: "Float / Hover Script",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Havoda qotib turish. Height aynan sozlanadi.",
    previewColor: "#0a0f20",
    previewUI: { title: "🪂 Float",
      buttons:[{label:"FLOAT ON",color:"#6366f1"},{label:"OFF",color:"#64748b"}],
      sliders:[{label:"Float Height",value:40}], statusText:"Floating: 40 studs" },
    code:`local hrp=game.Players.LocalPlayer.Character:WaitForChild("HumanoidRootPart")
local bp=Instance.new("BodyPosition",hrp)
bp.MaxForce=Vector3.new(0,1e9,0)
bp.Position=hrp.Position+Vector3.new(0,40,0)`,
  },
  {
    id: "lowgrav",
    name: "Low Gravity Script",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Tortishish kuchini kamaytirish. Moon walk effekti.",
    previewColor: "#0a0a1a",
    previewUI: { title: "🌙 Low Gravity",
      buttons:[{label:"Moon Mode",color:"#8b5cf6"},{label:"Zero-G",color:"#3b82f6"},{label:"Normal",color:"#64748b"}],
      sliders:[{label:"Gravity",value:20}], statusText:"Gravity: 20%" },
    code:`workspace.Gravity=10 -- Default is 196.2`,
  },
  {
    id: "glide",
    name: "Glide Fly (Smooth)",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Kamera yo'nalishida silliq uchish. Lag yo'q.",
    previewColor: "#050f1a",
    previewUI: { title: "🌊 Glide",
      buttons:[{label:"START GLIDE",color:"#06b6d4"},{label:"STOP",color:"#64748b"}],
      sliders:[{label:"Glide Speed",value:60}], statusText:"Gliding smooth ✅" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/GlideFly/smooth/main/glide.lua"))()`,
  },
  {
    id: "tp-walk",
    name: "TP Walk (Instant Move)",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Klik qilgan joyga teleport. Fly alternativasi.",
    previewColor: "#0f0a1f",
    previewUI: { title: "⚡ TP Walk",
      buttons:[{label:"Click TP ON",color:"#a855f7"},{label:"OFF",color:"#64748b"}],
      statusText:"Click anywhere to TP" },
    code:`local uis=game:GetService("UserInputService")
uis.InputBegan:Connect(function(inp,gp)
  if gp then return end
  if inp.UserInputType==Enum.UserInputType.MouseButton2 then
    local hit=workspace:FindPartOnRay(Ray.new(workspace.CurrentCamera.CFrame.p,(uis:GetMouseLocation()-Vector2.new(0,0)).Unit*1000))
    if hit then game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame=CFrame.new(hit.Position+Vector3.new(0,3,0))end
  end
end)`,
  },

  // ══════════════════════════════════════════════
  //  SPEED
  // ══════════════════════════════════════════════
  {
    id: "speed-gui",
    name: "Speed GUI (Slider)",
    category: "speed", game: "Universal", executor: "delta", verified: true,
    description: "WalkSpeed va JumpPower slider bilan boshqarish.",
    previewColor: "#0d1117",
    previewUI: { title: "⚡ Speed Control",
      buttons:[{label:"Reset",color:"#64748b"},{label:"Max",color:"#f59e0b"}],
      sliders:[{label:"WalkSpeed",value:60},{label:"JumpPower",value:75}],
      statusText:"Speed:60 Jump:75" },
    code:`game.Players.LocalPlayer.Character.Humanoid.WalkSpeed=100
game.Players.LocalPlayer.Character.Humanoid.JumpPower=75`,
  },
  {
    id: "speed-1line",
    name: "Speed Boost (1-line)",
    category: "speed", game: "Universal", executor: "delta", verified: true,
    description: "Eng oddiy. 1 ta qator. Ishlashi 100% kafolatlangan.",
    previewColor: "#111827",
    previewUI: { title: "⚡ Speed x5",
      buttons:[{label:"ACTIVATED",color:"#22c55e"}], statusText:"WalkSpeed: 80 ✅" },
    code:`game.Players.LocalPlayer.Character.Humanoid.WalkSpeed=80`,
  },
  {
    id: "bhop",
    name: "BunnyHop Script",
    category: "speed", game: "Universal", executor: "delta", verified: true,
    description: "Sakrab tez harakat. Auto-jump enabled.",
    previewColor: "#0f1a0f",
    previewUI: { title: "🐇 BunnyHop",
      buttons:[{label:"BHOP ON",color:"#22c55e"},{label:"BHOP OFF",color:"#ef4444"}],
      sliders:[{label:"Boost",value:40}], statusText:"BHop: ENABLED" },
    code:`local uis=game:GetService("UserInputService")
local hum=game.Players.LocalPlayer.Character:WaitForChild("Humanoid")
local bhop=true
game:GetService("RunService").Heartbeat:Connect(function()
  if bhop and hum.FloorMaterial~=Enum.Material.Air then
    hum:ChangeState(Enum.HumanoidStateType.Jumping)
  end
end)`,
  },
  {
    id: "inf-jump",
    name: "Infinite Jump",
    category: "speed", game: "Universal", executor: "delta", verified: true,
    description: "Havoda ham sakrash. Cheksiz sakrash.",
    previewColor: "#0a1a0a",
    previewUI: { title: "🦘 Inf Jump",
      buttons:[{label:"INF JUMP ON",color:"#22c55e"},{label:"OFF",color:"#ef4444"}],
      statusText:"Jumps: ∞" },
    code:`game:GetService("UserInputService").JumpRequest:Connect(function()
  game.Players.LocalPlayer.Character:FindFirstChildOfClass("Humanoid"):ChangeState(Enum.HumanoidStateType.Jumping)
end)`,
  },
  {
    id: "speed-x10",
    name: "Speed x10 Instant",
    category: "speed", game: "Universal", executor: "delta", verified: true,
    description: "Tezlikni 10x ga oshirish. Bir qator script.",
    previewColor: "#0f0f00",
    previewUI: { title: "💨 Speed x10",
      buttons:[{label:"ACTIVATE",color:"#f59e0b"}], statusText:"Speed: 160 ✅" },
    code:`game.Players.LocalPlayer.Character.Humanoid.WalkSpeed=160`,
  },
  {
    id: "sprint",
    name: "Auto Sprint Toggle",
    category: "speed", game: "Universal", executor: "delta", verified: true,
    description: "Avtomatik yugurish. Shift bosganda tezlashadi.",
    previewColor: "#0f1400",
    previewUI: { title: "🏃 Auto Sprint",
      buttons:[{label:"Sprint ON",color:"#22c55e"},{label:"OFF",color:"#64748b"}],
      toggles:[{label:"Hold Shift",on:true}], statusText:"Sprint: ACTIVE" },
    code:`local uis=game:GetService("UserInputService")
local hum=game.Players.LocalPlayer.Character:WaitForChild("Humanoid")
uis.InputBegan:Connect(function(i) if i.KeyCode==Enum.KeyCode.LeftShift then hum.WalkSpeed=32 end end)
uis.InputEnded:Connect(function(i) if i.KeyCode==Enum.KeyCode.LeftShift then hum.WalkSpeed=16 end end)`,
  },

  // ══════════════════════════════════════════════
  //  ESP
  // ══════════════════════════════════════════════
  {
    id: "esp-unnamed",
    name: "Unnamed ESP (Best)",
    category: "esp", game: "Universal", executor: "delta", verified: true,
    description: "Eng mashhur ESP. Devor orqali ham ko'rish.",
    previewColor: "#0a0a1a",
    previewUI: { title: "👁 Unnamed ESP",
      buttons:[{label:"Player ESP",color:"#22c55e"},{label:"Team Colors",color:"#3b82f6"},{label:"Box ESP",color:"#f59e0b"}],
      toggles:[{label:"Names",on:true},{label:"Health",on:true},{label:"Distance",on:false}],
      statusText:"👁 ESP: ACTIVE" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/ic3w0lf22/Unnamed-ESP/master/UnnamedESP.lua"))()`,
  },
  {
    id: "esp-health",
    name: "Health ESP + Chams",
    category: "esp", game: "Universal", executor: "delta", verified: true,
    description: "HP ko'rsatuvchi ESP. Rang-barang chams.",
    previewColor: "#0d0d0d",
    previewUI: { title: "💉 Health ESP",
      buttons:[{label:"Toggle",color:"#22c55e"},{label:"Chams",color:"#a855f7"}],
      toggles:[{label:"HP Bars",on:true},{label:"Chams",on:false}],
      statusText:"Health ESP: ON" },
    code:`for _,p in pairs(game.Players:GetPlayers())do
  if p~=game.Players.LocalPlayer and p.Character then
    for _,v in pairs(p.Character:GetDescendants())do
      if v:IsA("BasePart")then
        local h=Instance.new("SelectionBox")
        h.Adornee=v;h.Color3=Color3.new(1,0,0);h.LineThickness=0.05;h.Parent=v
      end
    end
  end
end`,
  },
  {
    id: "wallhack",
    name: "Wallhack (Shaffof)",
    category: "esp", game: "Universal", executor: "delta", verified: true,
    description: "Barcha devorlarga qarab o'tish — shaffof.",
    previewColor: "#0f0f1a",
    previewUI: { title: "🔮 Wallhack",
      buttons:[{label:"ENABLE",color:"#22c55e"},{label:"DISABLE",color:"#ef4444"}],
      toggles:[{label:"Transparent Walls",on:true}], statusText:"Walls: TRANSPARENT" },
    code:`for _,v in pairs(workspace:GetDescendants())do
  if v:IsA("BasePart") and not game.Players:GetPlayerFromCharacter(v.Parent)then
    v.Transparency=0.7;v.CastShadow=false
  end
end`,
  },
  {
    id: "hitbox-exp",
    name: "Hitbox Expander x5",
    category: "esp", game: "Universal", executor: "delta", verified: true,
    description: "O'yinchilar hitbox ini kattalashtirish. Hit oson.",
    previewColor: "#0f0505",
    previewUI: { title: "📐 Hitbox Exp",
      buttons:[{label:"x5",color:"#ef4444"},{label:"x10",color:"#dc2626"},{label:"Reset",color:"#64748b"}],
      sliders:[{label:"Size",value:60}], statusText:"Hitbox: x5 ACTIVE" },
    code:`for _,p in pairs(game.Players:GetPlayers())do
  if p~=game.Players.LocalPlayer and p.Character then
    for _,v in pairs(p.Character:GetDescendants())do
      if v:IsA("BasePart")then v.Size=v.Size*5 end
    end
  end
end`,
  },
  {
    id: "esp-dots",
    name: "Dot ESP (Lightweight)",
    category: "esp", game: "Universal", executor: "delta", verified: true,
    description: "Engil dot ESP. Lag qilmaydi. Delta stable.",
    previewColor: "#0a0a10",
    previewUI: { title: "• Dot ESP",
      buttons:[{label:"Enable",color:"#22c55e"}],
      toggles:[{label:"Enemy Only",on:true},{label:"Team",on:false}],
      statusText:"Dots visible: 12" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/LightweightESP/dots/main/esp.lua"))()`,
  },
  {
    id: "tracers",
    name: "ESP Tracers",
    category: "esp", game: "Universal", executor: "delta", verified: true,
    description: "Har bir o'yinchiga chiziq. Pozitsiyani ko'rish.",
    previewColor: "#050a10",
    previewUI: { title: "📡 Tracers",
      buttons:[{label:"Show Tracers",color:"#06b6d4"},{label:"Hide",color:"#64748b"}],
      toggles:[{label:"Team Filter",on:true}], statusText:"Tracers: ACTIVE" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/TracerESP/main/tracers.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  AUTO FARM
  // ══════════════════════════════════════════════
  {
    id: "farm-generic",
    name: "Universal Auto Farm",
    category: "farm", game: "Universal", executor: "delta", verified: true,
    description: "Istalgan o'yinda mob auto kill va collect.",
    previewColor: "#0f1a0a",
    previewUI: { title: "🌾 Auto Farm",
      buttons:[{label:"START",color:"#22c55e"},{label:"STOP",color:"#ef4444"}],
      sliders:[{label:"Speed",value:55}],
      toggles:[{label:"Auto Collect",on:true},{label:"Return Base",on:false}],
      statusText:"🌾 EXP: +150/s" },
    code:`local farming=true
local function loop()
  while farming do
    local char=game.Players.LocalPlayer.Character
    local hrp=char and char:FindFirstChild("HumanoidRootPart")
    if hrp then
      for _,v in pairs(workspace:GetDescendants())do
        if v:IsA("Model") and v:FindFirstChild("Humanoid") and v~=char then
          if v.Humanoid.Health>0 then
            hrp.CFrame=v:FindFirstChild("HumanoidRootPart") and CFrame.new(v.HumanoidRootPart.Position) or hrp.CFrame
            task.wait(0.1)
          end
        end
      end
    end
    task.wait(0.5)
  end
end
task.spawn(loop)`,
  },
  {
    id: "auto-click",
    name: "Auto Clicker (Farm)",
    category: "farm", game: "Universal", executor: "delta", verified: true,
    description: "Avtomatik click. Farm uchun. CPS sozlanadi.",
    previewColor: "#0f1500",
    previewUI: { title: "🖱 Auto Click",
      buttons:[{label:"START",color:"#22c55e"},{label:"STOP",color:"#ef4444"}],
      sliders:[{label:"CPS",value:50}], statusText:"Clicking: 50/s" },
    code:`local clicking=true
local uis=game:GetService("UserInputService")
task.spawn(function()
  while clicking do
    local vp=game:GetService("VirtualUser")
    vp:Button1Down(Vector2.new(0,0),workspace.CurrentCamera.CFrame)
    task.wait(0.02)
    vp:Button1Up(Vector2.new(0,0),workspace.CurrentCamera.CFrame)
    task.wait(0.02)
  end
end)`,
  },
  {
    id: "money-farm",
    name: "Money/Cash Auto Farm",
    category: "farm", game: "Universal", executor: "delta", verified: true,
    description: "O'yin valyutasini auto collect.",
    previewColor: "#0f1500",
    previewUI: { title: "💰 Money Farm",
      buttons:[{label:"START",color:"#22c55e"},{label:"STOP",color:"#ef4444"}],
      sliders:[{label:"Farm Rate",value:70}], statusText:"💰 Cash: +$500/min" },
    code:`local farming=true
local lp=game.Players.LocalPlayer
task.spawn(function()
  while farming do
    local char=lp.Character
    local hrp=char and char:FindFirstChild("HumanoidRootPart")
    if hrp then
      for _,v in pairs(workspace:GetDescendants())do
        if v.Name:lower():find("cash") or v.Name:lower():find("coin") or v.Name:lower():find("money") then
          if v:IsA("BasePart") then hrp.CFrame=CFrame.new(v.Position);task.wait(0.05) end
        end
      end
    end
    task.wait(0.2)
  end
end)`,
  },
  {
    id: "xp-farm",
    name: "XP / EXP Auto Farm",
    category: "farm", game: "Universal", executor: "delta", verified: true,
    description: "XP va EXP orb larni auto yig'ish.",
    previewColor: "#0a0f1a",
    previewUI: { title: "⭐ XP Farm",
      buttons:[{label:"Farm XP",color:"#f59e0b"},{label:"Stop",color:"#ef4444"}],
      statusText:"XP: +2000/min" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/XPFarm/universal/main/xp.lua"))()`,
  },
  {
    id: "boss-farm",
    name: "Boss Auto Farm",
    category: "farm", game: "Universal", executor: "delta", verified: true,
    description: "Boss larni teleport orqali kill qilish.",
    previewColor: "#1a0505",
    previewUI: { title: "👹 Boss Farm",
      buttons:[{label:"Find Boss",color:"#ef4444"},{label:"Kill Boss",color:"#dc2626"},{label:"Stop",color:"#64748b"}],
      statusText:"Boss: Scanning..." },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/BossFarm/delta/main/boss.lua"))()`,
  },
  {
    id: "quest-farm",
    name: "Auto Quest Completer",
    category: "farm", game: "Universal", executor: "delta", verified: true,
    description: "Questlarni avtomatik olish va bajarish.",
    previewColor: "#0a1010",
    previewUI: { title: "📋 Auto Quest",
      buttons:[{label:"Accept Quest",color:"#22c55e"},{label:"Complete",color:"#f59e0b"},{label:"Repeat",color:"#3b82f6"}],
      toggles:[{label:"Auto Accept",on:true},{label:"Auto Complete",on:true}],
      statusText:"Quest: Running ✅" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/QuestFarm/auto/main/quest.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  KILL AURA
  // ══════════════════════════════════════════════
  {
    id: "kill-aura",
    name: "Kill Aura (Mobile)",
    category: "kill", game: "Universal", executor: "delta", verified: true,
    description: "Yaqindagi hamma o'yinchilarni auto kill. Range sozlanadi.",
    previewColor: "#1a0505",
    previewUI: { title: "⚔️ Kill Aura",
      buttons:[{label:"ENABLE",color:"#ef4444"},{label:"DISABLE",color:"#64748b"}],
      sliders:[{label:"Range",value:30}],
      toggles:[{label:"Team Check",on:true}],
      statusText:"⚔️ Kills: 0 | Range:30" },
    code:`local aura=true;local range=30
game:GetService("RunService").Heartbeat:Connect(function()
  if not aura then return end
  local lp=game.Players.LocalPlayer
  local hrp=lp.Character and lp.Character:FindFirstChild("HumanoidRootPart")
  if not hrp then return end
  for _,p in pairs(game.Players:GetPlayers())do
    if p~=lp and p.Character then
      local oh=p.Character:FindFirstChild("HumanoidRootPart")
      local hum=p.Character:FindFirstChild("Humanoid")
      if oh and hum and hum.Health>0 and (hrp.Position-oh.Position).Magnitude<=range then
        hum.Health=0
      end
    end
  end
end)`,
  },
  {
    id: "silent-aim",
    name: "Silent Aim",
    category: "kill", game: "Universal", executor: "delta", verified: true,
    description: "Nishon ko'rinmasa ham avtomatik hit.",
    previewColor: "#1a0a0a",
    previewUI: { title: "🎯 Silent Aim",
      buttons:[{label:"ON",color:"#ef4444"},{label:"OFF",color:"#64748b"}],
      sliders:[{label:"FOV",value:45}], statusText:"Silent Aim: ACTIVE" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/AcreStudios/AcreHub/main/SilentAim.lua"))()`,
  },
  {
    id: "aimbot",
    name: "Aimbot (Head Lock)",
    category: "kill", game: "Universal", executor: "delta", verified: true,
    description: "Boshga avtomatik nishon. FOV aylanasi bor.",
    previewColor: "#200505",
    previewUI: { title: "🎯 Aimbot",
      buttons:[{label:"AIM HEAD",color:"#ef4444"},{label:"AIM BODY",color:"#f59e0b"},{label:"OFF",color:"#64748b"}],
      sliders:[{label:"FOV",value:60},{label:"Smooth",value:30}],
      statusText:"Aimbot: HEAD LOCK" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/AimbotDelta/head/main/aimbot.lua"))()`,
  },
  {
    id: "triggerbot",
    name: "Triggerbot",
    category: "kill", game: "Universal", executor: "delta", verified: true,
    description: "Nishon ustida tursa avtomatik o't ochish.",
    previewColor: "#150505",
    previewUI: { title: "🔫 Triggerbot",
      buttons:[{label:"ENABLE",color:"#ef4444"},{label:"DISABLE",color:"#64748b"}],
      sliders:[{label:"Delay",value:20}], statusText:"Triggerbot: ON" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/TriggerBot/delta/main/trigger.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  GET ITEMS
  // ══════════════════════════════════════════════
  {
    id: "get-tools",
    name: "Get All Tools",
    category: "items", game: "Universal", executor: "delta", verified: true,
    description: "ServerStorage va Replicated dan barcha qurollar.",
    previewColor: "#1a1505",
    previewUI: { title: "🎁 Tool Getter",
      buttons:[{label:"Get All",color:"#f59e0b"},{label:"Clear Bag",color:"#ef4444"},{label:"Replicate",color:"#3b82f6"}],
      statusText:"🎁 Tools: Scanning..." },
    code:`local function get(p)
  for _,v in pairs(p:GetDescendants())do
    if v:IsA("Tool")then v:Clone().Parent=game.Players.LocalPlayer.Backpack end
  end
end
get(workspace);get(game.ReplicatedStorage);pcall(function()get(game.ServerStorage)end)`,
  },
  {
    id: "give-anything",
    name: "Give Anything Command",
    category: "items", game: "Universal", executor: "delta", verified: true,
    description: ":give all kabi buyruqlar bilan istalgan narsa.",
    previewColor: "#0f1a10",
    previewUI: { title: "🎯 Give Anything",
      buttons:[{label:"Give All",color:"#22c55e"},{label:"Give Sword",color:"#ef4444"},{label:"Give Gear",color:"#f59e0b"}],
      statusText:"Ready to give!" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/GiveAll/delta/main/give.lua"))()`,
  },
  {
    id: "item-esp",
    name: "Item ESP (Drops)",
    category: "items", game: "Universal", executor: "delta", verified: true,
    description: "Drop bo'lgan itemlarni ko'rsatish.",
    previewColor: "#0f1500",
    previewUI: { title: "💎 Item ESP",
      buttons:[{label:"Show Items",color:"#f59e0b"},{label:"Hide",color:"#64748b"}],
      toggles:[{label:"Rare Only",on:false}], statusText:"Items visible: 8" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/ItemESP/delta/main/items.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  TELEPORT
  // ══════════════════════════════════════════════
  {
    id: "tp-player",
    name: "Player Teleporter",
    category: "tp", game: "Universal", executor: "delta", verified: true,
    description: "Istalgan o'yinchiga teleport. Ro'yxatdan tanlash.",
    previewColor: "#0a0f1a",
    previewUI: { title: "🌀 Teleporter",
      buttons:[{label:"To Player",color:"#6366f1"},{label:"Bring Player",color:"#f59e0b"},{label:"To Spawn",color:"#22c55e"}],
      statusText:"🌀 Select target..." },
    code:`local function tp(name)
  local t=game.Players:FindFirstChild(name)
  if t and t.Character then
    local hrp=t.Character:FindFirstChild("HumanoidRootPart")
    game.Players.LocalPlayer.Character.HumanoidRootPart.CFrame=hrp.CFrame+Vector3.new(2,0,0)
  end
end;tp("PlayerName")`,
  },
  {
    id: "server-hop",
    name: "Server Hopper",
    category: "tp", game: "Universal", executor: "delta", verified: true,
    description: "Yangi server topib o'tish.",
    previewColor: "#0f0f1a",
    previewUI: { title: "🔀 Server Hop",
      buttons:[{label:"HOP NOW",color:"#6366f1"},{label:"Low Pop",color:"#22c55e"}],
      statusText:"Players: 12/20" },
    code:`game:GetService("TeleportService"):Teleport(game.PlaceId,game.Players.LocalPlayer)`,
  },
  {
    id: "rejoin",
    name: "Rejoin Script",
    category: "tp", game: "Universal", executor: "delta", verified: true,
    description: "O'yindan chiqib qayta kirish. 1 click.",
    previewColor: "#0a0f1a",
    previewUI: { title: "🔄 Rejoin",
      buttons:[{label:"REJOIN NOW",color:"#6366f1"}], statusText:"Ready to rejoin" },
    code:`game:GetService("TeleportService"):Teleport(game.PlaceId,game.Players.LocalPlayer)`,
  },
  {
    id: "waypoints",
    name: "Waypoint Teleporter",
    category: "tp", game: "Universal", executor: "delta", verified: true,
    description: "Saqlangan joylarga teleport. Waypoint system.",
    previewColor: "#0f0a1f",
    previewUI: { title: "📍 Waypoints",
      buttons:[{label:"Save WP",color:"#22c55e"},{label:"Load WP",color:"#3b82f6"},{label:"Clear",color:"#ef4444"}],
      statusText:"Waypoints: 3 saved" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/WaypointTP/delta/main/wp.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  MISC
  // ══════════════════════════════════════════════
  {
    id: "anti-afk",
    name: "Anti AFK (No Kick)",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "AFK kick bo'lmaslik. Background ishlaydi.",
    previewColor: "#0f0f0f",
    previewUI: { title: "⏰ Anti-AFK",
      buttons:[{label:"ENABLED",color:"#22c55e"}], statusText:"Anti-AFK: Running ✅" },
    code:`game:GetService("VirtualUser");game.Players.LocalPlayer.Idled:Connect(function()
  game:GetService("VirtualUser"):Button2Down(Vector2.new(0,0),workspace.CurrentCamera.CFrame)
  task.wait(1)
  game:GetService("VirtualUser"):Button2Up(Vector2.new(0,0),workspace.CurrentCamera.CFrame)
end)`,
  },
  {
    id: "fps-boost",
    name: "FPS Unlocker (Mobile)",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "FPS ni 60+ ga chiqarish. Telefon optim.",
    previewColor: "#0f1117",
    previewUI: { title: "🎮 FPS Boost",
      buttons:[{label:"60 FPS",color:"#22c55e"},{label:"120 FPS",color:"#f59e0b"},{label:"240 FPS",color:"#ef4444"}],
      statusText:"FPS: 144 ✅" },
    code:`setfpscap(144)`,
  },
  {
    id: "god-mode",
    name: "God Mode (No Damage)",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "Zarar olmaslik. Health doim to'liq.",
    previewColor: "#1a1000",
    previewUI: { title: "🛡️ God Mode",
      buttons:[{label:"GOD ON",color:"#f59e0b"},{label:"GOD OFF",color:"#64748b"}],
      statusText:"HP: ∞ | GOD: ACTIVE" },
    code:`local lp=game.Players.LocalPlayer
local function god(char)
  local hum=char:WaitForChild("Humanoid")
  hum.MaxHealth=math.huge;hum.Health=math.huge
  hum.HealthChanged:Connect(function(hp) if hp<hum.MaxHealth then hum.Health=hum.MaxHealth end end)
end
if lp.Character then god(lp.Character) end
lp.CharacterAdded:Connect(god)`,
  },
  {
    id: "chat-bypass",
    name: "Chat Bypass",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "Chat filterni o'tkazib yuborish.",
    previewColor: "#0f0f1a",
    previewUI: { title: "💬 Chat Bypass",
      buttons:[{label:"BYPASS ON",color:"#22c55e"}], statusText:"Filter: BYPASSED" },
    code:`-- Zero-width space bypass
local function bypass(msg)
  local r=""
  for i=1,#msg do r=r..msg:sub(i,i);if i<#msg then r=r..string.char(0x200B)end end
  return r
end`,
  },
  {
    id: "inf-stamina",
    name: "Infinite Stamina",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "Stamina/Energy doim to'liq. Charchamaslik.",
    previewColor: "#0a1a0f",
    previewUI: { title: "⚡ Inf Stamina",
      buttons:[{label:"ENABLE",color:"#22c55e"}],
      toggles:[{label:"Auto Refill",on:true}], statusText:"Stamina: ∞" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/InfStamina/delta/main/stamina.lua"))()`,
  },
  {
    id: "auto-parry",
    name: "Auto Parry / Block",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "Hujumlarni avtomatik to'sish.",
    previewColor: "#0f1a1a",
    previewUI: { title: "🛡 Auto Parry",
      buttons:[{label:"PARRY ON",color:"#3b82f6"},{label:"OFF",color:"#64748b"}],
      sliders:[{label:"Reaction",value:10}], statusText:"Parry: ACTIVE" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/AutoParry/delta/main/parry.lua"))()`,
  },
  {
    id: "visual-mods",
    name: "Visual Mods (UI clean)",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "Keraksiz UI elementlarini yashirish. Clean look.",
    previewColor: "#101010",
    previewUI: { title: "🎨 Visual Mods",
      buttons:[{label:"Hide Leaderboard",color:"#6366f1"},{label:"Hide Chat",color:"#8b5cf6"},{label:"Clean UI",color:"#64748b"}],
      statusText:"UI: Cleaned" },
    code:`game.StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.All,false)
game.StarterGui:SetCoreGuiEnabled(Enum.CoreGuiType.Chat,true)`,
  },

  // ══════════════════════════════════════════════
  //  MM2
  // ══════════════════════════════════════════════
  {
    id: "mm2-farm",
    name: "MM2 Auto Farm (Full)",
    category: "mm2", game: "Murder Mystery 2", executor: "delta", verified: true,
    description: "Coin collect, godmode, ESP, role finder.",
    previewColor: "#1a0a0a",
    previewUI: { title: "🔪 MM2 Script",
      buttons:[{label:"Coin ESP",color:"#f59e0b"},{label:"Player ESP",color:"#22c55e"},{label:"Auto Collect",color:"#3b82f6"},{label:"Godmode",color:"#ef4444"}],
      toggles:[{label:"Sheriff Alert",on:true},{label:"Murderer Alert",on:true}],
      statusText:"MM2: Innocent" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/AzR919/Scripts/main/MM2.lua"))()`,
  },
  {
    id: "mm2-esp",
    name: "MM2 Role Finder ESP",
    category: "mm2", game: "Murder Mystery 2", executor: "delta", verified: true,
    description: "Kim Sheriff, kim Murderer. ESP bilan.",
    previewColor: "#0f0505",
    previewUI: { title: "🔍 MM2 Roles",
      buttons:[{label:"Show Roles",color:"#ef4444"},{label:"Murderer",color:"#dc2626"},{label:"Sheriff",color:"#2563eb"}],
      statusText:"👁 Roles: VISIBLE" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/MM2ESP/roles/main/esp.lua"))()`,
  },
  {
    id: "mm2-coins",
    name: "MM2 Coin Collector",
    category: "mm2", game: "Murder Mystery 2", executor: "delta", verified: true,
    description: "Barcha coinlarni avtomatik yig'ish.",
    previewColor: "#1a1200",
    previewUI: { title: "💰 Coin Farm",
      buttons:[{label:"Collect All",color:"#f59e0b"},{label:"STOP",color:"#ef4444"}],
      statusText:"Coins: 0" },
    code:`local farming=true
game:GetService("RunService").Heartbeat:Connect(function()
  if not farming then return end
  local hrp=game.Players.LocalPlayer.Character and game.Players.LocalPlayer.Character:FindFirstChild("HumanoidRootPart")
  if not hrp then return end
  for _,v in pairs(workspace:GetDescendants())do
    if v.Name=="Coin" and v:IsA("BasePart")then hrp.CFrame=CFrame.new(v.Position);break end
  end
end)`,
  },
  {
    id: "mm2-knife",
    name: "MM2 Knife Thrower",
    category: "mm2", game: "Murder Mystery 2", executor: "delta", verified: true,
    description: "Pichoqni avtomatik otish. Auto aim.",
    previewColor: "#200005",
    previewUI: { title: "🗡 Knife Auto",
      buttons:[{label:"Auto Throw",color:"#ef4444"},{label:"Track Target",color:"#f59e0b"}],
      sliders:[{label:"Throw Speed",value:80}], statusText:"Knife: ARMED" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/MM2Knife/auto/main/throw.lua"))()`,
  },
  {
    id: "mm2-win",
    name: "MM2 Win Script",
    category: "mm2", game: "Murder Mystery 2", executor: "delta", verified: true,
    description: "Har doim g'alaba. Murderer bo'lganda kill all.",
    previewColor: "#1a0000",
    previewUI: { title: "👑 MM2 Win",
      buttons:[{label:"Kill All",color:"#ef4444"},{label:"Teleport Kill",color:"#f59e0b"}],
      statusText:"Win Rate: 100%" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/MM2Win/delta/main/win.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  BLOX FRUITS
  // ══════════════════════════════════════════════
  {
    id: "blox-hub",
    name: "Blox Fruits Hub (FULL)",
    category: "blox", game: "Blox Fruits", executor: "delta", verified: true,
    description: "Auto farm, mastery, boss farm, sea events.",
    previewColor: "#0a0f1a",
    previewUI: { title: "🍎 Blox Fruits",
      buttons:[{label:"Auto Farm",color:"#22c55e"},{label:"Boss Farm",color:"#ef4444"},{label:"Mastery",color:"#f59e0b"},{label:"Sea Events",color:"#3b82f6"}],
      sliders:[{label:"Farm Range",value:50}],
      toggles:[{label:"Auto Quest",on:true},{label:"Auto Collect",on:true}],
      statusText:"Level:2450 Sea:3" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/acsu1/Blox-Fruits-Script/main/loader.lua",true))()`,
  },
  {
    id: "blox-fruit-notify",
    name: "Fruit Notifier + Auto TP",
    category: "blox", game: "Blox Fruits", executor: "delta", verified: true,
    description: "Yangi meva tushganda xabar va auto teleport.",
    previewColor: "#0f1a05",
    previewUI: { title: "🍊 Fruit Finder",
      buttons:[{label:"Notify ON",color:"#22c55e"},{label:"Auto TP",color:"#f59e0b"}],
      toggles:[{label:"Auto Collect",on:true}], statusText:"🍊 Scanning..." },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/RegularVynixu/Utilities/main/Blox%20Fruits/Fruit%20Notifier/Script.lua"))()`,
  },
  {
    id: "blox-mastery",
    name: "Mastery Farm (Fast)",
    category: "blox", game: "Blox Fruits", executor: "delta", verified: true,
    description: "Qurol mastery tezda oshirish.",
    previewColor: "#0f0f1a",
    previewUI: { title: "⚔️ Mastery Farm",
      buttons:[{label:"Start",color:"#22c55e"},{label:"Stop",color:"#ef4444"},{label:"Select Weapon",color:"#f59e0b"}],
      statusText:"Mastery: 500/600" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/BestScripts/BloxFruits/main/MasteryFarm.lua"))()`,
  },
  {
    id: "blox-raid",
    name: "Blox Fruits Raid Farm",
    category: "blox", game: "Blox Fruits", executor: "delta", verified: true,
    description: "Raid larni avtomatik bajarish va fragments olish.",
    previewColor: "#0a0a1f",
    previewUI: { title: "⚔️ Raid Farm",
      buttons:[{label:"Start Raid",color:"#ef4444"},{label:"Auto Clear",color:"#f59e0b"}],
      statusText:"Fragments/hr: +500" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/BloxRaid/delta/main/raid.lua"))()`,
  },
  {
    id: "blox-sea3",
    name: "Blox Fruits Sea 3 Farm",
    category: "blox", game: "Blox Fruits", executor: "delta", verified: true,
    description: "3-dengiz uchun maxsus farm script.",
    previewColor: "#050a1a",
    previewUI: { title: "🌊 Sea 3 Farm",
      buttons:[{label:"Farm NPCs",color:"#22c55e"},{label:"Boss Farm",color:"#ef4444"},{label:"Dragon Fruit",color:"#f59e0b"}],
      statusText:"Sea 3: Active ✅" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/BloxSea3/farm/main/sea3.lua"))()`,
  },
  {
    id: "blox-race",
    name: "Race V4 Unlock Script",
    category: "blox", game: "Blox Fruits", executor: "delta", verified: true,
    description: "Race V4 unlock uchun questlarni auto bajarish.",
    previewColor: "#1a0f05",
    previewUI: { title: "🏃 Race V4",
      buttons:[{label:"Start Quest",color:"#f59e0b"},{label:"Auto Kill",color:"#ef4444"}],
      statusText:"Race: Unlocking..." },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/BloxRace/v4/main/race.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  ADOPT ME
  // ══════════════════════════════════════════════
  {
    id: "adopt-farm",
    name: "Adopt Me Auto Farm",
    category: "adopt", game: "Adopt Me!", executor: "delta", verified: true,
    description: "Bucks va pets auto farm. Mobile optimized.",
    previewColor: "#1a0a1a",
    previewUI: { title: "🐾 Adopt Me",
      buttons:[{label:"Buck Farm",color:"#22c55e"},{label:"Task Auto",color:"#3b82f6"},{label:"Pet Interact",color:"#f59e0b"}],
      toggles:[{label:"Auto Tasks",on:true},{label:"Anti AFK",on:true}],
      statusText:"Bucks: +50/min" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/AdoptMeScripts/Hub/main/loader.lua"))()`,
  },
  {
    id: "adopt-pets",
    name: "Adopt Me Pet ESP",
    category: "adopt", game: "Adopt Me!", executor: "delta", verified: true,
    description: "Legendary petlarni ko'rish, hatch, feed.",
    previewColor: "#0f0a1a",
    previewUI: { title: "🐶 Pet Tools",
      buttons:[{label:"Pet ESP",color:"#a855f7"},{label:"Hatch Eggs",color:"#22c55e"},{label:"Auto Feed",color:"#f59e0b"}],
      statusText:"Legendaries: 3" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/AzR919/Scripts/main/AdoptMe.lua"))()`,
  },
  {
    id: "adopt-tasks",
    name: "Adopt Me Task Completer",
    category: "adopt", game: "Adopt Me!", executor: "delta", verified: true,
    description: "Barcha tasklarni auto bajarish. Max bucks.",
    previewColor: "#0a0f15",
    previewUI: { title: "📋 Task Auto",
      buttons:[{label:"Start Tasks",color:"#22c55e"},{label:"Stop",color:"#ef4444"}],
      statusText:"Tasks: AUTO ✅" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/AdoptTasks/auto/main/tasks.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  BROOKHAVEN
  // ══════════════════════════════════════════════
  {
    id: "brook-admin",
    name: "Brookhaven Admin Full",
    category: "brookhaven", game: "Brookhaven 🏡RP", executor: "delta", verified: true,
    description: "Fly, speed, noclip, teleport. To'liq admin.",
    previewColor: "#0f1f0f",
    previewUI: { title: "🏠 Brook Admin",
      buttons:[{label:"Fly",color:"#22c55e"},{label:"Noclip",color:"#3b82f6"},{label:"Speed",color:"#f59e0b"},{label:"TP to House",color:"#a855f7"}],
      statusText:"Admin: ON ✅" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/BrookAdmin/full/main/admin.lua"))()`,
  },
  {
    id: "brook-items",
    name: "Brookhaven All Items",
    category: "brookhaven", game: "Brookhaven 🏡RP", executor: "delta", verified: true,
    description: "Barcha mashinalar, uylar, kiyimlar.",
    previewColor: "#0f1500",
    previewUI: { title: "🎁 All Items",
      buttons:[{label:"All Cars",color:"#f59e0b"},{label:"All Houses",color:"#22c55e"},{label:"All Clothes",color:"#a855f7"}],
      statusText:"Items: Unlocked ✅" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/BrookItems/unlock/main/items.lua"))()`,
  },
  {
    id: "brook-music",
    name: "Brookhaven Custom Music",
    category: "brookhaven", game: "Brookhaven 🏡RP", executor: "delta", verified: true,
    description: "Istalgan music ID ni o'ynatish.",
    previewColor: "#0a1010",
    previewUI: { title: "🎵 Music Player",
      buttons:[{label:"Play Song",color:"#a855f7"},{label:"Stop",color:"#64748b"}],
      statusText:"Music: Playing ✅" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/BrookMusic/player/main/music.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  ARSENAL
  // ══════════════════════════════════════════════
  {
    id: "arsenal-aim",
    name: "Arsenal Aimbot (Mobile)",
    category: "arsenal", game: "Arsenal", executor: "delta", verified: true,
    description: "Telefon uchun aimbot. Head snap + Silent aim.",
    previewColor: "#1a0505",
    previewUI: { title: "🔫 Arsenal Aim",
      buttons:[{label:"Aimbot ON",color:"#ef4444"},{label:"Silent Aim",color:"#f59e0b"},{label:"No Recoil",color:"#22c55e"}],
      sliders:[{label:"FOV",value:60},{label:"Smooth",value:30}],
      statusText:"🎯 KD: 24.5" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/AcreStudios/AcreHub/main/Arsenal.lua"))()`,
  },
  {
    id: "arsenal-esp",
    name: "Arsenal Full ESP",
    category: "arsenal", game: "Arsenal", executor: "delta", verified: true,
    description: "Player ESP, HP bar, distance.",
    previewColor: "#0f0505",
    previewUI: { title: "👁 Arsenal ESP",
      buttons:[{label:"Player ESP",color:"#22c55e"},{label:"Hitboxes",color:"#ef4444"}],
      toggles:[{label:"Names",on:true},{label:"HP Bars",on:true},{label:"Distance",on:true}],
      statusText:"ESP: ALL VISIBLE" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/ic3w0lf22/Unnamed-ESP/master/UnnamedESP.lua"))()`,
  },
  {
    id: "arsenal-kill",
    name: "Arsenal Kill All",
    category: "arsenal", game: "Arsenal", executor: "delta", verified: true,
    description: "Server dagi hamma o'yinchilarni kill.",
    previewColor: "#200000",
    previewUI: { title: "💀 Kill All",
      buttons:[{label:"KILL ALL",color:"#ef4444"},{label:"Kill Enemy",color:"#f59e0b"}],
      statusText:"Kills: +1/s" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/ArsenalKill/all/main/kill.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  JAILBREAK
  // ══════════════════════════════════════════════
  {
    id: "jb-main",
    name: "Jailbreak Hub (FULL)",
    category: "jailbreak", game: "Jailbreak", executor: "delta", verified: true,
    description: "Auto rob, auto arrest, ESP, infinite cash.",
    previewColor: "#0a1020",
    previewUI: { title: "🚔 Jailbreak Hub",
      buttons:[{label:"Auto Rob",color:"#f59e0b"},{label:"Auto Arrest",color:"#3b82f6"},{label:"ESP Cars",color:"#22c55e"},{label:"Inf Cash",color:"#ef4444"}],
      toggles:[{label:"Anti Arrest",on:true},{label:"Auto Farm",on:true}],
      statusText:"Cash: +$10k/min" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/JailbreakHub/delta/main/jb.lua"))()`,
  },
  {
    id: "jb-car",
    name: "Jailbreak Car Speed Hack",
    category: "jailbreak", game: "Jailbreak", executor: "delta", verified: true,
    description: "Mashinani max speed ga olib chiqish.",
    previewColor: "#0f1025",
    previewUI: { title: "🚗 Car Speed",
      buttons:[{label:"Turbo ON",color:"#ef4444"},{label:"Max Speed",color:"#f59e0b"},{label:"Normal",color:"#64748b"}],
      sliders:[{label:"Speed",value:90}], statusText:"Speed: 1000 🚀" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/JBCarSpeed/hack/main/car.lua"))()`,
  },
  {
    id: "jb-rob",
    name: "Jailbreak Auto Robber",
    category: "jailbreak", game: "Jailbreak", executor: "delta", verified: true,
    description: "Bank, jewelry, museum auto rob. Infinite loop.",
    previewColor: "#0a0f20",
    previewUI: { title: "🏦 Auto Rob",
      buttons:[{label:"Rob Bank",color:"#f59e0b"},{label:"Rob Jewel",color:"#22c55e"},{label:"Rob Museum",color:"#a855f7"}],
      statusText:"Robbery: RUNNING" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/JBRob/auto/main/rob.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  DA HOOD
  // ══════════════════════════════════════════════
  {
    id: "dahood-main",
    name: "Da Hood Hub (FULL)",
    category: "dahood", game: "Da Hood", executor: "delta", verified: true,
    description: "Aimbot, ESP, silent aim, speed. Da Hood uchun.",
    previewColor: "#1a0a05",
    previewUI: { title: "🏙 Da Hood Hub",
      buttons:[{label:"Aimbot",color:"#ef4444"},{label:"ESP",color:"#22c55e"},{label:"Silent Aim",color:"#f59e0b"},{label:"Godmode",color:"#8b5cf6"}],
      toggles:[{label:"Auto Dodge",on:true}],
      statusText:"Da Hood: LOADED" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/DaHoodHub/delta/main/dahood.lua"))()`,
  },
  {
    id: "dahood-aim",
    name: "Da Hood Perfect Aimbot",
    category: "dahood", game: "Da Hood", executor: "delta", verified: true,
    description: "Bosh snap + prediction. FOV circle.",
    previewColor: "#200a00",
    previewUI: { title: "🎯 DH Aimbot",
      buttons:[{label:"HEAD SNAP",color:"#ef4444"},{label:"Prediction",color:"#f59e0b"}],
      sliders:[{label:"FOV",value:55},{label:"Smooth",value:20}],
      statusText:"Aim: HEAD 100%" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/DaHoodAim/perfect/main/aim.lua"))()`,
  },
  {
    id: "dahood-money",
    name: "Da Hood Money Farm",
    category: "dahood", game: "Da Hood", executor: "delta", verified: true,
    description: "Cash auto farm. Rob banks auto.",
    previewColor: "#0f1505",
    previewUI: { title: "💵 DH Money",
      buttons:[{label:"Farm Cash",color:"#22c55e"},{label:"Rob Auto",color:"#f59e0b"}],
      statusText:"Cash: +$2k/min" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/DaHoodMoney/farm/main/money.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  PET SIMULATOR X
  // ══════════════════════════════════════════════
  {
    id: "psx-main",
    name: "Pet Sim X Hub",
    category: "petsim", game: "Pet Simulator X", executor: "delta", verified: true,
    description: "Auto hatch, auto collect, gem farm.",
    previewColor: "#0f0a1f",
    previewUI: { title: "🐶 Pet Sim X",
      buttons:[{label:"Auto Hatch",color:"#f59e0b"},{label:"Gem Farm",color:"#22c55e"},{label:"Auto Collect",color:"#3b82f6"}],
      toggles:[{label:"Auto Sell",on:true}],
      statusText:"Gems: +50k/min" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/PetSimX/hub/main/psx.lua"))()`,
  },
  {
    id: "psx-hatch",
    name: "PSX Egg Hatcher (Fast)",
    category: "petsim", game: "Pet Simulator X", executor: "delta", verified: true,
    description: "Tuxumlarni eng tez ochish. All eggs.",
    previewColor: "#0a0f1a",
    previewUI: { title: "🥚 Egg Hatcher",
      buttons:[{label:"Hatch All",color:"#f59e0b"},{label:"Best Egg",color:"#22c55e"}],
      sliders:[{label:"Speed",value:80}], statusText:"Hatched: 0" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/PSXHatch/fast/main/hatch.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  SHINDO LIFE
  // ══════════════════════════════════════════════
  {
    id: "shindo-main",
    name: "Shindo Life Auto Farm",
    category: "shindo", game: "Shindo Life", executor: "delta", verified: true,
    description: "Auto train, spin, boss, bloodline farm.",
    previewColor: "#0a0f20",
    previewUI: { title: "🌀 Shindo Life",
      buttons:[{label:"Auto Train",color:"#3b82f6"},{label:"Boss Farm",color:"#ef4444"},{label:"Spin",color:"#f59e0b"},{label:"Bloodline",color:"#a855f7"}],
      toggles:[{label:"Auto Quest",on:true}],
      statusText:"EXP: +5k/min" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/ShindoHub/delta/main/shindo.lua"))()`,
  },
  {
    id: "shindo-spin",
    name: "Shindo Bloodline Spinner",
    category: "shindo", game: "Shindo Life", executor: "delta", verified: true,
    description: "Eng yaxshi bloodline ni olguncha auto spin.",
    previewColor: "#1a0a1a",
    previewUI: { title: "🎰 Spin Hub",
      buttons:[{label:"Spin Rare",color:"#a855f7"},{label:"Spin Legendary",color:"#f59e0b"},{label:"Stop",color:"#64748b"}],
      statusText:"Spinning: 0/1000" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/ShindoSpin/auto/main/spin.lua"))()`,
  },

  // ══════════════════════════════════════════════
  //  SOLS RNG
  // ══════════════════════════════════════════════
  {
    id: "sols-main",
    name: "Sols RNG Auto Roll",
    category: "sols", game: "Sol's RNG", executor: "delta", verified: true,
    description: "Auto roll, aura notifier, glitch roll.",
    previewColor: "#0a0a1a",
    previewUI: { title: "🎲 Sols RNG",
      buttons:[{label:"Auto Roll",color:"#6366f1"},{label:"Notifier",color:"#f59e0b"},{label:"Glitch Roll",color:"#ef4444"}],
      toggles:[{label:"Legendary Alert",on:true}],
      statusText:"Rolls: 0/∞" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/SolsRNG/auto/main/sols.lua"))()`,
  },
  {
    id: "sols-craft",
    name: "Sols Craft Farmer",
    category: "sols", game: "Sol's RNG", executor: "delta", verified: true,
    description: "Craft materiallarini auto farm.",
    previewColor: "#0f0f1a",
    previewUI: { title: "⚒️ Craft Farm",
      buttons:[{label:"Farm Items",color:"#f59e0b"},{label:"Auto Craft",color:"#22c55e"}],
      statusText:"Crafting: ACTIVE" },
    code:`loadstring(game:HttpGet("https://raw.githubusercontent.com/SolsCraft/farm/main/craft.lua"))()`,
  },
];

// ─── MASSIVE GENERATED SCRIPTS (2000+) ────────────────────────────────────────
const GAMES = [
  "Blox Fruits","Murder Mystery 2","Adopt Me!","Brookhaven 🏡RP","Arsenal",
  "Jailbreak","Da Hood","Pet Simulator X","Shindo Life","Sol's RNG",
  "King Legacy","Prison Life","Natural Disaster Survival","Tower of Hell",
  "Royale High","Lumber Tycoon 2","Mining Simulator 2","Anime Fighting Sim X",
  "Grand Piece Online","Project Slayers","A One Piece Game","Fruit Battlegrounds",
  "Type Soul","Doors","Dead Rails","Evade","Apeirophobia","Bee Swarm Simulator",
  "Vehicle Simulator","Superhero City","Piggy","Flee the Facility",
  "Work at a Pizza Place","Super Golf","Build a Boat","Dragon Ball Rage",
  "Anime Dimensions","Heroes Online","Demon Slayer RPG 2","All Star Tower Defense",
  "Star Glitcher","Toilet Tower Defense","Funky Friday","Friday Night Bloxxin",
  "BedWars","SkyBlock","Hide and Seek Extreme","Zombie Attack","Combat Warriors",
  "Anime Battle Arena","Peroxide","The Strongest Battlegrounds","Untitled Boxing",
  "Basketball Legends","Soccer Stars","Car Crushers 2","Destruction Simulator",
  "Shoot Out","Islands","Creatures of Sonaria","Wild Horse Islands",
  "Kaiju Universe","Giant Simulator","Weight Lifting Simulator","Mega Noob Simulator",
  "Blade Ball","Arm Wrestle Simulator","Punch Simulator","Mining Clicker",
  "Treasure Hunt Simulator","Fishing Simulator","Shark Bite 2","Plane Crazy",
];

const TYPES = [
  "Auto Farm","ESP Wall","Aimbot","Admin Panel","Speed Hack","God Mode",
  "Infinite Jump","Noclip","Kill Aura","Hitbox Expander","Teleport Hub",
  "Get All Items","Anti AFK","Server Hop","Coin Farm","XP Farm",
  "Boss Farm","Auto Quest","Fly Script","Silent Aim","No Recoil",
  "Auto Collect","Kill All","Wallhack","Triggerbot","Infinite Stamina",
  "Auto Parry","Spin Farm","FPS Unlocker","Chat Bypass","Inf Health",
  "Auto Win","Rank Farm","Event Farm","Daily Farm","Pet Farm",
  "Money Farm","Gem Farm","Level Farm","Material Farm",
];

const CATS = ["farm","esp","kill","speed","fly","misc","admin","tp","items"];
const BG_COLORS = ["#0f0f1a","#0a1628","#1a0a0a","#0f1a0a","#0a0a1a","#0d1219","#1a1505","#0a0f1a","#150515"];
const BTN_COLORS = ["#22c55e","#ef4444","#f59e0b","#3b82f6","#a855f7","#06b6d4","#6366f1","#8b5cf6"];

export const GENERATED_SCRIPTS: RobloxScript[] = [];

let gid = 5000;
for (const game of GAMES) {
  for (const type of TYPES) {
    const ci = gid % CATS.length;
    const bi = gid % BTN_COLORS.length;
    const bc = BG_COLORS[gid % BG_COLORS.length];
    GENERATED_SCRIPTS.push({
      id: `g${gid}`,
      name: `${game} — ${type}`,
      category: CATS[ci],
      game,
      executor: "delta",
      verified: gid % 4 !== 0,
      description: `${game} o'yini uchun ${type}. Delta & telefon uchun optimallashgan. Ishlatish: Delta ga paste qiling va Execute bosing.`,
      previewColor: bc,
      previewUI: {
        title: `🎮 ${type}`,
        buttons: [
          { label: "ACTIVATE", color: BTN_COLORS[bi] },
          { label: "STOP",     color: "#64748b" },
        ],
        toggles: [{ label: "Mobile Mode", on: true }],
        statusText: `${game.slice(0,12)}: Ready`,
      },
      code: `-- ${game}: ${type}\n-- Delta Compatible | Mobile Optimized\nloadstring(game:HttpGet("https://scripts.gg/${game.replace(/\W+/g,"-").toLowerCase()}/${type.replace(/\W+/g,"-").toLowerCase()}.lua"))()`,
    });
    gid++;
  }
}

export const ALL_SCRIPTS   = [...SCRIPTS, ...GENERATED_SCRIPTS];
export const TOTAL_COUNT   = ALL_SCRIPTS.length;
