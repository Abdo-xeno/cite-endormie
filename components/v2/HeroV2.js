"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Ornament } from "../Decor";
import CityScene from "../CityScene";
import { useTeam } from "../TeamProvider";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } },
};
const word = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.2, 0.7, 0.2, 1] },
  },
};

export default function HeroV2() {
  const ref = useRef(null);
  const { team } = useTeam();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yScene = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scaleScene = useTransform(scrollYProgress, [0, 1], [1, 1.22]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <motion.div
        style={{ y: yScene, scale: scaleScene }}
        className="absolute inset-x-0 bottom-0 z-0 h-[62%]"
      >
        <CityScene className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep via-night-deep/30 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: yContent, opacity }}
        className="relative z-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.2 }}
          className="arabic mb-8 text-2xl text-gold text-glow-gold md:text-3xl"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>

        <Ornament className="mb-8" />

        <div className="relative">
          <div className="absolute left-1/2 top-1/2 -z-10 h-48 w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[80px] animate-breathe" />
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="relative overflow-hidden font-display text-6xl font-bold leading-none tracking-wide text-cream text-glow-gold md:text-8xl"
          >
            <span className="flex justify-center gap-x-5">
              <motion.span variants={word} className="inline-block">
                LA
              </motion.span>
              <motion.span variants={word} className="inline-block">
                CITÉ
              </motion.span>
            </span>
            <motion.span variants={word} className="mt-2 block">
              ENDORMIE
            </motion.span>
            <span className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="absolute top-0 h-full w-1/4 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-sweep" />
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1.4 }}
          className="mx-auto mt-8 max-w-2xl font-display text-lg italic leading-relaxed text-cream/70 md:text-xl"
        >
          Une cité s'est endormie. En son cœur, un homme prend ce qui n'est pas
          à lui.
          <br />
          Pour qu'elle rouvre les yeux, il faudra plus qu'un éveillé — il faudra
          vous.
        </motion.p>

        {team && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1.2 }}
            className="mt-6 text-sm uppercase tracking-[0.25em] text-cream/60"
          >
            ❖ Équipe <span className="text-gold">{team}</span> · la cité vous
            attend ❖
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#sceaux"
            className="no-tap-highlight group relative overflow-hidden rounded-full border border-gold/50 bg-gold/10 px-8 py-3.5 font-display text-lg tracking-wide text-cream transition-all duration-500 hover:border-gold hover:bg-gold/20"
          >
            <span className="relative z-10 text-glow-gold">
              Descendre dans la cité
            </span>
          </a>
          <a
            href="#teaser"
            className="no-tap-highlight rounded-full border border-white/20 px-8 py-3.5 text-sm uppercase tracking-widest text-cream/60 transition-all duration-500 hover:border-white/40 hover:text-cream"
          >
            Voir le teaser
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 1 }}
        style={{ opacity }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-cream/40">
          Descendez
        </span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-gold/40 pt-2">
          <div className="h-2 w-1 rounded-full bg-gold animate-scroll-thumb" />
        </div>
      </motion.div>
    </section>
  );
}
