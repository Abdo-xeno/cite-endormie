"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSeals } from "./SealsProvider";
import { useTeam } from "./TeamProvider";
import SageHint from "./SageHint";

/**
 * SCEAU III — La Parole Révélée (énigme JOUABLE).
 * Associer chaque verset (vérifié, repris à l'identique) à l'engagement
 * qui l'incarne, en écartant les fausses promesses. Les 3 justes → on les
 * prononce → le sceau cède → 3e bougie → la cité s'éveille.
 *
 * ⚠️ Versets coraniques : repris au caractère près de Spiritual.js. Les
 * « engagements » sont des promesses civiques (non sourcées), libres.
 */
const VERSES = [
  {
    id: "v1",
    arabic: "وَأَمْرُهُمْ شُورَىٰ بَيْنَهُمْ",
    fr: "Et leurs affaires se règlent par consultation entre eux.",
    ref: "Sourate Ash-Shoura, 42:38",
    match: "e1",
  },
  {
    id: "v2",
    arabic: "يَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ",
    fr: "Ils ordonnent le convenable et interdisent le blâmable.",
    ref: "Sourate Âl-'Imrân, 3:104",
    match: "e2",
  },
  {
    id: "v3",
    arabic: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ",
    fr: "Allah ne change rien chez un peuple tant qu'ils ne changent pas ce qui est en eux-mêmes.",
    ref: "Sourate Ar-Ra'd, 13:11",
    match: "e3",
  },
];

const ENGAGEMENTS = {
  e1: "Je ne déciderai plus seul de ce qui nous concerne tous.",
  e2: "Je ne me tairai plus devant l'injustice — fût-ce d'un seul mot vrai.",
  e3: "Je me réformerai moi-même avant d'exiger des autres.",
  d1: "Je partagerai mon indignation en ligne, et ce sera bien assez.",
  d2: "J'attendrai qu'un sauveur vienne réveiller la cité à ma place.",
  d3: "Je m'informerai sans fin… sans jamais agir.",
};
const ENG_IDS = Object.keys(ENGAGEMENTS);
const COLOR = "#c9a84a";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const fmt = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const HINTS = [
  "La consultation (shoura) interdit de décider seul ce qui appartient à tous.",
  "Ordonner le bien, c'est d'abord refuser de se taire devant le blâmable.",
  "Nul changement ne descend sur un peuple avant qu'il ne change ce qui est en lui — et toute promesse qui n'engage qu'un écran est un leurre.",
];

const emptyPlaced = () => ({ v1: null, v2: null, v3: null });

