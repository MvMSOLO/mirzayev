import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StudioCanvas3D } from './StudioCanvas3D';
import { StudioExplorer } from './StudioExplorer';
import { StudioToolbox } from './StudioToolbox';
import { StudioAIChat } from './StudioAIChat';
import { StudioToolbar } from './StudioToolbar';
import { StudioOutput } from './StudioOutput';
import { runScript } from './luauEngine';
import type { StudioObject, ObjectType, RunState, OutputLine, AIPendingOp, Preset, StudioTheme, TransformTool } from './types';

// Default levels generator
function makeId() { return `obj_${Math.random().toString(36).slice(2, 9)}`; }

export function buildTemplateScene(templateId: string): Map<string, StudioObject> {
  const map = new Map<string, StudioObject>();
  const addObj = (obj: StudioObject) => { map.set(obj.id, obj); return obj; };

  const wsId = 'Workspace';
  const lightId = 'Lighting';
  const repId = 'ReplicatedStorage';
  const guiId = 'StarterGui';

  addObj({ id: wsId, type: 'Workspace', name: 'Workspace', parentId: null, properties: {}, children: [] });
  addObj({ id: lightId, type: 'Lighting', name: 'Lighting', parentId: null, properties: {}, children: [] });
  addObj({ id: repId, type: 'ReplicatedStorage', name: 'ReplicatedStorage', parentId: null, properties: {}, children: [] });
  addObj({ id: guiId, type: 'StarterGui', name: 'StarterGui', parentId: null, properties: {}, children: [] });

  // Baseplate
  const bpId = makeId();
  addObj({
    id: bpId, type: 'Baseplate', name: 'Baseplate', parentId: wsId,
    properties: {
      Size: { x: 512, y: 20, z: 512 },
      Position: { x: 0, y: -10, z: 0 },
      Color: { r: 0.388, g: 0.373, b: 0.384 },
      Material: 'Grass',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
      Shape: 'Block',
    },
    children: [],
  });
  map.get(wsId)!.children.push(bpId);

  // Spawn point
  const spawnId = makeId();
  addObj({
    id: spawnId, type: 'SpawnLocation', name: 'SpawnLocation', parentId: wsId,
    properties: {
      Size: { x: 6, y: 1, z: 6 },
      Position: { x: 0, y: 0.5, z: 0 },
      Color: { r: 0.106, g: 0.165, b: 0.208 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
    },
    children: [],
  });
  map.get(wsId)!.children.push(spawnId);

  if (templateId === 't-classic') {
    // Basic structural parts
    const block1 = makeId();
    addObj({
      id: block1, type: 'Part', name: 'RedBlock', parentId: wsId,
      properties: {
        Size: { x: 4, y: 4, z: 4 },
        Position: { x: 12, y: 2, z: 0 },
        Color: { r: 0.769, g: 0.157, b: 0.110 },
        Material: 'SmoothPlastic',
        Anchored: true,
        CanCollide: true,
        Transparency: 0,
        Shape: 'Block',
      },
      children: [],
    });
    map.get(wsId)!.children.push(block1);

    const sphere1 = makeId();
    addObj({
      id: sphere1, type: 'Part', name: 'YellowSphere', parentId: wsId,
      properties: {
        Size: { x: 4, y: 4, z: 4 },
        Position: { x: -12, y: 2, z: 0 },
        Color: { r: 0.961, g: 0.804, b: 0.188 },
        Material: 'SmoothPlastic',
        Anchored: true,
        CanCollide: true,
        Transparency: 0,
        Shape: 'Sphere',
      },
      children: [],
    });
    map.get(wsId)!.children.push(sphere1);
  } else if (templateId === 't-neon-disco') {
    // Add glowing dancefloor blocks & pulsing point lights
    for (let x = -2; x <= 2; x++) {
      for (let z = -2; z <= 2; z++) {
        if (x === 0 && z === 0) continue;
        const pId = makeId();
        addObj({
          id: pId, type: 'Part', name: `Disco_${x}_${z}`, parentId: wsId,
          properties: {
            Size: { x: 5, y: 1, z: 5 },
            Position: { x: x * 8, y: 0.5, z: z * 8 },
            Color: { r: Math.random(), g: Math.random(), b: Math.random() },
            Material: 'Neon',
            Anchored: true,
            CanCollide: true,
            Transparency: 0,
            Shape: 'Block',
          },
          children: [],
        });
        map.get(wsId)!.children.push(pId);
      }
    }
    // Color loop script on the spawn center
    const discoScript = makeId();
    addObj({
      id: discoScript, type: 'Script', name: 'DancefloorBrain', parentId: spawnId,
      properties: {
        Source: `-- Dancefloor global glow pulsing script
while true do
  print("Neon pulse iteration running...")
  task.wait(1)
end`,
      },
      children: [],
    });
    map.get(spawnId)!.children.push(discoScript);
  } else if (templateId === 't-obby') {
    // Multi obstacle path parts
    for (let i = 1; i <= 5; i++) {
      const obstacleId = makeId();
      addObj({
        id: obstacleId, type: 'Part', name: `Hurdle_${i}`, parentId: wsId,
        properties: {
          Size: { x: 5, y: 1, z: 5 },
          Position: { x: 0, y: i * 2, z: i * 12 },
          Color: i === 3 ? { r: 1, g: 0, b: 0 } : { r: 0.8, g: 0.8, b: 0.8 }, // Lava center block
          Material: i === 3 ? 'Neon' : 'SmoothPlastic',
          Anchored: true,
          CanCollide: true,
          Transparency: 0,
          Shape: 'Block',
        },
        children: [],
      });
      map.get(wsId)!.children.push(obstacleId);
    }
  } else if (templateId === 't-physics') {
    // Pile of stacked cylinders & blocks
    for (let i = 0; i < 4; i++) {
      const pId = makeId();
      addObj({
        id: pId, type: 'Part', name: `UnanchoredPart_${i}`, parentId: wsId,
        properties: {
          Size: { x: 3, y: 3, z: 3 },
          Position: { x: 0, y: 4 + i * 4, z: 15 },
          Color: { r: 0.4 + i * 0.15, g: 0.2, b: 0.8 - i * 0.15 },
          Material: 'SmoothPlastic',
          Anchored: false, // physics activated
          CanCollide: true,
          Transparency: 0,
          Shape: i % 2 === 0 ? 'Block' : 'Sphere',
          Velocity: { x: 0, y: 0, z: 0 },
        },
        children: [],
      });
      map.get(wsId)!.children.push(pId);
    }
  }

  return map;
}

interface Props {
  onClose: () => void;
  initialTemplate?: string;
}

export function RobloxStudioIDE({ onClose, initialTemplate = 't-classic' }: Props) {
  const [objects, setObjects] = useState<Map<string, StudioObject>>(() => buildTemplateScene(initialTemplate));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [runState, setRunState] = useState<RunState>('stopped');
  const [outputLines, setOutputLines] = useState<OutputLine[]>([]);
  const [pendingOps, setPendingOps] = useState<AIPendingOp[]>([]);
  const [showAI, setShowAI] = useState(false);
  const [showOutput, setShowOutput] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [mobilePanel, setMobilePanel] = useState<'explorer' | 'toolbox' | 'ai' | null>(null);

  // Upgraded tools and visual configurations
  const [theme, setTheme] = useState<StudioTheme>('dark');
  const [activeTool, setActiveTool] = useState<TransformTool>('select');
  const [timeOfDay, setTimeOfDay] = useState<number>(12); // Standard Noon

  const stopFnRefs = useRef<Array<{ stop: () => void }>>([]);

  // Physics animation frames loop
  useEffect(() => {
    if (runState !== 'running') return;

    let frameId: number;
    const updatePhysics = () => {
      setObjects(prev => {
        const next = new Map(prev);
        let changed = false;

        for (const [id, obj] of next.entries()) {
          if (['Workspace', 'Lighting', 'ReplicatedStorage', 'StarterGui'].includes(obj.type)) continue;
          if (obj.properties.Anchored === false) {
            const pos = obj.properties.Position ?? { x: 0, y: 0, z: 0 };
            const vel = obj.properties.Velocity ?? { x: 0, y: 0, z: 0 };

            // Gravity calculation
            let nextY = pos.y + vel.y * 0.016;
            let nextVelY = vel.y - 9.8 * 0.016;

            // Simple floor bounds checking collision against baseplate
            if (nextY <= 0.5) {
              nextY = 0.5;
              nextVelY = -nextVelY * 0.4; // Bounce restitution
              if (Math.abs(nextVelY) < 1.5) nextVelY = 0; // Snap to rest
            }

            next.set(id, {
              ...obj,
              properties: {
                ...obj.properties,
                Position: { ...pos, y: nextY },
                Velocity: { ...vel, y: nextVelY },
              }
            });
            changed = true;
          }
        }

        return changed ? next : prev;
      });

      frameId = requestAnimationFrame(updatePhysics);
    };

    frameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(frameId);
  }, [runState]);

  // Root IDs
  const rootIds = useMemo(() => {
    const ids: string[] = [];
    for (const [id, obj] of objects) { if (obj.parentId === null) ids.push(id); }
    return ids;
  }, [objects]);

  // Script count
  const scriptCount = useMemo(() => {
    let n = 0;
    for (const obj of objects.values()) {
      if (['Script', 'LocalScript'].includes(obj.type) && obj.properties.Source) n++;
    }
    return n;
  }, [objects]);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const addOutput = useCallback((line: Omit<OutputLine, 'id' | 'ts'>) => {
    setOutputLines(prev => [...prev, { ...line, id: makeId(), ts: Date.now() }]);
  }, []);

  const setProperty = useCallback((id: string, prop: string, val: unknown) => {
    setObjects(prev => {
      const map = new Map(prev);
      const obj = map.get(id);
      if (!obj) return prev;
      if (prop === 'Name') {
        map.set(id, { ...obj, name: val as string });
      } else {
        map.set(id, { ...obj, properties: { ...obj.properties, [prop]: val } });
      }
      return map;
    });
  }, []);

  const getObjects = useCallback(() => objects, [objects]);

  // Dynamic sandbox scripting engine triggers
  const handleRun = useCallback(() => {
    setRunState('running');
    setShowOutput(true);
    addOutput({ kind: 'info', text: '▶ Virtual server engine started. Luau scripts initializing...' });
  }, [addOutput]);

  const handleStop = useCallback(() => {
    for (const h of stopFnRefs.current) h.stop();
    stopFnRefs.current = [];
    setRunState('stopped');
    addOutput({ kind: 'info', text: '⏹ Game emulation closed.' });
  }, [addOutput]);

  const scriptSourcesHash = useMemo(() => {
    return Array.from(objects.values())
      .filter(o => ['Script', 'LocalScript'].includes(o.type))
      .map(o => `${o.id}:${o.properties.Source ?? ''}`)
      .join('|||');
  }, [objects]);

  useEffect(() => {
    if (runState !== 'running') return;

    // Stop previous runner handles
    for (const h of stopFnRefs.current) h.stop();
    stopFnRefs.current = [];

    const scripts = Array.from(objects.values()).filter(
      o => ['Script', 'LocalScript'].includes(o.type) && o.properties.Source
    );

    const deleteObject = (id: string) => {
      setObjects(prev => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
    };

    const addObject = (obj: StudioObject) => {
      setObjects(prev => {
        const next = new Map(prev);
        next.set(obj.id, obj);
        if (obj.parentId) {
          const parent = next.get(obj.parentId);
          if (parent) next.set(obj.parentId, { ...parent, children: [...parent.children, obj.id] });
        }
        return next;
      });
    };

    for (const script of scripts) {
      const handle = runScript({
        source: script.properties.Source as string,
        scriptObjId: script.id,
        getObjects,
        setProperty,
        addObject,
        deleteObject,
        addOutput,
      });
      stopFnRefs.current.push(handle);
    }
    addOutput({ kind: 'info', text: '⚡ Live Script Hot-Reloaded successfully.' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptSourcesHash, runState]);

  const handleCommandExecute = useCallback((commandLine: string) => {
    addOutput({ kind: 'info', text: `Command Run: ${commandLine}` });

    const deleteObject = (id: string) => {
      setObjects(prev => {
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
    };

    const addObject = (obj: StudioObject) => {
      setObjects(prev => {
        const next = new Map(prev);
        next.set(obj.id, obj);
        if (obj.parentId) {
          const parent = next.get(obj.parentId);
          if (parent) next.set(obj.parentId, { ...parent, children: [...parent.children, obj.id] });
        }
        return next;
      });
    };

    try {
      const handle = runScript({
        source: commandLine,
        getObjects,
        setProperty,
        addObject,
        deleteObject,
        addOutput,
      });
      // Execute instantly and terminate
      setTimeout(() => handle.stop(), 100);
    } catch (e) {
      addOutput({ kind: 'error', text: `Syntax error: ${e instanceof Error ? e.message : e}` });
    }
  }, [getObjects, setProperty, addOutput]);

  // Object CRUD handlers
  const handleDelete = useCallback((id: string) => {
    setObjects(prev => {
      const map = new Map(prev);
      const obj = map.get(id);
      if (!obj) return prev;
      if (obj.parentId) {
        const parent = map.get(obj.parentId);
        if (parent) map.set(obj.parentId, { ...parent, children: parent.children.filter(c => c !== id) });
      }
      const toRemove: string[] = [id];
      const queue = [...obj.children];
      while (queue.length) {
        const cid = queue.shift()!;
        toRemove.push(cid);
        queue.push(...(map.get(cid)?.children ?? []));
      }
      for (const rid of toRemove) map.delete(rid);
      return map;
    });
    if (selectedId === id) setSelectedId(null);
  }, [selectedId]);

  const handleDuplicate = useCallback((id: string) => {
    setObjects(prev => {
      const map = new Map(prev);
      const obj = map.get(id);
      if (!obj) return prev;
      const newId = makeId();
      const pos = obj.properties.Position as {x:number;y:number;z:number} | undefined;
      const newObj: StudioObject = {
        ...obj, id: newId,
        name: obj.name + '_Copy',
        children: [],
        properties: {
          ...obj.properties,
          ...(pos ? { Position: { x: pos.x + 4, y: pos.y, z: pos.z + 4 } } : {}),
        },
      };
      map.set(newId, newObj);
      if (obj.parentId) {
        const parent = map.get(obj.parentId);
        if (parent) map.set(obj.parentId, { ...parent, children: [...parent.children, newId] });
      }
      return map;
    });
  }, []);

  const handleAddChild = useCallback((parentId: string, type: ObjectType) => {
    setObjects(prev => {
      const map = new Map(prev);
      const parent = map.get(parentId);
      if (!parent) return prev;

      const newId = makeId();
      const count = Array.from(map.values()).filter(o => o.type === type).length;

      const newObj: StudioObject = {
        id: newId,
        type,
        name: `${type}${count > 0 ? String(count + 1) : ''}`,
        parentId,
        properties: type === 'Script' ? {
          Source: `-- Custom Child Script\nlocal part = script.Parent\nwhile true do\n  print("Child script running!")\n  task.wait(2)\nend\n`,
        } : type === 'PointLight' ? {
          Color: { r: 1, g: 0.9, b: 0.8 },
          Brightness: 5,
          Range: 16,
          Position: { x: 0, y: 4, z: 0 },
        } : {
          Size: { x: 4, y: 4, z: 4 },
          Position: { x: 0, y: 2, z: 0 },
          Color: { r: 0.5, g: 0.5, b: 0.5 },
          Material: 'SmoothPlastic',
          Anchored: true,
          CanCollide: true,
          Transparency: 0,
        },
        children: [],
      };

      map.set(newId, newObj);
      map.set(parentId, { ...parent, children: [...parent.children, newId] });
      setSelectedId(newId);
      addOutput({ kind: 'info', text: `Added child: ${newObj.name} under ${parent.name}` });
      return map;
    });
  }, [addOutput]);

  const handleAddPreset = useCallback((preset: Preset) => {
    const isScript = ['Script', 'LocalScript', 'ModuleScript'].includes(preset.type);

    setObjects(prev => {
      const map = new Map(prev);
      let wsId = '';
      for (const [id, obj] of map) { if (obj.type === 'Workspace') { wsId = id; break; } }
      if (!wsId) return prev;

      const PART_TYPES = ['Part', 'SpawnLocation', 'Baseplate', 'NPCModel'];

      if (isScript) {
        let hostId = selectedId && PART_TYPES.includes(map.get(selectedId)?.type ?? '') ? selectedId : '';
        if (!hostId) {
          const hostCount = Array.from(map.values()).filter(o => o.type === 'Part').length;
          const defaultPos = { x: (hostCount % 5) * 8 - 16, y: 2, z: Math.floor(hostCount / 5) * 8 - 8 };
          hostId = makeId();
          const hostPart: StudioObject = {
            id: hostId,
            type: 'Part',
            name: `${preset.name.replace(' ', '')}Part`,
            parentId: wsId,
            properties: {
              Size: { x: 4, y: 4, z: 4 },
              Position: defaultPos,
              Color: { r: 0.639, g: 0.635, b: 0.647 },
              Material: 'SmoothPlastic',
              Anchored: true,
              CanCollide: true,
              Transparency: 0,
            },
            children: [],
          };
          map.set(hostId, hostPart);
          const ws = map.get(wsId)!;
          map.set(wsId, { ...ws, children: [...ws.children, hostId] });
        }

        const scriptId = makeId();
        const scriptObj: StudioObject = {
          id: scriptId,
          type: preset.type as ObjectType,
          name: preset.name,
          parentId: hostId,
          properties: { ...preset.properties },
          children: [],
        };
        map.set(scriptId, scriptObj);
        const host = map.get(hostId)!;
        map.set(hostId, { ...host, children: [...host.children, scriptId] });
        setSelectedId(scriptId);
        return map;
      }

      const newId = makeId();
      const count = Array.from(map.values()).filter(o => o.type === preset.type).length;
      const defaultPos = { x: (count % 5) * 8 - 16, y: 1, z: Math.floor(count / 5) * 8 - 8 };

      const newObj: StudioObject = {
        id: newId,
        type: preset.type as ObjectType,
        name: `${preset.name}${count > 0 ? String(count + 1) : ''}`,
        parentId: wsId,
        properties: {
          ...preset.properties,
          Position: { ...defaultPos },
        },
        children: [],
      };
      map.set(newId, newObj);
      const ws = map.get(wsId)!;
      map.set(wsId, { ...ws, children: [...ws.children, newId] });
      setSelectedId(newId);
      return map;
    });
  }, [selectedId]);

  // AI approvals
  const handleNewOp = useCallback((op: AIPendingOp) => {
    setPendingOps(prev => [...prev, op]);
  }, []);

  const handleApprove = useCallback((opId: string) => {
    setPendingOps(prev => prev.map(op => {
      if (op.id !== opId) return op;
      for (const change of op.changes) {
        setProperty(change.objectId, change.property, change.newValue);
      }
      addOutput({ kind: 'info', text: `✅ AI applied ${op.changes.length} change(s).` });
      return { ...op, status: 'approved' };
    }));
  }, [setProperty, addOutput]);

  const handleReject = useCallback((opId: string) => {
    setPendingOps(prev => prev.map(op => op.id === opId ? { ...op, status: 'rejected' } : op));
  }, []);

  const pendingCount = pendingOps.filter(o => o.status === 'pending').length;

  const handleResetScene = useCallback(() => {
    setObjects(buildTemplateScene(initialTemplate));
    addOutput({ kind: 'info', text: '🔄 Workspace scene reset to template state.' });
  }, [initialTemplate, addOutput]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-0 z-[300] flex flex-col overflow-hidden ${
        theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-[#f0f0f0]'
      }`}
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >
      {/* Ribbon Toolbar */}
      <StudioToolbar
        runState={runState}
        onRun={handleRun}
        onStop={handleStop}
        showAI={showAI}
        onToggleAI={() => setShowAI(p => !p)}
        showOutput={showOutput}
        onToggleOutput={() => setShowOutput(p => !p)}
        onClose={onClose}
        pendingCount={pendingCount}
        scriptCount={scriptCount}

        theme={theme}
        setTheme={setTheme}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        timeOfDay={timeOfDay}
        setTimeOfDay={setTimeOfDay}
        onResetScene={handleResetScene}
      />

      {/* Main layout */}
      {isMobile ? (
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 relative">
            <StudioCanvas3D
              objects={objects}
              selectedId={selectedId}
              onSelect={setSelectedId}
              isRunning={runState === 'running'}
              timeOfDay={timeOfDay}
              activeTool={activeTool}
              onUpdateProperty={setProperty}
            />
          </div>

          {showOutput && (
            <div className="h-40 shrink-0 border-t border-[#3c3c3c]">
              <StudioOutput theme={theme} lines={outputLines} onClear={() => setOutputLines([])} onExecuteCommand={handleCommandExecute} />
            </div>
          )}

          <div className="shrink-0 bg-[#2d2d30] border-t border-[#3c3c3c] flex">
            {(['explorer', 'toolbox', 'ai'] as const).map(panel => (
              <button
                key={panel}
                onClick={() => setMobilePanel(p => p === panel ? null : panel)}
                className={`flex-1 py-2 text-[10px] uppercase tracking-wider font-mono transition-colors
                  ${mobilePanel === panel ? 'text-cyan-400 bg-[#1e1e1e]' : 'text-gray-400'}`}
              >
                {panel === 'ai' ? 'AI' : panel.charAt(0).toUpperCase() + panel.slice(1)}
              </button>
            ))}
          </div>

          <AnimatePresence>
            {mobilePanel && (
              <motion.div
                key={mobilePanel}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="fixed bottom-0 left-0 right-0 z-[400] bg-[#252526] border-t border-[#3c3c3c] shadow-2xl"
                style={{ height: '60vh' }}
              >
                {mobilePanel === 'explorer' && (
                  <StudioExplorer
                    theme={theme}
                    objects={objects}
                    rootIds={rootIds}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    onDelete={handleDelete}
                    onDuplicate={handleDuplicate}
                    onPropChange={setProperty}
                    onAddChild={handleAddChild}
                  />
                )}
                {mobilePanel === 'toolbox' && (
                  <StudioToolbox onAddPreset={handleAddPreset} />
                )}
                {mobilePanel === 'ai' && (
                  <StudioAIChat
                    objects={objects}
                    pendingOps={pendingOps}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onNewOp={handleNewOp}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* Left explorer tree */}
            <div className="w-[280px] shrink-0 flex flex-col border-r border-[#3c3c3c]">
              <StudioExplorer
                theme={theme}
                objects={objects}
                rootIds={rootIds}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
                onPropChange={setProperty}
                onAddChild={handleAddChild}
              />
            </div>

            {/* Central 3D Canvas */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex-1 min-h-0 relative">
                <StudioCanvas3D
                  objects={objects}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  isRunning={runState === 'running'}
                  timeOfDay={timeOfDay}
                  activeTool={activeTool}
                  onUpdateProperty={setProperty}
                />
              </div>

              {showOutput && (
                <div className="h-44 shrink-0 border-t border-[#3c3c3c] overflow-hidden">
                  <StudioOutput theme={theme} lines={outputLines} onClear={() => setOutputLines([])} onExecuteCommand={handleCommandExecute} />
                </div>
              )}
            </div>

            {/* Right toolbox shelf */}
            <div className="flex shrink-0 border-l border-[#3c3c3c]">
              <AnimatePresence>
                {showAI && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 280 }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden border-l border-[#3c3c3c]"
                  >
                    <StudioAIChat
                      objects={objects}
                      pendingOps={pendingOps}
                      onApprove={handleApprove}
                      onReject={handleReject}
                      onNewOp={handleNewOp}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="w-[220px] shrink-0">
                <StudioToolbox onAddPreset={handleAddPreset} />
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
