import { useRef, useEffect, useState } from 'react';
import { Trash2, Terminal } from 'lucide-react';
import type { OutputLine } from './types';

interface Props {
  lines: OutputLine[];
  onClear: () => void;
  onExecuteCommand?: (cmd: string) => void;
  theme?: string;
}

export function StudioOutput({ lines, onClear, onExecuteCommand, theme = 'dark' }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null!);
  const [cmdInput, setCmdInput] = useState('');

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

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cmdInput.trim() && onExecuteCommand) {
      onExecuteCommand(cmdInput);
      setCmdInput('');
    }
  };

  return (
    <div className={`flex flex-col h-full ${theme === 'dark' ? 'bg-[#1e1e1e] text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-3 py-1 border-b shrink-0 ${
        theme === 'dark' ? 'bg-[#2d2d30] border-[#3c3c3c]' : 'bg-[#f0f0f0] border-[#ccc]'
      }`}>
        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-mono flex items-center gap-1.5">
          <Terminal className="size-3 text-cyan-500" /> Output & Command Bar
        </span>
        <button
          onClick={onClear}
          title="Clear output"
          className="p-0.5 text-gray-500 hover:text-gray-300 transition-colors"
        >
          <Trash2 className="size-3" />
        </button>
      </div>

      {/* Lines */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 space-y-0.5 font-mono text-[11px] min-h-0">
        {lines.length === 0 && (
          <div className="text-gray-500 text-[10px] italic p-1 font-mono">
            Script output and dynamic compilation logs will appear here. Run code via Command Bar or playtests.
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

      {/* Command Bar */}
      {onExecuteCommand && (
        <form onSubmit={handleCommandSubmit} className={`flex items-center gap-2 px-3 py-1.5 border-t shrink-0 ${
          theme === 'dark' ? 'border-[#3c3c3c] bg-[#1e1e1e]' : 'border-[#ccc] bg-white'
        }`}>
          <span className="text-[10px] font-mono text-cyan-400 shrink-0 select-none">❯_</span>
          <input
            type="text"
            value={cmdInput}
            onChange={e => setCmdInput(e.target.value)}
            placeholder="Command Bar - Run live Luau code on Workspace (e.g. print('Hello World') or workspace.Baseplate.Color = Color3.fromRGB(0,255,0))"
            className={`flex-1 bg-transparent text-[11px] font-mono outline-none border-0 p-0 ${
              theme === 'dark' ? 'text-gray-200 placeholder:text-gray-600' : 'text-black placeholder:text-gray-400'
            }`}
          />
        </form>
      )}
    </div>
  );
}
