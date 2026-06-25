"use client";

/**
 * La cité endormie en silhouette. Les fenêtres clignotent en BLEU FROID
 * (la lueur des écrans = le sommeil numérique). Avec `awake`, elles
 * deviennent dorées : la cité s'est réveillée.
 *
 * Données déterministes (aucun random) → pas de décalage d'hydratation.
 */
const BUILDINGS = Array.from({ length: 26 }, (_, i) => {
  const h = 24 + ((i * 43) % 58); // hauteur en % du conteneur
  const w = 18 + ((i * 19) % 28); // largeur en px
  const cols = 2 + (i % 3); // 2..4 colonnes de fenêtres
  const rows = Math.max(2, Math.round(h / 13));
  const windows = Array.from({ length: cols * rows }, (_, j) => ({
    on: (i * 7 + j * 5) % 3 === 0,
    gold: (i * 3 + j * 2) % 17 === 0,
  }));
  return { h, w, cols, windows, key: i };
});

export default function SleepingCity({ className = "", awake = false }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <div className="flex h-full w-full items-end justify-center gap-[3px] overflow-hidden">
        {BUILDINGS.map((b) => (
          <div
            key={b.key}
            className="relative flex-shrink-0 rounded-t-[3px]"
            style={{
              width: b.w,
              height: b.h + "%",
              background: "linear-gradient(180deg, #0a1a2b 0%, #04101c 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="absolute inset-x-[3px] top-2 grid gap-[3px]"
              style={{ gridTemplateColumns: `repeat(${b.cols}, 1fr)` }}
            >
              {b.windows.map((win, j) => {
                const golden = win.gold || awake;
                return (
                  <span
                    key={j}
                    className="block rounded-[1px]"
                    style={{
                      height: 4,
                      background: win.on
                        ? golden
                          ? "rgba(224,200,96,0.92)"
                          : "rgba(112,162,228,0.85)"
                        : "rgba(255,255,255,0.045)",
                      boxShadow: win.on
                        ? golden
                          ? "0 0 7px rgba(224,200,96,0.85)"
                          : "0 0 7px rgba(112,162,228,0.7)"
                        : "none",
                      animation: win.on
                        ? `flicker ${2.2 + (j % 3) * 0.6}s ease-in-out ${
                            (j % 5) * 0.5
                          }s infinite`
                        : "none",
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
