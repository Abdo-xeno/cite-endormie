"use client";

import Reveal from "./Reveal";
import { SectionLabel, Ornament } from "./Decor";

const beats = [
  {
    icon: "🌙",
    title: "La cité dort",
    text: "Aucune chaîne, aucun barreau. Les habitants sont simplement allongés, un rectangle de lumière à la main. Casques sur les oreilles, écrans qui défilent. Ils croient être éveillés.",
  },
  {
    icon: "👤",
    title: "Le tyran agit",
    text: "Entre eux, un homme marche. Il prend une bourse, trahit une promesse, ment — devant eux, à la lumière de leurs propres écrans. Et personne ne lève les yeux.",
  },
  {
    icon: "🕯️",
    title: "Un seul s'éveille",
    text: "Une main s'arrête de défiler. Un casque tombe. Pour la première fois, quelqu'un voit. Et il appelle à l'aide pour réveiller les autres : trois Sceaux scellent leur sommeil.",
  },
];

export default function Concept() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-night-900/40 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <Reveal>
            <SectionLabel>La métaphore</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-cream mt-6">
              Une fable pour aujourd'hui
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-cream/50 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
              Le tyran moderne n'a pas besoin de chaînes. Il lui suffit que vous
              regardiez ailleurs.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {beats.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.15}>
              <div className="group h-full rounded-2xl border border-gold/15 bg-night-800/40 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 hover:bg-night-800/60">
                <div className="text-4xl mb-5 opacity-80">{b.icon}</div>
                <div className="text-gold/60 text-sm tracking-widest mb-2">
                  0{i + 1}
                </div>
                <h3 className="font-display text-2xl font-semibold text-cream mb-3">
                  {b.title}
                </h3>
                <p className="text-cream/55 leading-relaxed">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <Ornament className="mt-20" />
        </Reveal>

        <Reveal delay={0.4}>
          <p className="text-center font-display italic text-xl md:text-2xl text-gold-light/90 max-w-3xl mx-auto mt-12 leading-relaxed">
            Le voile qui sépare le tyran de son peuple n'est plus un rideau.
            <br />
            C'est un écran.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
