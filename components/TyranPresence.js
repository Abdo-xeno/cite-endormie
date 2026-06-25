"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Le Tyran veille. Présence ambiante d'antagoniste : une lueur rouge discrète
 * sur les bords (qui culmine au milieu du voyage, s'efface à l'aube) et une
 * ombre qui traverse lentement. Pas d'œil — une menace qu'on sent plus qu'on
 * ne voit.
 */
export default function TyranPresence() {
  const { scrollYProgress } = useScroll();
  const grip = useTransform(scrollYProgress, [0.22, 0.5, 0.8], [0, 1, 0]);
  const edge = useTransform(grip, (v) => v * 0.6);

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
      {/* Emprise rouge sur les bords */}
      <motion.div style={{ opacity: edge }} className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 95% at 50% 50%, transparent 58%, rgba(140,18,18,0.22) 100%)",
          }}
        />
      </motion.div>

      {/* Ombre qui traverse (le Tyran qui marche) */}
      <motion.div
        className="absolute top-[42%] h-80 w-44"
        animate={{ x: ["-25vw", "125vw"] }}
        transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
