"use client";

import Reveal from "../Reveal";
import { SectionLabel, Ornament } from "../Decor";

/**
 * La métaphore (v2) — la fable, élevée et resserrée. On garde l'image centrale
 * (une cité qui dort, un tyran qui agit, un éveillé) mais en TROISIÈME personne,
 * sans culpabiliser le visiteur, et sans marteler le motif de l'écran (dit une
 * seule fois, en chute).
 */
const beats = [
  {
    icon: "🌙",
    title: "La cité dort",
    text: "Aucune chaîne, aucun barreau. Les habitants veillent les yeux ouverts sur des lueurs sans fin, un casque vissé sur les oreilles — et se croient libres.",
  },
  {
    icon: "👤",
    title: "Le tyran agit",
    text: "Entre eux, un homme marche. Il prend une bourse, trahit une promesse, ment — en pleine lumière. Et personne ne lève les yeux.",
  },
  {
    icon: "🕯️",
    title: "L'Éveillé",
    text: "Un pouce s'arrête. Un casque tombe — et la voix de l'Éveillé passe enfin. Il a compris : on ne réveille pas une cité seul, il lui faut une équipe.",
  },
];

export default function ConceptV2() {
  return (
    <section className="relative bg-gradient-to-b from-transparent via-night-900/40 to-transparent px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <Reveal>
            <SectionLabel>La métaphore</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold text-cream md:text-6xl">
              Une fable pour aujourd'hui
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/55">
              Le tyran moderne n'a pas besoin de chaînes. Il lui suffit que chacun
              regarde ailleurs.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {beats.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.15}>
              <div className="group h-full rounded-2xl border border-gold/15 bg-night-800/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:bg-night-800/60">
                <div className="mb-5 text-4xl opacity-80">{b.icon}</div>
                <div className="mb-2 text-sm tracking-widest text-gold/60">
                  0{i + 1}
                </div>
                <h3 className="mb-3 font-display text-2xl font-semibold text-cream">
                  {b.title}
                </h3>
                <p className="leading-relaxed text-cream/55">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <Ornament className="mt-20" />
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mx-auto mt-12 max-w-3xl text-center font-display text-xl italic leading-relaxed text-gold-light/90 md:text-2xl">
            Deux voiles tiennent la cité endormie : l'écran qui empêche de voir,
            le casque qui empêche d'entendre l'appel.
            <br />
            S'éveiller, c'est les ôter — rouvrir les yeux, et tendre l'oreille.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
