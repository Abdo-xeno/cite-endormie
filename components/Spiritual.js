"use client";

import Reveal from "./Reveal";
import { SectionLabel, Ornament } from "./Decor";

const versets = [
  {
    arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
    french: "Et leurs affaires se règlent par consultation entre eux.",
    ref: "Sourate Ash-Shoura, 42:38",
    theme: "La consultation",
  },
  {
    arabic: "يَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ",
    french: "Ils ordonnent le convenable et interdisent le blâmable.",
    ref: "Sourate Âl-'Imrân, 3:104",
    theme: "Ordonner le bien",
  },
  {
    arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
    french:
      "Allah ne change rien chez un peuple tant qu'ils ne changent pas ce qui est en eux-mêmes.",
    ref: "Sourate Ar-Ra'd, 13:11",
    theme: "Le changement commence par soi",
  },
];

export default function Spiritual() {
  return (
    <section className="relative overflow-hidden py-32 px-6 bg-gradient-to-b from-transparent via-sacred/5 to-transparent">
      {/* Des lanternes qui veillent dans le noir — « la Parole qui éclaire » */}
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
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <Reveal>
            <SectionLabel>L'ancrage</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-cream mt-6">
              La Parole qui éclaire
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-cream/50 max-w-2xl mx-auto mt-6 text-lg leading-relaxed">
              La clé finale n'est ni un savoir, ni une logique. C'est la Parole
              d'Allah&nbsp;ﷻ et de Son Messager&nbsp;ﷺ.
            </p>
          </Reveal>
        </div>

        {/* Versets */}
        <div className="space-y-6">
          {versets.map((v, i) => (
            <Reveal key={v.ref} delay={i * 0.12}>
              <div className="rounded-2xl border border-sacred/25 bg-sacred/5 p-8 md:p-10 text-center backdrop-blur-sm">
                <div className="text-sacred-light text-xs tracking-[0.25em] uppercase mb-5">
                  {v.theme}
                </div>
                <p className="arabic text-3xl md:text-4xl text-sacred-glow leading-loose mb-5 text-glow-green">
                  {v.arabic}
                </p>
                <p className="font-display italic text-xl text-cream/85">
                  «&nbsp;{v.french}&nbsp;»
                </p>
                <p className="text-gold/70 text-sm mt-4 tracking-wide">{v.ref}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <Ornament className="my-16" />
        </Reveal>

        {/* La réponse - le hadith */}
        <Reveal delay={0.1}>
          <div className="text-center mb-8">
            <SectionLabel>La réponse</SectionLabel>
            <p className="text-cream/60 mt-6 text-lg max-w-2xl mx-auto">
              À qui revient la responsabilité&nbsp;? Le Messager d'Allah&nbsp;ﷺ
              a tranché la question même que pose cet escape game.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative rounded-3xl border-2 border-gold/30 bg-gradient-to-b from-gold/10 to-transparent p-10 md:p-14 text-center box-glow-gold">
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-gold/40 text-3xl">
              ❖
            </div>
            <p className="arabic text-3xl md:text-5xl text-gold leading-loose mb-6 mt-4 text-glow-gold">
              كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْؤُولٌ عَنْ رَعِيَّتِهِ
            </p>
            <p className="font-display text-2xl md:text-3xl text-cream italic mb-2">
              «&nbsp;Chacun de vous est un berger, et chacun de vous est
              responsable de son troupeau.&nbsp;»
            </p>
            <p className="text-gold/70 text-sm mt-5 tracking-wide">
              Rapporté par al-Bukhari et Muslim
            </p>
            <p className="font-display text-xl text-gold-light mt-8">
              À tous. Au gouvernant comme au gouverné.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
