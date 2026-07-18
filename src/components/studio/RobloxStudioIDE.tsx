import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { StudioCanvas3D } from './StudioCanvas3D';
import { StudioExplorer } from './StudioExplorer';
import { StudioToolbox } from './StudioToolbox';
import { StudioAIChat } from './StudioAIChat';
import { StudioToolbar } from './StudioToolbar';
import { StudioOutput } from './StudioOutput';
import { runScript } from './luauEngine';
import type { StudioObject, ObjectType, RunState, OutputLine, AIPendingOp, AIChange, Preset } from './types';

// ─── Default scene ─────────────────────────────────────────────────────────────

function makeId() { return `obj_${Math.random().toString(36).slice(2, 9)}`; }

function buildDefaultScene(): Map<string, StudioObject> {
  const map = new Map<string, StudioObject>();

  const addObj = (obj: StudioObject) => { map.set(obj.id, obj); return obj; };

  // Root services
  const wsId = makeId();
  const lightId = makeId();
  const repId = makeId();
  const guiId = makeId();

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
    },
    children: [],
  });
  map.get(wsId)!.children.push(bpId);

  // Spawn
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

  // Red block
  const redId = makeId();
  addObj({
    id: redId, type: 'Part', name: 'RedBlock', parentId: wsId,
    properties: {
      Size: { x: 4, y: 4, z: 4 },
      Position: { x: 10, y: 2, z: 0 },
      Color: { r: 0.769, g: 0.157, b: 0.110 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
    },
    children: [],
  });
  map.get(wsId)!.children.push(redId);

  // Blue block
  const blueId = makeId();
  addObj({
    id: blueId, type: 'Part', name: 'BlueBlock', parentId: wsId,
    properties: {
      Size: { x: 4, y: 6, z: 4 },
      Position: { x: -10, y: 3, z: 0 },
      Color: { r: 0.188, g: 0.376, b: 0.792 },
      Material: 'SmoothPlastic',
      Anchored: true,
      CanCollide: true,
      Transparency: 0,
    },
    children: [],
  });
  map.get(wsId)!.children.push(blueId);

  return map;
}

const ROOT_IDS_DEFAULT = ['Workspace', 'Lighting', 'ReplicatedStorage', 'StarterGui'];

// ─── Main IDE ──────────────────────────────────────────────────────────────────

interface Props { onClose: () => void }

