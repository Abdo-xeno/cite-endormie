"use client";

/**
 * Géométrie sacrée — l'étoile à huit branches (Khâtim / Rub el Hizb ۞),
 * signature visuelle de l'univers. Deux carrés entrelacés + cercles.
 * `currentColor` → la couleur se règle via la classe (text-gold/…).
 */
export function StarKhatim({ className = "", style }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <rect x="20" y="20" width="60" height="60" strokeWidth="1.4" />
      <rect
        x="20"
        y="20"
        width="60"
        height="60"
        strokeWidth="1.4"
        transform="rotate(45 50 50)"
      />
      <circle cx="50" cy="50" r="34" strokeWidth="0.7" opacity="0.55" />
      <circle cx="50" cy="50" r="21" strokeWidth="0.7" opacity="0.4" />
      <circle cx="50" cy="50" r="3.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Filigrane d'étoile, très discret, en fond d'une section.
 */
export function StarWatermark({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 ${className}`}
    >
      <StarKhatim className="h-[140vmin] w-[140vmin] text-gold/[0.04] animate-spin-slow" />
    </div>
  );
}
