"use client";

import { motion } from "framer-motion";

/**
 * Carton de chapitre cinématographique. À l'entrée : fondu DEPUIS le noir +
 * barres « cinémascope » qui s'ouvrent (le cadre se révèle), puis le grand
 * chiffre romain, le titre et la réplique. Un vrai changement de scène.
 */
export default function ActIntro({ num = "I", act = "Acte", title, line }) {
  const vp = { once: true, margin: "-25% 0px" };

  return (
    <section className="relative flex min-h-[68vh] items-center justify-center overflow-hidden px-6 py-28 text-center">
      {/* chiffre romain en filigrane */}
      <motion.div
        initial={{ opacity: 0, scale: 1.3 }}
        whileInView={{ opacity: 0.06, scale: 1 }}
        viewport={vp}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="pointer-events-none absolute z-0 select-none font-display font-bold leading-none text-gold"
        style={{ fontSize: "min(48vw, 40rem)" }}
      >
        {num}
      </motion.div>

      {/* contenu */}
      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-5 text-sm uppercase tracking-[0.5em] text-gold/70"
        >
          {act} {num}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={vp}
          transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          className="mx-auto mb-7 h-px w-28 origin-center bg-gold/60"
          style={{ boxShadow: "0 0 12px rgba(212,175,55,0.6)" }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={vp}
          transition={{ duration: 1, delay: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-display text-5xl font-bold text-cream text-glow-gold md:text-7xl"
        >
          {title}
        </motion.h2>

        {line && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ duration: 1, delay: 1.2 }}
            className="mx-auto mt-7 max-w-xl font-display text-lg italic text-cream/60 md:text-xl"
          >
            {line}
          </motion.p>
        )}
      </div>

      {/* barres cinémascope : le cadre s'ouvre */}
      <motion.div
        initial={{ height: "50%" }}
        whileInView={{ height: "7%" }}
        viewport={vp}
        transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-black"
      />
      <motion.div
        initial={{ height: "50%" }}
        whileInView={{ height: "7%" }}
        viewport={vp}
        transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-black"
      />

      {/* fondu depuis le noir */}
      <motion.div
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 0 }}
        viewport={vp}
        transition={{ duration: 1.3, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 z-30 bg-black"
      />
    </section>
  );
}
