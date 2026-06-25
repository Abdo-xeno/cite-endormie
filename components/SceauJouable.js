"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSeals } from "./SealsProvider";
import { useTeam } from "./TeamProvider";
import SageHint from "./SageHint";

/**
 * SCEAU I — Les Mots Volés (énigme JOUABLE).
 * On rend aux 6 mots leur vraie définition. Quand les 6 sont scellés
 * correctement, le sceau se brise → la 1re bougie s'allume (lightSeal) +
 * événement « seal:broken » (carillon de l'ambiance sonore).
 *
 * Les définitions ci-dessous sont des définitions de concepts (non des
 * citations sourcées). La citation de récompense, elle, est celle vérifiée
 * du code d'origine (Si Abdessalam Yassine) — laissée intacte.
 */
const PAIRS = [
  {
    id: "cit",
    word: "Citoyenneté",
    def: "Appartenir à une cité : en partager les devoirs autant que les droits.",
  },
  {
    id: "gouv",
    word: "Gouvernance",
    def: "Exercer le pouvoir au service du bien commun — jamais de soi-même.",
  },
  {
    id: "demo",
    word: "Démocratie",
    def: "Un ordre où le peuple est la source du pouvoir, non un décor.",
  },
  {
    id: "shoura",
    word: "Shoura",
    def: "La consultation : ne rien décider seul de ce qui concerne tous.",
  },
  {
    id: "resp",
    word: "Responsabilité",
    def: "Devoir répondre de ses actes — et veiller sur le sort d'autrui.",
  },
  {
    id: "lib",
    word: "Liberté",
    def: "Non l'absence de limites, mais la justice exercée sur soi-même.",
  },
];

const IDS = PAIRS.map((p) => p.id);
const WORD = Object.fromEntries(PAIRS.map((p) => [p.id, p.word]));
const DEF = Object.fromEntries(PAIRS.map((p) => [p.id, p.def]));
const COLOR = "#d4af37";

