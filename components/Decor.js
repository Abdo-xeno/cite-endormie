export function Ornament({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
      <span className="inline-block text-lg text-gold/80 animate-sway">❖</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

export function SectionLabel({ children }) {
  return (
    <span className="inline-flex items-center gap-3 font-body text-sm uppercase tracking-[0.3em] text-gold/80">
      <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold/50" />
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-gold/70 animate-pulse-ring" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
      </span>
      {children}
      <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold/50" />
    </span>
  );
}
