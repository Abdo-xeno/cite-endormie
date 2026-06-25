"use client";

import { motion } from "framer-motion";
import Reveal from "../Reveal";
import { SectionLabel, Ornament } from "../Decor";
import Tilt from "../Tilt";

export default function ProblematicV2() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <SectionLabel>La question</SectionLabel>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 text-lg leading-relaxed text-cream/60 md:text-xl">
            Une société n'est pas une foule sur un territoire&nbsp;: c'est un
            corps vivant.
            <br className="hidden md:block" />
            Elle «&nbsp;fonctionne&nbsp;» tant qu'elle garantit à chacun la
            justice, la sécurité et la dignité.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <Ornament className="my-12" />
        </Reveal>

        <Reveal delay={0.3}>
          <Tilt className="rounded-2xl" max={5}>
            <blockquote className="relative">
              <span className="absolute -left-2 -top-8 font-display text-7xl text-gold/20">
                «
              </span>
              <p className="px-6 font-display text-2xl leading-snug text-cream md:text-4xl">
                De qui commence, et à qui revient, la responsabilité du bon
                fonctionnement d'une société&nbsp;—{" "}
                <span className="italic text-gold">aux gouvernants</span> ou{" "}
                <span className="italic text-gold">aux citoyens</span>&nbsp;?
              </p>
              <span className="absolute -bottom-12 -right-2 font-display text-7xl text-gold/20">
                »
              </span>
            </blockquote>
          </Tilt>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mx-auto mt-16 max-w-2xl leading-relaxed text-cream/55">
            Si Abdessalam Yassine refuse de choisir un camp. Sa réponse est plus
            exigeante&nbsp;: la responsabilité est{" "}
            <span className="text-cream/80">individuelle et collective</span>,{" "}
            <span className="text-cream/80">spirituelle et politique</span>. Mais
            elle a un point de départ.
          </p>
        </Reveal>

        <Reveal delay={0.65}>
          <motion.p className="mt-10 font-display text-xl italic text-gold-light/90 md:text-2xl">
            Qui doit agir en premier&nbsp;? Qui est le moteur — qui est le
            frein&nbsp;?
          </motion.p>
        </Reveal>

        <Reveal delay={0.8}>
          <p className="mt-12 text-lg italic text-cream/40">
            Notre escape game ne répond pas par un cours.
            <br />
            Il répond par une expérience.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
