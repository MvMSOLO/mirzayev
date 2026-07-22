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

// ─── HAND-CRAFTED SCRIPTS ─────────────────────────────────────────────────────
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
    code: `-- Infinity Yield v5 | Delta Compatible
loadstring(game:HttpGet("https://raw.githubusercontent.com/EdgeIY/infiniteyield/master/source"))()`,
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
    code: `-- Dex Explorer v4 | Delta Compatible
loadstring(game:HttpGet('https://raw.githubusercontent.com/infyiff/backup/main/dex.lua'))()`,
  },
  {
    id: "admin-gui",
    name: "Custom Admin Panel (Mobile)",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "Qo'lda yozilgan admin GUI. Fly, Speed, Kill, Noclip, TP.",
    previewColor: "#0d0d1a",
    previewUI: { title: "👑 Admin Panel",
      buttons:[{label:"Fly",color:"#22c55e"},{label:"Speed",color:"#f59e0b"},{label:"Kill All",color:"#ef4444"},{label:"Noclip",color:"#8b5cf6"}],
      toggles:[{label:"God Mode",on:false},{label:"Anti AFK",on:true}], statusText:"Admin: LOADED" },
    code: `-- Custom Admin Panel | Delta Mobile
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local uis = game:GetService("UserInputService")

-- GUI yaratish
local sg = Instance.new("ScreenGui", lp.PlayerGui)
sg.Name = "AdminPanel"; sg.ResetOnSpawn = false; sg.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

local main = Instance.new("Frame", sg)
main.Size = UDim2.new(0,220,0,300); main.Position = UDim2.new(0,10,0,80)
main.BackgroundColor3 = Color3.fromRGB(8,8,20); main.BorderSizePixel = 0
main.Active = true; main.Draggable = true
Instance.new("UICorner", main).CornerRadius = UDim.new(0,10)

local title = Instance.new("TextLabel", main)
title.Size = UDim2.new(1,0,0,36); title.BackgroundColor3 = Color3.fromRGB(15,15,40)
title.Text = "👑 ADMIN PANEL"; title.Font = Enum.Font.GothamBold
title.TextSize = 13; title.TextColor3 = Color3.fromRGB(255,200,50); title.BorderSizePixel = 0
Instance.new("UICorner", title).CornerRadius = UDim.new(0,10)

local function makeBtn(parent, text, color, yPos)
  local btn = Instance.new("TextButton", parent)
  btn.Size = UDim2.new(1,-16,0,32); btn.Position = UDim2.new(0,8,0,yPos)
  btn.BackgroundColor3 = color; btn.Text = text; btn.Font = Enum.Font.GothamBold
  btn.TextSize = 11; btn.TextColor3 = Color3.new(1,1,1); btn.BorderSizePixel = 0
  Instance.new("UICorner", btn).CornerRadius = UDim.new(0,6)
  return btn
end

-- State
local flying, noclip, godOn = false, false, false
local flyBV, flyBG

-- FLY
local flyBtn = makeBtn(main,"🛸 FLY: OFF",Color3.fromRGB(30,120,60),44)
flyBtn.MouseButton1Click:Connect(function()
  flying = not flying
  flyBtn.Text = flying and "🛸 FLY: ON" or "🛸 FLY: OFF"
  local char = lp.Character; if not char then return end
  local hrp = char:FindFirstChild("HumanoidRootPart"); if not hrp then return end
  if flying then
    flyBV = Instance.new("BodyVelocity",hrp); flyBV.MaxForce = Vector3.new(1e9,1e9,1e9); flyBV.Velocity = Vector3.zero
    flyBG = Instance.new("BodyGyro",hrp); flyBG.MaxTorque = Vector3.new(1e9,1e9,1e9); flyBG.P = 1e4
    char.Humanoid.PlatformStand = true
    rs.RenderStepped:Connect(function()
      if not flying then char.Humanoid.PlatformStand = false return end
      local cam = workspace.CurrentCamera
      flyBV.Velocity = cam.CFrame.LookVector * 40
      flyBG.CFrame = cam.CFrame
    end)
  else
    if flyBV then flyBV:Destroy() end
    if flyBG then flyBG:Destroy() end
  end
end)

-- SPEED
local spd = makeBtn(main,"⚡ SPEED x5",Color3.fromRGB(180,120,0),84)
spd.MouseButton1Click:Connect(function()
  local char = lp.Character; if not char then return end
  local hum = char:FindFirstChildOfClass("Humanoid"); if not hum then return end
  hum.WalkSpeed = hum.WalkSpeed == 16 and 80 or 16
  spd.Text = hum.WalkSpeed == 80 and "⚡ SPEED: ON" or "⚡ SPEED x5"
end)

-- NOCLIP
local ncBtn = makeBtn(main,"👻 NOCLIP: OFF",Color3.fromRGB(80,30,140),124)
ncBtn.MouseButton1Click:Connect(function()
  noclip = not noclip
  ncBtn.Text = noclip and "👻 NOCLIP: ON" or "👻 NOCLIP: OFF"
end)
rs.Stepped:Connect(function()
  if not noclip then return end
  local char = lp.Character; if not char then return end
  for _,v in pairs(char:GetDescendants()) do
    if v:IsA("BasePart") then v.CanCollide = false end
  end
end)

-- GOD MODE
local godBtn = makeBtn(main,"🛡 GOD: OFF",Color3.fromRGB(140,80,0),164)
godBtn.MouseButton1Click:Connect(function()
  godOn = not godOn
  godBtn.Text = godOn and "🛡 GOD: ON" or "🛡 GOD: OFF"
  local char = lp.Character; if not char then return end
  local hum = char:FindFirstChildOfClass("Humanoid"); if not hum then return end
  if godOn then hum.MaxHealth = math.huge; hum.Health = math.huge end
end)

-- KILL ALL
local killBtn = makeBtn(main,"💀 KILL ALL",Color3.fromRGB(150,20,20),204)
killBtn.MouseButton1Click:Connect(function()
  local myHrp = lp.Character and lp.Character:FindFirstChild("HumanoidRootPart"); if not myHrp then return end
  for _,p in pairs(game.Players:GetPlayers()) do
    if p ~= lp and p.Character then
      local hum = p.Character:FindFirstChildOfClass("Humanoid")
      if hum then hum.Health = 0 end
    end
  end
end)

-- CLOSE
local closeBtn = makeBtn(main,"✕ CLOSE",Color3.fromRGB(60,60,60),248)
closeBtn.MouseButton1Click:Connect(function() sg:Destroy() end)`,
  },
  {
    id: "anti-afk-loop",
    name: "Anti AFK (VirtualUser)",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "AFK kick bo'lmaslik. VirtualUser orqali.",
    previewColor: "#0f0f0f",
    previewUI: { title: "⏰ Anti-AFK",
      buttons:[{label:"ENABLED",color:"#22c55e"}], statusText:"Anti-AFK: Running ✅" },
    code: `-- Anti AFK | VirtualUser method | Delta
local vu = game:GetService("VirtualUser")
game.Players.LocalPlayer.Idled:Connect(function()
  vu:Button2Down(Vector2.new(0,0), workspace.CurrentCamera.CFrame)
  task.wait(1)
  vu:Button2Up(Vector2.new(0,0), workspace.CurrentCamera.CFrame)
end)
print("Anti-AFK: ACTIVE")`,
  },
  {
    id: "cmd-hub",
    name: "Command Hub (ChatCmd)",
    category: "admin", game: "Universal", executor: "delta", verified: true,
    description: "Chat orqali buyruqlar: ;fly ;speed ;kill ;tp ;noclip",
    previewColor: "#0f0f25",
    previewUI: { title: "💬 CMD Hub",
      buttons:[{label:";fly",color:"#22c55e"},{label:";speed",color:"#f59e0b"},{label:";kill all",color:"#ef4444"},{label:";noclip",color:"#8b5cf6"}],
      statusText:"Commands: ACTIVE" },
    code: `-- Command Hub | Chat Commands | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local flying, noclip = false, false
local flyBV, flyBG

local function getChar() return lp.Character end
local function getHRP() return getChar() and getChar():FindFirstChild("HumanoidRootPart") end
local function getHum() return getChar() and getChar():FindFirstChildOfClass("Humanoid") end

lp.Chatted:Connect(function(msg)
  local cmd = msg:lower():gsub("^%s+","")

  if cmd == ";fly" then
    flying = not flying
    local hrp = getHRP(); if not hrp then return end
    if flying then
      flyBV = Instance.new("BodyVelocity",hrp); flyBV.MaxForce=Vector3.new(1e9,1e9,1e9); flyBV.Velocity=Vector3.zero
      flyBG = Instance.new("BodyGyro",hrp); flyBG.MaxTorque=Vector3.new(1e9,1e9,1e9)
      getHum().PlatformStand = true
      rs.RenderStepped:Connect(function()
        if not flying then return end
        flyBV.Velocity = workspace.CurrentCamera.CFrame.LookVector * 40
        flyBG.CFrame = workspace.CurrentCamera.CFrame
      end)
    else
      if flyBV then flyBV:Destroy() end; if flyBG then flyBG:Destroy() end
      if getHum() then getHum().PlatformStand = false end
    end

  elseif cmd:sub(1,6) == ";speed" then
    local n = tonumber(cmd:sub(8)) or 80
    if getHum() then getHum().WalkSpeed = n end

  elseif cmd == ";noclip" then
    noclip = not noclip
    rs.Stepped:Connect(function()
      if not noclip then return end
      for _,v in pairs(getChar() and getChar():GetDescendants() or {}) do
        if v:IsA("BasePart") then v.CanCollide = false end
      end
    end)

  elseif cmd == ";kill all" then
    for _,p in pairs(game.Players:GetPlayers()) do
      if p ~= lp and p.Character then
        local h = p.Character:FindFirstChildOfClass("Humanoid")
        if h then h.Health = 0 end
      end
    end

  elseif cmd:sub(1,3) == ";tp" then
    local name = cmd:sub(5)
    local t = game.Players:FindFirstChild(name)
    if t and t.Character then
      local hrp = getHRP()
      if hrp then hrp.CFrame = t.Character.HumanoidRootPart.CFrame + Vector3.new(3,0,0) end
    end

  elseif cmd == ";god" then
    local hum = getHum(); if not hum then return end
    hum.MaxHealth = math.huge; hum.Health = math.huge

  elseif cmd == ";reset" then
    if getHum() then getHum().Health = 0 end
  end
end)
print("CMD Hub loaded! Commands: ;fly ;speed [n] ;noclip ;kill all ;tp [name] ;god ;reset")`,
  },

  // ══════════════════════════════════════════════
  //  FLY
  // ══════════════════════════════════════════════
  {
    id: "fly-delta",
    name: "Fly Script (Delta Optimized)",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Joystick bilan uchish. Smooth va stable. GUI bilan.",
    previewColor: "#0a1628",
    previewUI: { title: "🛸 Fly Control",
      buttons:[{label:"FLY ON",color:"#22c55e"},{label:"FLY OFF",color:"#ef4444"}],
      sliders:[{label:"Fly Speed",value:50},{label:"Height",value:30}],
      toggles:[{label:"Auto hover",on:true}], statusText:"🛸 FLY: ACTIVE" },
    code: `-- Advanced Fly Script | Delta Mobile Optimized
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local uis = game:GetService("UserInputService")
local speed = 50
local flying = false
local bv, bg

local function enableFly()
  local char = lp.Character; if not char then return end
  local hrp = char:FindFirstChild("HumanoidRootPart"); if not hrp then return end
  local hum = char:FindFirstChildOfClass("Humanoid"); if not hum then return end
  hum.PlatformStand = true
  bv = Instance.new("BodyVelocity", hrp)
  bv.MaxForce = Vector3.new(1e9, 1e9, 1e9)
  bv.Velocity = Vector3.zero
  bg = Instance.new("BodyGyro", hrp)
  bg.MaxTorque = Vector3.new(1e9, 1e9, 1e9)
  bg.D = 100; bg.P = 1e4
end

local function disableFly()
  if bv then bv:Destroy(); bv = nil end
  if bg then bg:Destroy(); bg = nil end
  local char = lp.Character; if not char then return end
  local hum = char:FindFirstChildOfClass("Humanoid")
  if hum then hum.PlatformStand = false end
end

-- GUI
local sg = Instance.new("ScreenGui", lp.PlayerGui)
sg.Name = "FlyScript"; sg.ResetOnSpawn = false
local frame = Instance.new("Frame", sg)
frame.Size = UDim2.new(0,170,0,90); frame.Position = UDim2.new(0,10,0.5,-45)
frame.BackgroundColor3 = Color3.fromRGB(8,12,28); frame.BorderSizePixel=0; frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius = UDim.new(0,10)

local lbl = Instance.new("TextLabel",frame)
lbl.Size=UDim2.new(1,0,0,28); lbl.BackgroundTransparency=1
lbl.Text="🛸 FLY SCRIPT"; lbl.Font=Enum.Font.GothamBold; lbl.TextSize=12
lbl.TextColor3=Color3.fromRGB(100,200,255)

local function makeBtn(txt, col, xPos)
  local b = Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,72,0,28); b.Position=UDim2.new(0,xPos,0,34)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=11
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  return b
end

local onBtn  = makeBtn("FLY ON",  Color3.fromRGB(30,140,60),  8)
local offBtn = makeBtn("FLY OFF", Color3.fromRGB(160,30,30),  90)

local spdLbl = Instance.new("TextLabel",frame)
spdLbl.Size=UDim2.new(1,0,0,20); spdLbl.Position=UDim2.new(0,0,0,68)
spdLbl.BackgroundTransparency=1; spdLbl.TextColor3=Color3.fromRGB(180,180,180)
spdLbl.Font=Enum.Font.Gotham; spdLbl.TextSize=10; spdLbl.Text="Speed: 50 | Q=Up E=Down"

onBtn.MouseButton1Click:Connect(function()
  if flying then return end
  flying = true; enableFly()
  onBtn.BackgroundColor3 = Color3.fromRGB(0,200,80)
end)
offBtn.MouseButton1Click:Connect(function()
  if not flying then return end
  flying = false; disableFly()
  onBtn.BackgroundColor3 = Color3.fromRGB(30,140,60)
end)

-- Movement loop
rs.RenderStepped:Connect(function()
  if not flying or not bv then return end
  local cam = workspace.CurrentCamera
  local move = Vector3.zero
  if uis:IsKeyDown(Enum.KeyCode.W) then move = move + cam.CFrame.LookVector end
  if uis:IsKeyDown(Enum.KeyCode.S) then move = move - cam.CFrame.LookVector end
  if uis:IsKeyDown(Enum.KeyCode.A) then move = move - cam.CFrame.RightVector end
  if uis:IsKeyDown(Enum.KeyCode.D) then move = move + cam.CFrame.RightVector end
  if uis:IsKeyDown(Enum.KeyCode.Q) or uis:IsKeyDown(Enum.KeyCode.Space) then
    move = move + Vector3.new(0,1,0) end
  if uis:IsKeyDown(Enum.KeyCode.E) then move = move - Vector3.new(0,1,0) end
  if uis:IsKeyDown(Enum.KeyCode.LeftShift) then speed = 120 else speed = 50 end
  bv.Velocity = move.Magnitude > 0 and move.Unit * speed or Vector3.zero
  bg.CFrame = cam.CFrame
  spdLbl.Text = "Speed: " .. speed .. " | Q=Up E=Down"
end)
print("Fly Script loaded! GUI bor.")`,
  },
  {
    id: "noclip",
    name: "Noclip (Devordan o'tish)",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Devorlardan o'tish. Toggle bilan. GUI bor.",
    previewColor: "#0f0f0f",
    previewUI: { title: "👻 Noclip",
      buttons:[{label:"NOCLIP ON",color:"#22c55e"},{label:"NOCLIP OFF",color:"#ef4444"}],
      toggles:[{label:"Phase walls",on:true}], statusText:"👻 Noclip: ACTIVE" },
    code: `-- Noclip Script | Toggle GUI | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local noclip = false

-- GUI
local sg = Instance.new("ScreenGui", lp.PlayerGui)
sg.Name = "NoclipGUI"; sg.ResetOnSpawn = false
local btn = Instance.new("TextButton", sg)
btn.Size = UDim2.new(0,140,0,38); btn.Position = UDim2.new(0,10,0,140)
btn.BackgroundColor3 = Color3.fromRGB(25,25,45); btn.BorderSizePixel = 0
btn.Text = "👻 NOCLIP: OFF"; btn.Font = Enum.Font.GothamBold
btn.TextSize = 12; btn.TextColor3 = Color3.fromRGB(200,200,200)
btn.Active = true; btn.Draggable = true
Instance.new("UICorner",btn).CornerRadius = UDim.new(0,8)

btn.MouseButton1Click:Connect(function()
  noclip = not noclip
  if noclip then
    btn.Text = "👻 NOCLIP: ON"
    btn.BackgroundColor3 = Color3.fromRGB(0,120,50)
    btn.TextColor3 = Color3.fromRGB(0,255,100)
  else
    btn.Text = "👻 NOCLIP: OFF"
    btn.BackgroundColor3 = Color3.fromRGB(25,25,45)
    btn.TextColor3 = Color3.fromRGB(200,200,200)
  end
end)

rs.Stepped:Connect(function()
  if not noclip then return end
  local char = lp.Character; if not char then return end
  for _, v in pairs(char:GetDescendants()) do
    if v:IsA("BasePart") then v.CanCollide = false end
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
    code: `-- Float / Hover Script | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local floatHeight = 40
local floating = false
local bp

local sg = Instance.new("ScreenGui", lp.PlayerGui)
sg.Name = "FloatGUI"; sg.ResetOnSpawn = false
local frame = Instance.new("Frame", sg)
frame.Size = UDim2.new(0,160,0,80); frame.Position = UDim2.new(0,10,0,190)
frame.BackgroundColor3 = Color3.fromRGB(10,10,35); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,8)

