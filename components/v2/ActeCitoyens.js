"use client";

import Reveal from "../Reveal";
import { SectionLabel, Ornament } from "../Decor";
import { PullQuote, Cite, Sacred } from "./Cite";
import { Graine } from "./Emblems";

/**
 * ACTE II — LES CITOYENS (la responsabilité qui précède).
 * Refus du fatalisme + la fitra + l'éducation. Le hadith est rendu en vert
 * (composant Sacred). Citations verbatim, avec n° de page.
 */
export default function ActeCitoyens() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 50% at 50% 20%, rgba(212,175,55,0.07), transparent 72%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <Reveal>
            <Graine className="mx-auto mb-6" />
          </Reveal>
          <Reveal>
            <SectionLabel>Acte II · Les citoyens</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold text-cream md:text-6xl">
              Le réveil commence au berceau
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/55">
              Si Abdessalam Yassine refuse le fatalisme. Les peuples ne sont pas
              des victimes passives de l'histoire — attendre, c'est déjà
              consentir.
            </p>
          </Reveal>
        </div>

        <PullQuote page="p.116">
          Il faut comprendre et agir&nbsp;! Il ne faut pas rêver que votre
          agresseur tombera de lui-même, terrassé par quelque magie invisible.
        </PullQuote>

        <div className="mt-16">
          <Sacred source="Hadith rapporté par al-Bukhari">
            Tout nouveau-né vient au monde doté d'un sens originel (fitra). Ce
            sont son père et sa mère qui en font, par leur influence éducative, un
            juif, un chrétien ou un mazdéen.
          </Sacred>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Cite label="La main de l'amour" page="p.184">
              Il faudra beaucoup de douceur et d'amour, mais la main de l'amour
              tendue sera ferme et résolue.
            </Cite>
          </Reveal>
          <Reveal delay={0.15}>
            <Cite label="La famille, la mère" page="p.188">
              La protection de l'enfant va de pair avec celle de la famille, et la
              famille, c'est avant tout la mère.
            </Cite>
          </Reveal>
          <Reveal delay={0.2}>
            <Cite label="Le citoyen déresponsabilisé" page="p.203">
              L'auteur oppose les droits individuels aux devoirs collectifs,
              l'égoïsme à l'abnégation, la facilité à la discipline, le désir
              assouvi au sacrifice du don.
            </Cite>
          </Reveal>
          <Reveal delay={0.3}>
            <Cite label="Une crise spirituelle" page="p.210">
              Il y a de la jahilia partout où l'homme ignore ce pourquoi il
              existe, où les sociétés se gouvernent mal, où ce sont les impulsions
              instinctuelles violentes qui règlent les différends et non l'esprit
              d'équité.
            </Cite>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <Ornament className="mt-16" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl italic text-cream/70 md:text-2xl">
            La responsabilité du citoyen ne commence pas aux urnes, mais dans la
            famille, l'école et le voisinage — et chaque jour, par sa main, son
            temps, son argent.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
