"use client";

import Reveal from "../Reveal";
import { SectionLabel, Ornament } from "../Decor";

/**
 * LA RÉPONSE (v2). Les 3 versets vivent désormais UNIQUEMENT dans le Sceau III
 * (où on les joue) — ici on ne les répète pas : on délivre la réponse directe
 * à la problématique, le hadith « Kullukum râ'in », repris verbatim.
 */
export default function SpiritualV2() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-transparent via-sacred/5 to-transparent px-6 py-32">
      {/* Lanternes qui veillent dans le noir */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.16]"
          style={{ backgroundImage: "url(/lanterns.jpg)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 38%, rgba(123,160,91,0.14), transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-night-deep/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <Reveal>
            <SectionLabel>La réponse</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold text-cream md:text-6xl">
              À qui revient la responsabilité&nbsp;?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/55">
              Les versets, vous les avez rendus à leur engagement dans le dernier
              Sceau. Reste la réponse — celle que le Messager d'Allah&nbsp;ﷺ a
              donnée à la question même de cet escape game.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="relative rounded-3xl border-2 border-gold/30 bg-gradient-to-b from-gold/10 to-transparent p-10 text-center box-glow-gold md:p-14">
            <div className="absolute left-1/2 top-6 -translate-x-1/2 text-3xl text-gold/40">
              ❖
            </div>
            <p className="arabic mb-6 mt-4 text-3xl leading-loose text-gold text-glow-gold md:text-5xl">
              كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْؤُولٌ عَنْ رَعِيَّتِهِ
            </p>
            <p className="mb-2 font-display text-2xl italic text-cream md:text-3xl">
              «&nbsp;Chacun de vous est un berger, et chacun de vous est
              responsable de son troupeau.&nbsp;»
            </p>
            <p className="mt-5 text-sm tracking-wide text-gold/70">
              Rapporté par al-Bukhari et Muslim
            </p>
            <p className="mt-8 font-display text-xl text-gold-light">
              À tous. Au gouvernant comme au gouverné.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <Ornament className="mt-14" />
        </Reveal>
        <Reveal delay={0.4}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl italic text-sacred-glow md:text-2xl">
            Voilà pourquoi une cité ne se réveille jamais seule.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
