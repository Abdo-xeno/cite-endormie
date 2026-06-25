"use client";

/**
 * Petits emblèmes au trait, un par acte — pour donner à chaque chapitre une
 * identité visuelle distincte (or, lueur douce, dans la palette).
 *  • Gouvernail — la boussole (Acte I, les gouvernants)
 *  • Graine     — la fitra qui pousse (Acte II, les citoyens)
 *  • Lien       — deux anneaux noués (Acte III, le pacte)
 */
const base = {
  width: 54,
  height: 54,
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  style: {
    color: "#d4af37",
    filter: "drop-shadow(0 0 7px rgba(212,175,55,0.4))",
  },
};

export function Gouvernail({ className = "" }) {
  return (
    <svg {...base} className={className} strokeLinecap="round">
      <circle cx="32" cy="32" r="26" opacity="0.9" />
      <circle cx="32" cy="32" r="18" opacity="0.3" />
      <path d="M32 4v9M32 51v9M4 32h9M51 32h9" />
      <path
        d="M32 14l5.5 18L32 50l-5.5-18Z"
        fill="#d4af37"
        fillOpacity="0.45"
        stroke="none"
      />
      <circle cx="32" cy="32" r="2.4" fill="#d4af37" stroke="none" />
    </svg>
  );
}

export function Graine({ className = "" }) {
  return (
    <svg {...base} className={className} strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 58V31" />
      <path d="M32 41C22 39 16 29 17 20c10 2 15 12 15 21Z" fill="#d4af37" fillOpacity="0.3" />
      <path d="M32 37c10-2 16-12 15-21-10 2-15 12-15 21Z" fill="#d4af37" fillOpacity="0.3" />
    </svg>
  );
}

export function Lien({ className = "" }) {
  return (
    <svg {...base} className={className}>
      <circle cx="25" cy="32" r="14" />
      <circle cx="39" cy="32" r="14" opacity="0.7" />
    </svg>
  );
}
