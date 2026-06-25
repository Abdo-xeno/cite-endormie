"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../Reveal";
import { SectionLabel, Ornament } from "../Decor";

/**
 * LE LEXIQUE — « Les mots qu'on a oubliés ».
 * Section érudite : les vraies définitions étymologiques (sourcées de la
 * dissertation). Chaque mot est « scellé » ; on clique pour lui rendre son
 * sens — ce qui prépare et justifie le Sceau I « Les Mots Volés ».
 */
const MOTS = [
  {
    mot: "Gouvernance",
    racine: "lat. gubernare · gr. kubernân",
    sens: "« Diriger un navire. » Attestée dès le XIIIᵉ siècle, le mot a voyagé — du droit à la charge de « gouvernante » — jusqu'à désigner, chez les anarchistes, « l'État bourgeois exploiteur ».",
  },
  {
    mot: "Citoyenneté",
    racine: "Athènes · Rome",
    sens: "À Athènes : participer aux décisions, faire les lois de la cité. À Rome : un faisceau de droits et de protections garantis par la loi. Un même mot — un sens qui n'a jamais cessé de se transformer.",
  },
  {
    mot: "Choura",
    racine: "arabe coranique",
    sens: "« Consultation. » Ne rien décider seul de ce qui concerne tous : chercher ensemble à comprendre et appliquer une Loi qu'on ne réécrit pas.",
    source: "« Choura est le nom de notre démocratie » — p.309",
  },
  {
    mot: "Démocratie",
    racine: "gr. dêmos « peuple » + kratos « pouvoir »",
    sens: "Le peuple comme source souveraine de la loi. Non l'ennemie de la choura, mais son miroir : Si Abdessalam Yassine veut la réformer à la lumière de la Révélation, non la copier.",
  },
  {
    mot: "Responsabilité",
    racine: "lat. respondere — « répondre de »",
    sens: "Être tenu pour l'auteur d'une situation — bonne ou mauvaise. En répondre devant les autres, et veiller sur le sort de ceux qu'on a en charge.",
  },
  {
    mot: "Fitra",
    racine: "arabe — la nature originelle",
    sens: "La disposition droite avec laquelle tout enfant vient au monde : un penchant naturel pour le bien et la justice. L'éducation l'éveille… ou l'étouffe.",
  },
];

function MotCard({ data, index }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal delay={index * 0.1}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="no-tap-highlight group relative block h-full w-full overflow-hidden rounded-2xl border border-gold/20 bg-night-900/50 p-7 text-left backdrop-blur-sm transition-all duration-500 hover:border-gold/45"
        style={{
          boxShadow: open ? "0 0 38px rgba(212,175,55,0.14)" : "none",
        }}
      >
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold text-cream md:text-3xl">
            {data.mot}
          </h3>
          <span
            className="shrink-0 text-gold/70 transition-transform duration-500"
            style={{ transform: open ? "rotate(45deg)" : "none" }}
          >
            ✦
          </span>
        </div>
        <div className="mt-1.5 font-body text-sm italic tracking-wide text-gold/60">
          {data.racine}
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="sens"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <p className="mt-4 leading-relaxed text-cream/70">{data.sens}</p>
              {data.source && (
                <p className="mt-3 text-xs tracking-wide text-gold-light/80">
                  {data.source}
                </p>
              )}
            </motion.div>
          ) : (
            <motion.p
              key="invite"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm italic text-cream/30"
            >
              Le sens a été volé — touchez pour le rendre.
            </motion.p>
          )}
        </AnimatePresence>
      </button>
    </Reveal>
  );
}

export default function Lexique() {
  return (
    <section className="relative px-6 py-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <Reveal>
            <SectionLabel>Le lexique</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-4xl font-bold text-cream md:text-6xl">
              Les mots qu'on a oubliés
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-cream/55">
              Avant de juger qui est responsable, il faut redonner leur poids aux
              mots. Le tyran ne vole pas l'or&nbsp;: il vide le langage.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {MOTS.map((m, i) => (
            <MotCard key={m.mot} data={m} index={i} />
          ))}
        </div>

        <Reveal delay={0.2}>
          <Ornament className="mt-16" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-xl italic leading-relaxed text-gold-light/90 md:text-2xl">
            Ces six mots, le premier Sceau vous demandera de leur rendre leur
            vérité.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