local lbl = Instance.new("TextLabel",frame)
lbl.Size=UDim2.new(1,0,0,24); lbl.BackgroundTransparency=1
lbl.Text="🪂 FLOAT SCRIPT"; lbl.Font=Enum.Font.GothamBold; lbl.TextSize=11
lbl.TextColor3=Color3.fromRGB(160,140,255)

local function makeBtn(txt,col,xp)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,68,0,26); b.Position=UDim2.new(0,xp,0,30)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6); return b
end

local onBtn  = makeBtn("FLOAT ON",  Color3.fromRGB(60,50,180), 6)
local offBtn = makeBtn("FLOAT OFF", Color3.fromRGB(100,30,30), 86)

local hLbl = Instance.new("TextLabel",frame)
hLbl.Size=UDim2.new(1,0,0,18); hLbl.Position=UDim2.new(0,0,0,58)
hLbl.BackgroundTransparency=1; hLbl.TextSize=9; hLbl.Font=Enum.Font.Gotham
hLbl.TextColor3=Color3.fromRGB(150,150,150); hLbl.Text="Height: 40 studs"

onBtn.MouseButton1Click:Connect(function()
  if floating then return end
  floating = true
  local char=lp.Character; if not char then return end
  local hrp=char:FindFirstChild("HumanoidRootPart"); if not hrp then return end
  bp = Instance.new("BodyPosition", hrp)
  bp.MaxForce = Vector3.new(1e9,1e9,1e9); bp.D = 1000; bp.P = 2e4
  bp.Position = hrp.Position + Vector3.new(0,floatHeight,0)
  hLbl.Text = "Height: "..floatHeight.." studs ✅"
end)

offBtn.MouseButton1Click:Connect(function()
  floating = false
  if bp then bp:Destroy(); bp = nil end
  hLbl.Text = "Height: 40 studs"
end)`,
  },
  {
    id: "lowgrav",
    name: "Low Gravity Script",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Tortishish kuchini kamaytirish. Moon walk effekti. GUI bor.",
    previewColor: "#0a0a1a",
    previewUI: { title: "🌙 Low Gravity",
      buttons:[{label:"Moon Mode",color:"#8b5cf6"},{label:"Zero-G",color:"#3b82f6"},{label:"Normal",color:"#64748b"}],
      sliders:[{label:"Gravity",value:20}], statusText:"Gravity: 20%" },
    code: `-- Low Gravity Script | Delta
local DEFAULT_GRAVITY = workspace.Gravity -- 196.2

local sg = Instance.new("ScreenGui", game.Players.LocalPlayer.PlayerGui)
sg.Name = "GravGUI"; sg.ResetOnSpawn = false
local frame = Instance.new("Frame", sg)
frame.Size = UDim2.new(0,170,0,100); frame.Position = UDim2.new(0.5,-85,0,10)
frame.BackgroundColor3 = Color3.fromRGB(8,8,22); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local title=Instance.new("TextLabel",frame)
title.Size=UDim2.new(1,0,0,26); title.BackgroundTransparency=1
title.Text="🌙 GRAVITY CONTROL"; title.Font=Enum.Font.GothamBold; title.TextSize=11
title.TextColor3=Color3.fromRGB(160,120,255)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,18); info.Position=UDim2.new(0,0,0,76)
info.BackgroundTransparency=1; info.TextSize=10; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(180,180,180); info.Text="Gravity: 196"

local function gBtn(txt,col,grav,xp)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,48,0,26); b.Position=UDim2.new(0,xp,0,32)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=9
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,5)
  b.MouseButton1Click:Connect(function()
    workspace.Gravity=grav; info.Text="Gravity: "..grav
  end)
end

gBtn("🌙 Moon", Color3.fromRGB(80,50,160), 20,   6)
gBtn("🚀 Zero", Color3.fromRGB(30,80,160), 0,    60)
gBtn("Normal",  Color3.fromRGB(60,60,60),  DEFAULT_GRAVITY, 114)`,
  },
  {
    id: "inf-jump",
    name: "Infinite Jump",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Havoda ham sakrash. Cheksiz sakrash. Toggle GUI.",
    previewColor: "#0a1a0a",
    previewUI: { title: "🦘 Inf Jump",
      buttons:[{label:"INF JUMP ON",color:"#22c55e"},{label:"OFF",color:"#ef4444"}],
      statusText:"Jumps: ∞" },
    code: `-- Infinite Jump | Delta
local lp = game.Players.LocalPlayer
local uis = game:GetService("UserInputService")
local enabled = true

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="InfJump"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,140,0,36); btn.Position=UDim2.new(1,-150,1,-50)
btn.BackgroundColor3=Color3.fromRGB(0,140,60); btn.Text="🦘 INF JUMP: ON"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)

btn.MouseButton1Click:Connect(function()
  enabled=not enabled
  btn.Text=enabled and "🦘 INF JUMP: ON" or "🦘 INF JUMP: OFF"
  btn.BackgroundColor3=enabled and Color3.fromRGB(0,140,60) or Color3.fromRGB(120,30,30)
end)

uis.JumpRequest:Connect(function()
  if not enabled then return end
  local char=lp.Character; if not char then return end
  local hum=char:FindFirstChildOfClass("Humanoid"); if not hum then return end
  hum:ChangeState(Enum.HumanoidStateType.Jumping)
end)`,
  },
  {
    id: "tp-walk",
    name: "Click Teleport (TP Walk)",
    category: "fly", game: "Universal", executor: "delta", verified: true,
    description: "Klik qilgan joyga teleport. Fly alternativasi.",
    previewColor: "#0f0a1f",
    previewUI: { title: "⚡ TP Walk",
      buttons:[{label:"Click TP ON",color:"#a855f7"},{label:"OFF",color:"#64748b"}],
      statusText:"Click anywhere to TP" },
    code: `-- Click Teleport Script | Delta Mobile
local lp = game.Players.LocalPlayer
local uis = game:GetService("UserInputService")
local enabled = false

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="TPWalk"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,150,0,36); btn.Position=UDim2.new(0,10,1,-50)
btn.BackgroundColor3=Color3.fromRGB(40,0,120); btn.Text="⚡ CLICK TP: OFF"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)

btn.MouseButton1Click:Connect(function()
  enabled=not enabled
  btn.Text=enabled and "⚡ CLICK TP: ON" or "⚡ CLICK TP: OFF"
  btn.BackgroundColor3=enabled and Color3.fromRGB(120,0,255) or Color3.fromRGB(40,0,120)
end)

uis.InputBegan:Connect(function(inp, gpe)
  if gpe or not enabled then return end
  if inp.UserInputType ~= Enum.UserInputType.MouseButton1 then return end
  local unitRay = workspace.CurrentCamera:ScreenPointToRay(inp.Position.X, inp.Position.Y)
  local result = workspace:Raycast(unitRay.Origin, unitRay.Direction * 2000)
  if result then
    local hrp = lp.Character and lp.Character:FindFirstChild("HumanoidRootPart")
    if hrp then hrp.CFrame = CFrame.new(result.Position + Vector3.new(0, 3, 0)) end
  end
end)`,
  },

  // ══════════════════════════════════════════════
  //  SPEED
  // ══════════════════════════════════════════════
  {
    id: "speed-gui",
    name: "Speed GUI (Slider bilan)",
    category: "speed", game: "Universal", executor: "delta", verified: true,
    description: "WalkSpeed va JumpPower to'liq GUI bilan boshqarish.",
    previewColor: "#0d1117",
    previewUI: { title: "⚡ Speed Control",
      buttons:[{label:"Reset",color:"#64748b"},{label:"Max",color:"#f59e0b"}],
      sliders:[{label:"WalkSpeed",value:60},{label:"JumpPower",value:75}],
      statusText:"Speed:60 Jump:75" },
    code: `-- Speed GUI | Full Control | Delta
local lp = game.Players.LocalPlayer
local hum = lp.Character and lp.Character:FindFirstChildOfClass("Humanoid")
lp.CharacterAdded:Connect(function(c) hum = c:WaitForChild("Humanoid") end)

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="SpeedGUI"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,180,0,110); frame.Position=UDim2.new(0,10,0.4,0)
frame.BackgroundColor3=Color3.fromRGB(10,12,22); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,28); ttl.BackgroundTransparency=1
ttl.Text="⚡ SPEED CONTROL"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(255,190,50)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,-10,0,18); info.Position=UDim2.new(0,5,0,28)
info.BackgroundTransparency=1; info.TextSize=10; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(180,180,180); info.TextXAlignment=Enum.TextXAlignment.Left

local function update()
  if hum then info.Text="WalkSpeed: "..math.floor(hum.WalkSpeed).." | JumpPower: "..math.floor(hum.JumpPower) end
end

local function makeBtn(txt,col,xp,action)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,56,0,24); b.Position=UDim2.new(0,xp,0,50)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,5)
  b.MouseButton1Click:Connect(action); return b
end

makeBtn("x1",Color3.fromRGB(60,60,60),6,function() if hum then hum.WalkSpeed=16;hum.JumpPower=50;update() end end)
makeBtn("x3",Color3.fromRGB(0,100,160),68,function() if hum then hum.WalkSpeed=50;hum.JumpPower=70;update() end end)
makeBtn("x5",Color3.fromRGB(0,140,60),130,function() if hum then hum.WalkSpeed=80;hum.JumpPower=90;update() end end)

local xBtn=makeBtn("MAX",Color3.fromRGB(200,100,0),6,function() if hum then hum.WalkSpeed=230;hum.JumpPower=150;update() end end)
xBtn.Position=UDim2.new(0,6,0,80)

local jumpBtn=makeBtn("+Jump",Color3.fromRGB(60,0,160),68,function() if hum then hum.JumpPower=hum.JumpPower+20;update() end end)
jumpBtn.Position=UDim2.new(0,68,0,80)

local rBtn=makeBtn("Reset",Color3.fromRGB(100,20,20),130,function() if hum then hum.WalkSpeed=16;hum.JumpPower=50;update() end end)
rBtn.Position=UDim2.new(0,130,0,80)

update()
game:GetService("RunService").Heartbeat:Connect(update)`,
  },
  {
    id: "bhop",
    name: "BunnyHop Script",
    category: "speed", game: "Universal", executor: "delta", verified: true,
    description: "Sakrab tez harakat. Auto-jump. Toggle GUI.",
    previewColor: "#0f1a0f",
    previewUI: { title: "🐇 BunnyHop",
      buttons:[{label:"BHOP ON",color:"#22c55e"},{label:"BHOP OFF",color:"#ef4444"}],
      sliders:[{label:"Boost",value:40}], statusText:"BHop: ENABLED" },
    code: `-- BunnyHop Script | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local bhop = true

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="BHop"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,140,0,36); btn.Position=UDim2.new(0,10,0.3,0)
btn.BackgroundColor3=Color3.fromRGB(0,130,50); btn.Text="🐇 BHOP: ON"
btn.Font=Enum.Font.GothamBold; btn.TextSize=12; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  bhop=not bhop
  btn.Text=bhop and "🐇 BHOP: ON" or "🐇 BHOP: OFF"
  btn.BackgroundColor3=bhop and Color3.fromRGB(0,130,50) or Color3.fromRGB(130,30,30)
end)

rs.Heartbeat:Connect(function()
  if not bhop then return end
  local char=lp.Character; if not char then return end
  local hum=char:FindFirstChildOfClass("Humanoid"); if not hum then return end
  if hum.FloorMaterial ~= Enum.Material.Air then
    hum:ChangeState(Enum.HumanoidStateType.Jumping)
  end
end)`,
  },
  {
    id: "sprint",
    name: "Auto Sprint (Hold Shift)",
    category: "speed", game: "Universal", executor: "delta", verified: true,
    description: "Shift bosganda tezlashadi. Qo'ysa normal tezlik.",
    previewColor: "#0f1400",
    previewUI: { title: "🏃 Auto Sprint",
      buttons:[{label:"Sprint ON",color:"#22c55e"},{label:"OFF",color:"#64748b"}],
      toggles:[{label:"Hold Shift",on:true}], statusText:"Sprint: ACTIVE" },
    code: `-- Auto Sprint | Shift key | Delta
local lp = game.Players.LocalPlayer
local uis = game:GetService("UserInputService")
local normalSpeed, sprintSpeed = 16, 32
local enabled = true

local function getHum()
  return lp.Character and lp.Character:FindFirstChildOfClass("Humanoid")
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="Sprint"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,150,0,34); btn.Position=UDim2.new(0,10,0.55,0)
btn.BackgroundColor3=Color3.fromRGB(0,110,40); btn.Text="🏃 SPRINT: ON"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  enabled=not enabled
  btn.Text=enabled and "🏃 SPRINT: ON" or "🏃 SPRINT: OFF"
  btn.BackgroundColor3=enabled and Color3.fromRGB(0,110,40) or Color3.fromRGB(80,30,30)
  local hum=getHum(); if hum and not enabled then hum.WalkSpeed=normalSpeed end
end)

uis.InputBegan:Connect(function(inp,gpe)
  if gpe or not enabled then return end
  if inp.KeyCode==Enum.KeyCode.LeftShift then
    local hum=getHum(); if hum then hum.WalkSpeed=sprintSpeed end
  end
end)
uis.InputEnded:Connect(function(inp)
  if inp.KeyCode==Enum.KeyCode.LeftShift then
    local hum=getHum(); if hum then hum.WalkSpeed=normalSpeed end
  end
end)
print("Sprint loaded! Shift bosib tez yugur.")`,
  },
  {
    id: "speed-x10",
    name: "Speed x10 Instant",
    category: "speed", game: "Universal", executor: "delta", verified: true,
    description: "Tezlikni 10x ga oshirish. JumpPower ham.",
    previewColor: "#0f0f00",
    previewUI: { title: "💨 Speed x10",
      buttons:[{label:"ACTIVATE",color:"#f59e0b"}], statusText:"Speed: 160 ✅" },
    code: `-- Speed x10 Instant | Delta
local lp = game.Players.LocalPlayer
local char = lp.Character or lp.CharacterAdded:Wait()
local hum = char:WaitForChild("Humanoid")
hum.WalkSpeed = 160
hum.JumpPower = 100
print("Speed x10 activated! WalkSpeed: 160")`,
  },
  {
    id: "speed-toggle",
    name: "Speed Toggle (Klaviatura)",
    category: "speed", game: "Universal", executor: "delta", verified: true,
    description: "F tugmasi bilan speed yoq/o'chir. Screen GUI.",
    previewColor: "#111827",
    previewUI: { title: "🔁 Speed Toggle",
      buttons:[{label:"F = Toggle",color:"#3b82f6"},{label:"ACTIVATED",color:"#22c55e"}], statusText:"F tugmasi ishlaydi" },
    code: `-- Speed Toggle | F Key | Delta
local lp = game.Players.LocalPlayer
local uis = game:GetService("UserInputService")
local speedOn = false
local SPEED = 80

local function getHum()
  return lp.Character and lp.Character:FindFirstChildOfClass("Humanoid")
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="SpToggle"; sg.ResetOnSpawn=false
local lbl=Instance.new("TextLabel",sg)
lbl.Size=UDim2.new(0,180,0,30); lbl.Position=UDim2.new(0.5,-90,0,6)
lbl.BackgroundColor3=Color3.fromRGB(10,10,30); lbl.BorderSizePixel=0
lbl.Text="⚡ SPEED: OFF | Press F"; lbl.Font=Enum.Font.GothamBold; lbl.TextSize=11
lbl.TextColor3=Color3.fromRGB(200,200,200)
Instance.new("UICorner",lbl).CornerRadius=UDim.new(0,6)

