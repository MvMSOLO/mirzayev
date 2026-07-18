import { useState, useCallback } from 'react';
import { ChevronRight, ChevronDown, Trash2, Copy, Plus, Package, Code2,
         MapPin, Zap, Globe, Box, Layers, Users, Star } from 'lucide-react';
import type { StudioObject, ObjectType } from './types';

// ─── icons per type ────────────────────────────────────────────────────────────

const TYPE_ICON: Record<string, React.ReactNode> = {
  Workspace:         <Globe className="size-3 text-sky-400" />,
  Lighting:          <Zap className="size-3 text-yellow-400" />,
  ReplicatedStorage: <Layers className="size-3 text-purple-400" />,
  StarterGui:        <Star className="size-3 text-pink-400" />,
  StarterPack:       <Package className="size-3 text-orange-400" />,
  SoundService:      <Zap className="size-3 text-blue-300" />,
  Teams:             <Users className="size-3 text-cyan-400" />,
  Players:           <Users className="size-3 text-green-400" />,
  Part:              <Box className="size-3 text-gray-300" />,
  Baseplate:         <Box className="size-3 text-gray-400" />,
  SpawnLocation:     <MapPin className="size-3 text-green-400" />,
  NPCModel:          <Users className="size-3 text-orange-400" />,
  Model:             <Layers className="size-3 text-purple-300" />,
  Folder:            <Layers className="size-3 text-yellow-300" />,
  Script:            <Code2 className="size-3 text-green-300" />,
  LocalScript:       <Code2 className="size-3 text-blue-300" />,
  ModuleScript:      <Code2 className="size-3 text-purple-300" />,
  PointLight:        <Zap className="size-3 text-yellow-300" />,
  ScreenGui:         <Star className="size-3 text-pink-300" />,
  SurfaceGui:        <Star className="size-3 text-pink-400" />,
};

function getIcon(type: ObjectType): React.ReactNode {
  return TYPE_ICON[type] ?? <Box className="size-3 text-gray-400" />;
}

// ─── Tree node ────────────────────────────────────────────────────────────────

