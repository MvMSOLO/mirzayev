export function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 mix-blend-difference px-5 py-6 flex justify-between items-center">
      <a href="#top" className="text-xs font-bold tracking-tighter">AVAZBEK / 16</a>
      <div className="flex gap-2 items-center">
        <div className="size-2 bg-accent animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest">Available · 2026</span>
      </div>
    </nav>
  );
}