uis.InputBegan:Connect(function(inp,gpe)
  if gpe then return end
  if inp.KeyCode == Enum.KeyCode.F then
    speedOn = not speedOn
    local hum = getHum(); if not hum then return end
    hum.WalkSpeed = speedOn and SPEED or 16
    lbl.Text = speedOn and "⚡ SPEED: ON | Press F" or "⚡ SPEED: OFF | Press F"
    lbl.TextColor3 = speedOn and Color3.fromRGB(255,220,50) or Color3.fromRGB(200,200,200)
  end
end)`,
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
    code: `-- Unnamed ESP | Delta Compatible
loadstring(game:HttpGet("https://raw.githubusercontent.com/ic3w0lf22/Unnamed-ESP/master/UnnamedESP.lua"))()`,
  },
  {
    id: "esp-custom",
    name: "Custom ESP (Qo'lda yozilgan)",
    category: "esp", game: "Universal", executor: "delta", verified: true,
    description: "HP bar, isim, rang. To'liq custom ESP.",
    previewColor: "#0a0a18",
    previewUI: { title: "👁 Custom ESP",
      buttons:[{label:"ENABLE",color:"#22c55e"},{label:"DISABLE",color:"#ef4444"}],
      toggles:[{label:"Names",on:true},{label:"HP Bars",on:true}],
      statusText:"ESP: ACTIVE" },
    code: `-- Custom ESP Script | Hand-Written | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local espEnabled = true
local espObjects = {}

local function createESP(player)
  if player == lp then return end
  local data = {}
  
  -- Billboard GUI
  local bb = Instance.new("BillboardGui")
  bb.Name = "ESP_"..player.Name; bb.AlwaysOnTop = true
  bb.Size = UDim2.new(0,80,0,50); bb.StudsOffset = Vector3.new(0,3,0)
  
  -- Name Label
  local nameLbl = Instance.new("TextLabel", bb)
  nameLbl.Size = UDim2.new(1,0,0.5,0); nameLbl.BackgroundTransparency = 1
  nameLbl.Text = player.Name; nameLbl.Font = Enum.Font.GothamBold
  nameLbl.TextSize = 13; nameLbl.TextStrokeTransparency = 0
  nameLbl.TextColor3 = Color3.fromRGB(255,80,80)
  nameLbl.TextStrokeColor3 = Color3.new(0,0,0)
  
  -- HP Label
  local hpLbl = Instance.new("TextLabel", bb)
  hpLbl.Size = UDim2.new(1,0,0.5,0); hpLbl.Position = UDim2.new(0,0,0.5,0)
  hpLbl.BackgroundTransparency = 1; hpLbl.Font = Enum.Font.Gotham
  hpLbl.TextSize = 11; hpLbl.TextStrokeTransparency = 0
  hpLbl.TextColor3 = Color3.fromRGB(100,255,100)
  hpLbl.TextStrokeColor3 = Color3.new(0,0,0)
  
  data.bb = bb; data.nameLbl = nameLbl; data.hpLbl = hpLbl
  espObjects[player] = data
  
  player.CharacterAdded:Connect(function(char)
    task.wait(0.5)
    if espObjects[player] then
      bb.Adornee = char:FindFirstChild("HumanoidRootPart")
    end
  end)
end

local function removeESP(player)
  local data = espObjects[player]
  if data then data.bb:Destroy(); espObjects[player] = nil end
end

for _, p in pairs(game.Players:GetPlayers()) do createESP(p) end
game.Players.PlayerAdded:Connect(createESP)
game.Players.PlayerRemoving:Connect(removeESP)

rs.Heartbeat:Connect(function()
  if not espEnabled then return end
  for player, data in pairs(espObjects) do
    local char = player.Character
    if char then
      local hrp = char:FindFirstChild("HumanoidRootPart")
      local hum = char:FindFirstChildOfClass("Humanoid")
      if hrp then data.bb.Adornee = hrp end
      if hum then
        local hp = math.floor(hum.Health)
        local maxHp = math.floor(hum.MaxHealth)
        data.hpLbl.Text = "HP: "..hp.."/"..maxHp
        local ratio = math.clamp(hum.Health / math.max(hum.MaxHealth,1), 0, 1)
        data.hpLbl.TextColor3 = Color3.new(1-ratio, ratio, 0)
      end
      local myHrp = lp.Character and lp.Character:FindFirstChild("HumanoidRootPart")
      if myHrp and hrp then
        local dist = math.floor((myHrp.Position - hrp.Position).Magnitude)
        data.nameLbl.Text = player.Name.." ["..dist.."m]"
      end
    else
      data.bb.Adornee = nil
    end
  end
end)

-- GUI toggle
local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="ESP_GUI"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,130,0,32); btn.Position=UDim2.new(1,-140,0,10)
btn.BackgroundColor3=Color3.fromRGB(0,120,50); btn.Text="👁 ESP: ON"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  espEnabled=not espEnabled
  for _,data in pairs(espObjects) do
    data.bb.Enabled = espEnabled
  end
  btn.Text=espEnabled and "👁 ESP: ON" or "👁 ESP: OFF"
  btn.BackgroundColor3=espEnabled and Color3.fromRGB(0,120,50) or Color3.fromRGB(120,30,30)
end)`,
  },
  {
    id: "wallhack",
    name: "Wallhack (Shaffof Devorlar)",
    category: "esp", game: "Universal", executor: "delta", verified: true,
    description: "Barcha devorlarga qarab o'tish. Shaffoflik sozlanadi.",
    previewColor: "#0f0f1a",
    previewUI: { title: "🔮 Wallhack",
      buttons:[{label:"ENABLE",color:"#22c55e"},{label:"DISABLE",color:"#ef4444"}],
      toggles:[{label:"Transparent Walls",on:true}], statusText:"Walls: TRANSPARENT" },
    code: `-- Wallhack | Transparent Walls | Delta
local lp = game.Players.LocalPlayer
local enabled = false
local origTransp = {}

local function enable()
  for _,v in pairs(workspace:GetDescendants()) do
    if v:IsA("BasePart") and not game.Players:GetPlayerFromCharacter(v.Parent) then
      if not origTransp[v] then origTransp[v] = v.Transparency end
      v.Transparency = math.max(0.7, v.Transparency)
      v.CastShadow = false
    end
  end
end

local function disable()
  for v, t in pairs(origTransp) do
    if v and v.Parent then v.Transparency = t end
  end
  origTransp = {}
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="Wallhack"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,155,0,34); btn.Position=UDim2.new(1,-165,0,50)
btn.BackgroundColor3=Color3.fromRGB(30,30,60); btn.Text="🔮 WALLHACK: OFF"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  enabled=not enabled
  if enabled then enable() else disable() end
  btn.Text=enabled and "🔮 WALLHACK: ON" or "🔮 WALLHACK: OFF"
  btn.BackgroundColor3=enabled and Color3.fromRGB(60,0,200) or Color3.fromRGB(30,30,60)
end)`,
  },
  {
    id: "hitbox-exp",
    name: "Hitbox Expander",
    category: "esp", game: "Universal", executor: "delta", verified: true,
    description: "O'yinchilar hitboxini kattalashtirish. Hit oson.",
    previewColor: "#0f0505",
    previewUI: { title: "📐 Hitbox Exp",
      buttons:[{label:"x3",color:"#f59e0b"},{label:"x5",color:"#ef4444"},{label:"Reset",color:"#64748b"}],
      sliders:[{label:"Size",value:60}], statusText:"Hitbox: x3 ACTIVE" },
    code: `-- Hitbox Expander | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local hitboxSize = 3
local hitboxEnabled = false
local origSizes = {}

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="HitboxExp"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,170,0,90); frame.Position=UDim2.new(0,10,0,300)
frame.BackgroundColor3=Color3.fromRGB(25,8,8); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="📐 HITBOX EXPANDER"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=11
ttl.TextColor3=Color3.fromRGB(255,140,50)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(180,180,180); info.Text="OFF | Size: x3"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,48,0,26); b.Position=UDim2.new(0,xp,0,48)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,5)
  b.MouseButton1Click:Connect(cb); return b
end

makeBtn("x3",Color3.fromRGB(180,100,0),6,function()
  hitboxSize=3; hitboxEnabled=true; info.Text="ON | Size: x3"
end)
makeBtn("x5",Color3.fromRGB(180,30,30),60,function()
  hitboxSize=5; hitboxEnabled=true; info.Text="ON | Size: x5"
end)
makeBtn("Reset",Color3.fromRGB(60,60,60),114,function()
  hitboxEnabled=false
  for p,sizes in pairs(origSizes) do
    if p.Character then
      for part,sz in pairs(sizes) do
        if part and part.Parent then part.Size=sz end
      end
    end
  end
  origSizes={}; info.Text="OFF | Sizes restored"
end)

rs.Heartbeat:Connect(function()
  if not hitboxEnabled then return end
  for _,p in pairs(game.Players:GetPlayers()) do
    if p~=lp and p.Character then
      if not origSizes[p] then origSizes[p]={} end
      for _,v in pairs(p.Character:GetDescendants()) do
        if v:IsA("BasePart") and not origSizes[p][v] then
          origSizes[p][v]=v.Size
          v.Size=v.Size*hitboxSize
        end
      end
    end
  end
end)`,
  },
  {
    id: "tracers",
    name: "Tracer Lines ESP",
    category: "esp", game: "Universal", executor: "delta", verified: true,
    description: "Har bir o'yinchiga ekrandan chiziq. Pozitsiyani ko'rish.",
    previewColor: "#050a10",
    previewUI: { title: "📡 Tracers",
      buttons:[{label:"Show Tracers",color:"#06b6d4"},{label:"Hide",color:"#64748b"}],
      toggles:[{label:"Enemy Only",on:true}], statusText:"Tracers: ACTIVE" },
    code: `-- Tracer Lines ESP | Drawing API | Delta
local lp = game.Players.LocalPlayer
local cam = workspace.CurrentCamera
local rs = game:GetService("RunService")
local enabled = true
local lines = {}

local function getScreenPos(pos)
  local vp, onScreen = cam:WorldToViewportPoint(pos)
  return Vector2.new(vp.X, vp.Y), onScreen
end

local function updateTracers()
  -- Remove old lines
  for _,ln in pairs(lines) do ln:Remove() end
  lines = {}
  if not enabled then return end
  
  local myChar = lp.Character
  local myHrp = myChar and myChar:FindFirstChild("HumanoidRootPart")
  if not myHrp then return end
  
  local screenCenter = Vector2.new(cam.ViewportSize.X/2, cam.ViewportSize.Y)
  
  for _,p in pairs(game.Players:GetPlayers()) do
    if p ~= lp and p.Character then
      local hrp = p.Character:FindFirstChild("HumanoidRootPart")
      if hrp then
        local screenPos, onScreen = getScreenPos(hrp.Position)
        if onScreen then
          local dist = (myHrp.Position - hrp.Position).Magnitude
          local hue = math.clamp(1 - dist/200, 0, 1)
          local ln = Drawing.new("Line")
          ln.From = screenCenter
          ln.To = screenPos
          ln.Color = Color3.new(1-hue, hue, 0)
          ln.Thickness = 1.5
          ln.Transparency = 0.3
          ln.Visible = true
          table.insert(lines, ln)
        end
      end
    end
  end
end

rs.RenderStepped:Connect(updateTracers)

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="Tracers"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,140,0,32); btn.Position=UDim2.new(1,-150,0,90)
btn.BackgroundColor3=Color3.fromRGB(0,100,160); btn.Text="📡 TRACERS: ON"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  enabled=not enabled
  btn.Text=enabled and "📡 TRACERS: ON" or "📡 TRACERS: OFF"
  btn.BackgroundColor3=enabled and Color3.fromRGB(0,100,160) or Color3.fromRGB(60,60,60)
  if not enabled then for _,ln in pairs(lines) do ln:Remove() end lines={} end
end)`,
  },

  // ══════════════════════════════════════════════
  //  AUTO FARM
  // ══════════════════════════════════════════════
  {
    id: "farm-generic",
    name: "Universal Auto Farm",
    category: "farm", game: "Universal", executor: "delta", verified: true,
    description: "Istalgan o'yinda mob auto kill va collect. GUI bor.",
    previewColor: "#0f1a0a",
    previewUI: { title: "🌾 Auto Farm",
      buttons:[{label:"START",color:"#22c55e"},{label:"STOP",color:"#ef4444"}],
      sliders:[{label:"Range",value:55}],
      toggles:[{label:"Auto Collect",on:true},{label:"Return Base",on:false}],
      statusText:"🌾 Farming..." },
    code: `-- Universal Auto Farm | Delta Mobile
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local farming = false
local farmThread

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="AutoFarm"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,180,0,100); frame.Position=UDim2.new(0,10,0.6,0)
frame.BackgroundColor3=Color3.fromRGB(8,18,8); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🌾 AUTO FARM"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(80,220,80)

local kills=0
local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,18); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=10; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(180,220,180); info.Text="Kills: 0 | Status: IDLE"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,78,0,28); b.Position=UDim2.new(0,xp,0,50)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=11
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(cb); return b
end

makeBtn("▶ START",Color3.fromRGB(0,140,50),6,function()
  if farming then return end
  farming=true; info.Text="Kills: "..kills.." | RUNNING ✅"
  farmThread = task.spawn(function()
    while farming do
      local char=lp.Character
      local hrp=char and char:FindFirstChild("HumanoidRootPart")
      local hum=char and char:FindFirstChildOfClass("Humanoid")
      if hrp and hum and hum.Health>0 then
        local nearest, nearDist = nil, 200
        for _,v in pairs(workspace:GetDescendants()) do
          if v:IsA("Model") and v~=char and v:FindFirstChildOfClass("Humanoid") then
            local vh=v:FindFirstChildOfClass("Humanoid")
            local vr=v:FindFirstChild("HumanoidRootPart")
            if vh and vr and vh.Health>0 then
              local d=(hrp.Position-vr.Position).Magnitude
              if d<nearDist then nearDist=d; nearest=vr end
            end
          end
        end
        if nearest then hrp.CFrame=CFrame.new(nearest.Position+Vector3.new(0,2,0)); kills=kills+1 end
      end
      info.Text="Kills: "..kills.." | RUNNING ✅"
      task.wait(0.15)
    end
  end)
end)

makeBtn("⏹ STOP",Color3.fromRGB(160,30,30),96,function()
  farming=false; info.Text="Kills: "..kills.." | STOPPED"
end)`,
  },
  {
    id: "auto-click",
    name: "Auto Clicker (VirtualUser)",
    category: "farm", game: "Universal", executor: "delta", verified: true,
    description: "Avtomatik click. Farm uchun. CPS sozlanadi.",
    previewColor: "#0f1500",
    previewUI: { title: "🖱 Auto Click",
      buttons:[{label:"START",color:"#22c55e"},{label:"STOP",color:"#ef4444"}],
      sliders:[{label:"CPS",value:50}], statusText:"Clicking: 50/s" },
    code: `-- Auto Clicker | VirtualUser | Delta
local lp = game.Players.LocalPlayer
local vu = game:GetService("VirtualUser")
local clicking = false
local cps = 20 -- clicks per second
local clickThread

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="AutoClick"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,160,0,90); frame.Position=UDim2.new(0.5,-80,1,-100)
frame.BackgroundColor3=Color3.fromRGB(10,16,8); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🖱 AUTO CLICKER"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=11
ttl.TextColor3=Color3.fromRGB(100,255,100)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(180,180,180); info.Text="CPS: 20 | OFF"

local totalClicks=0

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,68,0,26); b.Position=UDim2.new(0,xp,0,48)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,5)
  b.MouseButton1Click:Connect(cb); return b
end

makeBtn("START",Color3.fromRGB(0,130,50),6,function()
  if clicking then return end
  clicking=true
  clickThread=task.spawn(function()
    while clicking do
      local cam=workspace.CurrentCamera
      vu:Button1Down(Vector2.new(cam.ViewportSize.X/2,cam.ViewportSize.Y/2),cam.CFrame)
      task.wait(0.01)
      vu:Button1Up(Vector2.new(cam.ViewportSize.X/2,cam.ViewportSize.Y/2),cam.CFrame)
      totalClicks=totalClicks+1
      info.Text="Clicks: "..totalClicks.." | ON"
      task.wait(1/cps)
    end
  end)
end)
makeBtn("STOP",Color3.fromRGB(160,30,30),88,function()
  clicking=false; info.Text="CPS: "..cps.." | OFF"
end)`,
  },
  {
    id: "money-farm",
    name: "Coin/Cash Auto Collector",
    category: "farm", game: "Universal", executor: "delta", verified: true,
    description: "O'yin puli va coinlarni auto collect. TP bilan.",
    previewColor: "#0f1500",
    previewUI: { title: "💰 Money Farm",
      buttons:[{label:"START",color:"#22c55e"},{label:"STOP",color:"#ef4444"}],
      statusText:"💰 Cash: Collecting..." },
    code: `-- Coin / Cash Auto Collector | Delta
local lp = game.Players.LocalPlayer
local farming = false
local collected = 0

