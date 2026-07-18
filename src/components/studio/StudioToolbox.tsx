import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { PRESETS, PRESET_CATEGORIES, type PresetCategory } from './presets';
import type { Preset } from './types';

interface Props {
  onAddPreset: (preset: Preset) => void;
}

export function StudioToolbox({ onAddPreset }: Props) {
  const [tab, setTab] = useState<PresetCategory>('Parts');
  const [search, setSearch] = useState('');

  const filtered = PRESETS.filter(
    p => p.category === tab && (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full bg-[#252526] border-l border-[#3c3c3c]">
      {/* Header */}
      <div className="px-3 py-2 border-b border-[#3c3c3c] bg-[#2d2d30] shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Toolbox</span>
      </div>

      {/* Search */}
      <div className="px-2 py-2 border-b border-[#3c3c3c] shrink-0">
        <div className="flex items-center gap-1.5 bg-[#3c3c3c] rounded px-2 py-1">
          <Search className="size-3 text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-gray-200 text-[10px] font-mono outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex shrink-0 border-b border-[#3c3c3c] overflow-x-auto">
        {PRESET_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { setTab(cat); setSearch(''); }}
            className={`px-2.5 py-1.5 text-[9px] uppercase tracking-wider font-mono whitespace-nowrap border-b-2 transition-colors
              ${tab === cat
                ? 'border-[#0078d4] text-[#0078d4] bg-[#1e1e1e]'
                : 'border-transparent text-gray-400 hover:text-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Preset grid */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 min-h-0">
        {filtered.length === 0 && (
          <div className="text-[10px] text-gray-500 font-mono p-2">No results.</div>
        )}
        {filtered.map(preset => (
          <div
            key={preset.id}
            className="group flex items-center gap-2.5 px-2 py-2 rounded bg-[#1e1e1e] hover:bg-[#2a2d2e] border border-transparent hover:border-[#3c3c3c] cursor-pointer transition-all"
            onClick={() => onAddPreset(preset)}
            title={`Add "${preset.name}" to scene`}
          >
            <span className="text-lg leading-none shrink-0">{preset.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-mono text-gray-200 truncate">{preset.name}</div>
              <div className="text-[9px] text-gray-500 uppercase tracking-wider">{preset.category}</div>
            </div>
            <button
              className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-[#0078d4]"
              onClick={(e) => { e.stopPropagation(); onAddPreset(preset); }}
              title="Add to scene"
            >
              <Plus className="size-3 text-gray-300" />
            </button>
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="px-3 py-2 border-t border-[#3c3c3c] shrink-0">
        <p className="text-[9px] text-gray-500 font-mono">
          Click to add · Scripts auto-attach to selected Part
        </p>
      </div>
    </div>
  );
}