const HINTS = [
  "Commencez par ce que vous croyez connaître : la « Liberté » n'est pas l'absence de limites, mais la maîtrise de soi.",
  "La « Shoura », c'est ne jamais décider seul de ce qui concerne tous.",
  "La « Démocratie » meurt à l'instant où le peuple n'est plus qu'un décor.",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const emptyPlaced = () => Object.fromEntries(IDS.map((id) => [id, null]));
const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
    2,
    "0"
  )}`;

export default function SceauJouable() {
  const { lightSeal } = useSeals();
  const { team } = useTeam();

  const [wordOrder, setWordOrder] = useState(IDS);
  const [defOrder, setDefOrder] = useState(IDS);
  const [placed, setPlaced] = useState(emptyPlaced); // defId -> wordId | null
  const [locked, setLocked] = useState(() => new Set());
  const [wrong, setWrong] = useState(() => new Set());
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | won
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  // Mélange seulement après le montage → pas de décalage d'hydratation.
  useEffect(() => {
    setWordOrder(shuffle(IDS));
    setDefOrder(shuffle(IDS));
  }, []);

  // Chronomètre (compte le temps mis pour briser le sceau).
  useEffect(() => {
    if (!started || status === "won") return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [started, status]);

  const placedWords = useMemo(
    () => new Set(Object.values(placed).filter(Boolean)),
    [placed]
  );
  const pool = wordOrder.filter((id) => !placedWords.has(id));
  const allFilled = defOrder.every((d) => placed[d]);

  const place = (defId, wordId) => {
    if (locked.has(defId) || !wordId) return;
    setStarted(true);
    setPlaced((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) if (next[k] === wordId) next[k] = null;
      next[defId] = wordId;
      return next;
    });
    setSelected(null);
    try {
      window.dispatchEvent(new Event("seal:tick"));
    } catch (e) {}
  };

  const clickSlot = (defId) => {
    if (locked.has(defId)) return;
    if (selected) {
      place(defId, selected);
      return;
    }
    if (placed[defId]) setPlaced((p) => ({ ...p, [defId]: null }));
  };

  const clickWord = (id) => {
    if (status === "won") return;
    setSelected((s) => (s === id ? null : id));
  };

  const win = () => {
    setStatus("won");
    setStarted(false);
    lightSeal(1);
    try {
      window.dispatchEvent(new Event("seal:broken"));
    } catch (e) {}
  };

  const check = () => {
    if (!allFilled || status === "won") return;
    const corrects = defOrder.filter((d) => placed[d] === d);
    const wrongs = defOrder.filter((d) => placed[d] && placed[d] !== d);
    setLocked(new Set(corrects));
    if (wrongs.length) {
      setWrong(new Set(wrongs));
      try {
        window.dispatchEvent(new Event("seal:wrong"));
      } catch (e) {}
      setTimeout(() => {
        setPlaced((prev) => {
          const n = { ...prev };
          wrongs.forEach((d) => (n[d] = null));
          return n;
        });
        setWrong(new Set());
      }, 800);
    }
    if (corrects.length === IDS.length) win();
  };

  const reset = () => {
    setPlaced(emptyPlaced());
    setLocked(new Set());
    setWrong(new Set());
    setSelected(null);
    setStatus("idle");
    setElapsed(0);
    setStarted(false);
    setWordOrder(shuffle(IDS));
    setDefOrder(shuffle(IDS));
  };

  return (
    <div className="relative">
      {/* Cadre du sceau */}
      <div
        className="relative overflow-hidden rounded-3xl border bg-night-900/55 p-6 backdrop-blur-sm transition-all duration-700 md:p-10"
        style={{
          borderColor:
            status === "won" ? "rgba(212,175,55,0.7)" : "rgba(212,175,55,0.25)",
          boxShadow:
            status === "won"
              ? "0 0 60px rgba(212,175,55,0.25), inset 0 0 40px rgba(212,175,55,0.08)"
              : "inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{ background: COLOR, boxShadow: `0 0 20px ${COLOR}80` }}
        />

        {/* En-tête */}
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div
              className="mb-2 text-xs uppercase tracking-[0.25em]"
              style={{ color: COLOR }}
            >
              Sceau I · L'illusion du langage · à vous de jouer
            </div>
            <h3 className="font-display text-3xl font-bold text-cream md:text-4xl">
              Les Mots Volés
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-display text-2xl font-bold tabular-nums text-cream">
                {fmt(elapsed)}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-cream/40">
                chrono
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {IDS.map((d) => (
                <span
                  key={d}
                  className="h-2 w-2 rounded-full transition-all duration-300"
                  style={{
                    background: locked.has(d) ? COLOR : "rgba(255,255,255,0.12)",
                    boxShadow: locked.has(d) ? `0 0 8px ${COLOR}` : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="mb-6 max-w-2xl leading-relaxed text-cream/55">
          Le tyran a vidé les mots de leur sens.{" "}
          <span className="text-cream/80">Rendez à chaque mot sa vérité</span> :
          touchez un mot, puis sa définition — ou glissez-le. Brisez les 6 pour
          ouvrir le Sceau.
        </p>

        {/* Réserve de mots volés */}
        <div className="mb-7">
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-cream/40">
            <span className="inline-block h-px w-4" style={{ background: COLOR }} />
            Les mots volés {pool.length > 0 && `· ${pool.length} restant${pool.length > 1 ? "s" : ""}`}
          </div>
          <div className="flex min-h-[3rem] flex-wrap gap-2.5">
            <AnimatePresence mode="popLayout">
              {pool.map((id) => (
                <motion.div
                  key={id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                >
                  <button
                    draggable
                    onDragStart={(e) => {
                      setSelected(id);
                      try {
                        e.dataTransfer.setData("text/plain", id);
                        e.dataTransfer.effectAllowed = "move";
                      } catch (err) {}
                    }}
                    onClick={() => clickWord(id)}
                    className="no-tap-highlight cursor-grab rounded-xl border px-4 py-2.5 font-display text-lg transition-all duration-200 active:cursor-grabbing"
                    style={{
                      borderColor:
                        selected === id ? COLOR : "rgba(212,175,55,0.35)",
                      background:
                        selected === id
                          ? "rgba(212,175,55,0.2)"
                          : "rgba(212,175,55,0.07)",
                      color: "#faf6ec",
                      boxShadow: selected === id ? `0 0 18px ${COLOR}55` : "none",
                    }}
                  >
                    {WORD[id]}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {pool.length === 0 && status !== "won" && (
              <span className="self-center text-sm italic text-cream/30">
                Tous les mots sont placés — scellez pour vérifier.
              </span>
            )}
          </div>
        </div>

        {/* Définitions = emplacements */}
        <div className="grid gap-3 md:grid-cols-2">
          {defOrder.map((defId) => {
            const w = placed[defId];
            const isLocked = locked.has(defId);
            const isWrong = wrong.has(defId);
            return (
              <motion.div
                key={defId}
                onClick={() => clickSlot(defId)}
                onDragOver={(e) => {
                  if (!isLocked) e.preventDefault();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  let id = "";
                  try {
                    id = e.dataTransfer.getData("text/plain");
                  } catch (err) {}
                  place(defId, id || selected);
                }}
                animate={isWrong ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.45 }}
                className={`rounded-2xl border p-4 transition-colors duration-300 ${
                  isLocked ? "cursor-default" : "cursor-pointer"
                }`}
                style={{
                  borderColor: isWrong
                    ? "rgba(160,24,24,0.8)"
                    : isLocked
                    ? "rgba(212,175,55,0.6)"
                    : w
                    ? "rgba(212,175,55,0.3)"
                    : "rgba(255,255,255,0.1)",
                  background: isWrong
                    ? "rgba(160,24,24,0.12)"
                    : isLocked
                    ? "rgba(212,175,55,0.1)"
                    : "rgba(255,255,255,0.02)",
                }}
              >
                <p className="mb-3 text-[15px] leading-snug text-cream/75">
                  {DEF[defId]}
                </p>
                <div
                  className="flex min-h-[2.6rem] items-center justify-center rounded-lg border border-dashed px-3 py-1.5 text-center font-display text-lg transition-all"
                  style={{
                    borderColor: w ? "transparent" : "rgba(255,255,255,0.14)",
                    background: w ? "rgba(212,175,55,0.14)" : "transparent",
                    color: w ? "#faf6ec" : "rgba(250,246,236,0.3)",
                  }}
                >
                  {w ? (
                    <span className="flex items-center gap-2">
                      {isLocked && <span style={{ color: COLOR }}>✦</span>}
                      {WORD[w]}
                    </span>
                  ) : (
                    <span className="text-sm italic">déposez un mot</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Commandes */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            onClick={check}
            disabled={!allFilled || status === "won"}
            className="no-tap-highlight rounded-full px-7 py-3 font-display text-lg tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              border: `1px solid ${COLOR}`,
              background: allFilled ? "rgba(212,175,55,0.18)" : "transparent",
              color: "#faf6ec",
              boxShadow: allFilled ? `0 0 22px ${COLOR}40` : "none",
            }}
          >
            Sceller les mots
          </button>
          <button
            onClick={reset}
            className="no-tap-highlight rounded-full border border-white/15 px-5 py-3 text-sm uppercase tracking-widest text-cream/50 transition-all duration-300 hover:border-white/30 hover:text-cream/80"
          >
            Recommencer
          </button>
          {locked.size > 0 && status !== "won" && (
            <span className="text-sm italic text-sacred-light/80">
              {locked.size}/6 scellé{locked.size > 1 ? "s" : ""} — continuez.
            </span>
          )}
        </div>

        <SageHint hints={HINTS} />

        {/* Voile de victoire */}
        <AnimatePresence>
          {status === "won" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-night-900/85 px-6 text-center backdrop-blur-sm"
            >
              {/* Braises de victoire */}
              {[...Array(14)].map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute h-1.5 w-1.5 rounded-full"
                  style={{ background: COLOR, left: `${8 + i * 6}%`, bottom: "20%" }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -260 - (i % 4) * 40, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 2.2 + (i % 5) * 0.3,
                    delay: i * 0.06,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              ))}

              <motion.div
                initial={{ scale: 2.2, rotate: -14, opacity: 0 }}
                animate={{ scale: 1, rotate: -8, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="mb-2 font-display text-5xl font-bold text-gold text-glow-gold md:text-7xl"
              >
                SCEAU BRISÉ
              </motion.div>
              <p className="mb-6 text-sm uppercase tracking-[0.3em] text-cream/50">
                Équipe {team || "des Éveillés"} · sceau I brisé en {fmt(elapsed)} ·
                1<sup>re</sup> bougie
              </p>

              <div className="max-w-xl rounded-2xl border border-gold/30 bg-gold/5 p-6">
                <p className="font-display text-lg italic text-cream/90 md:text-xl">
                  « La justice dans la liberté et la liberté dans la justice. »
                </p>
                <p className="mt-3 text-xs tracking-wide" style={{ color: COLOR }}>
                  — Si Abdessalam Yassine · Islamiser la modernité
                </p>
              </div>

              <button
                onClick={reset}
                className="no-tap-highlight mt-8 rounded-full border border-white/20 px-6 py-2.5 text-sm uppercase tracking-widest text-cream/60 transition-all hover:border-white/40 hover:text-cream"
              >
                Rejouer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
