"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Le Sage — maître du jeu. Il ne donne pas les réponses : il rallume la
 * lumière qui permet de les trouver. Révèle les indices un par un.
 */
export default function SageHint({ hints = [] }) {
  const [i, setI] = useState(-1);
  const shown = i >= 0 ? hints[Math.min(i, hints.length - 1)] : null;
  const done = i >= hints.length - 1;

  const ask = () => {
    setI((v) => Math.min(v + 1, hints.length - 1));
    try {
      window.dispatchEvent(new Event("seal:tick"));
    } catch (e) {}
  };

  if (!hints.length) return null;

  return (
    <div className="mt-5 border-t border-white/5 pt-4">
      <button
        onClick={ask}
        disabled={done}
        className="no-tap-highlight group inline-flex items-center gap-2 text-sm tracking-wide text-sacred-light/80 transition-colors duration-300 hover:text-sacred-glow disabled:cursor-default disabled:text-cream/30"
      >
        <span className="text-base">◈</span>
        {i < 0
          ? "Demander un indice au Sage"
          : done
          ? "Le Sage s'est tu"
          : "Demander un autre indice"}
        {i >= 0 && !done && (
          <span className="text-xs text-cream/30">
            ({hints.length - 1 - i} restant{hints.length - 1 - i > 1 ? "s" : ""})
          </span>
        )}
      </button>

      <AnimatePresence mode="wait">
        {shown && (
          <motion.div
            key={i}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl border-l-2 border-sacred-light/50 bg-sacred/5 px-4 py-3">
              <p className="font-display text-[15px] italic leading-relaxed text-cream/85">
                « {shown} »
              </p>
              <p className="mt-1.5 text-xs tracking-wide text-sacred-light/70">
                — Le Sage
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