export default function SceauParole() {
  const { lightSeal } = useSeals();
  const { team } = useTeam();

  const [order, setOrder] = useState(ENG_IDS);
  const [placed, setPlaced] = useState(emptyPlaced);
  const [locked, setLocked] = useState(() => new Set());
  const [wrong, setWrong] = useState(() => new Set());
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setOrder(shuffle(ENG_IDS));
  }, []);

  useEffect(() => {
    if (!started || status === "won") return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [started, status]);

  const tick = () => {
    try {
      window.dispatchEvent(new Event("seal:tick"));
    } catch (e) {}
  };

  const placedVals = Object.values(placed).filter(Boolean);
  const pool = order.filter((id) => !placedVals.includes(id));
  const allFilled = VERSES.every((v) => placed[v.id]);

  const place = (verseId, eid) => {
    if (!eid || locked.has(verseId)) return;
    setStarted(true);
    setPlaced((prev) => {
      const next = { ...prev };
      for (const k of Object.keys(next)) if (next[k] === eid) next[k] = null;
      next[verseId] = eid;
      return next;
    });
    setSelected(null);
    tick();
  };

  const clickSlot = (verseId) => {
    if (locked.has(verseId)) return;
    if (selected) {
      place(verseId, selected);
      return;
    }
    if (placed[verseId]) setPlaced((p) => ({ ...p, [verseId]: null }));
  };

  const clickEng = (eid) => {
    if (status === "won") return;
    setSelected((s) => (s === eid ? null : eid));
  };

  const win = () => {
    setStatus("won");
    setStarted(false);
    lightSeal(3);
    try {
      window.dispatchEvent(new Event("seal:broken"));
    } catch (e) {}
  };

  const check = () => {
    if (!allFilled || status === "won") return;
    const corrects = VERSES.filter((v) => placed[v.id] === v.match).map((v) => v.id);
    const wrongs = VERSES.filter((v) => placed[v.id] && placed[v.id] !== v.match).map(
      (v) => v.id
    );
    setLocked(new Set(corrects));
    if (wrongs.length) {
      setWrong(new Set(wrongs));
      try {
        window.dispatchEvent(new Event("seal:wrong"));
      } catch (e) {}
      setTimeout(() => {
        setPlaced((prev) => {
          const n = { ...prev };
          wrongs.forEach((id) => (n[id] = null));
          return n;
        });
        setWrong(new Set());
      }, 850);
    }
    if (corrects.length === VERSES.length) win();
  };

  const reset = () => {
    setPlaced(emptyPlaced());
    setLocked(new Set());
    setWrong(new Set());
    setSelected(null);
    setStatus("idle");
    setElapsed(0);
    setStarted(false);
    setOrder(shuffle(ENG_IDS));
  };

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-3xl border bg-night-900/55 p-6 backdrop-blur-sm transition-all duration-700 md:p-10"
        style={{
          borderColor:
            status === "won" ? "rgba(201,168,74,0.7)" : "rgba(201,168,74,0.28)",
          boxShadow:
            status === "won"
              ? "0 0 60px rgba(201,168,74,0.25), inset 0 0 40px rgba(201,168,74,0.08)"
              : "inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{ background: COLOR, boxShadow: `0 0 20px ${COLOR}80` }}
        />

        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div
              className="mb-2 text-xs uppercase tracking-[0.25em]"
              style={{ color: COLOR }}
            >
              Sceau III · L'illusion de l'information · à vous de jouer
            </div>
            <h3 className="font-display text-3xl font-bold text-cream md:text-4xl">
              La Parole Révélée
            </h3>
          </div>
        </div>

        <p className="mb-6 max-w-2xl leading-relaxed text-cream/55">
          Mille voix ont recouvert la seule Parole qui ne ment pas.{" "}
          <span className="text-cream/80">
            Rendez à chaque verset l'engagement qui l'incarne
          </span>{" "}
          — et démasquez les fausses promesses du spectateur.
        </p>

        {/* Engagements à choisir */}
        <div className="mb-7">
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-cream/40">
            <span className="inline-block h-px w-4" style={{ background: COLOR }} />
            Les engagements {pool.length > 0 && `· ${pool.length}`}
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
                    onClick={() => clickEng(id)}
                    className="no-tap-highlight max-w-xs cursor-grab rounded-xl border px-3.5 py-2 text-left text-sm transition-all duration-200 active:cursor-grabbing"
                    style={{
                      borderColor: selected === id ? COLOR : "rgba(255,255,255,0.15)",
                      background:
                        selected === id ? "rgba(201,168,74,0.18)" : "rgba(255,255,255,0.03)",
                      color: "#faf6ec",
                      boxShadow: selected === id ? `0 0 16px ${COLOR}55` : "none",
                    }}
                  >
                    {ENGAGEMENTS[id]}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {pool.length === 0 && status !== "won" && (
              <span className="self-center text-sm italic text-cream/30">
                Chaque verset a sa réponse — scellez la Parole.
              </span>
            )}
          </div>
        </div>

        {/* Versets = emplacements */}
        <div className="space-y-3">
          {VERSES.map((v) => {
            const e = placed[v.id];
            const isLocked = locked.has(v.id);
            const isWrong = wrong.has(v.id);
            return (
              <motion.div
                key={v.id}
                onClick={() => clickSlot(v.id)}
                onDragOver={(ev) => {
                  if (!isLocked) ev.preventDefault();
                }}
                onDrop={(ev) => {
                  ev.preventDefault();
                  let id = "";
                  try {
                    id = ev.dataTransfer.getData("text/plain");
                  } catch (err) {}
                  place(v.id, id || selected);
                }}
                animate={isWrong ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.45 }}
                className={`grid gap-4 rounded-2xl border p-5 transition-colors duration-300 md:grid-cols-2 ${
                  isLocked ? "cursor-default" : "cursor-pointer"
                }`}
                style={{
                  borderColor: isWrong
                    ? "rgba(160,24,24,0.8)"
                    : isLocked
                    ? "rgba(201,168,74,0.6)"
                    : e
                    ? "rgba(201,168,74,0.3)"
                    : "rgba(255,255,255,0.1)",
                  background: isWrong
                    ? "rgba(160,24,24,0.1)"
                    : isLocked
                    ? "rgba(201,168,74,0.08)"
                    : "rgba(255,255,255,0.02)",
                }}
              >
                <div className="text-center md:text-right md:border-r md:border-white/10 md:pr-4">
                  <p className="arabic mb-2 text-2xl leading-loose text-sacred-glow">
                    {v.arabic}
                  </p>
                  <p className="font-display text-sm italic text-cream/75">
                    «&nbsp;{v.fr}&nbsp;»
                  </p>
                  <p className="mt-1 text-xs" style={{ color: COLOR }}>
                    {v.ref}
                  </p>
                </div>
                <div
                  className="flex min-h-[3rem] items-center justify-center rounded-lg border border-dashed px-3 py-2 text-center"
                  style={{
                    borderColor: e ? "transparent" : "rgba(255,255,255,0.14)",
                    background: e ? "rgba(201,168,74,0.12)" : "transparent",
                    color: e ? "#faf6ec" : "rgba(250,246,236,0.3)",
                  }}
                >
                  {e ? (
                    <span className="flex items-center gap-2 text-sm">
                      {isLocked && <span style={{ color: COLOR }}>✦</span>}
                      {ENGAGEMENTS[e]}
                    </span>
                  ) : (
                    <span className="text-sm italic">quel engagement ?</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            onClick={check}
            disabled={!allFilled || status === "won"}
            className="no-tap-highlight rounded-full px-7 py-3 font-display text-lg tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              border: `1px solid ${COLOR}`,
              background: allFilled ? "rgba(201,168,74,0.18)" : "transparent",
              color: "#faf6ec",
              boxShadow: allFilled ? `0 0 22px ${COLOR}40` : "none",
            }}
          >
            Sceller la Parole
          </button>
          <button
            onClick={reset}
            className="no-tap-highlight rounded-full border border-white/15 px-5 py-3 text-sm uppercase tracking-widest text-cream/50 transition-all duration-300 hover:border-white/30 hover:text-cream/80"
          >
            Recommencer
          </button>
          {locked.size > 0 && status !== "won" && (
            <span className="text-sm italic text-sacred-light/80">
              {locked.size}/3 versets rendus — continuez.
            </span>
          )}
        </div>

        <SageHint hints={HINTS} />

        {/* Victoire : on prononce les engagements */}
        <AnimatePresence>
          {status === "won" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-night-900/90 px-6 text-center backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 2.2, rotate: -14, opacity: 0 }}
                animate={{ scale: 1, rotate: -8, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 16 }}
                className="mb-2 font-display text-4xl font-bold text-glow-gold md:text-6xl"
                style={{ color: COLOR }}
              >
                LA PAROLE RENDUE
              </motion.div>
              <p className="mb-7 text-sm uppercase tracking-[0.3em] text-cream/50">
                Équipe {team || "des Éveillés"} · sceau III brisé en {fmt(elapsed)}
              </p>

              <div className="max-w-xl space-y-3">
                {["e1", "e2", "e3"].map((id, i) => (
                  <motion.p
                    key={id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.6, duration: 0.7 }}
                    className="font-display text-lg italic text-cream/90 md:text-xl"
                  >
                    «&nbsp;{ENGAGEMENTS[id]}&nbsp;»
                  </motion.p>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 1 }}
                className="mt-7 text-sm tracking-wide text-sacred-light"
              >
                Prononcés à voix haute, ensemble. La cité retient sa promesse.
              </motion.p>

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
