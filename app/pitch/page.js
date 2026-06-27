import Link from "next/link";

export const metadata = {
  title: "Pitch — La Cité Endormie",
  robots: { index: false, follow: false },
};

const G = ({ children }) => <span className="text-gold">{children}</span>;

export default function PitchPage() {
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-cream/80"
      >
        ← Retour à la cité
      </Link>

      {/* En-tête */}
      <div className="mb-12 mt-8 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-gold/70">
          Note de présentation
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-cream text-glow-gold md:text-6xl">
          Le Pitch
        </h1>
        <p className="mt-3 font-display text-lg italic text-cream/50">
          La Cité Endormie — escape game pédagogique
        </p>
        <p className="mt-2 text-xs text-cream/30">
          (pour le présentateur — non destiné au jury)
        </p>
      </div>

      {/* Punchline */}
      <div className="mb-10 rounded-2xl border border-gold/25 bg-gold/[0.06] p-7 text-center">
        <p className="font-display text-2xl italic text-gold-light md:text-3xl">
          « Une cité dort. Un tyran en profite. Et vous seuls pouvez la
          réveiller. »
        </p>
      </div>

      {/* Pitch complet */}
      <article className="rounded-2xl border border-white/10 bg-night-900/60 p-7 backdrop-blur-sm md:p-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-2xl font-semibold text-cream">
            Le pitch complet
          </h2>
          <span className="text-xs uppercase tracking-widest text-gold/60">
            ~ 2 min · ton « maître du jeu »
          </span>
        </div>

        <div className="space-y-5 font-display text-lg leading-relaxed text-cream/85">
          <p>Mesdames, messieurs — une seconde, imaginez une cité.</p>
          <p>
            Pas une cité en guerre, pas en ruines. Une cité qui a tout pour
            vivre… et qui dort. Ses habitants ont les yeux ouverts, mais ne
            voient plus : un écran les éblouit. Un casque sur les oreilles, ils
            n'entendent plus l'appel. Et pendant qu'ils regardent ailleurs, un
            homme — <G>le Tyran</G> — les dépouille, en pleine lumière. Personne
            ne lève les yeux.
          </p>
          <p>
            Voilà le décor de notre escape game : <G>La Cité Endormie</G>.
          </p>
          <p>
            Mais derrière le jeu, une vraie question — celle qui tient tout le
            projet :{" "}
            <span className="italic text-gold">
              de qui commence, et à qui revient, la responsabilité du bon
              fonctionnement d'une société — aux gouvernants, ou aux citoyens ?
            </span>
          </p>
          <p>
            Notre parti pris : on ne répond pas par un cours, mais par une
            épreuve. Une équipe — <G>les Gardiens</G> — entre dans la cité pour
            la réveiller. <G>Trois sceaux</G> la maintiennent endormie ; trois
            illusions modernes : le langage vidé de son sens, le spectateur qui
            s'indigne sans jamais agir, et le flot d'informations qui noie la
            Parole. Un <G>Sage</G> vous guide ; le Tyran vous observe. Pour
            briser un sceau, il ne suffit pas d'être malin — il faut comprendre,
            puis s'engager.
          </p>
          <p>
            Quand les trois sceaux cèdent, la cité s'éveille. Et la réponse n'est
            ni « les gouvernants seuls », ni « les citoyens seuls ». Comme l'a
            tranché le Messager&nbsp;ﷺ :{" "}
            <span className="italic text-gold-light">
              « Chacun de vous est un berger, et chacun est responsable de son
              troupeau. »
            </span>{" "}
            La responsabilité se co-construit — et elle commence par la
            transformation de soi.
          </p>
          <p>
            Ce que vous voyez aujourd'hui, c'est le <G>Chapitre I</G> : la
            maquette jouable du projet. L'escape game complet — décor, tournage,
            mise en scène — se bâtira sur l'année.
          </p>
          <p>
            Et il ne s'arrête pas à une cité. Car à la fin, la question n'est
            plus pour les habitants du jeu. Elle est pour chacun de nous :{" "}
            <span className="font-bold text-gold text-glow-gold">
              réveillerez-vous le monde ?
            </span>
          </p>
        </div>
      </article>

      {/* Version courte */}
      <div className="mt-8 rounded-2xl border border-white/10 bg-night-800/40 p-7">
        <h2 className="mb-3 font-display text-xl font-semibold text-cream">
          Version courte <span className="text-cream/40">· ~ 30 s</span>
        </h2>
        <p className="font-display italic leading-relaxed text-cream/70">
          « La Cité Endormie, c'est un escape game pédagogique : une cité qui
          dort pendant qu'un tyran la dépouille. La question — à qui revient la
          responsabilité d'une société, aux gouvernants ou aux citoyens ? Pour y
          répondre, une équipe brise trois sceaux, trois illusions modernes,
          guidée par un Sage. La réponse : chacun est berger et responsable de
          son troupeau — la responsabilité se partage, et commence par soi. Ce
          que vous voyez est le Chapitre I, jouable ; le jeu complet arrive.
          Réveillerez-vous le monde ? »
        </p>
      </div>

      {/* Comment présenter */}
      <div className="mt-8 rounded-2xl border border-sacred/20 bg-sacred/[0.05] p-7">
        <h2 className="mb-3 font-display text-xl font-semibold text-cream">
          Comment le présenter
        </h2>
        <p className="leading-relaxed text-cream/70">
          Le pitch suit <span className="text-cream">l'ordre du scroll</span>.
          Parle en descendant la page : accroche (l'accueil) → la question → la
          fable → les personnages → les sceaux → la réponse (le hadith) → puis
          finis sur la <span className="text-cream">bande-annonce</span> que tu
          lances en direct. Le site devient ton support — pas tes notes.
        </p>
      </div>

      <p className="mt-12 text-center text-sm text-gold/40">❖</p>
      <p className="mt-1 text-center text-xs uppercase tracking-[0.3em] text-cream/25">
        La Cité Endormie · Chapitre I
      </p>
    </main>
  );
}