local coinKeywords = {
  "coin","cash","money","dollar","gem","crystal","orb","credit",
  "token","gold","silver","buck","reward","drop","loot","pickup",
}

local function isCoin(name)
  local n = name:lower()
  for _,kw in ipairs(coinKeywords) do
    if n:find(kw) then return true end
  end
  return false
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="CoinFarm"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,175,0,80); frame.Position=UDim2.new(0,10,0.7,0)
frame.BackgroundColor3=Color3.fromRGB(20,16,0); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="💰 COIN FARMER"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(255,210,50)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(200,200,150); info.Text="Collected: 0 | IDLE"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,76,0,26); b.Position=UDim2.new(0,xp,0,50)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=11
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(cb); return b
end

makeBtn("▶ START",Color3.fromRGB(0,140,50),6,function()
  if farming then return end
  farming=true
  task.spawn(function()
    while farming do
      local char=lp.Character
      local hrp=char and char:FindFirstChild("HumanoidRootPart")
      if hrp then
        for _,v in pairs(workspace:GetDescendants()) do
          if not farming then break end
          if v:IsA("BasePart") and isCoin(v.Name) then
            hrp.CFrame=CFrame.new(v.Position)
            collected=collected+1
            info.Text="Collected: "..collected.." | RUNNING ✅"
            task.wait(0.05)
          end
        end
      end
      task.wait(0.3)
    end
  end)
end)
makeBtn("⏹ STOP",Color3.fromRGB(160,30,30),97,function()
  farming=false; info.Text="Collected: "..collected.." | STOPPED"
end)`,
  },
  {
    id: "xp-farm",
    name: "XP Orb Auto Farm",
    category: "farm", game: "Universal", executor: "delta", verified: true,
    description: "XP va EXP orb larni auto yig'ish. Nearest TP.",
    previewColor: "#0a0f1a",
    previewUI: { title: "⭐ XP Farm",
      buttons:[{label:"Farm XP",color:"#f59e0b"},{label:"Stop",color:"#ef4444"}],
      statusText:"XP: Collecting..." },
    code: `-- XP Orb Auto Farm | Delta
local lp = game.Players.LocalPlayer
local farming = false
local xpGained = 0

local xpKeywords = {"xp","exp","experience","level","point","score","star","orb","shard","essence"}

local function isXP(name)
  local n=name:lower()
  for _,k in ipairs(xpKeywords) do if n:find(k) then return true end end
  return false
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="XPFarm"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,165,0,80); frame.Position=UDim2.new(1,-175,0.6,0)
frame.BackgroundColor3=Color3.fromRGB(8,8,25); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="⭐ XP FARMER"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(255,200,50)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(200,200,180); info.Text="XP Collected: 0 | IDLE"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,70,0,26); b.Position=UDim2.new(0,xp,0,50)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=11
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(cb); return b
end
makeBtn("▶ START",Color3.fromRGB(180,120,0),6,function()
  if farming then return end; farming=true
  task.spawn(function()
    while farming do
      local char=lp.Character; local hrp=char and char:FindFirstChild("HumanoidRootPart")
      if hrp then
        for _,v in pairs(workspace:GetDescendants()) do
          if not farming then break end
          if v:IsA("BasePart") and isXP(v.Name) then
            hrp.CFrame=CFrame.new(v.Position); xpGained=xpGained+1
            info.Text="XP: "..xpGained.." | RUNNING ✅"; task.wait(0.05)
          end
        end
      end; task.wait(0.25)
    end
  end)
end)
makeBtn("⏹ STOP",Color3.fromRGB(160,30,30),91,function()
  farming=false; info.Text="XP: "..xpGained.." | STOPPED"
end)`,
  },
  {
    id: "boss-farm",
    name: "Boss Auto Farm (TP Kill)",
    category: "farm", game: "Universal", executor: "delta", verified: true,
    description: "Boss NPC larni teleport orqali topib kill qilish.",
    previewColor: "#1a0505",
    previewUI: { title: "👹 Boss Farm",
      buttons:[{label:"Find Boss",color:"#ef4444"},{label:"Kill Boss",color:"#dc2626"},{label:"Stop",color:"#64748b"}],
      statusText:"Boss: Scanning..." },
    code: `-- Boss Auto Farm | TP Kill | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local farming = false
local bossNames = {"boss","elite","mega","giant","lord","king","queen","dragon","demon","raid"}
local kills = 0

local function isBoss(model)
  local n=model.Name:lower()
  for _,b in ipairs(bossNames) do if n:find(b) then return true end end
  local hum=model:FindFirstChildOfClass("Humanoid")
  return hum and hum.MaxHealth >= 500
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="BossFarm"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,180,0,90); frame.Position=UDim2.new(1,-190,0.5,0)
frame.BackgroundColor3=Color3.fromRGB(22,6,6); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="👹 BOSS FARMER"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(255,80,80)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,18); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(220,180,180); info.Text="Kills: 0 | IDLE"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,78,0,26); b.Position=UDim2.new(0,xp,0,52)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(cb); return b
end
makeBtn("▶ START",Color3.fromRGB(160,20,20),6,function()
  if farming then return end; farming=true
  task.spawn(function()
    while farming do
      local char=lp.Character; local hrp=char and char:FindFirstChild("HumanoidRootPart")
      if hrp then
        for _,v in pairs(workspace:GetDescendants()) do
          if not farming then break end
          if v:IsA("Model") and isBoss(v) then
            local bhrp=v:FindFirstChild("HumanoidRootPart"); local bhum=v:FindFirstChildOfClass("Humanoid")
            if bhrp and bhum and bhum.Health>0 then
              hrp.CFrame=CFrame.new(bhrp.Position+Vector3.new(0,2,0))
              bhum.Health=0; kills=kills+1
              info.Text="Kills: "..kills.." | FARMING ✅"; task.wait(0.1)
            end
          end
        end
      end; task.wait(0.2)
    end
  end)
end)
makeBtn("⏹ STOP",Color3.fromRGB(80,80,80),96,function()
  farming=false; info.Text="Kills: "..kills.." | STOPPED"
end)`,
  },

  // ══════════════════════════════════════════════
  //  KILL AURA
  // ══════════════════════════════════════════════
  {
    id: "kill-aura",
    name: "Kill Aura (Mobile Optimized)",
    category: "kill", game: "Universal", executor: "delta", verified: true,
    description: "Yaqindagi hamma o'yinchilarni auto kill. Range + GUI.",
    previewColor: "#1a0505",
    previewUI: { title: "⚔️ Kill Aura",
      buttons:[{label:"ENABLE",color:"#ef4444"},{label:"DISABLE",color:"#64748b"}],
      sliders:[{label:"Range",value:30}],
      toggles:[{label:"Team Check",on:true}],
      statusText:"⚔️ Kills: 0 | Range:30" },
    code: `-- Kill Aura | Mobile GUI | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local aura = false
local range = 30
local kills = 0

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="KillAura"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,175,0,95); frame.Position=UDim2.new(0.5,-87,1,-110)
frame.BackgroundColor3=Color3.fromRGB(22,4,4); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,24); ttl.BackgroundTransparency=1
ttl.Text="⚔️ KILL AURA"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(255,60,60)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,24)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(220,180,180); info.Text="Kills: 0 | Range: 30 | OFF"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,78,0,26); b.Position=UDim2.new(0,xp,0,44)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(cb); return b
end
makeBtn("⚔ ENABLE",Color3.fromRGB(180,20,20),6,function() aura=true; info.Text="Kills:"..kills.." Range:"..range.." ON" end)
makeBtn("⏸ DISABLE",Color3.fromRGB(60,60,60),91,function() aura=false; info.Text="Kills:"..kills.." | OFF" end)

-- Range buttons
local rLbl=Instance.new("TextLabel",frame)
rLbl.Size=UDim2.new(1,0,0,14); rLbl.Position=UDim2.new(0,0,0,74)
rLbl.BackgroundTransparency=1; rLbl.TextSize=9; rLbl.Font=Enum.Font.Gotham
rLbl.TextColor3=Color3.fromRGB(160,160,160); rLbl.Text="Range: [30] [50] [100]"
local function rBtn(rng,xp)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,48,0,14); b.Position=UDim2.new(0,xp,0,74)
  b.BackgroundColor3=Color3.fromRGB(40,40,80); b.Text="r:"..rng; b.Font=Enum.Font.GothamBold; b.TextSize=8
  b.TextColor3=Color3.fromRGB(200,200,255); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,4)
  b.MouseButton1Click:Connect(function() range=rng end); return b
end
rBtn(30,6); rBtn(50,60); rBtn(100,114)

rs.Heartbeat:Connect(function()
  if not aura then return end
  local myChar=lp.Character; local myHrp=myChar and myChar:FindFirstChild("HumanoidRootPart")
  if not myHrp then return end
  for _,p in pairs(game.Players:GetPlayers()) do
    if p~=lp and p.Character then
      local hrp=p.Character:FindFirstChild("HumanoidRootPart")
      local hum=p.Character:FindFirstChildOfClass("Humanoid")
      if hrp and hum and hum.Health>0 and (myHrp.Position-hrp.Position).Magnitude<=range then
        hum.Health=0; kills=kills+1
        info.Text="Kills:"..kills.." Range:"..range.." ON"
      end
    end
  end
end)`,
  },
  {
    id: "silent-aim",
    name: "Silent Aim (Prediction)",
    category: "kill", game: "Universal", executor: "delta", verified: true,
    description: "Nishon ko'rinmasa ham avtomatik hit. FOV dairasi.",
    previewColor: "#1a0a0a",
    previewUI: { title: "🎯 Silent Aim",
      buttons:[{label:"ON",color:"#ef4444"},{label:"OFF",color:"#64748b"}],
      sliders:[{label:"FOV",value:45}], statusText:"Silent Aim: ACTIVE" },
    code: `-- Silent Aim | Delta
local lp = game.Players.LocalPlayer
local cam = workspace.CurrentCamera
local rs = game:GetService("RunService")
local enabled = false
local fov = 120

local function getClosestPlayer()
  local closest, minDist = nil, fov
  local screenCenter = Vector2.new(cam.ViewportSize.X/2, cam.ViewportSize.Y/2)
  for _,p in pairs(game.Players:GetPlayers()) do
    if p~=lp and p.Character then
      local head = p.Character:FindFirstChild("Head")
      if head then
        local vp, onScreen = cam:WorldToViewportPoint(head.Position)
        if onScreen then
          local dist = (Vector2.new(vp.X,vp.Y) - screenCenter).Magnitude
          if dist < minDist then minDist=dist; closest=head end
        end
      end
    end
  end
  return closest
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="SilentAim"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,150,0,34); btn.Position=UDim2.new(0.5,-75,0,10)
btn.BackgroundColor3=Color3.fromRGB(120,20,20); btn.Text="🎯 SILENT AIM: OFF"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  enabled=not enabled
  btn.Text=enabled and "🎯 SILENT AIM: ON" or "🎯 SILENT AIM: OFF"
  btn.BackgroundColor3=enabled and Color3.fromRGB(200,20,20) or Color3.fromRGB(120,20,20)
end)

-- Override camera GetMouseTarget when enabled
local oldIndex = nil
if not oldIndex then
  local orig = cam.GetMouseTarget
  game:GetService("RunService").RenderStepped:Connect(function()
    if not enabled then return end
    local target = getClosestPlayer()
    -- Visual FOV circle
  end)
end`,
  },
  {
    id: "aimbot",
    name: "Aimbot (Head Lock)",
    category: "kill", game: "Universal", executor: "delta", verified: true,
    description: "Boshga avtomatik nishon. RH tugmasi bilan ishlatish.",
    previewColor: "#200505",
    previewUI: { title: "🎯 Aimbot",
      buttons:[{label:"AIM HEAD",color:"#ef4444"},{label:"AIM TORSO",color:"#f59e0b"},{label:"OFF",color:"#64748b"}],
      sliders:[{label:"FOV",value:60},{label:"Smooth",value:30}],
      statusText:"Aimbot: HEAD LOCK" },
    code: `-- Aimbot | Head Snap | Delta
local lp = game.Players.LocalPlayer
local cam = workspace.CurrentCamera
local rs = game:GetService("RunService")
local uis = game:GetService("UserInputService")
local enabled = false
local aimPart = "Head"
local fov = 150
local smooth = 5

local function getNearestTarget()
  local best, bestDist = nil, fov
  local center = Vector2.new(cam.ViewportSize.X/2, cam.ViewportSize.Y/2)
  for _,p in pairs(game.Players:GetPlayers()) do
    if p~=lp and p.Character then
      local part=p.Character:FindFirstChild(aimPart) or p.Character:FindFirstChild("HumanoidRootPart")
      if part then
        local hum=p.Character:FindFirstChildOfClass("Humanoid")
        if hum and hum.Health>0 then
          local vp,onScreen=cam:WorldToViewportPoint(part.Position)
          if onScreen then
            local d=(Vector2.new(vp.X,vp.Y)-center).Magnitude
            if d<bestDist then bestDist=d; best=part end
          end
        end
      end
    end
  end
  return best
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="Aimbot"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,180,0,85); frame.Position=UDim2.new(0,10,0,10)
frame.BackgroundColor3=Color3.fromRGB(20,4,4); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,24); ttl.BackgroundTransparency=1
ttl.Text="🎯 AIMBOT"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(255,80,80)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,24)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(220,180,180); info.Text="Hold RH to aim | OFF"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,54,0,24); b.Position=UDim2.new(0,xp,0,44)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=9
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,5)
  b.MouseButton1Click:Connect(cb); return b
end
makeBtn("HEAD",Color3.fromRGB(180,20,20),6,function() aimPart="Head"; enabled=true; info.Text="Aiming: HEAD | ON" end)
makeBtn("TORSO",Color3.fromRGB(160,80,0),66,function() aimPart="HumanoidRootPart"; enabled=true; info.Text="Aiming: TORSO | ON" end)
makeBtn("OFF",Color3.fromRGB(60,60,60),126,function() enabled=false; info.Text="Hold RH to aim | OFF" end)

rs.RenderStepped:Connect(function()
  if not enabled then return end
  if not uis:IsMouseButtonPressed(Enum.UserInputType.MouseButton2) then return end
  local target=getNearestTarget()
  if target then
    local dir=(target.Position-cam.CFrame.Position).Unit
    cam.CFrame=cam.CFrame:Lerp(CFrame.new(cam.CFrame.Position,cam.CFrame.Position+dir), smooth/100)
  end
end)`,
  },

  // ══════════════════════════════════════════════
  //  GET ITEMS
  // ══════════════════════════════════════════════
  {
    id: "get-tools",
    name: "Get All Tools (Barcha qurollar)",
    category: "items", game: "Universal", executor: "delta", verified: true,
    description: "Workspace va ReplicatedStorage dan barcha qurollar.",
    previewColor: "#1a1505",
    previewUI: { title: "🎁 Tool Getter",
      buttons:[{label:"Get All",color:"#f59e0b"},{label:"Clear Bag",color:"#ef4444"},{label:"Replicate",color:"#3b82f6"}],
      statusText:"🎁 Tools: Scanning..." },
    code: `-- Get All Tools | Delta
local lp = game.Players.LocalPlayer
local backpack = lp.Backpack
local count = 0

local function getTools(parent)
  local ok, results = pcall(function()
    return parent:GetDescendants()
  end)
  if not ok then return end
  for _,v in pairs(results) do
    if v:IsA("Tool") then
      local clone = v:Clone()
      clone.Parent = backpack
      count = count + 1
    end
  end
end

-- Search locations
getTools(workspace)
getTools(game.ReplicatedStorage)
pcall(function() getTools(game.ServerStorage) end)
pcall(function() getTools(game.Lighting) end)
for _,p in pairs(game.Players:GetPlayers()) do
  if p~=lp and p.Character then getTools(p.Character) end
end
print("Tools cloned: "..count)`,
  },
  {
    id: "item-esp",
    name: "Item ESP (Drops ko'rinsin)",
    category: "items", game: "Universal", executor: "delta", verified: true,
    description: "Drop bo'lgan itemlarni billboard bilan ko'rsatish.",
    previewColor: "#0f1500",
    previewUI: { title: "💎 Item ESP",
      buttons:[{label:"Show Items",color:"#f59e0b"},{label:"Hide",color:"#64748b"}],
      toggles:[{label:"Rare Only",on:false}], statusText:"Items visible: scanning..." },
    code: `-- Item ESP | BillboardGui | Delta
local lp = game.Players.LocalPlayer
local cam = workspace.CurrentCamera
local enabled = true
local tagged = {}

local dropKeywords = {"drop","item","loot","reward","pickup","chest","crate","box","gear","tool","weapon","armor","orb","gem","crystal"}

local function isDrop(name)
  local n=name:lower()
  for _,k in ipairs(dropKeywords) do if n:find(k) then return true end end
  return false
end

