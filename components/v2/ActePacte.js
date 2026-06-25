"use client";

import Reveal from "../Reveal";
import { SectionLabel, Ornament } from "../Decor";
import { Cite, Sacred } from "./Cite";
import { Lien } from "./Emblems";

/**
 * ACTE III — LE PACTE (la responsabilité indivisible).
 * Ni « les gouvernants d'abord », ni « les citoyens d'abord » : les deux,
 * simultanément, dans un pacte. Le hadith du corps organique en ouverture.
 */
export default function ActePacte() {
  return (
    <section className="relative overflow-hidden px-6 py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 30%, rgba(123,160,91,0.08), transparent 72%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <Reveal>
            <Lien className="mx-auto mb-6" />
          </Reveal>
          <Reveal>
            <SectionLabel>Acte III · Le pacte</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold text-cream md:text-6xl">
              Un corps, une seule fièvre
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/55">
              La vraie réponse n'est ni « les gouvernants d'abord », ni « les
              citoyens d'abord ». C'est les deux — simultanément — dans un pacte
              mutuel devant Dieu et devant l'histoire.
            </p>
          </Reveal>
        </div>

        <Sacred source="Hadith — la communauté des croyants">
          La communauté des fidèles ressemble à un corps organique&nbsp;: la
          moindre souffrance ressentie par un membre de ce corps frappe le corps
          entier de fièvre et d'insomnie.
        </Sacred>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal delay={0.05}>
            <Cite label="Humblement, patiemment" page="p.177">
              Il faut commencer par humblement s'atteler à la tâche de former et
              de réformer. Il faut patiemment éduquer et informer. On ne doit
              surtout pas espérer changer en un tour de main les mentalités et les
              attitudes des gens.
            </Cite>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-sacred/20 bg-sacred/[0.05] p-7">
              <p className="font-display text-lg leading-relaxed text-cream/80 md:text-xl">
                Il n'attend pas que les institutions soient parfaites pour que les
                citoyens agissent. Il n'attend pas que les citoyens soient
                parfaits pour que les institutions fonctionnent.
              </p>
              <p className="mt-4 font-display text-lg italic text-sacred-glow">
                Le changement se fait à tous les niveaux, en même temps — et il
                commence en soi.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <Ornament className="mt-16" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl italic text-gold-light/90 md:text-2xl">
            Le corps ne guérit pas membre par membre : il guérit ensemble — ou
            pas du tout.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
