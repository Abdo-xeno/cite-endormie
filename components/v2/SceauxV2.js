"use client";

import Reveal from "../Reveal";
import { SectionLabel } from "../Decor";
import SceauMotsV2 from "./SceauMotsV2";
import SceauBalance from "../SceauBalance";
import SceauParole from "../SceauParole";

/**
 * Les trois Sceaux JOUABLES (v2). Sceau I rechargé avec les vraies étymologies ;
 * Balance et Parole réutilisés tels quels. id="sceaux" pour l'ancre du Hero.
 */
export default function SceauxV2() {
  return (
    <section id="sceaux" className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Reveal>
            <SectionLabel>L'épreuve</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold text-cream md:text-6xl">
              Trois Sceaux à briser
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/55">
              Trois sceaux, trois faces d'une même responsabilité : le sens des
              mots, l'équilibre des charges, la Parole révélée.
              <br />
              <span className="text-gold-light/90">
                Le Sage vous guide, le Tyran vous observe — à vous de jouer.
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal>
          <SceauMotsV2 />
        </Reveal>

        <div className="mt-10">
          <Reveal>
            <SceauBalance />
          </Reveal>
        </div>

        <div className="mt-10">
          <Reveal>
            <SceauParole />
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-16 text-center">
            <p className="font-display text-xl italic text-gold-light/90 md:text-2xl">
              Quand les trois Sceaux cèdent, les chaînes tombent.
              <br />
              Le voile s'effondre. La cité se réveille.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
