"use client";

import Reveal from "./Reveal";
import { SectionLabel } from "./Decor";

const steps = [
  {
    phase: "Phase 1",
    title: "Écriture & identité",
    text: "Scénario mot à mot, charte visuelle, premiers visuels imprimables. Le socle du projet.",
    done: true,
  },
  {
    phase: "Phase 2",
    title: "Le teaser",
    text: "Tournage des fragments, montage, étalonnage. Objectif immédiat : produire et valider le teaser — la première pièce filmée, preuve du concept.",
    done: false,
  },
  {
    phase: "Phase 3",
    title: "Décor & accessoires",
    text: "Construction du sitar, des cartes, des parchemins, de la balance. La cité prend forme.",
    done: false,
  },
  {
    phase: "Phase 4",
    title: "Tournage complet",
    text: "Filmer tous les blocs, sous plusieurs angles, avec un son soigné et une lumière progressive.",
    done: false,
  },
  {
    phase: "Phase 5",
    title: "Montage final",
    text: "Assemblage, sous-titres, récitation en direct, musique — l'œuvre achevée.",
    done: false,
  },
];

export default function Vision() {
  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-transparent via-night-900/40 to-transparent">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <Reveal>
            <SectionLabel>La vision</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-cream mt-6">
              Une année pour bâtir
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-cream/50 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
              Ce que vous voyez n'est que le commencement. Voici le chemin
              jusqu'à l'œuvre finale.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* Ligne verticale */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent md:-translate-x-px" />

          <div className="space-y-10">
            {steps.map((s, i) => (
              <Reveal key={s.phase} delay={i * 0.1}>
                <div
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Point */}
                  <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                        s.done
                          ? "border-sacred-light bg-sacred/20"
                          : "border-gold/40 bg-night-800"
                      }`}
                    >
                      {s.done ? (
                        <span className="text-sacred-glow text-lg">✓</span>
                      ) : (
                        <span className="text-gold/60 text-sm">{i + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* Carte */}
                  <div className={`md:w-[45%] ${i % 2 === 0 ? "md:pr-0" : "md:pl-0"}`}>
                    <div className="rounded-2xl border border-white/10 bg-night-800/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-gold/30">
                      <div
                        className={`text-xs tracking-[0.2em] uppercase mb-2 ${
                          s.done ? "text-sacred-light" : "text-gold/70"
                        }`}
                      >
                        {s.phase}
                        {s.done && " · Fait"}
                      </div>
                      <h3 className="font-display text-2xl font-semibold text-cream mb-2">
                        {s.title}
                      </h3>
                      <p className="text-cream/55 leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
