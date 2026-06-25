"use client";

import Reveal from "../Reveal";

/**
 * Primitives de citation pour la v2.
 * ⚠️ Le texte des citations (Si Abdessalam Yassine, hadiths) est repris MOT POUR
 * MOT depuis la dissertation sourcée fournie. Ne pas paraphraser ni inventer.
 *
 * - <PullQuote> : la grande citation d'ouverture d'un acte (dorée, centrée).
 * - <Cite>      : une citation secondaire, en carte (avec n° de page).
 * - <Sacred>    : un hadith / une parole sacrée (vert, façon section spirituelle).
 */

const SOURCE = "Si Abdessalam Yassine · Islamiser la modernité";

export function PullQuote({ children, page }) {
  return (
    <Reveal>
      <figure className="relative mx-auto max-w-3xl text-center">
        <span className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 select-none font-display text-8xl text-gold/15">
          «
        </span>
        <blockquote className="font-display text-2xl italic leading-snug text-cream text-shadow-soft md:text-4xl">
          {children}
        </blockquote>
        <figcaption className="mt-7 text-sm tracking-wide text-gold/75">
          — {SOURCE}
          {page && (
            <>
              {" · "}
              <span className="text-gold-light">{page}</span>
            </>
          )}
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Cite({ children, page, label }) {
  return (
    <div className="h-full rounded-2xl border border-gold/15 bg-night-800/40 p-6 backdrop-blur-sm transition-all duration-500 hover:border-gold/35 hover:bg-night-800/60">
      {label && (
        <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gold/60">
          {label}
        </div>
      )}
      <p className="font-display text-lg italic leading-relaxed text-cream/85">
        «&nbsp;{children}&nbsp;»
      </p>
      <p className="mt-4 text-xs tracking-wide text-gold/55">
        — {SOURCE}
        {page && ` · ${page}`}
      </p>
    </div>
  );
}

export function Sacred({ children, source }) {
  return (
    <Reveal>
      <div className="mx-auto max-w-3xl rounded-2xl border border-sacred/30 bg-sacred/5 p-8 text-center backdrop-blur-sm md:p-10">
        <div className="mb-5 text-sacred-light/70">❖</div>
        <p className="font-display text-xl italic leading-relaxed text-cream/90 md:text-2xl">
          «&nbsp;{children}&nbsp;»
        </p>
        <p className="mt-5 text-sm tracking-wide text-sacred-light/80">{source}</p>
      </div>
    </Reveal>
  );
}
