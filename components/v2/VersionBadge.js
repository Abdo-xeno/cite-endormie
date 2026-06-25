"use client";

/**
 * Petit sélecteur de version (présent uniquement sur la v2) : permet de revenir
 * à la v1 pour comparer. Discret, en haut à gauche. Ne touche pas la v1.
 */
export default function VersionBadge() {
  return (
    <a
      href="/"
      className="no-tap-highlight fixed left-4 top-4 z-[70] rounded-full border border-gold/25 bg-night-900/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-cream/50 backdrop-blur-sm transition-all duration-300 hover:border-gold/50 hover:text-cream/90"
    >
      v2 · <span className="text-gold/70">voir la v1 →</span>
    </a>
  );
}
