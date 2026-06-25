"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CityScene from "./CityScene";

/**
 * Séquence cinématique — racontée par l'IMAGE. Chaque battement est une scène
 * animée (la cité en profondeur, le Tyran qui vole, un fil qui s'arrête de
 * défiler, les sceaux qui se fissurent, l'aube) ; le texte n'est qu'une
 * légende. 100% en code, aucun fichier.
 */
// Cinématique de CLÔTURE (la page finit ici). Deux mouvements : un RAPPEL bref
// de l'aventure (cité → vol → éveil → sceaux brisés → aube), puis l'OUVERTURE
// vers la suite (« 1re épreuve réussie… mais ce n'est que le début » → le monde
// qui dort encore → d'autres sceaux → Chapitre I + dua). Volontairement > 30 s.
const STEPS = [
  { scene: "intro", cap: "Une cité s'est endormie…", sub: "les yeux ouverts.", d: 3800 },
  { scene: "theft", cap: "On l'a dépouillée dans son sommeil.", d: 3800 },
  { scene: "awaken", cap: "Jusqu'à ce qu'un seul s'éveille…", d: 3600 },
  { scene: "seals", cap: "Trois sceaux brisés.", sub: "Par une équipe : la vôtre.", d: 4400 },
  { scene: "dawn", cap: "Et la cité s'est réveillée.", d: 3800 },
  { scene: "dawn", cap: "Vous avez réussi la première épreuve.", sub: "Mais ceci n'est que le commencement.", d: 4600 },
  { scene: "world", cap: "Au-delà de ses murs, le monde dort encore.", sub: "Mille cités. Un seul flambeau.", d: 4800 },
  { scene: "world", cap: "D'autres sceaux vous attendent.", sub: "D'autres illusions, d'autres vérités.", d: 4400 },
  { scene: "title", cap: "LA CITÉ ENDORMIE", sub: "Chapitre I · Réveillerez-vous le monde ?", final: true, d: 0 },
];

function PhoneScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-night-deep/75" />
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <div className="relative h-[54vh] max-h-[440px] w-[220px] overflow-hidden rounded-[2rem] border-2 border-white/15 bg-black shadow-[0_0_70px_rgba(110,160,225,0.35)]">
          {/* le fil qui défile puis s'arrête net */}
          <motion.div
            className="absolute inset-x-4 top-4 flex flex-col gap-3"
            initial={{ y: 0 }}
            animate={{ y: ["0%", "-130%", "-150%"] }}
            transition={{ duration: 2.8, times: [0, 0.78, 1], ease: "easeOut" }}
          >
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="rounded-md bg-sky-300/25"
                style={{ height: 14 + (i % 4) * 9 }}
              />
            ))}
          </motion.div>
          {/* lueur bleue → dorée */}
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(110,160,225,0.22), transparent)" }}
            animate={{ opacity: [1, 1, 0] }}
            transition={{ duration: 3.4, times: [0, 0.72, 1] }}
          />
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(224,200,96,0.32), transparent 70%)" }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 3.4, times: [0, 0.72, 1] }}
          />
        </div>
        {/* le pouce qui se retire */}
        <motion.div
          className="absolute -bottom-3 right-7 h-16 w-10 rounded-t-full border border-white/10 bg-[#0b0b0d]"
          animate={{ y: [0, 0, 22], opacity: [1, 1, 0.6] }}
          transition={{ duration: 3.4, times: [0, 0.7, 1], ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}

function TheftScene() {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-2 pb-[16vh]">
      <div className="absolute inset-0 bg-night-deep/40" />
      {/* le Tyran qui surgit */}
      <motion.div
        initial={{ x: -140, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="absolute -inset-7 rounded-full bg-blood/25 blur-2xl" />
        <div className="h-48 w-16 rounded-t-[30px] bg-black" />
        <div className="absolute -top-9 left-2 h-11 w-11 rounded-full bg-black" />
        <div
          className="absolute -top-[60px] left-0 h-7 w-16 bg-black"
          style={{ clipPath: "polygon(0 100%,15% 0,35% 100%,50% 0,65% 100%,85% 0,100% 100%)" }}
        />
      </motion.div>
      {/* un dormeur, et sa bourse d'or qu'on lui vole */}
      <div className="relative z-0 ml-8">
        <div className="h-7 w-28 rounded-t-[44px] bg-[#05101c]" />
        <div className="absolute -top-3 left-20 h-4 w-4 rounded-full bg-[#05101c]" />
        <motion.div
          className="absolute -top-3 left-3 h-5 w-5 rounded-full bg-gold"
          style={{ filter: "drop-shadow(0 0 10px #d4af37)" }}
          animate={{ x: [-0, -110], y: [0, -16], opacity: [1, 1, 0], scale: [1, 1, 0.6] }}
          transition={{ delay: 1.2, duration: 1.6, times: [0, 0.7, 1] }}
        />
      </div>
    </div>
  );
}

function SealsScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-5 md:gap-7">
      <div className="absolute inset-0 bg-night-deep/55" />
      {["I", "II", "III"].map((r, k) => (
        <motion.div
          key={r}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: [0, 0, -2, 2, 0] }}
          transition={{ duration: 3, delay: k * 0.3, times: [0, 0.3, 0.78, 0.9, 1] }}
          className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 font-display text-4xl font-bold text-gold md:h-28 md:w-28"
          style={{
            borderColor: "rgba(212,175,55,0.6)",
            background: "rgba(212,175,55,0.08)",
            boxShadow: "0 0 28px rgba(212,175,55,0.4)",
          }}
        >
          {r}
          {/* la fissure qui se trace */}
          <motion.svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 3, delay: k * 0.3, times: [0, 0.72, 0.9] }}
          >
            <path
              d="M52 2 L44 34 L60 50 L42 70 L54 98"
              stroke="rgba(255,250,235,0.85)"
              strokeWidth="2.5"
              fill="none"
            />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
}

