"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSeals } from "./SealsProvider";
import { useTeam } from "./TeamProvider";
import SageHint from "./SageHint";

/**
 * SCEAU II — La Balance Brisée (énigme JOUABLE).
 * Trier les âmes : brûler les fausses vertus, répartir les vrais devoirs
 * entre Gouvernants et Citoyens. Quand la balance est juste (3 / 3) et les
 * fausses vertus au feu, le sceau cède → 2e bougie.
 */
const ITEMS = [
  { id: "g1", label: "Rendre la justice sans favoritisme", zone: "gouv" },
  { id: "g2", label: "Consulter avant de trancher (shoura)", zone: "gouv" },
  { id: "g3", label: "Protéger le faible du fort", zone: "gouv" },
  { id: "c1", label: "Conseiller sincèrement ses dirigeants", zone: "cit" },
  { id: "c2", label: "S'instruire pour ne pas être trompé", zone: "cit" },
  { id: "c3", label: "Veiller sur son voisin", zone: "cit" },
  { id: "f1", label: "S'indigner derrière un écran", zone: "feu" },
  { id: "f2", label: "S'émouvoir d'une cause sans jamais agir", zone: "feu" },
  { id: "f3", label: "Attendre que les autres se lèvent", zone: "feu" },
];

const ZONES = {
  gouv: { label: "Plateau des Gouvernants", short: "Gouvernants", color: "#d4af37" },
  feu: { label: "Le Feu", short: "Fausses vertus", color: "#a01818" },
  cit: { label: "Plateau des Citoyens", short: "Citoyens", color: "#7ba05b" },
};

const LABEL = Object.fromEntries(ITEMS.map((i) => [i.id, i.label]));
const TRUEZONE = Object.fromEntries(ITEMS.map((i) => [i.id, i.zone]));
const IDS = ITEMS.map((i) => i.id);
const COLOR = "#7ba05b";

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
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const HINTS = [
  "Ce qui se vit derrière un écran sans jamais agir n'est pas un devoir — c'est une illusion. Jetez-le au feu.",
  "Rendre la justice, consulter avant de trancher, protéger le faible : voilà la charge de ceux qui gouvernent.",
  "Conseiller, s'instruire, veiller sur son voisin : voilà la charge de chaque citoyen.",
];

