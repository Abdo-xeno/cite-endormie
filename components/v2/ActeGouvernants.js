"use client";

import Reveal from "../Reveal";
import { SectionLabel, Ornament } from "../Decor";
import { PullQuote, Cite } from "./Cite";
import { Gouvernail } from "./Emblems";

/**
 * ACTE I — LES GOUVERNANTS (responsabilité structurelle).
 * « La boussole » : l'état d'une société dépend d'abord de la main qui tient
 * le gouvernail. Citations Yassine verbatim, avec n° de page.
 */
export default function ActeGouvernants() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      {/* halo froid, autoritaire */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 18%, rgba(160,24,24,0.08), transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <Reveal>
            <Gouvernail className="mx-auto mb-6" />
          </Reveal>
          <Reveal>
            <SectionLabel>Acte I · Les gouvernants</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold text-cream md:text-6xl">
              La boussole
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/55">
              Un mauvais gouvernement ne produit pas que de mauvaises décisions.
              Il produit une société abîmée, des citoyens démoralisés, une
              confiance trahie.
            </p>
          </Reveal>
        </div>

        <PullQuote page="p.236">
          Il n'y a aucun espoir de développement, aucun espoir d'avenir, tant que
          les hommes tenant le gouvernail n'ont de boussole que leurs caprices.
        </PullQuote>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <Reveal delay={0.05}>
            <Cite label="La justice d'abord" page="p.250">
              La justice et le droit garanti de chacun sont les deux conditions de
              stabilité sociale dans un État de droit.
            </Cite>
          </Reveal>
          <Reveal delay={0.15}>
            <Cite label="La complicité" page="p.257">
              …nous serons les victimes&nbsp;; pire encore, les complices de notre
              propre meurtre.
            </Cite>
          </Reveal>
          <Reveal delay={0.25}>
            <Cite label="Le pouvoir & la Loi" page="p.311">
              Dans la sourate ach-Choura, le politique est indissociable du
              social, et celui-ci fait partie intégrante du religieux.
            </Cite>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mx-auto mt-14 max-w-3xl rounded-2xl border border-gold/25 bg-gold/[0.06] p-8 text-center">
            <p className="font-display text-xl italic text-gold-light md:text-2xl">
              «&nbsp;Choura est le nom de notre démocratie.&nbsp;»
            </p>
            <p className="mt-3 text-xs tracking-wide text-gold/60">
              — Si Abdessalam Yassine · p.309 — la démocratie n'est pas l'ennemie,
              elle est à réformer, non à copier.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <Ornament className="mt-16" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl italic text-cream/70 md:text-2xl">
            Le gouvernant ne règne pas&nbsp;: il rend des comptes — à son peuple,
            et à Dieu.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
