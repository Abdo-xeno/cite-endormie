"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSeals } from "./SealsProvider";
import { useTeam } from "./TeamProvider";
import { Mosque } from "./CityScene";

/**
 * Apothéose : quand les TROIS sceaux ont cédé, la cité s'éveille — un éclat
 * doré envahit l'écran, une seule fois, puis se retire (le fond reste chaud).
 */
export default function AwakenOverlay() {
  const { seals } = useSeals();
  const { team } = useTeam();
  const [show, setShow] = useState(false);
  const fired = useRef(false);

  const all = seals[1] && seals[2] && seals[3];

  useEffect(() => {
    if (all && !fired.current) {
      fired.current = true;
      setShow(true);
      try {
        window.dispatchEvent(new Event("cite:awaken"));
      } catch (e) {}
      const t = setTimeout(() => setShow(false), 4200);
      return () => clearTimeout(t);
    }
  }, [all]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[85] flex flex-col items-center justify-center overflow-hidden px-6 text-center"
        >
          {/* Éclat doré */}
          <motion.div
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 3, opacity: [0, 0.9, 0.5] }}
            transition={{ duration: 2.4, ease: "easeOut" }}
            className="absolute h-[60vmin] w-[60vmin] rounded-full bg-gold/40 blur-[120px]"
          />
          {/* Ondes de lumière qui se propagent */}
          {[0, 0.4, 0.8].map((d, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-gold/40"
              style={{ width: "32vmin", height: "32vmin" }}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 4.6, opacity: [0, 0.6, 0] }}
              transition={{ duration: 2.6, delay: d, ease: "easeOut" }}
            />
          ))}

          {/* La mosquée s'embrase la première */}
          <motion.div
            className="absolute bottom-[14%] left-1/2 -translate-x-1/2"
            style={{ transformOrigin: "bottom" }}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 2.3, opacity: 1 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
          >
            <Mosque dawn />
          </motion.div>

          {/* Braises qui jaillissent */}
          {[...Array(24)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-gold"
              style={{ left: "50%", top: "55%" }}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{
                x: Math.cos((i / 24) * Math.PI * 2) * (220 + (i % 5) * 30),
                y: Math.sin((i / 24) * Math.PI * 2) * (220 + (i % 5) * 30),
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 2.4, delay: 0.3 + (i % 6) * 0.05, ease: "easeOut" }}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative z-10"
          >
            <p className="mb-3 text-sm uppercase tracking-[0.4em] text-gold/80">
              Les trois sceaux ont cédé
            </p>
            <h2 className="font-display text-5xl font-bold text-cream text-glow-gold md:text-8xl">
              LA CITÉ S'ÉVEILLE
            </h2>
            <p className="mt-5 font-display text-xl italic text-gold-light">
              {team ? `Équipe ${team}, ` : ""}les chaînes invisibles sont tombées.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