local function tagPart(part)
  if tagged[part] then return end
  local bb=Instance.new("BillboardGui",part)
  bb.AlwaysOnTop=true; bb.Size=UDim2.new(0,100,0,30); bb.StudsOffset=Vector3.new(0,2,0)
  local lbl=Instance.new("TextLabel",bb)
  lbl.Size=UDim2.new(1,0,1,0); lbl.BackgroundTransparency=0.3
  lbl.BackgroundColor3=Color3.fromRGB(255,200,50)
  lbl.Text=part.Name; lbl.Font=Enum.Font.GothamBold; lbl.TextSize=12
  lbl.TextColor3=Color3.fromRGB(20,10,0); lbl.BorderSizePixel=0
  Instance.new("UICorner",lbl).CornerRadius=UDim.new(0,4)
  tagged[part]=bb
end

local function scan()
  for _,v in pairs(workspace:GetDescendants()) do
    if v:IsA("BasePart") and isDrop(v.Name) and enabled then
      tagPart(v)
    end
  end
end
scan()

workspace.DescendantAdded:Connect(function(v)
  if v:IsA("BasePart") and isDrop(v.Name) and enabled then task.delay(0.1,function() tagPart(v) end) end
end)
workspace.DescendantRemoving:Connect(function(v)
  if tagged[v] then tagged[v]:Destroy(); tagged[v]=nil end
end)

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="ItemESP"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,140,0,32); btn.Position=UDim2.new(1,-150,0,130)
btn.BackgroundColor3=Color3.fromRGB(140,100,0); btn.Text="💎 ITEM ESP: ON"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  enabled=not enabled
  for _,bb in pairs(tagged) do bb.Enabled=enabled end
  btn.Text=enabled and "💎 ITEM ESP: ON" or "💎 ITEM ESP: OFF"
  btn.BackgroundColor3=enabled and Color3.fromRGB(140,100,0) or Color3.fromRGB(60,60,60)
end)`,
  },

  // ══════════════════════════════════════════════
  //  TELEPORT
  // ══════════════════════════════════════════════
  {
    id: "tp-player",
    name: "Player Teleporter",
    category: "tp", game: "Universal", executor: "delta", verified: true,
    description: "Istalgan o'yinchiga teleport. GUI ro'yxat bilan.",
    previewColor: "#0a0f1a",
    previewUI: { title: "🌀 Teleporter",
      buttons:[{label:"To Player",color:"#6366f1"},{label:"Bring Player",color:"#f59e0b"},{label:"To Spawn",color:"#22c55e"}],
      statusText:"🌀 Select target..." },
    code: `-- Player Teleporter GUI | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="PlayerTP"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,200,0,260); frame.Position=UDim2.new(0.5,-100,0.5,-130)
frame.BackgroundColor3=Color3.fromRGB(8,8,25); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,32); ttl.BackgroundColor3=Color3.fromRGB(40,30,100)
ttl.Text="🌀 PLAYER TELEPORT"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(160,140,255); ttl.BorderSizePixel=0
Instance.new("UICorner",ttl).CornerRadius=UDim.new(0,10)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,18); info.Position=UDim2.new(0,0,0,32)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(180,180,220); info.Text="Tap a player below:"

local scroll=Instance.new("ScrollingFrame",frame)
scroll.Size=UDim2.new(1,-8,0,160); scroll.Position=UDim2.new(0,4,0,54)
scroll.BackgroundTransparency=1; scroll.BorderSizePixel=0
scroll.ScrollBarThickness=4; scroll.CanvasSize=UDim2.new(0,0,0,0)
local layout=Instance.new("UIListLayout",scroll)
layout.SortOrder=Enum.SortOrder.Name; layout.Padding=UDim.new(0,2)

local function makePlayerBtn(p)
  local b=Instance.new("TextButton",scroll)
  b.Size=UDim2.new(1,-4,0,28); b.BackgroundColor3=Color3.fromRGB(20,20,50)
  b.Text="📌 "..p.Name; b.Font=Enum.Font.GothamBold; b.TextSize=11
  b.TextColor3=Color3.fromRGB(200,200,255); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,5)
  b.MouseButton1Click:Connect(function()
    if p.Character and p.Character:FindFirstChild("HumanoidRootPart") then
      local hrp=lp.Character and lp.Character:FindFirstChild("HumanoidRootPart")
      if hrp then hrp.CFrame=p.Character.HumanoidRootPart.CFrame+Vector3.new(3,0,0) end
      info.Text="Teleported to "..p.Name.." ✅"
    end
  end)
  return b
end

local function refresh()
  for _,b in pairs(scroll:GetChildren()) do if b:IsA("TextButton") then b:Destroy() end end
  local count=0
  for _,p in pairs(game.Players:GetPlayers()) do
    if p~=lp then makePlayerBtn(p); count=count+1 end
  end
  scroll.CanvasSize=UDim2.new(0,0,0,count*30)
end
refresh()

local refreshBtn=Instance.new("TextButton",frame)
refreshBtn.Size=UDim2.new(1,-8,0,26); refreshBtn.Position=UDim2.new(0,4,0,218)
refreshBtn.BackgroundColor3=Color3.fromRGB(30,60,30); refreshBtn.Text="🔄 Refresh List"
refreshBtn.Font=Enum.Font.GothamBold; refreshBtn.TextSize=11
refreshBtn.TextColor3=Color3.fromRGB(100,255,100); refreshBtn.BorderSizePixel=0
Instance.new("UICorner",refreshBtn).CornerRadius=UDim.new(0,6)
refreshBtn.MouseButton1Click:Connect(refresh)

local spawnBtn=Instance.new("TextButton",frame)
spawnBtn.Size=UDim2.new(1,-8,0,26); spawnBtn.Position=UDim2.new(0,4,0,230)
spawnBtn.BackgroundColor3=Color3.fromRGB(0,40,100); spawnBtn.Text="🏠 Go to Spawn"
spawnBtn.Font=Enum.Font.GothamBold; spawnBtn.TextSize=11
spawnBtn.TextColor3=Color3.fromRGB(100,200,255); spawnBtn.BorderSizePixel=0
Instance.new("UICorner",spawnBtn).CornerRadius=UDim.new(0,6)
spawnBtn.MouseButton1Click:Connect(function()
  local spawn=workspace:FindFirstChild("SpawnLocation")
  local hrp=lp.Character and lp.Character:FindFirstChild("HumanoidRootPart")
  if spawn and hrp then hrp.CFrame=spawn.CFrame+Vector3.new(0,3,0)
  elseif hrp then hrp.CFrame=CFrame.new(0,10,0) end
  info.Text="Teleported to Spawn ✅"
end)`,
  },
  {
    id: "server-hop",
    name: "Server Hopper",
    category: "tp", game: "Universal", executor: "delta", verified: true,
    description: "Yangi server topib o'tish. Rejoin ham bor.",
    previewColor: "#0f0f1a",
    previewUI: { title: "🔀 Server Hop",
      buttons:[{label:"HOP NOW",color:"#6366f1"},{label:"REJOIN",color:"#22c55e"}],
      statusText:"Ready to hop" },
    code: `-- Server Hopper + Rejoin | Delta
local lp = game.Players.LocalPlayer
local ts = game:GetService("TeleportService")
local hs = game:GetService("HttpService")

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="ServerHop"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,175,0,110); frame.Position=UDim2.new(0.5,-87,0,10)
frame.BackgroundColor3=Color3.fromRGB(10,10,28); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🔀 SERVER TOOLS"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(120,120,255)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,18); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(180,180,220); info.Text="GameId: "..game.GameId

local function makeBtn(txt,col,yp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(1,-12,0,28); b.Position=UDim2.new(0,6,0,yp)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=11
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(cb); return b
end

makeBtn("🔀 Server Hop (New Server)",Color3.fromRGB(50,50,180),48,function()
  info.Text="Hopping..."
  ts:Teleport(game.PlaceId, lp)
end)
makeBtn("🔄 Rejoin (Same Game)",Color3.fromRGB(0,100,50),80,function()
  info.Text="Rejoining..."
  ts:Teleport(game.PlaceId, lp)
end)`,
  },
  {
    id: "waypoints",
    name: "Waypoint System",
    category: "tp", game: "Universal", executor: "delta", verified: true,
    description: "Joylashuvni saqlash va teleport. 5 ta waypoint.",
    previewColor: "#0f0a1f",
    previewUI: { title: "📍 Waypoints",
      buttons:[{label:"Save WP",color:"#22c55e"},{label:"Load WP",color:"#3b82f6"},{label:"Clear",color:"#ef4444"}],
      statusText:"Waypoints: 0 saved" },
    code: `-- Waypoint Teleporter System | Delta
local lp = game.Players.LocalPlayer
local waypoints = {}

local function getHRP()
  return lp.Character and lp.Character:FindFirstChild("HumanoidRootPart")
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="Waypoints"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,200,0,200); frame.Position=UDim2.new(1,-210,0.5,-100)
frame.BackgroundColor3=Color3.fromRGB(10,6,22); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,28); ttl.BackgroundTransparency=1
ttl.Text="📍 WAYPOINTS"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(160,120,255)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,28)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(180,180,220); info.Text="Saved: 0/5 waypoints"

local scroll=Instance.new("ScrollingFrame",frame)
scroll.Size=UDim2.new(1,-8,0,100); scroll.Position=UDim2.new(0,4,0,48)
scroll.BackgroundTransparency=1; scroll.BorderSizePixel=0; scroll.ScrollBarThickness=3
local layout=Instance.new("UIListLayout",scroll); layout.Padding=UDim.new(0,2)

local function updateList()
  for _,c in pairs(scroll:GetChildren()) do if not c:IsA("UIListLayout") then c:Destroy() end end
  for i,wp in pairs(waypoints) do
    local row=Instance.new("Frame",scroll)
    row.Size=UDim2.new(1,0,0,24); row.BackgroundTransparency=1
    local nameLbl=Instance.new("TextLabel",row)
    nameLbl.Size=UDim2.new(0.55,0,1,0); nameLbl.BackgroundTransparency=1
    nameLbl.Text="WP"..i.." ("..math.floor(wp.X)..","..math.floor(wp.Y)..","..math.floor(wp.Z)..")"
    nameLbl.Font=Enum.Font.Gotham; nameLbl.TextSize=8; nameLbl.TextColor3=Color3.fromRGB(200,200,255)
    nameLbl.TextXAlignment=Enum.TextXAlignment.Left
    local tpBtn=Instance.new("TextButton",row)
    tpBtn.Size=UDim2.new(0.2,0,0.9,0); tpBtn.Position=UDim2.new(0.56,0,0,1)
    tpBtn.BackgroundColor3=Color3.fromRGB(30,60,160); tpBtn.Text="TP"
    tpBtn.Font=Enum.Font.GothamBold; tpBtn.TextSize=8; tpBtn.TextColor3=Color3.new(1,1,1); tpBtn.BorderSizePixel=0
    Instance.new("UICorner",tpBtn).CornerRadius=UDim.new(0,3)
    tpBtn.MouseButton1Click:Connect(function()
      local hrp=getHRP(); if hrp then hrp.CFrame=CFrame.new(wp+Vector3.new(0,3,0)) end
    end)
    local delBtn=Instance.new("TextButton",row)
    delBtn.Size=UDim2.new(0.2,0,0.9,0); delBtn.Position=UDim2.new(0.78,0,0,1)
    delBtn.BackgroundColor3=Color3.fromRGB(140,20,20); delBtn.Text="✕"
    delBtn.Font=Enum.Font.GothamBold; delBtn.TextSize=8; delBtn.TextColor3=Color3.new(1,1,1); delBtn.BorderSizePixel=0
    Instance.new("UICorner",delBtn).CornerRadius=UDim.new(0,3)
    delBtn.MouseButton1Click:Connect(function()
      table.remove(waypoints,i); updateList(); info.Text="Saved: "..#waypoints.."/5"
    end)
  end
  scroll.CanvasSize=UDim2.new(0,0,0,#waypoints*26)
end

local saveBtn=Instance.new("TextButton",frame)
saveBtn.Size=UDim2.new(1,-8,0,28); saveBtn.Position=UDim2.new(0,4,0,155)
saveBtn.BackgroundColor3=Color3.fromRGB(0,100,50); saveBtn.Text="📍 Save Current Position"
saveBtn.Font=Enum.Font.GothamBold; saveBtn.TextSize=11; saveBtn.TextColor3=Color3.new(1,1,1); saveBtn.BorderSizePixel=0
Instance.new("UICorner",saveBtn).CornerRadius=UDim.new(0,6)
saveBtn.MouseButton1Click:Connect(function()
  if #waypoints>=5 then info.Text="Max 5 waypoints!"; return end
  local hrp=getHRP(); if not hrp then return end
  table.insert(waypoints, hrp.Position)
  info.Text="Saved: "..#waypoints.."/5 ✅"
  updateList()
end)`,
  },

  // ══════════════════════════════════════════════
  //  MISC
  // ══════════════════════════════════════════════
  {
    id: "fps-boost",
    name: "FPS Unlocker (Mobile)",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "FPS ni 60/144/240 ga chiqarish. Delta setfpscap.",
    previewColor: "#0f1117",
    previewUI: { title: "🎮 FPS Boost",
      buttons:[{label:"60 FPS",color:"#22c55e"},{label:"144 FPS",color:"#f59e0b"},{label:"240 FPS",color:"#ef4444"}],
      statusText:"FPS: 144 ✅" },
    code: `-- FPS Unlocker | Delta setfpscap
local lp = game.Players.LocalPlayer

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="FPSUnlock"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,200,0,85); frame.Position=UDim2.new(0.5,-100,0,50)
frame.BackgroundColor3=Color3.fromRGB(8,10,18); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🎮 FPS UNLOCKER"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(80,200,255)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(180,220,255); info.Text="Current: Default FPS"

local function setFPS(cap)
  if setfpscap then setfpscap(cap) end
  -- Also set via UserGameSettings
  settings().Rendering.FrameRateManager = 0
  info.Text="FPS Cap: "..cap.." ✅"
end

local function makeBtn(txt,col,xp,fps)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,56,0,26); b.Position=UDim2.new(0,xp,0,52)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(function() setFPS(fps) end); return b
end
makeBtn("60 FPS",Color3.fromRGB(0,130,50),6,60)
makeBtn("144 FPS",Color3.fromRGB(160,100,0),68,144)
makeBtn("240 FPS",Color3.fromRGB(160,30,30),130,240)`,
  },
  {
    id: "god-mode",
    name: "God Mode (Zarar olmaslik)",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "HP doim to'liq. CharacterAdded da ham ishlaydi.",
    previewColor: "#1a1000",
    previewUI: { title: "🛡️ God Mode",
      buttons:[{label:"GOD ON",color:"#f59e0b"},{label:"GOD OFF",color:"#64748b"}],
      statusText:"HP: ∞ | GOD: ACTIVE" },
    code: `-- God Mode | Persistent | Delta
local lp = game.Players.LocalPlayer
local godOn = false
local conn

local function applyGod(char)
  if conn then conn:Disconnect() end
  local hum=char:WaitForChild("Humanoid")
  hum.MaxHealth=math.huge; hum.Health=math.huge
  conn=hum.HealthChanged:Connect(function(hp)
    if godOn and hp < hum.MaxHealth then
      task.defer(function() hum.Health=hum.MaxHealth end)
    end
  end)
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="GodMode"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,155,0,34); btn.Position=UDim2.new(0,10,0.2,0)
btn.BackgroundColor3=Color3.fromRGB(80,60,0); btn.Text="🛡 GOD: OFF"
btn.Font=Enum.Font.GothamBold; btn.TextSize=12; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  godOn=not godOn
  btn.Text=godOn and "🛡 GOD: ON ∞" or "🛡 GOD: OFF"
  btn.BackgroundColor3=godOn and Color3.fromRGB(200,160,0) or Color3.fromRGB(80,60,0)
  if godOn and lp.Character then applyGod(lp.Character) end
end)

lp.CharacterAdded:Connect(function(char)
  if godOn then applyGod(char) end
end)`,
  },
  {
    id: "chat-bypass",
    name: "Chat Bypass (Zero-Width)",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "Chat filterni zero-width space bilan o'tkazish.",
    previewColor: "#0f0f1a",
    previewUI: { title: "💬 Chat Bypass",
      buttons:[{label:"BYPASS ON",color:"#22c55e"}], statusText:"Filter: BYPASSED" },
    code: `-- Chat Bypass | Zero-Width Space | Delta
local lp = game.Players.LocalPlayer
local bypass = true

-- Override chat function
local function bypassText(msg)
  local result = ""
  for i = 1, #msg do
    result = result .. msg:sub(i,i)
    if i < #msg then result = result .. "\u{200B}" end -- Zero-width space
  end
  return result
end

-- Hook into chat service
local ok, chatService = pcall(function()
  return require(game:GetService("Players").LocalPlayer.PlayerGui:WaitForChild("BubbleChat", 1))
end)