// Le monde au-delà des murs : une constellation de cités endormies (bleu),
// une seule éveillée (or). « Mille cités. Un seul flambeau. »
function WorldScene() {
  const cities = [...Array(46)].map((_, i) => ({
    i,
    x: (i * 67 + 7) % 100,
    y: (i * 41 + (i % 5) * 13) % 100,
    awake: i === 22,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-night-deep/75" />
      <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-night-700/20 blur-[100px]" />
      {cities.map((c) => (
        <motion.span
          key={c.i}
          className="absolute rounded-full"
          style={{
            left: `${5 + c.x * 0.9}%`,
            top: `${8 + c.y * 0.8}%`,
            width: c.awake ? 11 : 4,
            height: c.awake ? 11 : 4,
            background: c.awake ? "#f4c44a" : "rgba(120,165,225,0.5)",
            boxShadow: c.awake
              ? "0 0 22px 6px rgba(244,196,74,0.85)"
              : "0 0 7px rgba(120,165,225,0.5)",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={
            c.awake
              ? { opacity: [0, 1, 1], scale: [0, 1.25, 1] }
              : { opacity: [0, 0.55, 0.4, 0.55], scale: 1 }
          }
          transition={{
            duration: c.awake ? 2.2 : 3.4,
            delay: (c.i % 14) * 0.07,
            repeat: c.awake ? 0 : Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}

export default function TeaserCinematic({ open, onClose }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!open) {
      setI(0);
      return;
    }
    const step = STEPS[i];
    if (!step || step.final) return;
    const id = setTimeout(() => setI((v) => Math.min(v + 1, STEPS.length - 1)), step.d);
    return () => clearTimeout(id);
  }, [open, i]);

  if (!open) return null;
  const step = STEPS[i];
  const isDawn = step.scene === "dawn" || step.scene === "title";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 z-[90] overflow-hidden bg-[#03080e]"
      >
        {/* Fond : la cité (sommeil → aube), légère poussée de caméra */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.16] }}
          transition={{ duration: 36, ease: "linear" }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: isDawn ? 0 : 1 }}
            transition={{ duration: 1.6 }}
          >
            <CityScene className="absolute inset-0 h-full w-full" />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: isDawn ? 1 : 0 }}
            transition={{ duration: 1.6 }}
          >
            <CityScene mode="dawn" className="absolute inset-0 h-full w-full" />
          </motion.div>
        </motion.div>

        {/* Ouverture depuis le noir */}
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2.4, ease: "easeOut" }}
        />

        {/* Scènes-événements */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step.scene}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {step.scene === "theft" && <TheftScene />}
            {step.scene === "phone" && <PhoneScene />}
            {step.scene === "seals" && <SealsScene />}
            {step.scene === "world" && <WorldScene />}
            {step.scene === "awaken" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.2, opacity: 0 }}
                  animate={{ scale: 2.4, opacity: [0, 0.8, 0.35] }}
                  transition={{ duration: 2.6, ease: "easeOut" }}
                  className="h-[40vmin] w-[40vmin] rounded-full bg-gold/40 blur-[100px]"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Voile bas pour la lisibilité de la légende */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Légende / titre */}
        <div
          className={`absolute inset-x-0 ${
            step.final ? "top-1/2 -translate-y-1/2" : "bottom-[12%]"
          } px-6 text-center`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              {step.final ? (
                <>
                  <h2 className="font-display text-5xl font-bold leading-none text-cream text-glow-gold md:text-8xl">
                    {step.cap}
                  </h2>
                  <p className="mt-5 font-display text-xl text-gold-light md:text-2xl">
                    {step.sub}
                  </p>
                  {/* Sceau final — le dua, repris de l'ancien épilogue */}
                  <div className="mx-auto mt-8 max-w-sm border-t border-gold/15 pt-6">
                    <p className="arabic text-2xl text-sacred-glow">
                      وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ
                    </p>
                    <p className="mt-1.5 text-xs italic text-cream/40">
                      «&nbsp;Et ma réussite ne dépend que d'Allah&nbsp;»
                    </p>
                    <p className="mt-5 text-xs uppercase tracking-[0.3em] text-cream/35">
                      Un escape game à vivre — bientôt
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <p className="mx-auto max-w-3xl font-display text-3xl italic leading-snug text-cream text-shadow-soft md:text-5xl">
                    {step.cap}
                  </p>
                  {step.sub && (
                    <p className="mx-auto mt-3 max-w-2xl font-display text-2xl italic text-gold-light/90 md:text-3xl">
                      {step.sub}
                    </p>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {step.final && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-4"
            >
              <button
                onClick={() => setI(0)}
                className="no-tap-highlight rounded-full border border-gold/50 bg-gold/10 px-7 py-3 font-display text-lg tracking-wide text-cream transition-all hover:border-gold hover:bg-gold/20"
              >
                Revoir
              </button>
              <button
                onClick={onClose}
                className="no-tap-highlight rounded-full border border-white/20 px-7 py-3 text-sm uppercase tracking-widest text-cream/60 transition-all hover:border-white/40 hover:text-cream"
              >
                Fermer
              </button>
            </motion.div>
          )}
        </div>

        {!step.final && (
          <button
            onClick={() => setI(STEPS.length - 1)}
            className="no-tap-highlight absolute right-6 top-6 z-30 text-xs uppercase tracking-[0.2em] text-cream/40 transition-colors hover:text-cream/80"
          >
            Passer →
          </button>
        )}

        <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-white/5">
          <motion.div
            className="h-full bg-gold/70"
            animate={{ width: `${((i + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
