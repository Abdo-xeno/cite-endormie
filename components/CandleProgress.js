"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSeals } from "./SealsProvider";
import { useTeam } from "./TeamProvider";

function Candle({ lit, index }) {
  return (
    <div className="flex flex-col items-center">
      {/* Flamme */}
      <div className="relative flex h-7 w-4 items-end justify-center">
        <AnimatePresence>
          {lit && (
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 8 }}
              animate={{
                scale: [1, 1.15, 0.95, 1],
                opacity: [1, 0.8, 1, 0.9],
                y: 0,
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 0.4 },
              }}
              className="h-5 w-3"
              style={{
                background:
                  "radial-gradient(circle at 50% 70%, #fff6cf 0%, #f4c44a 35%, #d4af37 70%, transparent 100%)",
                borderRadius: "50% 50% 50% 50% / 62% 62% 38% 38%",
                filter: "drop-shadow(0 0 9px rgba(212,175,55,0.9))",
              }}
            />
          )}
        </AnimatePresence>
        {!lit && (
          <div className="mb-0.5 h-1 w-1 rounded-full bg-cream/25" />
        )}
      </div>

      {/* Corps de bougie */}
      <div
        className="w-2 rounded-sm transition-all duration-700"
        style={{
          height: 28 - index * 2,
          background: lit
            ? "linear-gradient(180deg, rgba(250,246,236,0.85), rgba(250,246,236,0.45))"
            : "rgba(250,246,236,0.18)",
          boxShadow: lit ? "0 0 16px rgba(212,175,55,0.35)" : "none",
        }}
      />
    </div>
  );
}

export default function CandleProgress() {
  const { seals } = useSeals();
  const { team } = useTeam();

  // Allumage cumulatif et ordonné : une bougie ne s'allume que si toutes
  // les précédentes le sont. La 1re exige d'avoir brisé le sceau jouable.
  const lit = {
    1: seals[1],
    2: seals[1] && seals[2],
    3: seals[1] && seals[2] && seals[3],
  };
  const litCount = (lit[1] ? 1 : 0) + (lit[2] ? 1 : 0) + (lit[3] ? 1 : 0);

  return (
    <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      {team && (
        <div className="max-w-[92px] truncate rounded-full border border-gold/30 bg-night-900/60 px-2 py-1 text-center text-[9px] uppercase tracking-wide text-gold/80">
          {team}
        </div>
      )}
      <div className="writing-vertical mb-1 text-[9px] uppercase tracking-[0.3em] text-cream/35">
        Sceaux
      </div>

      <div className="flex flex-col items-center gap-4 rounded-full border border-white/5 bg-night-900/40 px-3 py-5 backdrop-blur-sm">
        {[1, 2, 3].map((i) => (
          <Candle key={i} lit={lit[i]} index={i - 1} />
        ))}
      </div>

      <div className="font-display text-lg font-bold tabular-nums text-gold/90">
        {litCount}
        <span className="text-cream/30">/3</span>
      </div>

      {!seals[1] && (
        <div className="max-w-[68px] text-center text-[8px] uppercase leading-tight tracking-[0.15em] text-cream/30">
          Brisez le 1ᵉʳ sceau
        </div>
      )}
    </div>
  );
}
