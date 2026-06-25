"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { SectionLabel } from "./Decor";
import { useTeam } from "./TeamProvider";
import { useSeals } from "./SealsProvider";

/**
 * L'épilogue du Sage — le cliffhanger. Réveiller la cité n'était que la
 * première épreuve. Au-delà des murs, un monde entier dort encore.
 */
export default function EpilogueSage() {
  const { team } = useTeam();
  const { litCount } = useSeals();
  const allBroken = litCount >= 3;

  return (
    <section className="relative overflow-hidden px-6 py-36">
      {/* Lueur du Sage + braises qui montent */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sacred/10 blur-[130px]" />
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute bottom-0 h-1 w-1 rounded-full bg-sacred-light/60"
          style={{ left: `${8 + i * 9}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -360 - (i % 4) * 50, opacity: [0, 1, 0] }}
          transition={{
            duration: 6 + (i % 4),
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Le Sage */}
        <Reveal>
          <div className="mb-10 flex justify-center">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-sacred-light/30 blur-2xl animate-breathe" />
              <div className="relative flex h-24 w-24 rotate-45 items-center justify-center rounded-2xl border-2 border-sacred-light/60 bg-sacred/10">
                <span
                  className="-rotate-45 text-5xl text-sacred-glow"
                  style={{ textShadow: "0 0 22px rgba(123,160,91,0.8)" }}
                >
                  ❖
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SectionLabel>Le Sage s'avance</SectionLabel>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 font-display text-2xl italic leading-relaxed text-cream/85 md:text-3xl">
            {team ? (
              <>
                «&nbsp;Équipe <span className="text-gold">{team}</span>…
              </>
            ) : (
              "« Vous…"
            )}
            <br />
            ceci n'est que le commencement.&nbsp;»
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-cream/60">
            {allBroken
              ? "Les trois sceaux ont cédé entre vos mains — la preuve est faite : vous en êtes capables. "
              : "Vous avez goûté à la première épreuve. "}
            Mais cette cité n'est qu'une parmi mille. Au-delà de ses murs, d'autres
            dorment encore&nbsp;: des foules, des quartiers, des nations — un monde
            entier assoupi devant sa lumière froide.
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="my-12 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-sacred-light/50" />
            <span className="text-sacred-light/70">❖</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-sacred-light/50" />
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-cream/45">
            Réveiller une cité n'était que la première épreuve
          </p>
        </Reveal>

        <Reveal delay={0.6}>
          <motion.h2
            className="mt-6 font-display text-4xl font-bold leading-tight text-cream text-glow-gold md:text-6xl"
            animate={{ opacity: [0.85, 1, 0.85] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Réveillerez-vous
            <br />
            <span className="text-gold">le monde&nbsp;?</span>
          </motion.h2>
        </Reveal>

        <Reveal delay={0.7}>
          <p className="mt-12 text-xs uppercase tracking-[0.3em] text-cream/30">
            La Cité Endormie — Chapitre I · à suivre…
          </p>
        </Reveal>
      </div>
    </section>
  );
}