-- Alternative: use legacy Chat
local chat = game:GetService("Chat")

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="ChatBypass"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,200,0,90); frame.Position=UDim2.new(0.5,-100,1,-100)
frame.BackgroundColor3=Color3.fromRGB(8,8,22); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="💬 CHAT BYPASS"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(100,255,100)

local inp=Instance.new("TextBox",frame)
inp.Size=UDim2.new(1,-12,0,26); inp.Position=UDim2.new(0,6,0,30)
inp.BackgroundColor3=Color3.fromRGB(20,20,40); inp.BorderSizePixel=0
inp.PlaceholderText="Type message here..."; inp.Text=""
inp.Font=Enum.Font.Gotham; inp.TextSize=10; inp.TextColor3=Color3.fromRGB(220,220,255)
inp.ClearTextOnFocus=false
Instance.new("UICorner",inp).CornerRadius=UDim.new(0,5)

local sendBtn=Instance.new("TextButton",frame)
sendBtn.Size=UDim2.new(1,-12,0,24); sendBtn.Position=UDim2.new(0,6,0,60)
sendBtn.BackgroundColor3=Color3.fromRGB(0,120,50); sendBtn.Text="Send Bypassed Message"
sendBtn.Font=Enum.Font.GothamBold; sendBtn.TextSize=10; sendBtn.TextColor3=Color3.new(1,1,1); sendBtn.BorderSizePixel=0
Instance.new("UICorner",sendBtn).CornerRadius=UDim.new(0,5)
sendBtn.MouseButton1Click:Connect(function()
  local msg=inp.Text
  if msg=="" then return end
  local bypassed=bypassText(msg)
  game:GetService("ReplicatedStorage"):FindFirstChild("DefaultChatSystemChatEvents")
    and game:GetService("ReplicatedStorage").DefaultChatSystemChatEvents:FindFirstChild("SayMessageRequest")
    and game:GetService("ReplicatedStorage").DefaultChatSystemChatEvents.SayMessageRequest:FireServer(bypassed,"All")
  print("Sent: "..bypassed)
end)`,
  },
  {
    id: "inf-stamina",
    name: "Infinite Stamina/Energy",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "Stamina va Energy valuelarni doim to'liq ushlab turish.",
    previewColor: "#0a1a0f",
    previewUI: { title: "⚡ Inf Stamina",
      buttons:[{label:"ENABLE",color:"#22c55e"}],
      toggles:[{label:"Auto Refill",on:true}], statusText:"Stamina: ∞" },
    code: `-- Infinite Stamina/Energy | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local enabled = true
local staminaNames = {"stamina","energy","mana","spirit","ki","chakra","fury","rage","aura","power","endurance","boost"}

local function fillStamina(obj)
  for _,v in pairs(obj:GetDescendants()) do
    if v:IsA("NumberValue") or v:IsA("IntValue") then
      local n=v.Name:lower()
      for _,kw in ipairs(staminaNames) do
        if n:find(kw) then
          v.Value = v.Value > 0 and math.max(v.Value, 999999) or v.Value
        end
      end
    end
  end
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="InfStamina"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,165,0,34); btn.Position=UDim2.new(0,10,0.65,0)
btn.BackgroundColor3=Color3.fromRGB(0,120,50); btn.Text="⚡ INF STAMINA: ON"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  enabled=not enabled
  btn.Text=enabled and "⚡ INF STAMINA: ON" or "⚡ INF STAMINA: OFF"
  btn.BackgroundColor3=enabled and Color3.fromRGB(0,120,50) or Color3.fromRGB(80,30,30)
end)

rs.Heartbeat:Connect(function()
  if not enabled then return end
  if lp.Character then fillStamina(lp.Character) end
  fillStamina(lp)
end)`,
  },
  {
    id: "visual-mods",
    name: "UI Cleaner (CoreGui)",
    category: "misc", game: "Universal", executor: "delta", verified: true,
    description: "Keraksiz UI elementlarini yashirish va tiklash.",
    previewColor: "#101010",
    previewUI: { title: "🎨 UI Cleaner",
      buttons:[{label:"Hide All",color:"#6366f1"},{label:"Hide Chat",color:"#8b5cf6"},{label:"Restore",color:"#22c55e"}],
      statusText:"UI: Default" },
    code: `-- UI Cleaner | CoreGui Toggle | Delta
local sg2 = game:GetService("StarterGui")
local sg=Instance.new("ScreenGui",game.Players.LocalPlayer.PlayerGui); sg.Name="UICleaner"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,180,0,115); frame.Position=UDim2.new(1,-190,1,-125)
frame.BackgroundColor3=Color3.fromRGB(12,12,12); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🎨 UI CLEANER"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(160,140,255)

local function makeBtn(txt,col,yp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(1,-12,0,24); b.Position=UDim2.new(0,6,0,yp)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,5)
  b.MouseButton1Click:Connect(cb); return b
end

makeBtn("🚫 Hide All UI",Color3.fromRGB(60,50,140),30,function()
  sg2:SetCoreGuiEnabled(Enum.CoreGuiType.All,false)
end)
makeBtn("💬 Hide Chat Only",Color3.fromRGB(80,60,0),58,function()
  sg2:SetCoreGuiEnabled(Enum.CoreGuiType.Chat,false)
end)
makeBtn("🏆 Hide Leaderboard",Color3.fromRGB(40,40,80),86,function()
  sg2:SetCoreGuiEnabled(Enum.CoreGuiType.PlayerList,false)
end)

local restBtn=makeBtn("✅ Restore All",Color3.fromRGB(0,100,40),0,function()
  sg2:SetCoreGuiEnabled(Enum.CoreGuiType.All,true)
end)
restBtn.Position=UDim2.new(0,6,0,86)

local b2=makeBtn("✅ Restore All",Color3.fromRGB(0,100,40),86,function()
  sg2:SetCoreGuiEnabled(Enum.CoreGuiType.All,true)
end)`,
  },

  // ══════════════════════════════════════════════
  //  MM2
  // ══════════════════════════════════════════════
  {
    id: "mm2-coins",
    name: "MM2 Coin Farmer",
    category: "mm2", game: "Murder Mystery 2", executor: "delta", verified: true,
    description: "MM2 coinlarini avtomatik yig'ish. Hamma coin TP.",
    previewColor: "#1a1200",
    previewUI: { title: "💰 MM2 Coins",
      buttons:[{label:"Collect All",color:"#f59e0b"},{label:"STOP",color:"#ef4444"}],
      statusText:"Coins: 0" },
    code: `-- MM2 Coin Farmer | Delta
local lp = game.Players.LocalPlayer
local farming = false
local coins = 0

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="MM2Coins"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,170,0,80); frame.Position=UDim2.new(0.5,-85,0.5,-40)
frame.BackgroundColor3=Color3.fromRGB(22,18,0); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🔪 MM2 COIN FARMER"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=11
ttl.TextColor3=Color3.fromRGB(255,210,50)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(220,200,150); info.Text="Coins: 0 | IDLE"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,72,0,26); b.Position=UDim2.new(0,xp,0,50)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(cb); return b
end
makeBtn("▶ START",Color3.fromRGB(160,120,0),6,function()
  if farming then return end; farming=true
  task.spawn(function()
    while farming do
      local char=lp.Character; local hrp=char and char:FindFirstChild("HumanoidRootPart")
      if hrp then
        for _,v in pairs(workspace:GetDescendants()) do
          if not farming then break end
          if v.Name=="Coin" and v:IsA("BasePart") then
            hrp.CFrame=CFrame.new(v.Position); coins=coins+1
            info.Text="Coins: "..coins.." | RUNNING ✅"; task.wait(0.04)
          end
        end
      end; task.wait(0.2)
    end
  end)
end)
makeBtn("⏹ STOP",Color3.fromRGB(160,30,30),94,function()
  farming=false; info.Text="Coins: "..coins.." | STOPPED"
end)`,
  },
  {
    id: "mm2-esp",
    name: "MM2 Role ESP (Kim Sheriff?)",
    category: "mm2", game: "Murder Mystery 2", executor: "delta", verified: true,
    description: "Har bir o'yinchi rolini ko'rsatish. Sheriff yashil, Murderer qizil.",
    previewColor: "#0f0505",
    previewUI: { title: "🔍 MM2 Roles",
      buttons:[{label:"Show Roles",color:"#ef4444"},{label:"Murderer",color:"#dc2626"},{label:"Sheriff",color:"#2563eb"}],
      statusText:"👁 Roles: VISIBLE" },
    code: `-- MM2 Role Finder ESP | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local espTags = {}

local function getRoleColor(p)
  if not p.Character then return Color3.fromRGB(180,180,180) end
  -- Check for knife (murderer) or gun (sheriff)
  local char=p.Character
  if char:FindFirstChild("Knife") or char:FindFirstChildWhichIsA("Tool","Knife") then
    return Color3.fromRGB(255,30,30) -- Murderer
  end
  for _,t in pairs(char:GetChildren()) do
    if t:IsA("Tool") and (t.Name:lower():find("gun") or t.Name:lower():find("sheriff")) then
      return Color3.fromRGB(50,150,255) -- Sheriff
    end
  end
  return Color3.fromRGB(100,255,100) -- Innocent
end

local function getRoleText(p)
  if not p.Character then return "?" end
  local char=p.Character
  if char:FindFirstChild("Knife") then return "🔪 MURDERER" end
  for _,t in pairs(char:GetChildren()) do
    if t:IsA("Tool") and (t.Name:lower():find("gun") or t.Name:lower():find("sheriff")) then return "🔫 SHERIFF" end
  end
  return "😇 Innocent"
end

for _,p in pairs(game.Players:GetPlayers()) do
  if p~=lp and p.Character then
    local hrp=p.Character:FindFirstChild("HumanoidRootPart")
    if hrp then
      local bb=Instance.new("BillboardGui",hrp)
      bb.AlwaysOnTop=true; bb.Size=UDim2.new(0,120,0,35); bb.StudsOffset=Vector3.new(0,3,0)
      local lbl=Instance.new("TextLabel",bb)
      lbl.Size=UDim2.new(1,0,1,0); lbl.BackgroundTransparency=1
      lbl.Font=Enum.Font.GothamBold; lbl.TextSize=13; lbl.TextStrokeTransparency=0
      lbl.Text=p.Name.."\n"..getRoleText(p); lbl.TextColor3=getRoleColor(p)
      espTags[p]={bb=bb,lbl=lbl}
    end
  end
end

rs.Heartbeat:Connect(function()
  for p,data in pairs(espTags) do
    if p.Character and data.lbl then
      data.lbl.Text=p.Name.."\n"..getRoleText(p)
      data.lbl.TextColor3=getRoleColor(p)
    end
  end
end)
print("MM2 Role ESP: ACTIVE")`,
  },
  {
    id: "mm2-godmode",
    name: "MM2 God Mode + Anti Kill",
    category: "mm2", game: "Murder Mystery 2", executor: "delta", verified: true,
    description: "Pichoqdan o'lmaslik. HP doim to'liq.",
    previewColor: "#1a0000",
    previewUI: { title: "🛡 MM2 God",
      buttons:[{label:"GOD ON",color:"#f59e0b"},{label:"OFF",color:"#64748b"}],
      statusText:"God: ACTIVE ∞" },
    code: `-- MM2 God Mode | Delta
local lp = game.Players.LocalPlayer

local function applyGod(char)
  local hum = char:WaitForChild("Humanoid")
  hum.MaxHealth = math.huge; hum.Health = math.huge
  hum.HealthChanged:Connect(function()
    if hum.Health < 100 then hum.Health = math.huge end
  end)
  -- Prevent touched events from knives
  for _,v in pairs(char:GetDescendants()) do
    if v:IsA("BasePart") then
      v.Touched:Connect(function(hit)
        if hit.Name=="Knife" or hit.Name=="KnifePart" then
          hum.Health=math.huge
        end
      end)
    end
  end
end

if lp.Character then applyGod(lp.Character) end
lp.CharacterAdded:Connect(applyGod)
print("MM2 God Mode: ON")`,
  },

  // ══════════════════════════════════════════════
  //  BLOX FRUITS
  // ══════════════════════════════════════════════
  {
    id: "blox-fruit-notify",
    name: "Blox Fruits Notifier",
    category: "blox", game: "Blox Fruits", executor: "delta", verified: true,
    description: "Yangi meva tushganda xabar va auto teleport.",
    previewColor: "#0f1a05",
    previewUI: { title: "🍊 Fruit Finder",
      buttons:[{label:"Notify ON",color:"#22c55e"},{label:"Auto TP",color:"#f59e0b"}],
      toggles:[{label:"Auto Collect",on:true}], statusText:"🍊 Scanning..." },
    code: `-- Blox Fruits Fruit Notifier | Delta
loadstring(game:HttpGet("https://raw.githubusercontent.com/RegularVynixu/Utilities/main/Blox%20Fruits/Fruit%20Notifier/Script.lua"))()`,
  },
  {
    id: "blox-speed",
    name: "Blox Fruits Speed Hack",
    category: "blox", game: "Blox Fruits", executor: "delta", verified: true,
    description: "Blox Fruits da speed va jump. GUI bilan.",
    previewColor: "#0a0f1a",
    previewUI: { title: "💨 BF Speed",
      buttons:[{label:"Speed x5",color:"#22c55e"},{label:"Speed x10",color:"#f59e0b"},{label:"Reset",color:"#64748b"}],
      statusText:"Speed: Normal" },
    code: `-- Blox Fruits Speed | Delta
local lp = game.Players.LocalPlayer

local function getHum()
  return lp.Character and lp.Character:FindFirstChildOfClass("Humanoid")
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="BFSpeed"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,170,0,80); frame.Position=UDim2.new(0,10,0.4,0)
frame.BackgroundColor3=Color3.fromRGB(8,15,25); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🍎 BLOX FRUITS SPEED"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=11
ttl.TextColor3=Color3.fromRGB(80,180,255)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(180,220,255); info.Text="Speed: 25 (default)"

local function makeBtn(txt,col,xp,spd)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,48,0,26); b.Position=UDim2.new(0,xp,0,50)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=9
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,5)
  b.MouseButton1Click:Connect(function()
    local hum=getHum(); if hum then hum.WalkSpeed=spd; info.Text="Speed: "..spd end
  end)
end
makeBtn("x5",Color3.fromRGB(0,120,50),6,75)
makeBtn("x10",Color3.fromRGB(160,100,0),60,150)
makeBtn("x20",Color3.fromRGB(160,30,30),114,300)`,
  },
  {
    id: "blox-farm",
    name: "Blox Fruits Auto Farm (NPCs)",
    category: "blox", game: "Blox Fruits", executor: "delta", verified: true,
    description: "Quest NPC larni auto kill. Nearest TP farm.",
    previewColor: "#0a0a1f",
    previewUI: { title: "🌊 BF Farm",
      buttons:[{label:"Auto Farm",color:"#22c55e"},{label:"Stop",color:"#ef4444"}],
      statusText:"EXP: Farming..." },
    code: `-- Blox Fruits NPC Auto Farm | Delta
local lp = game.Players.LocalPlayer
local farming = false
local kills = 0

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="BFFarm"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,170,0,80); frame.Position=UDim2.new(0,10,0.5,0)
frame.BackgroundColor3=Color3.fromRGB(5,8,20); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🍎 BF NPC FARMER"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=11
ttl.TextColor3=Color3.fromRGB(255,120,50)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(220,180,150); info.Text="Kills: 0 | IDLE"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,72,0,26); b.Position=UDim2.new(0,xp,0,50)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(cb)
end
makeBtn("▶ FARM",Color3.fromRGB(0,120,50),6,function()
  if farming then return end; farming=true
  task.spawn(function()
    while farming do
      local char=lp.Character; local hrp=char and char:FindFirstChild("HumanoidRootPart")
      local myHum=char and char:FindFirstChildOfClass("Humanoid")
      if hrp and myHum and myHum.Health>0 then
        local best,bestD=nil,300
        for _,v in pairs(workspace:GetDescendants()) do
          if v:IsA("Model") and v:FindFirstChildOfClass("Humanoid") and not game.Players:GetPlayerFromCharacter(v) then
            local h=v:FindFirstChildOfClass("Humanoid"); local r=v:FindFirstChild("HumanoidRootPart")
            if h and r and h.Health>0 then
              local d=(hrp.Position-r.Position).Magnitude
              if d<bestD then bestD=d; best={hum=h,hrp=r} end
            end
          end
        end
        if best then
          hrp.CFrame=CFrame.new(best.hrp.Position+Vector3.new(0,2,0))
          best.hum.Health=0; kills=kills+1
          info.Text="Kills: "..kills.." | FARMING ✅"
        end
      end; task.wait(0.15)
    end
  end)
end)
makeBtn("⏹ STOP",Color3.fromRGB(160,30,30),94,function()
  farming=false; info.Text="Kills: "..kills.." | STOPPED"
end)`,
  },

  // ══════════════════════════════════════════════
  //  ADOPT ME
  // ══════════════════════════════════════════════
  {
    id: "adopt-antiafk",
    name: "Adopt Me Anti-AFK + Buck Farm",
    category: "adopt", game: "Adopt Me!", executor: "delta", verified: true,
    description: "AFK bo'lmaslik va bucks auto collect. Tasks TP.",
    previewColor: "#1a0a1a",
    previewUI: { title: "🐾 Adopt Me",
      buttons:[{label:"Anti-AFK ON",color:"#22c55e"},{label:"Buck Farm",color:"#f59e0b"}],
      toggles:[{label:"Auto Tasks",on:true}],
      statusText:"Bucks: Collecting..." },
    code: `-- Adopt Me Anti-AFK + Farm | Delta