interface NodeProps {
  id: string;
  objects: Map<string, StudioObject>;
  selectedId: string | null;
  expandedIds: Set<string>;
  depth: number;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

function TreeNode({
  id, objects, selectedId, expandedIds, depth,
  onSelect, onToggleExpand, onDelete, onDuplicate
}: NodeProps) {
  const [hovering, setHovering] = useState(false);
  const [ctx, setCtx] = useState<{ x: number; y: number } | null>(null);
  const obj = objects.get(id);
  if (!obj) return null;

  const isExpanded = expandedIds.has(id);
  const isSelected = id === selectedId;
  const hasChildren = obj.children.length > 0;

  return (
    <>
      <div
        className={`group relative flex items-center gap-1 px-1 py-[2px] rounded cursor-pointer select-none text-[11px] font-mono
          ${isSelected ? 'bg-[#0078d4] text-white' : hovering ? 'bg-[#3c3c3c] text-gray-200' : 'text-gray-300'}`}
        style={{ paddingLeft: `${4 + depth * 14}px` }}
        onClick={() => onSelect(id)}
        onDoubleClick={() => onToggleExpand(id)}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onContextMenu={(e) => { e.preventDefault(); setCtx({ x: e.clientX, y: e.clientY }); }}
      >
        {/* expand arrow */}
        <span className="size-3 flex-shrink-0" onClick={(e) => { e.stopPropagation(); onToggleExpand(id); }}>
          {hasChildren
            ? isExpanded
              ? <ChevronDown className="size-3" />
              : <ChevronRight className="size-3" />
            : null}
        </span>

        {/* type icon */}
        <span className="flex-shrink-0">{getIcon(obj.type)}</span>

        {/* name */}
        <span className="truncate">{obj.name}</span>

        {/* quick actions on hover */}
        {hovering && !isSelected && (
          <span className="ml-auto flex items-center gap-0.5 pr-1">
            <button
              className="p-0.5 hover:text-red-400 transition-colors"
              onClick={(e) => { e.stopPropagation(); onDelete(id); }}
              title="Delete"
            >
              <Trash2 className="size-2.5" />
            </button>
          </span>
        )}
      </div>

      {/* Context menu */}
      {ctx && (
        <>
          <div className="fixed inset-0 z-[500]" onClick={() => setCtx(null)} />
          <div
            className="fixed z-[501] bg-[#252526] border border-[#3c3c3c] rounded shadow-xl py-1 min-w-[160px]"
            style={{ left: ctx.x, top: ctx.y }}
          >
            {[
              { label: 'Select', action: () => { onSelect(id); setCtx(null); } },
              { label: 'Duplicate', action: () => { onDuplicate(id); setCtx(null); } },
              { label: 'Delete', action: () => { onDelete(id); setCtx(null); }, danger: true },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full text-left px-3 py-1 text-[11px] font-mono hover:bg-[#0078d4] ${item.danger ? 'text-red-400' : 'text-gray-200'}`}
                onClick={item.action}
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Children */}
      {isExpanded && obj.children.map(cid => (
        <TreeNode
          key={cid}
          id={cid}
          objects={objects}
          selectedId={selectedId}
          expandedIds={expandedIds}
          depth={depth + 1}
          onSelect={onSelect}
          onToggleExpand={onToggleExpand}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
      ))}
    </>
  );
}

// ─── Properties panel ─────────────────────────────────────────────────────────

const MATERIALS = [
  'SmoothPlastic','Plastic','Wood','WoodPlanks','Marble','Granite','Cobblestone',
  'Brick','Pebble','Sand','Fabric','Ice','SmoothPlastic','Metal','DiamondPlate',
  'Foil','Grass','Neon','Concrete','Glass','Slate','ForceField',
];

interface PropPanelProps {
  obj: StudioObject;
  onChange: (id: string, prop: string, val: unknown) => void;
}

function PropertyPanel({ obj, onChange }: PropPanelProps) {
  const set = (prop: string, val: unknown) => onChange(obj.id, prop, val);

  const pos = (obj.properties.Position as { x:number;y:number;z:number }) ?? { x:0, y:0, z:0 };
  const size = (obj.properties.Size as { x:number;y:number;z:number }) ?? { x:4, y:1, z:4 };
  const color = (obj.properties.Color as { r:number;g:number;b:number }) ?? { r:0.6,g:0.6,b:0.6 };
  const trans = (obj.properties.Transparency as number) ?? 0;
  const mat = (obj.properties.Material as string) ?? 'SmoothPlastic';
  const anchored = (obj.properties.Anchored as boolean) ?? true;

  const hasGeom = ['Part','SpawnLocation','Baseplate','NPCModel'].includes(obj.type);
  const hasSource = ['Script','LocalScript','ModuleScript'].includes(obj.type);

  const Vec3Row = ({ label, val, prop }: { label: string; val: {x:number;y:number;z:number}; prop: string }) => (
    <div className="mb-2">
      <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-0.5">{label}</div>
      <div className="flex gap-1">
        {(['x','y','z'] as const).map(ax => (
          <label key={ax} className="flex items-center gap-0.5 flex-1">
            <span className="text-[9px] text-gray-500 w-2">{ax.toUpperCase()}</span>
            <input
              type="number"
              step={0.5}
              value={Number((val[ax] ?? 0).toFixed(2))}
              onChange={e => set(prop, { ...val, [ax]: parseFloat(e.target.value) || 0 })}
              className="w-full bg-[#1e1e1e] border border-[#3c3c3c] text-gray-200 text-[10px] font-mono px-1 py-0.5 rounded focus:border-[#0078d4] outline-none"
            />
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-2 font-mono text-[11px] text-gray-300 overflow-y-auto h-full">
      {/* Header */}
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-[#3c3c3c]">
        {getIcon(obj.type)}
        <span className="font-bold text-white truncate">{obj.name}</span>
        <span className="text-[9px] text-gray-500 ml-auto">{obj.type}</span>
      </div>

      {hasGeom && (
        <>
          <Vec3Row label="Position" val={pos} prop="Position" />
          {obj.type !== 'NPCModel' && <Vec3Row label="Size" val={size} prop="Size" />}
        </>
      )}

      {/* Color */}
      {obj.properties.Color !== undefined && (
        <div className="mb-2">
          <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-0.5">Color</div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={`#${Math.round(color.r*255).toString(16).padStart(2,'0')}${Math.round(color.g*255).toString(16).padStart(2,'0')}${Math.round(color.b*255).toString(16).padStart(2,'0')}`}
              onChange={e => {
                const hex = e.target.value;
                const r = parseInt(hex.slice(1,3),16)/255;
                const g = parseInt(hex.slice(3,5),16)/255;
                const b = parseInt(hex.slice(5,7),16)/255;
                set('Color', {r,g,b});
              }}
              className="w-8 h-5 rounded border border-[#3c3c3c] cursor-pointer bg-transparent"
            />
            <span className="text-[9px] text-gray-400">
              RGB({Math.round(color.r*255)}, {Math.round(color.g*255)}, {Math.round(color.b*255)})
            </span>
          </div>
        </div>
      )}

      {/* Transparency */}
      {obj.properties.Transparency !== undefined && (
        <div className="mb-2">
          <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-0.5">
            Transparency: {trans.toFixed(2)}
          </div>
          <input
            type="range" min={0} max={1} step={0.05}
            value={trans}
            onChange={e => set('Transparency', parseFloat(e.target.value))}
            className="w-full accent-[#0078d4]"
          />
        </div>
      )}

      {/* Material */}
      {obj.properties.Material !== undefined && (
        <div className="mb-2">
          <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-0.5">Material</div>
          <select
            value={mat}
            onChange={e => set('Material', e.target.value)}
            className="w-full bg-[#1e1e1e] border border-[#3c3c3c] text-gray-200 text-[10px] font-mono px-1 py-0.5 rounded focus:border-[#0078d4] outline-none"
          >
            {MATERIALS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      )}

      {/* Anchored */}
      {obj.properties.Anchored !== undefined && (
        <div className="mb-2 flex items-center gap-2">
          <input
            type="checkbox"
            id="anchored"
            checked={anchored}
            onChange={e => set('Anchored', e.target.checked)}
            className="accent-[#0078d4]"
          />
          <label htmlFor="anchored" className="text-[10px] text-gray-300 cursor-pointer">Anchored</label>
        </div>
      )}

      {/* Script source */}
      {hasSource && (
        <div className="mb-2">
          <div className="text-[9px] uppercase tracking-wider text-gray-500 mb-0.5">Source</div>
          <textarea
            value={(obj.properties.Source as string) ?? ''}
            onChange={e => set('Source', e.target.value)}
            rows={10}
            spellCheck={false}
            className="w-full bg-[#1e1e1e] border border-[#3c3c3c] text-[#d4d4d4] text-[10px] font-mono p-1.5 rounded resize-y focus:border-[#0078d4] outline-none leading-relaxed"
          />
        </div>
      )}
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

interface Props {
  objects: Map<string, StudioObject>;
  rootIds: string[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onPropChange: (id: string, prop: string, val: unknown) => void;
}

export function StudioExplorer({
  objects, rootIds, selectedId, onSelect, onDelete, onDuplicate, onPropChange,
}: Props) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    const s = new Set<string>();
    // auto-expand first 2 levels
    for (const [id, obj] of objects) {
      if (obj.parentId === null || (obj.parentId && objects.get(obj.parentId)?.parentId === null)) s.add(id);
    }
    return s;
  });

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const selectedObj = selectedId ? objects.get(selectedId) : null;

  return (
    <div className="flex flex-col h-full bg-[#252526] border-r border-[#3c3c3c]">
      {/* Explorer header */}
      <div className="px-3 py-2 border-b border-[#3c3c3c] bg-[#2d2d30] shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Explorer</span>
      </div>

      {/* Tree (takes ~55% of height) */}
      <div className="flex-1 overflow-y-auto min-h-0 py-1" style={{ maxHeight: '55%' }}>
        {rootIds.map(id => (
          <TreeNode
            key={id}
            id={id}
            objects={objects}
            selectedId={selectedId}
            expandedIds={expandedIds}
            depth={0}
            onSelect={onSelect}
            onToggleExpand={toggleExpand}
            onDelete={onDelete}
            onDuplicate={onDuplicate}
          />
        ))}
      </div>

      {/* Properties header */}
      <div className="px-3 py-2 border-y border-[#3c3c3c] bg-[#2d2d30] shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Properties</span>
        {selectedObj && <span className="ml-2 text-[9px] text-gray-500">{selectedObj.name}</span>}
      </div>

      {/* Properties panel (takes remaining height) */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {selectedObj
          ? <PropertyPanel obj={selectedObj} onChange={onPropChange} />
          : <div className="p-3 text-[10px] text-gray-500 font-mono">Select an object to edit properties</div>
        }
      </div>
    </div>
  );
}
