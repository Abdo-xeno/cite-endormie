"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { SectionLabel } from "./Decor";
import CityScene from "./CityScene";
import TeaserCinematic from "./TeaserCinematic";

export default function Teaser() {
  const [open, setOpen] = useState(false);

  return (
    <section id="teaser" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <SectionLabel>Le teaser</SectionLabel>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mb-12 mt-6 font-display text-4xl font-bold text-cream md:text-5xl">
            Ressentez-le
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          {/* Affiche animée — clic = séquence cinématique plein écran */}
          <button
            onClick={() => setOpen(true)}
            className="no-tap-highlight group relative block aspect-video w-full overflow-hidden rounded-2xl border border-gold/25 bg-night-900/60"
          >
            {/* Cité en fond */}
            <div className="absolute inset-x-0 bottom-0 h-full opacity-90">
              <CityScene className="h-full w-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/40 to-transparent" />
            </div>
            <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl transition-all duration-700 group-hover:bg-gold/20" />

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.12 }}
                className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/60 bg-night-800/60 backdrop-blur-sm transition-colors duration-500 group-hover:border-gold"
                style={{ boxShadow: "0 0 30px rgba(212,175,55,0.25)" }}
              >
                <div className="ml-2 h-0 w-0 border-y-[12px] border-l-[20px] border-y-transparent border-l-gold" />
              </motion.div>
              <p className="mt-6 text-sm uppercase tracking-[0.3em] text-cream/70">
                Lancer la séquence
              </p>
              <p className="mt-2 text-xs text-cream/40">
                ~ 25 s · cinématique d'ouverture
              </p>
            </div>
          </button>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-10 text-lg italic leading-relaxed text-cream/45">
            Un écran qui brille dans le noir. Un pouce qui s'arrête.
            <br />
            Un casque qui tombe. Une cité qui se réveille.
          </p>
        </Reveal>
      </div>

      <TeaserCinematic open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