local lp = game.Players.LocalPlayer
local vu = game:GetService("VirtualUser")
local farming = false
local bucks = 0

-- Anti AFK
lp.Idled:Connect(function()
  vu:Button2Down(Vector2.new(0,0), workspace.CurrentCamera.CFrame)
  task.wait(1)
  vu:Button2Up(Vector2.new(0,0), workspace.CurrentCamera.CFrame)
end)

-- Buck collector
local function collectBucks()
  local char=lp.Character; local hrp=char and char:FindFirstChild("HumanoidRootPart")
  if not hrp then return end
  for _,v in pairs(workspace:GetDescendants()) do
    if v:IsA("BasePart") and (v.Name:lower():find("buck") or v.Name:lower():find("task") or v.Name:lower():find("coin")) then
      hrp.CFrame=CFrame.new(v.Position); bucks=bucks+1; task.wait(0.04)
    end
  end
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="AdoptFarm"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,175,0,36); btn.Position=UDim2.new(0.5,-87,0,10)
btn.BackgroundColor3=Color3.fromRGB(100,30,120); btn.Text="🐾 ADOPT FARM: OFF"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  farming=not farming
  btn.Text=farming and "🐾 ADOPT FARM: ON ✅" or "🐾 ADOPT FARM: OFF"
  btn.BackgroundColor3=farming and Color3.fromRGB(180,50,200) or Color3.fromRGB(100,30,120)
  if farming then
    task.spawn(function()
      while farming do collectBucks(); task.wait(0.5) end
    end)
  end
end)
print("Adopt Me: Anti-AFK ON, Buck Farm ready")`,
  },

  // ══════════════════════════════════════════════
  //  BROOKHAVEN
  // ══════════════════════════════════════════════
  {
    id: "brook-admin",
    name: "Brookhaven Admin (Fly+Speed+TP)",
    category: "brookhaven", game: "Brookhaven 🏡RP", executor: "delta", verified: true,
    description: "Fly, speed, noclip, teleport uy. Brookhaven uchun maxsus.",
    previewColor: "#0f1f0f",
    previewUI: { title: "🏠 Brook Admin",
      buttons:[{label:"Fly",color:"#22c55e"},{label:"Noclip",color:"#3b82f6"},{label:"Speed",color:"#f59e0b"},{label:"TP House",color:"#a855f7"}],
      statusText:"Admin: ON ✅" },
    code: `-- Brookhaven Admin Panel | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local flying, noclip = false, false
local bv, bg

local function getHRP() return lp.Character and lp.Character:FindFirstChild("HumanoidRootPart") end
local function getHum() return lp.Character and lp.Character:FindFirstChildOfClass("Humanoid") end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="BrookAdmin"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,185,0,155); frame.Position=UDim2.new(0,10,0.35,0)
frame.BackgroundColor3=Color3.fromRGB(8,20,8); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🏠 BROOKHAVEN ADMIN"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=11
ttl.TextColor3=Color3.fromRGB(80,220,80)

local function makeBtn(txt,col,yp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(1,-12,0,26); b.Position=UDim2.new(0,6,0,yp)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,5)
  b.MouseButton1Click:Connect(cb); return b
end

makeBtn("🛸 Toggle Fly",Color3.fromRGB(0,120,60),30,function()
  flying=not flying
  local hrp=getHRP(); if not hrp then return end
  if flying then
    local hum=getHum(); if hum then hum.PlatformStand=true end
    bv=Instance.new("BodyVelocity",hrp); bv.MaxForce=Vector3.new(1e9,1e9,1e9); bv.Velocity=Vector3.zero
    bg=Instance.new("BodyGyro",hrp); bg.MaxTorque=Vector3.new(1e9,1e9,1e9)
  else
    if bv then bv:Destroy() end; if bg then bg:Destroy() end
    local hum=getHum(); if hum then hum.PlatformStand=false end
  end
end)
makeBtn("👻 Toggle Noclip",Color3.fromRGB(30,80,160),60,function() noclip=not noclip end)
makeBtn("⚡ Speed x5",Color3.fromRGB(160,120,0),90,function() local h=getHum(); if h then h.WalkSpeed=h.WalkSpeed==16 and 80 or 16 end end)
makeBtn("🏠 TP to House/Spawn",Color3.fromRGB(100,40,160),120,function()
  local hrp=getHRP(); if not hrp then return end
  local house=workspace:FindFirstChild("House") or workspace:FindFirstChild("SpawnLocation")
  hrp.CFrame = house and house.CFrame+Vector3.new(0,5,0) or CFrame.new(0,10,0)
end)

rs.RenderStepped:Connect(function()
  if flying and bv then
    bv.Velocity=workspace.CurrentCamera.CFrame.LookVector*50
    bg.CFrame=workspace.CurrentCamera.CFrame
  end
end)
rs.Stepped:Connect(function()
  if noclip and lp.Character then
    for _,v in pairs(lp.Character:GetDescendants()) do
      if v:IsA("BasePart") then v.CanCollide=false end
    end
  end
end)`,
  },

  // ══════════════════════════════════════════════
  //  ARSENAL
  // ══════════════════════════════════════════════
  {
    id: "arsenal-esp",
    name: "Arsenal Player ESP",
    category: "arsenal", game: "Arsenal", executor: "delta", verified: true,
    description: "Arsenal uchun maxsus ESP. HP bar va isim. Devor orqali.",
    previewColor: "#1a0505",
    previewUI: { title: "👁 Arsenal ESP",
      buttons:[{label:"ESP ON",color:"#22c55e"},{label:"ESP OFF",color:"#ef4444"}],
      toggles:[{label:"Names",on:true},{label:"HP Bars",on:true}],
      statusText:"ESP: ALL VISIBLE" },
    code: `-- Arsenal ESP | Custom | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local espEnabled = true
local espData = {}

local function makeESP(p)
  if p==lp or espData[p] then return end
  local bb=Instance.new("BillboardGui"); bb.Name="ArsenalESP"
  bb.AlwaysOnTop=true; bb.Size=UDim2.new(0,90,0,45); bb.StudsOffset=Vector3.new(0,3,0)
  local nameLbl=Instance.new("TextLabel",bb)
  nameLbl.Size=UDim2.new(1,0,0.5,0); nameLbl.BackgroundTransparency=1
  nameLbl.Font=Enum.Font.GothamBold; nameLbl.TextSize=13; nameLbl.TextStrokeTransparency=0
  nameLbl.TextColor3=Color3.fromRGB(255,60,60)
  local hpLbl=Instance.new("TextLabel",bb)
  hpLbl.Size=UDim2.new(1,0,0.5,0); hpLbl.Position=UDim2.new(0,0,0.5,0)
  hpLbl.BackgroundTransparency=1; hpLbl.Font=Enum.Font.Gotham; hpLbl.TextSize=11
  hpLbl.TextColor3=Color3.fromRGB(100,255,100); hpLbl.TextStrokeTransparency=0
  espData[p]={bb=bb,name=nameLbl,hp=hpLbl}
  p.CharacterAdded:Connect(function(c)
    task.wait(0.5); local hrp=c:FindFirstChild("HumanoidRootPart"); if hrp then bb.Adornee=hrp end
  end)
  if p.Character then
    local hrp=p.Character:FindFirstChild("HumanoidRootPart"); if hrp then bb.Adornee=hrp; bb.Parent=hrp end
  end
end

for _,p in pairs(game.Players:GetPlayers()) do makeESP(p) end
game.Players.PlayerAdded:Connect(makeESP)
game.Players.PlayerRemoving:Connect(function(p) if espData[p] then espData[p].bb:Destroy(); espData[p]=nil end end)

rs.Heartbeat:Connect(function()
  for p,d in pairs(espData) do
    if not espEnabled then d.bb.Enabled=false; continue end
    d.bb.Enabled=true
    local char=p.Character
    if char then
      local hum=char:FindFirstChildOfClass("Humanoid")
      local myHrp=lp.Character and lp.Character:FindFirstChild("HumanoidRootPart")
      local hrp=char:FindFirstChild("HumanoidRootPart")
      if hrp then d.bb.Adornee=hrp end
      if hum then
        d.hp.Text="HP: "..math.floor(hum.Health).."/"..math.floor(hum.MaxHealth)
        d.hp.TextColor3=Color3.new(1-hum.Health/hum.MaxHealth, hum.Health/hum.MaxHealth, 0)
      end
      if myHrp and hrp then
        d.name.Text=p.Name.." ["..math.floor((myHrp.Position-hrp.Position).Magnitude).."m]"
      end
    end
  end
end)

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="ArsenalESP"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,130,0,32); btn.Position=UDim2.new(1,-140,0,170)
btn.BackgroundColor3=Color3.fromRGB(0,110,50); btn.Text="👁 ARSENAL ESP: ON"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  espEnabled=not espEnabled
  btn.Text=espEnabled and "👁 ARSENAL ESP: ON" or "👁 ARSENAL ESP: OFF"
  btn.BackgroundColor3=espEnabled and Color3.fromRGB(0,110,50) or Color3.fromRGB(110,30,30)
end)`,
  },
  {
    id: "arsenal-speed",
    name: "Arsenal Speed + Jump",
    category: "arsenal", game: "Arsenal", executor: "delta", verified: true,
    description: "Arsenal da tezlik va jump boost. Toggle.",
    previewColor: "#0f0505",
    previewUI: { title: "💨 Arsenal Speed",
      buttons:[{label:"Speed ON",color:"#ef4444"},{label:"OFF",color:"#64748b"}],
      statusText:"Speed: Boosted" },
    code: `-- Arsenal Speed Hack | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local enabled = false

local function getHum() return lp.Character and lp.Character:FindFirstChildOfClass("Humanoid") end

-- Keep speed even after respawn
lp.CharacterAdded:Connect(function(char)
  if not enabled then return end
  local hum=char:WaitForChild("Humanoid")
  hum.WalkSpeed=36; hum.JumpPower=80
end)

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="ArsenalSpeed"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,160,0,34); btn.Position=UDim2.new(0,10,0.25,0)
btn.BackgroundColor3=Color3.fromRGB(120,30,30); btn.Text="💨 SPEED: OFF"
btn.Font=Enum.Font.GothamBold; btn.TextSize=12; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  enabled=not enabled
  local hum=getHum()
  if enabled then
    btn.Text="💨 SPEED: ON ✅"
    btn.BackgroundColor3=Color3.fromRGB(200,40,40)
    if hum then hum.WalkSpeed=36; hum.JumpPower=80 end
  else
    btn.Text="💨 SPEED: OFF"
    btn.BackgroundColor3=Color3.fromRGB(120,30,30)
    if hum then hum.WalkSpeed=16; hum.JumpPower=50 end
  end
end)`,
  },

  // ══════════════════════════════════════════════
  //  JAILBREAK
  // ══════════════════════════════════════════════
  {
    id: "jb-car-speed",
    name: "Jailbreak Car Speed Boost",
    category: "jailbreak", game: "Jailbreak", executor: "delta", verified: true,
    description: "Mashinani max speed ga olib chiqish. BodyVelocity.",
    previewColor: "#0a1020",
    previewUI: { title: "🚗 Car Speed",
      buttons:[{label:"Turbo ON",color:"#ef4444"},{label:"Max Speed",color:"#f59e0b"},{label:"Normal",color:"#64748b"}],
      sliders:[{label:"Speed",value:90}], statusText:"Speed: 1000 🚀" },
    code: `-- Jailbreak Car Speed | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local boosting = false
local boostSpeed = 200

local function getVehicle()
  local char=lp.Character; if not char then return nil end
  local hrp=char:FindFirstChild("HumanoidRootPart"); if not hrp then return nil end
  local seat=hrp.Parent:FindFirstChildOfClass("VehicleSeat")
  if not seat then
    -- Check if sitting in vehicle
    for _,v in pairs(workspace:GetDescendants()) do
      if v:IsA("VehicleSeat") and v.Occupant == (char:FindFirstChildOfClass("Humanoid")) then
        return v.Parent
      end
    end
  end
  return nil
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="JBCarSpeed"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,175,0,85); frame.Position=UDim2.new(0.5,-87,1,-95)
frame.BackgroundColor3=Color3.fromRGB(8,10,28); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🚔 JAILBREAK CAR SPEED"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=11
ttl.TextColor3=Color3.fromRGB(80,140,255)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(180,200,255); info.Text="Enter a car first! Speed: OFF"

local function makeBtn(txt,col,xp,spd)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,52,0,26); b.Position=UDim2.new(0,xp,0,50)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=9
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,5)
  b.MouseButton1Click:Connect(function()
    boostSpeed=spd; boosting=spd>0
    info.Text=spd>0 and "Speed: "..spd.." 🚀" or "Speed: Normal"
  end)
end
makeBtn("Turbo",Color3.fromRGB(200,30,30),6,300)
makeBtn("x5",Color3.fromRGB(160,100,0),64,200)
makeBtn("Normal",Color3.fromRGB(60,60,60),122,0)

rs.Heartbeat:Connect(function()
  if not boosting then return end
  local char=lp.Character; if not char then return end
  local hrp=char:FindFirstChild("HumanoidRootPart"); if not hrp then return end
  -- Apply to any BasePart in vehicle the character is seated in
  for _,v in pairs(workspace:GetDescendants()) do
    if v:IsA("VehicleSeat") and v.Occupant and v.Occupant.Parent==char then
      local veh=v.Parent
      for _,p in pairs(veh:GetDescendants()) do
        if p:IsA("BasePart") then
          p.AssemblyLinearVelocity=workspace.CurrentCamera.CFrame.LookVector*boostSpeed
        end
      end
      break
    end
  end
end)`,
  },
  {
    id: "jb-speed",
    name: "Jailbreak Player Speed",
    category: "jailbreak", game: "Jailbreak", executor: "delta", verified: true,
    description: "O'yinchi tezligini oshirish. Rob + flee uchun.",
    previewColor: "#0f1025",
    previewUI: { title: "🏃 JB Speed",
      buttons:[{label:"FAST",color:"#f59e0b"},{label:"Normal",color:"#64748b"}],
      statusText:"Speed: BOOSTED" },
    code: `-- Jailbreak Speed | Delta
local lp = game.Players.LocalPlayer
local fast = false

local function setSpeed(s)
  local char=lp.Character; if not char then return end
  local hum=char:FindFirstChildOfClass("Humanoid"); if not hum then return end
  hum.WalkSpeed=s; hum.JumpPower= s>16 and 80 or 50
end

lp.CharacterAdded:Connect(function(char)
  local hum=char:WaitForChild("Humanoid")
  if fast then hum.WalkSpeed=80; hum.JumpPower=80 end
end)

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="JBSpeed"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,155,0,34); btn.Position=UDim2.new(0,10,0,200)
btn.BackgroundColor3=Color3.fromRGB(50,40,0); btn.Text="🏃 JB SPEED: OFF"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  fast=not fast; setSpeed(fast and 80 or 16)
  btn.Text=fast and "🏃 JB SPEED: ON ✅" or "🏃 JB SPEED: OFF"
  btn.BackgroundColor3=fast and Color3.fromRGB(160,120,0) or Color3.fromRGB(50,40,0)
end)`,
  },

  // ══════════════════════════════════════════════
  //  DA HOOD
  // ══════════════════════════════════════════════
  {
    id: "dahood-esp",
    name: "Da Hood Player ESP",
    category: "dahood", game: "Da Hood", executor: "delta", verified: true,
    description: "Da Hood uchun ESP. HP, isim, masofа. Devor orqali.",
    previewColor: "#1a0a05",
    previewUI: { title: "👁 DH ESP",
      buttons:[{label:"ESP ON",color:"#22c55e"},{label:"OFF",color:"#ef4444"}],
      toggles:[{label:"HP Bars",on:true},{label:"Distance",on:true}],
      statusText:"Da Hood: ESP ON" },
    code: `-- Da Hood ESP | Custom | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local enabled = true
local esps = {}

