"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { SectionLabel, Ornament } from "./Decor";
import Tilt from "./Tilt";

export default function Problematic() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <SectionLabel>La question</SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-cream/60 text-lg md:text-xl mt-10 leading-relaxed">
            Vous avez un téléphone dans la poche, en ce moment même.
            <br className="hidden md:block" />
            Depuis combien de temps dormez-vous&nbsp;?
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <Ornament className="my-12" />
        </Reveal>

        <Reveal delay={0.3}>
          <Tilt className="rounded-2xl" max={5}>
          <blockquote className="relative">
            <span className="absolute -top-8 -left-2 text-7xl text-gold/20 font-display">«</span>
            <p className="font-display text-2xl md:text-4xl text-cream leading-snug px-6">
              De qui commence, et à qui revient, la responsabilité du bon
              fonctionnement d'une société&nbsp;—{" "}
              <span className="text-gold italic">aux gouvernants</span> ou{" "}
              <span className="text-gold italic">aux citoyens</span>&nbsp;?
            </p>
            <span className="absolute -bottom-12 -right-2 text-7xl text-gold/20 font-display">»</span>
          </blockquote>
          </Tilt>
        </Reveal>

        <Reveal delay={0.5}>
          <motion.p className="text-cream/40 italic mt-16 text-lg">
            Notre escape game ne répond pas par un cours.
            <br />
            Il répond par une expérience.
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}
