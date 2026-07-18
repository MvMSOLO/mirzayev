import { useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import type { OutputLine } from './types';

interface Props {
  lines: OutputLine[];
  onClear: () => void;
}

export function StudioOutput({ lines, onClear }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  const kindStyle = (kind: OutputLine['kind']) => {
    switch (kind) {
      case 'error': return 'text-red-400';
      case 'warn':  return 'text-yellow-400';
      case 'info':  return 'text-sky-400';
      default:      return 'text-gray-300';
    }
  };

  const kindPrefix = (kind: OutputLine['kind']) => {
    switch (kind) {
      case 'error': return '✖ ';
      case 'warn':  return '⚠ ';
      case 'info':  return 'ℹ ';
      default:      return '';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1 border-b border-[#3c3c3c] bg-[#2d2d30] shrink-0">
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">Output</span>
        <button
          onClick={onClear}
          title="Clear output"
          className="p-0.5 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <Trash2 className="size-3" />
        </button>
      </div>

      {/* Lines */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 space-y-0 font-mono text-[11px] min-h-0">
        {lines.length === 0 && (
          <div className="text-gray-600 text-[10px] italic p-1">
            Script output will appear here when the game is running.
          </div>
        )}
        {lines.map(line => (
          <div key={line.id} className={`flex gap-1.5 leading-relaxed ${kindStyle(line.kind)}`}>
            <span className="text-gray-600 shrink-0 w-16 truncate text-[9px] pt-px">
              {new Date(line.ts).toLocaleTimeString('en', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
            <span className="text-gray-500 shrink-0">{kindPrefix(line.kind)}</span>
            <span className="whitespace-pre-wrap break-all">{line.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