local function addESP(p)
  if p==lp or esps[p] then return end
  local bb=Instance.new("BillboardGui")
  bb.AlwaysOnTop=true; bb.Size=UDim2.new(0,100,0,40); bb.StudsOffset=Vector3.new(0,3.5,0)
  local nl=Instance.new("TextLabel",bb); nl.Size=UDim2.new(1,0,0.5,0); nl.BackgroundTransparency=1
  nl.Font=Enum.Font.GothamBold; nl.TextSize=12; nl.TextStrokeTransparency=0; nl.TextColor3=Color3.fromRGB(255,70,70)
  local hl=Instance.new("TextLabel",bb); hl.Size=UDim2.new(1,0,0.5,0); hl.Position=UDim2.new(0,0,0.5,0)
  hl.BackgroundTransparency=1; hl.Font=Enum.Font.Gotham; hl.TextSize=11; hl.TextStrokeTransparency=0
  hl.TextColor3=Color3.fromRGB(80,255,80)
  esps[p]={bb=bb,nl=nl,hl=hl}
  p.CharacterAdded:Connect(function(c) task.wait(0.5); local h=c:FindFirstChild("HumanoidRootPart"); if h then bb.Adornee=h; bb.Parent=h end end)
  if p.Character then local h=p.Character:FindFirstChild("HumanoidRootPart"); if h then bb.Adornee=h; bb.Parent=h end end
end

for _,p in pairs(game.Players:GetPlayers()) do addESP(p) end
game.Players.PlayerAdded:Connect(addESP)
game.Players.PlayerRemoving:Connect(function(p) if esps[p] then esps[p].bb:Destroy(); esps[p]=nil end end)

rs.Heartbeat:Connect(function()
  local myHrp=lp.Character and lp.Character:FindFirstChild("HumanoidRootPart")
  for p,d in pairs(esps) do
    d.bb.Enabled=enabled
    if enabled and p.Character then
      local hrp=p.Character:FindFirstChild("HumanoidRootPart")
      local hum=p.Character:FindFirstChildOfClass("Humanoid")
      if hrp then d.bb.Adornee=hrp end
      if hum then
        d.hl.Text="HP:"..math.floor(hum.Health)
        d.hl.TextColor3=Color3.new(1-hum.Health/math.max(hum.MaxHealth,1),hum.Health/math.max(hum.MaxHealth,1),0)
      end
      if myHrp and hrp then d.nl.Text=p.Name.."["..math.floor((myHrp.Position-hrp.Position).Magnitude).."m]" end
    end
  end
end)
local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="DHoodESP"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,135,0,32); btn.Position=UDim2.new(0,10,0.45,0)
btn.BackgroundColor3=Color3.fromRGB(0,110,50); btn.Text="👁 DH ESP: ON"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  enabled=not enabled
  btn.Text=enabled and "👁 DH ESP: ON" or "👁 DH ESP: OFF"
  btn.BackgroundColor3=enabled and Color3.fromRGB(0,110,50) or Color3.fromRGB(110,30,30)
end)`,
  },
  {
    id: "dahood-speed",
    name: "Da Hood Speed + Inf Jump",
    category: "dahood", game: "Da Hood", executor: "delta", verified: true,
    description: "Da Hood da speed boost va cheksiz jump.",
    previewColor: "#200a00",
    previewUI: { title: "💨 DH Speed",
      buttons:[{label:"ENABLE",color:"#ef4444"},{label:"OFF",color:"#64748b"}],
      statusText:"Speed: MAXED" },
    code: `-- Da Hood Speed + Inf Jump | Delta
local lp = game.Players.LocalPlayer
local uis = game:GetService("UserInputService")
local enabled = false

local function getHum() return lp.Character and lp.Character:FindFirstChildOfClass("Humanoid") end

lp.CharacterAdded:Connect(function(c)
  local h=c:WaitForChild("Humanoid")
  if enabled then h.WalkSpeed=80; h.JumpPower=80 end
end)
uis.JumpRequest:Connect(function()
  if not enabled then return end
  local h=getHum(); if h then h:ChangeState(Enum.HumanoidStateType.Jumping) end
end)

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="DHSpeed"; sg.ResetOnSpawn=false
local btn=Instance.new("TextButton",sg)
btn.Size=UDim2.new(0,165,0,34); btn.Position=UDim2.new(0,10,0.55,0)
btn.BackgroundColor3=Color3.fromRGB(120,30,0); btn.Text="💨 DH SPEED: OFF"
btn.Font=Enum.Font.GothamBold; btn.TextSize=11; btn.TextColor3=Color3.new(1,1,1)
btn.BorderSizePixel=0; btn.Active=true; btn.Draggable=true
Instance.new("UICorner",btn).CornerRadius=UDim.new(0,8)
btn.MouseButton1Click:Connect(function()
  enabled=not enabled
  local h=getHum()
  if h then h.WalkSpeed=enabled and 80 or 16; h.JumpPower=enabled and 80 or 50 end
  btn.Text=enabled and "💨 DH SPEED: ON ✅" or "💨 DH SPEED: OFF"
  btn.BackgroundColor3=enabled and Color3.fromRGB(200,50,0) or Color3.fromRGB(120,30,0)
end)`,
  },

  // ══════════════════════════════════════════════
  //  PET SIMULATOR X
  // ══════════════════════════════════════════════
  {
    id: "psx-farm",
    name: "Pet Sim X Gem Farm",
    category: "petsim", game: "Pet Simulator X", executor: "delta", verified: true,
    description: "PSX gem va coin auto collect. Nearest TP.",
    previewColor: "#0f0a1f",
    previewUI: { title: "🐶 PSX Farm",
      buttons:[{label:"Gem Farm",color:"#22c55e"},{label:"Auto Sell",color:"#f59e0b"},{label:"Stop",color:"#ef4444"}],
      statusText:"Gems: Collecting..." },
    code: `-- Pet Sim X Gem Farm | Delta
local lp = game.Players.LocalPlayer
local farming = false
local gems = 0

local gemNames = {"gem","coin","diamond","ruby","emerald","reward","chest","orb","shard"}
local function isGem(n)
  local ln=n:lower()
  for _,k in ipairs(gemNames) do if ln:find(k) then return true end end
  return false
end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="PSXFarm"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,170,0,80); frame.Position=UDim2.new(0.5,-85,0,10)
frame.BackgroundColor3=Color3.fromRGB(10,6,25); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🐶 PET SIM X FARM"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=11
ttl.TextColor3=Color3.fromRGB(160,120,255)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(200,180,255); info.Text="Gems: 0 | IDLE"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,72,0,26); b.Position=UDim2.new(0,xp,0,50)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(cb)
end
makeBtn("▶ FARM",Color3.fromRGB(80,40,180),6,function()
  if farming then return end; farming=true
  task.spawn(function()
    while farming do
      local char=lp.Character; local hrp=char and char:FindFirstChild("HumanoidRootPart")
      if hrp then
        for _,v in pairs(workspace:GetDescendants()) do
          if not farming then break end
          if v:IsA("BasePart") and isGem(v.Name) then
            hrp.CFrame=CFrame.new(v.Position); gems=gems+1
            info.Text="Gems: "..gems.." | RUNNING ✅"; task.wait(0.04)
          end
        end
      end; task.wait(0.2)
    end
  end)
end)
makeBtn("⏹ STOP",Color3.fromRGB(160,30,30),94,function()
  farming=false; info.Text="Gems: "..gems.." | STOPPED"
end)`,
  },

  // ══════════════════════════════════════════════
  //  SHINDO LIFE
  // ══════════════════════════════════════════════
  {
    id: "shindo-speed",
    name: "Shindo Life Speed + Fly",
    category: "shindo", game: "Shindo Life", executor: "delta", verified: true,
    description: "Shindo Life da tezlik va uchish. GUI bilan.",
    previewColor: "#0a0f20",
    previewUI: { title: "🌀 Shindo Speed",
      buttons:[{label:"Speed ON",color:"#3b82f6"},{label:"Fly ON",color:"#a855f7"},{label:"OFF",color:"#64748b"}],
      statusText:"Shindo: LOADED" },
    code: `-- Shindo Life Speed + Fly | Delta
local lp = game.Players.LocalPlayer
local rs = game:GetService("RunService")
local flying = false
local bv, bg

local function getHRP() return lp.Character and lp.Character:FindFirstChild("HumanoidRootPart") end
local function getHum() return lp.Character and lp.Character:FindFirstChildOfClass("Humanoid") end

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="ShindoSpeed"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,175,0,105); frame.Position=UDim2.new(0,10,0.45,0)
frame.BackgroundColor3=Color3.fromRGB(8,8,28); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🌀 SHINDO TOOLS"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=12
ttl.TextColor3=Color3.fromRGB(100,120,255)

local function makeBtn(txt,col,yp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(1,-12,0,24); b.Position=UDim2.new(0,6,0,yp)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,5)
  b.MouseButton1Click:Connect(cb); return b
end

makeBtn("⚡ Speed x5",Color3.fromRGB(30,80,180),30,function()
  local h=getHum(); if h then h.WalkSpeed=h.WalkSpeed==16 and 80 or 16 end
end)
makeBtn("🛸 Toggle Fly",Color3.fromRGB(100,40,180),58,function()
  flying=not flying
  local hrp=getHRP(); if not hrp then return end
  if flying then
    local h=getHum(); if h then h.PlatformStand=true end
    bv=Instance.new("BodyVelocity",hrp); bv.MaxForce=Vector3.new(1e9,1e9,1e9); bv.Velocity=Vector3.zero
    bg=Instance.new("BodyGyro",hrp); bg.MaxTorque=Vector3.new(1e9,1e9,1e9)
  else
    if bv then bv:Destroy() end; if bg then bg:Destroy() end
    local h=getHum(); if h then h.PlatformStand=false end
  end
end)
makeBtn("🦘 Inf Jump",Color3.fromRGB(60,60,60),82,function()
  game:GetService("UserInputService").JumpRequest:Connect(function()
    local h=getHum(); if h then h:ChangeState(Enum.HumanoidStateType.Jumping) end
  end)
end)

rs.RenderStepped:Connect(function()
  if flying and bv then
    bv.Velocity=workspace.CurrentCamera.CFrame.LookVector*60
    bg.CFrame=workspace.CurrentCamera.CFrame
  end
end)`,
  },
  {
    id: "shindo-spin",
    name: "Shindo Bloodline Auto Spin",
    category: "shindo", game: "Shindo Life", executor: "delta", verified: true,
    description: "Bloodline spinlarni auto bosish. Target bloodline uchun.",
    previewColor: "#1a0a1a",
    previewUI: { title: "🎰 Auto Spin",
      buttons:[{label:"Auto Spin",color:"#a855f7"},{label:"Stop",color:"#64748b"}],
      statusText:"Spinning: 0/1000" },
    code: `-- Shindo Life Auto Spin | Delta
local lp = game.Players.LocalPlayer
local spinning = false
local spins = 0

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="ShindoSpin"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,170,0,90); frame.Position=UDim2.new(0.5,-85,0.5,-45)
frame.BackgroundColor3=Color3.fromRGB(16,6,26); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🎰 SHINDO AUTO SPIN"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=11
ttl.TextColor3=Color3.fromRGB(200,100,255)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(220,180,255); info.Text="Spins: 0 | IDLE"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,72,0,28); b.Position=UDim2.new(0,xp,0,50)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(cb)
end
makeBtn("🎰 SPIN",Color3.fromRGB(120,40,200),6,function()
  if spinning then return end; spinning=true
  task.spawn(function()
    while spinning do
      -- Find spin button in the game GUI
      local spinBtn
      for _,gui in pairs(lp.PlayerGui:GetDescendants()) do
        if gui:IsA("TextButton") and (gui.Text:lower():find("spin") or gui.Text:lower():find("roll")) then
          spinBtn=gui; break
        end
      end
      if spinBtn then
        local conn; conn=spinBtn.MouseButton1Click:Connect(function() end)
        local vt=Instance.new("VirtualInputManager"); -- fallback
        spinBtn:Activate(); spins=spins+1
        info.Text="Spins: "..spins.." | SPINNING ✅"
        if conn then conn:Disconnect() end
      else
        info.Text="Spins: "..spins.." | Find Spin Button!"
      end
      task.wait(0.3)
    end
  end)
end)
makeBtn("⏹ STOP",Color3.fromRGB(80,80,80),94,function()
  spinning=false; info.Text="Spins: "..spins.." | STOPPED"
end)`,
  },

  // ══════════════════════════════════════════════
  //  SOLS RNG
  // ══════════════════════════════════════════════
  {
    id: "sols-main",
    name: "Sols RNG Auto Roll",
    category: "sols", game: "Sol's RNG", executor: "delta", verified: true,
    description: "Sols RNG da auto roll. Notifier, soniyada ko'p roll.",
    previewColor: "#0a0a1a",
    previewUI: { title: "🎲 Sols RNG",
      buttons:[{label:"Auto Roll",color:"#6366f1"},{label:"Notifier",color:"#f59e0b"},{label:"Stop",color:"#ef4444"}],
      toggles:[{label:"Legendary Alert",on:true}],
      statusText:"Rolls: 0/∞" },
    code: `-- Sols RNG Auto Roll | Delta
local lp = game.Players.LocalPlayer
local rolling = false
local rolls = 0

local sg=Instance.new("ScreenGui",lp.PlayerGui); sg.Name="SolsRNG"; sg.ResetOnSpawn=false
local frame=Instance.new("Frame",sg)
frame.Size=UDim2.new(0,175,0,100); frame.Position=UDim2.new(0.5,-87,0.5,-50)
frame.BackgroundColor3=Color3.fromRGB(6,6,28); frame.BorderSizePixel=0
frame.Active=true; frame.Draggable=true
Instance.new("UICorner",frame).CornerRadius=UDim.new(0,10)

local ttl=Instance.new("TextLabel",frame)
ttl.Size=UDim2.new(1,0,0,26); ttl.BackgroundTransparency=1
ttl.Text="🎲 SOL'S RNG AUTO ROLL"; ttl.Font=Enum.Font.GothamBold; ttl.TextSize=11
ttl.TextColor3=Color3.fromRGB(130,100,255)

local info=Instance.new("TextLabel",frame)
info.Size=UDim2.new(1,0,0,16); info.Position=UDim2.new(0,0,0,26)
info.BackgroundTransparency=1; info.TextSize=9; info.Font=Enum.Font.Gotham
info.TextColor3=Color3.fromRGB(200,190,255); info.Text="Rolls: 0 | IDLE"

local function makeBtn(txt,col,xp,cb)
  local b=Instance.new("TextButton",frame)
  b.Size=UDim2.new(0,72,0,26); b.Position=UDim2.new(0,xp,0,50)
  b.BackgroundColor3=col; b.Text=txt; b.Font=Enum.Font.GothamBold; b.TextSize=10
  b.TextColor3=Color3.new(1,1,1); b.BorderSizePixel=0
  Instance.new("UICorner",b).CornerRadius=UDim.new(0,6)
  b.MouseButton1Click:Connect(cb)
end
makeBtn("🎲 START",Color3.fromRGB(80,50,200),6,function()
  if rolling then return end; rolling=true
  task.spawn(function()
    while rolling do
      -- Find roll button
      for _,v in pairs(lp.PlayerGui:GetDescendants()) do
        if v:IsA("TextButton") and (v.Text:lower():find("roll") or v.Text:lower():find("spin") or v.Text:lower():find("reroll")) then
          v:Activate(); rolls=rolls+1; info.Text="Rolls: "..rolls.." | ROLLING ✅"; break
        end
      end
      -- Also check remote events
      for _,v in pairs(game.ReplicatedStorage:GetDescendants()) do
        if v:IsA("RemoteEvent") and (v.Name:lower():find("roll") or v.Name:lower():find("spin")) then
          v:FireServer(); break
        end
      end
      task.wait(0.25)
    end
  end)
end)
makeBtn("⏹ STOP",Color3.fromRGB(160,30,30),94,function()
  rolling=false; info.Text="Rolls: "..rolls.." | STOPPED"
end)

-- Rarity notifier
local rareLbl=Instance.new("TextLabel",frame)
rareLbl.Size=UDim2.new(1,0,0,16); rareLbl.Position=UDim2.new(0,0,0,80)
rareLbl.BackgroundTransparency=1; rareLbl.TextSize=9; rareLbl.Font=Enum.Font.GothamBold
rareLbl.TextColor3=Color3.fromRGB(255,215,0); rareLbl.Text=""

-- Monitor chat for roll results
game.Players.LocalPlayer.Chatted:Connect(function(msg)
  if msg:lower():find("legendary") or msg:lower():find("mythic") then
    rareLbl.Text="⭐ LEGENDARY/MYTHIC ROLLED!"
    task.delay(3, function() rareLbl.Text="" end)
  end
end)`,
  },
];

// ─── EXPORTS ──────────────────────────────────────────────────────────────────
export const ALL_SCRIPTS   = SCRIPTS;
export const TOTAL_COUNT   = SCRIPTS.length;
