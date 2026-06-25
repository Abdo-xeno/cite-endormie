"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import CityScene from "./CityScene";
import { useTeam } from "./TeamProvider";
import { useSeals } from "./SealsProvider";

export default function Finale() {
  const { team } = useTeam();
  const { litCount } = useSeals();
  const allBroken = litCount >= 3;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32">
      {/* LA MÊME SCÈNE, à l'aube — la cité réveillée, le soleil levant */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[60%]">
        <CityScene mode="dawn" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl text-center">
        <Reveal>
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-gold/70">
            {allBroken ? "Les trois sceaux ont cédé" : "L'aube"}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl font-bold leading-tight text-cream text-glow-gold md:text-6xl">
            La cité ne dort plus.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/65 md:text-xl">
            Mais au-delà de ses murs, le monde sommeille encore — mille cités
            prises dans le même rêve, mille tyrans tapis derrière mille écrans.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-2xl font-display text-xl italic text-gold-light/90 md:text-2xl">
            {team ? (
              <>
                Équipe <span className="text-gold">{team}</span>, vous avez
                rallumé la première lumière.
              </>
            ) : (
              "Vous avez rallumé la première lumière."
            )}
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <motion.h3
            className="mt-12 font-display text-3xl font-bold text-gold text-glow-gold md:text-5xl"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Le réveil ne fait que commencer.
          </motion.h3>
        </Reveal>

        <Reveal delay={0.6}>
          <div className="mt-20 border-t border-gold/15 pt-10">
            <p className="arabic mb-3 text-2xl text-sacred-glow">
              وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ
            </p>
            <p className="text-sm italic text-cream/40">
              « Et ma réussite ne dépend que d'Allah »
            </p>
            <p className="mt-8 text-xs uppercase tracking-widest text-cream/30">
              La Cité Endormie · Chapitre I
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
