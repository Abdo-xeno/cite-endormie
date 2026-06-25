"use client";

import Reveal from "./Reveal";
import { SectionLabel, Ornament } from "./Decor";
import { useTeam } from "./TeamProvider";
import Tilt from "./Tilt";

// Personnages de l'escape game (contenu narratif éditable).
const cast = [
  {
    name: "Le Tyran",
    role: "Le voleur de la cité",
    glyph: "♛",
    color: "#c0392b",
    text: "Ni chaînes ni armes. Il a compris qu'un peuple qui regarde ailleurs finit par se voler lui-même.",
  },
  {
    name: "Le Compagnon",
    role: "L'ombre du Tyran",
    glyph: "☾",
    color: "#8a93a0",
    text: "La voix qui souffle les mensonges à l'oreille de la cité et berce les derniers éveillés.",
  },
  {
    name: "L'Éveillé",
    role: "Celui qui a vu",
    glyph: "◉",
    color: "#e6c860",
    text: "Le seul dont le pouce s'est arrêté de défiler. Il voit ce que nul ne voit — et il vous appelle.",
  },
  {
    name: "Le Sage",
    role: "Gardien de la Parole",
    glyph: "❖",
    color: "#7ba05b",
    text: "Il ne donne jamais la réponse : il rallume la lumière qui permet de la trouver. Il vous guidera.",
  },
];

function Portrait({ glyph, color }) {
  return (
    <div className="relative mb-5 flex h-20 w-20 items-center justify-center">
      <div
        className="absolute inset-0 rounded-full blur-xl animate-breathe"
        style={{ background: color, opacity: 0.35 }}
      />
      <div
        className="relative flex h-20 w-20 rotate-45 items-center justify-center rounded-2xl border-2"
        style={{ borderColor: `${color}88`, background: `${color}14` }}
      >
        <span
          className="-rotate-45 text-4xl"
          style={{ color, textShadow: `0 0 18px ${color}` }}
        >
          {glyph}
        </span>
      </div>
    </div>
  );
}

export default function Personnages() {
  const { team } = useTeam();

  return (
    <section className="relative overflow-hidden px-6 py-32">
      {/* La voûte étoilée derrière les âmes de la cité */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.22]"
          style={{ backgroundImage: "url(/cosmos.jpg)" }}
        />
        <div className="absolute inset-0 bg-night-deep/65" />
      </div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <Reveal>
            <SectionLabel>Les âmes de la cité</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold text-cream md:text-6xl">
              Qui peuple la cité
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/55">
              Quatre destins se croisent dans la nuit de la cité. Le cinquième,
              c'est le vôtre.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cast.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.12}>
              <Tilt className="h-full rounded-3xl" max={10}>
                <div
                  className="group relative h-full overflow-hidden rounded-3xl border bg-night-800/40 p-7 text-center backdrop-blur-sm transition-colors duration-500"
                  style={{ borderColor: `${c.color}33` }}
                >
                  <div
                    className="pointer-events-none absolute -top-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                    style={{ background: c.color }}
                  />
                  <div className="relative flex flex-col items-center">
                    <Portrait glyph={c.glyph} color={c.color} />
                    <div
                      className="mb-1 text-[11px] uppercase tracking-[0.25em]"
                      style={{ color: c.color }}
                    >
                      {c.role}
                    </div>
                    <h3 className="mb-3 font-display text-2xl font-bold text-cream">
                      {c.name}
                    </h3>
                    <p className="text-sm leading-relaxed text-cream/60">
                      {c.text}
                    </p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>

        {/* Le cinquième destin : l'équipe */}
        <Reveal delay={0.2}>
          <Tilt className="mt-6 rounded-3xl" max={5}>
            <div className="relative overflow-hidden rounded-3xl border-2 border-gold/40 bg-gradient-to-r from-gold/10 via-gold/5 to-transparent p-8 text-center md:p-10 box-glow-gold">
              <div className="absolute left-1/2 top-1/2 z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl animate-breathe" />
              <div className="relative">
                <Ornament className="mb-5" />
                <div className="mb-2 text-[11px] uppercase tracking-[0.3em] text-gold/80">
                  Convoqués par l'Éveillé
                </div>
                <h3 className="font-display text-3xl font-bold text-cream md:text-4xl">
                  {team ? (
                    <>
                      Équipe{" "}
                      <span className="text-gold text-glow-gold">{team}</span>
                    </>
                  ) : (
                    "Vous, les joueurs"
                  )}
                </h3>
                <p className="mx-auto mt-4 max-w-2xl text-cream/65">
                  C'est à vous de briser les trois sceaux et de rendre la cité à
                  la lumière. Le Sage murmure&nbsp;; le Tyran veille. Le temps
                  presse.
                </p>
              </div>
            </div>
          </Tilt>
        </Reveal>
      </div>
    </section>
  );
}