export default function SceauBalance() {
  const { lightSeal } = useSeals();
  const { team } = useTeam();

  const [order, setOrder] = useState(IDS);
  const [placed, setPlaced] = useState(emptyPlaced);
  const [locked, setLocked] = useState(() => new Set());
  const [wrong, setWrong] = useState(() => new Set());
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    setOrder(shuffle(IDS));
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

  const pool = order.filter((id) => !placed[id]);
  const inZone = (z) => order.filter((id) => placed[id] === z);
  const gouvN = inZone("gouv").length;
  const citN = inZone("cit").length;
  const allPlaced = pool.length === 0;
  const angle = status === "won" ? 0 : Math.max(-18, Math.min(18, (citN - gouvN) * 6));

  const place = (zone, itemId) => {
    if (!itemId || locked.has(itemId)) return;
    setStarted(true);
    setPlaced((prev) => ({ ...prev, [itemId]: zone }));
    setSelected(null);
    tick();
  };

  const clickZone = (zone) => {
    if (selected) place(zone, selected);
  };

  const removeChip = (itemId) => {
    if (locked.has(itemId)) return;
    setPlaced((prev) => ({ ...prev, [itemId]: null }));
    tick();
  };

  const clickPool = (id) => {
    if (status === "won") return;
    setSelected((s) => (s === id ? null : id));
  };

  const win = () => {
    setStatus("won");
    setStarted(false);
    lightSeal(2);
    try {
      window.dispatchEvent(new Event("seal:broken"));
    } catch (e) {}
  };

  const check = () => {
    if (!allPlaced || status === "won") return;
    const corrects = IDS.filter((id) => placed[id] === TRUEZONE[id]);
    const wrongs = IDS.filter((id) => placed[id] && placed[id] !== TRUEZONE[id]);
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
    setOrder(shuffle(IDS));
  };

  return (
    <div className="relative">
      <div
        className="relative overflow-hidden rounded-3xl border bg-night-900/55 p-6 backdrop-blur-sm transition-all duration-700 md:p-10"
        style={{
          borderColor:
            status === "won" ? "rgba(123,160,91,0.7)" : "rgba(123,160,91,0.25)",
          boxShadow:
            status === "won"
              ? "0 0 60px rgba(123,160,91,0.25), inset 0 0 40px rgba(123,160,91,0.08)"
              : "inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-1.5"
          style={{ background: COLOR, boxShadow: `0 0 20px ${COLOR}80` }}
        />

        {/* En-tête */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div
              className="mb-2 text-xs uppercase tracking-[0.25em]"
              style={{ color: COLOR }}
            >
              Sceau II · L'illusion du spectateur · à vous de jouer
            </div>
            <h3 className="font-display text-3xl font-bold text-cream md:text-4xl">
              La Balance Brisée
            </h3>
          </div>
        </div>

        {/* La balance qui penche */}
        <div className="relative mx-auto mb-8 h-44 w-full max-w-md">
          {status === "won" && (
            <div className="absolute left-1/2 top-10 h-24 w-24 -translate-x-1/2 rounded-full bg-sacred-glow/30 blur-2xl animate-breathe" />
          )}
          {/* Poutre + plateaux */}
          <div className="absolute left-1/2 top-8 -translate-x-1/2">
            <div
              className="relative"
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: "center",
                transition: "transform .7s cubic-bezier(.2,.8,.2,1)",
              }}
            >
              <div className="h-1.5 w-64 rounded-full bg-gradient-to-r from-gold-dark via-gold to-sacred-light" />
              {/* nœud central */}
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/80" />
              {/* plateau gauche (gouvernants) */}
              <Pan
                side="left"
                angle={angle}
                color={ZONES.gouv.color}
                count={gouvN}
              />
              {/* plateau droit (citoyens) */}
              <Pan
                side="right"
                angle={angle}
                color={ZONES.cit.color}
                count={citN}
              />
            </div>
          </div>
          {/* pied */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
            <div className="mx-auto h-24 w-1.5 bg-gradient-to-b from-cream/50 to-cream/20" />
            <div
              className="mx-auto h-0 w-0"
              style={{
                borderLeft: "22px solid transparent",
                borderRight: "22px solid transparent",
                borderBottom: "16px solid rgba(250,246,236,0.35)",
              }}
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 gap-16 text-[10px] uppercase tracking-widest">
            <span style={{ color: ZONES.gouv.color }}>Gouvernants</span>
            <span style={{ color: ZONES.cit.color }}>Citoyens</span>
          </div>
        </div>

        <p className="mb-6 max-w-2xl leading-relaxed text-cream/55">
          L'indignation seule n'a jamais sauvé un opprimé.{" "}
          <span className="text-cream/80">Triez les âmes</span> : brûlez les
          fausses vertus, et répartissez les vrais devoirs — la cité ne tient
          que si la charge est partagée.
        </p>

        {/* Réserve d'âmes à juger */}
        <div className="mb-6">
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-cream/40">
            <span className="inline-block h-px w-4" style={{ background: COLOR }} />
            Les âmes à juger {pool.length > 0 && `· ${pool.length}`}
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
                    onClick={() => clickPool(id)}
                    className="no-tap-highlight cursor-grab rounded-xl border px-3.5 py-2 text-left text-sm transition-all duration-200 active:cursor-grabbing"
                    style={{
                      borderColor: selected === id ? COLOR : "rgba(255,255,255,0.15)",
                      background:
                        selected === id ? "rgba(123,160,91,0.18)" : "rgba(255,255,255,0.03)",
                      color: "#faf6ec",
                      boxShadow: selected === id ? `0 0 16px ${COLOR}55` : "none",
                    }}
                  >
                    {LABEL[id]}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {pool.length === 0 && status !== "won" && (
              <span className="self-center text-sm italic text-cream/30">
                Tout est trié — pesez les âmes.
              </span>
            )}
          </div>
        </div>

        {/* Les 3 zones */}
        <div className="grid gap-3 md:grid-cols-3">
          {["gouv", "feu", "cit"].map((z) => {
            const zone = ZONES[z];
            const chips = inZone(z);
            return (
              <div
                key={z}
                onClick={() => clickZone(z)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  let id = "";
                  try {
                    id = e.dataTransfer.getData("text/plain");
                  } catch (err) {}
                  place(z, id || selected);
                }}
                className="min-h-[8.5rem] cursor-pointer rounded-2xl border p-4 transition-colors duration-300"
                style={{
                  borderColor: `${zone.color}40`,
                  background: `${zone.color}0b`,
                }}
              >
                <div
                  className="mb-3 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em]"
                  style={{ color: zone.color }}
                >
                  {z === "feu" && <span className="animate-flicker">🔥</span>}
                  {zone.label}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <AnimatePresence mode="popLayout">
                    {chips.map((id) => {
                      const isLocked = locked.has(id);
                      const isWrong = wrong.has(id);
                      return (
                        <motion.button
                          key={id}
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isWrong ? { x: [0, -6, 6, -4, 4, 0] } : { opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.35 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeChip(id);
                          }}
                          className="no-tap-highlight rounded-lg border px-2.5 py-1.5 text-xs"
                          style={{
                            borderColor: isWrong
                              ? "rgba(160,24,24,0.9)"
                              : isLocked
                              ? `${zone.color}`
                              : `${zone.color}55`,
                            background: isWrong
                              ? "rgba(160,24,24,0.18)"
                              : isLocked
                              ? `${zone.color}22`
                              : "rgba(255,255,255,0.04)",
                            color: "#faf6ec",
                          }}
                        >
                          {isLocked && <span style={{ color: zone.color }}>✦ </span>}
                          {LABEL[id]}
                        </motion.button>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commandes */}
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            onClick={check}
            disabled={!allPlaced || status === "won"}
            className="no-tap-highlight rounded-full px-7 py-3 font-display text-lg tracking-wide transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
            style={{
              border: `1px solid ${COLOR}`,
              background: allPlaced ? "rgba(123,160,91,0.18)" : "transparent",
              color: "#faf6ec",
              boxShadow: allPlaced ? `0 0 22px ${COLOR}40` : "none",
            }}
          >
            Peser les âmes
          </button>
          <button
            onClick={reset}
            className="no-tap-highlight rounded-full border border-white/15 px-5 py-3 text-sm uppercase tracking-widest text-cream/50 transition-all duration-300 hover:border-white/30 hover:text-cream/80"
          >
            Recommencer
          </button>
          {locked.size > 0 && status !== "won" && (
            <span className="text-sm italic text-sacred-light/80">
              {locked.size}/9 en place — continuez.
            </span>
          )}
        </div>

        <SageHint hints={HINTS} />

        {/* Victoire */}
        <AnimatePresence>
          {status === "won" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-night-900/85 px-6 text-center backdrop-blur-sm"
            >
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
                className="mb-2 font-display text-5xl font-bold text-sacred-glow md:text-7xl"
                style={{ textShadow: "0 0 30px rgba(123,160,91,0.6)" }}
              >
                BALANCE JUSTE
              </motion.div>
              <p className="mb-6 text-sm uppercase tracking-[0.3em] text-cream/50">
                Équipe {team || "des Éveillés"} · sceau II brisé en {fmt(elapsed)} · 2
                <sup>e</sup> bougie
              </p>
              <div className="max-w-xl rounded-2xl border border-sacred/40 bg-sacred/10 p-6">
                <p className="font-display text-lg italic text-cream/90 md:text-xl">
                  « La concertation (shura), l'équité et l'excellence du caractère
                  (ihsan) comme norme de gouvernance. »
                </p>
                <p className="mt-3 text-xs tracking-wide text-sacred-light">
                  — Si Abdessalam Yassine · La Voie Prophétique
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

function Pan({ side, angle, color, count }) {
  const isLeft = side === "left";
  return (
    <div
      className="absolute top-1/2"
      style={{
        [isLeft ? "left" : "right"]: 0,
        transform: `translate(${isLeft ? "-50%" : "50%"}, 0) rotate(${-angle}deg)`,
        transformOrigin: "top center",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="h-10 w-px bg-cream/30" />
        <div
          className="flex h-12 w-20 items-end justify-center rounded-b-[40px] border-2 pb-1.5 font-display text-xl font-bold"
          style={{
            borderColor: `${color}aa`,
            background: `${color}1a`,
            color,
            boxShadow: `0 0 18px ${color}33`,
          }}
        >
          {count}
        </div>
      </div>
    </div>
  );
}