export function RobloxStudioIDE({ onClose }: Props) {
  const [objects, setObjects] = useState<Map<string, StudioObject>>(() => buildDefaultScene());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [runState, setRunState] = useState<RunState>('stopped');
  const [outputLines, setOutputLines] = useState<OutputLine[]>([]);
  const [pendingOps, setPendingOps] = useState<AIPendingOp[]>([]);
  const [showAI, setShowAI] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const [mobilePanel, setMobilePanel] = useState<'explorer' | 'toolbox' | 'ai' | null>(null);

  const stopFnRefs = useRef<Array<{ stop: () => void }>>([]);

  // Root IDs (top-level objects with parentId === null)
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

  // ─── Object mutation helpers ────────────────────────────────────────────────

  const addOutput = useCallback((line: Omit<OutputLine, 'id' | 'ts'>) => {
    setOutputLines(prev => [...prev, { ...line, id: makeId(), ts: Date.now() }]);
  }, []);

  const setProperty = useCallback((id: string, prop: string, val: unknown) => {
    setObjects(prev => {
      const map = new Map(prev);
      const obj = map.get(id);
      if (!obj) return prev;
      map.set(id, { ...obj, properties: { ...obj.properties, [prop]: val } });
      return map;
    });
  }, []);

  const getObjects = useCallback(() => objects, [objects]);

  // ─── Run / Stop ─────────────────────────────────────────────────────────────

  const handleRun = useCallback(() => {
    setRunState('running');
    setShowOutput(true);
    addOutput({ kind: 'info', text: '▶ Game started. Scripts executing...' });

    const scripts = Array.from(objects.values()).filter(
      o => ['Script', 'LocalScript'].includes(o.type) && o.properties.Source
    );

    for (const script of scripts) {
      const handle = runScript({
        source: script.properties.Source as string,
        scriptObjId: script.id,
        getObjects,
        setProperty,
        addOutput,
      });
      stopFnRefs.current.push(handle);
    }
  }, [objects, getObjects, setProperty, addOutput]);

  const handleStop = useCallback(() => {
    for (const h of stopFnRefs.current) h.stop();
    stopFnRefs.current = [];
    setRunState('stopped');
    addOutput({ kind: 'info', text: '⏹ Game stopped.' });
  }, [addOutput]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { stopFnRefs.current.forEach(h => h.stop()); };
  }, []);

  // ─── Object CRUD ────────────────────────────────────────────────────────────

  const handleDelete = useCallback((id: string) => {
    setObjects(prev => {
      const map = new Map(prev);
      const obj = map.get(id);
      if (!obj) return prev;
      // Remove from parent
      if (obj.parentId) {
        const parent = map.get(obj.parentId);
        if (parent) map.set(obj.parentId, { ...parent, children: parent.children.filter(c => c !== id) });
      }
      // Remove all descendants
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
          ...(pos ? { Position: { x: pos.x + 2, y: pos.y, z: pos.z + 2 } } : {}),
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

  const handleAddPreset = useCallback((preset: Preset) => {
    setObjects(prev => {
      const map = new Map(prev);
      // Find Workspace
      let wsId = '';
      for (const [id, obj] of map) { if (obj.type === 'Workspace') { wsId = id; break; } }
      if (!wsId) return prev;

      const newId = makeId();
      const count = Array.from(map.values()).filter(o => o.type === preset.type).length;
      const defaultPos = { x: (count % 5) * 8 - 16, y: 1, z: Math.floor(count / 5) * 8 - 8 };

      const newObj: StudioObject = {
        id: newId,
        type: preset.type as ObjectType,
        name: `${preset.name}${count > 0 ? count + 1 : ''}`,
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
  }, []);

  // ─── AI operations ──────────────────────────────────────────────────────────

  const handleNewOp = useCallback((op: AIPendingOp) => {
    setPendingOps(prev => [...prev, op]);
  }, []);

  const handleApprove = useCallback((opId: string) => {
    setPendingOps(prev => prev.map(op => {
      if (op.id !== opId) return op;
      // Apply changes
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

  // ─── Layout ─────────────────────────────────────────────────────────────────

  const outputH = showOutput ? 160 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[300] flex flex-col bg-[#1e1e1e] overflow-hidden"
      style={{ fontFamily: '"JetBrains Mono", monospace' }}
    >
      {/* Toolbar */}
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
      />

      {/* Main area */}
      {isMobile ? (
        /* ─── MOBILE layout ──────────────────────────────────────── */
        <div className="flex flex-col flex-1 min-h-0">
          {/* 3D canvas */}
          <div className="flex-1 min-h-0 relative">
            <StudioCanvas3D
              objects={objects}
              selectedId={selectedId}
              onSelect={setSelectedId}
              isRunning={runState === 'running'}
            />
          </div>

          {/* Output (conditional) */}
          {showOutput && (
            <div style={{ height: outputH }} className="shrink-0 border-t border-[#3c3c3c]">
              <StudioOutput lines={outputLines} onClear={() => setOutputLines([])} />
            </div>
          )}

          {/* Mobile tab bar */}
          <div className="shrink-0 bg-[#2d2d30] border-t border-[#3c3c3c] flex">
            {(['explorer', 'toolbox', 'ai'] as const).map(panel => (
              <button
                key={panel}
                onClick={() => setMobilePanel(p => p === panel ? null : panel)}
                className={`flex-1 py-2 text-[10px] uppercase tracking-wider font-mono transition-colors
                  ${mobilePanel === panel ? 'text-[#007acc] bg-[#1e1e1e]' : 'text-gray-400'}`}
              >
                {panel === 'ai' ? 'AI' : panel.charAt(0).toUpperCase() + panel.slice(1)}
              </button>
            ))}
          </div>

          {/* Slide-out drawer */}
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
                    objects={objects}
                    rootIds={rootIds}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                    onDelete={handleDelete}
                    onDuplicate={handleDuplicate}
                    onPropChange={setProperty}
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
        /* ─── DESKTOP layout ─────────────────────────────────────── */
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex flex-1 min-h-0 overflow-hidden">
            {/* Left: Explorer + Properties */}
            <div className="w-[260px] min-w-[220px] max-w-[320px] shrink-0 flex flex-col border-r border-[#3c3c3c]">
              <StudioExplorer
                objects={objects}
                rootIds={rootIds}
                selectedId={selectedId}
                onSelect={setSelectedId}
                onDelete={handleDelete}
                onDuplicate={handleDuplicate}
                onPropChange={setProperty}
              />
            </div>

            {/* Center: 3D Canvas */}
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex-1 min-h-0 relative">
                <StudioCanvas3D
                  objects={objects}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  isRunning={runState === 'running'}
                />
              </div>

              {/* Output console (at bottom of center) */}
              <AnimatePresence>
                {showOutput && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: outputH }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="shrink-0 border-t border-[#3c3c3c] overflow-hidden"
                  >
                    <StudioOutput lines={outputLines} onClear={() => setOutputLines([])} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Toolbox + optional AI */}
            <div className="flex shrink-0 border-l border-[#3c3c3c]">
              {/* AI Chat */}
              <AnimatePresence>
                {showAI && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 260 }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden border-l border-[#3c3c3c]"
                    style={{ width: 260, minWidth: 260 }}
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

              {/* Toolbox */}
              <div className="w-[220px] min-w-[200px] shrink-0">
                <StudioToolbox onAddPreset={handleAddPreset} />
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
