"use client";

import { useEffect, useRef, useState } from "react";
import { useSeals } from "./SealsProvider";

/**
 * L'horloge de l'escape game. 12:00 qui s'égrènent dès l'entrée — la tension
 * de la salle. Vire au rouge sous 2:00, se fige en vert quand les trois
 * sceaux cèdent (« cité libérée »). Non punitive : à 0, l'emprise se resserre,
 * mais rien ne bloque.
 */
export default function GameClock() {
  const { seals } = useSeals();
  const all = seals[1] && seals[2] && seals[3];
  const [t, setT] = useState(12 * 60);
  const [running, setRunning] = useState(false);
  const frozenAt = useRef(null);

  useEffect(() => {
    const startNow = () => setRunning(true);
    try {
      if (sessionStorage.getItem("cite-entered")) setRunning(true);
    } catch (e) {}
    window.addEventListener("cite:enter", startNow);
    return () => window.removeEventListener("cite:enter", startNow);
  }, []);

  useEffect(() => {
    if (!running || all) return;
    const id = setInterval(() => setT((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(id);
  }, [running, all]);

  if (all && frozenAt.current === null) frozenAt.current = t;
  const shown = all && frozenAt.current !== null ? frozenAt.current : t;

  const danger = !all && t <= 120;
  const dead = !all && t === 0;
  const color = all ? "#7ba05b" : dead ? "#7a1010" : danger ? "#c0392b" : "#d4af37";
  const mm = String(Math.floor(shown / 60)).padStart(2, "0");
  const ss = String(shown % 60).padStart(2, "0");
  const label = all
    ? "cité libérée"
    : dead
    ? "l'emprise se resserre"
    : danger
    ? "hâtez-vous"
    : "avant l'aube";

  return (
    <div className="flex flex-col items-center">
      <div
        className="font-display text-2xl font-bold tabular-nums transition-colors duration-500"
        style={{ color, textShadow: `0 0 12px ${color}66` }}
      >
        {mm}:{ss}
      </div>
      <div className="text-[8px] uppercase tracking-[0.2em] text-cream/40">
        {label}
      </div>
    </div>
  );
}
