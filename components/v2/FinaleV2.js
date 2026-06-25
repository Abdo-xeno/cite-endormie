"use client";

import { motion } from "framer-motion";
import Reveal from "../Reveal";
import CityScene from "../CityScene";
import { useTeam } from "../TeamProvider";
import { useSeals } from "../SealsProvider";

export default function FinaleV2() {
  const { team } = useTeam();
  const { litCount } = useSeals();
  const allBroken = litCount >= 3;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32">
      {/* La même scène, à l'aube — la cité réveillée */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[60%]">
        <CityScene mode="dawn" className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl text-center">
        <Reveal>
          <p className="mb-5 text-sm uppercase tracking-[0.35em] text-gold/70">
            {allBroken ? "Les trois sceaux ont cédé" : "La réponse"}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl font-bold leading-tight text-cream text-glow-gold md:text-6xl">
            Ni les gouvernants seuls.
            <br />
            Ni les citoyens seuls.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/65 md:text-xl">
            La responsabilité ne se divise pas. Elle se co-construit, se
            co-porte — un pacte devant Dieu et devant l'histoire. Mais si l'on
            doit nommer un point de départ&nbsp;:
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <motion.h3
            className="mt-12 font-display text-3xl font-bold text-gold text-glow-gold md:text-5xl"
            animate={{ opacity: [0.82, 1, 0.82] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            La transformation de soi précède
            <br />
            la transformation du système.
          </motion.h3>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mx-auto mt-10 max-w-2xl font-display text-xl italic text-gold-light/90 md:text-2xl">
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

        <Reveal delay={0.6}>
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-gold/30 bg-gold/[0.06] p-8 box-glow-gold">
            <p className="font-display text-2xl italic text-cream md:text-3xl">
              «&nbsp;La victoire se mérite.&nbsp;»
            </p>
            <p className="mt-3 text-xs tracking-wide text-gold/65">
              — Si Abdessalam Yassine · Islamiser la modernité
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
