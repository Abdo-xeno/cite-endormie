"use client";

import { motion } from "framer-motion";

/**
 * LA SCÈNE — un tableau cinématographique en profondeur, pas une silhouette.
 *   • ciel + lune (ou soleil à l'aube) + étoiles
 *   • plan lointain (skyline), plan moyen (immeubles + fenêtres-écrans bleues)
 *   • brume, sol
 *   • les DORMEURS allongés, chacun avec la lueur froide de son écran
 *   • L'ÉVEILLÉ qui veille en doré
 *   • LE TYRAN qui marche lentement parmi les dormeurs (aura rouge)
 *
 * mode="sleep" (défaut) ou "dawn" (la cité réveillée : tout vire à l'or,
 * le Tyran a disparu, les dormeurs se sont redressés).
 * Données déterministes → pas de décalage d'hydratation.
 */
const FAR = Array.from({ length: 26 }, (_, i) => ({
  w: 10 + ((i * 7) % 16),
  h: 26 + ((i * 23) % 44),
  key: i,
}));

const MID = Array.from({ length: 16 }, (_, i) => {
  const w = 26 + ((i * 13) % 30);
  const h = 42 + ((i * 37) % 56);
  const cols = 2 + (i % 3);
  const rows = Math.max(3, Math.round(h / 13));
  const windows = Array.from({ length: cols * rows }, (_, j) => ({
    on: (i * 5 + j * 3) % 3 === 0,
    gold: (i * 7 + j) % 23 === 0,
  }));
  return { w, h, cols, windows, key: i };
});

const STARS = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 53) % 100,
  y: (i * 31) % 42,
  s: 0.6 + ((i * 17) % 10) / 10,
  key: i,
}));

// Dormeurs : x en %, échelle, l'Éveillé
const FIGS = [
  { x: 9, s: 0.9, e: false },
  { x: 20, s: 1.05, e: false },
  { x: 31, s: 0.8, e: false },
  { x: 43, s: 1.15, e: true },
  { x: 55, s: 0.9, e: false },
  { x: 67, s: 1.05, e: false },
  { x: 79, s: 0.85, e: false },
  { x: 90, s: 1, e: false },
];

// Une rangée lointaine, plus petite et plus sombre → profondeur de foule.
const FAR_FIGS = Array.from({ length: 13 }, (_, i) => ({
  x: 3 + i * 7.6,
  s: 0.42 + ((i * 3) % 4) * 0.04,
  e: false,
}));

function Sleeper({ f, dawn, far }) {
  const awake = dawn || f.e;
  const glow = awake ? "rgba(224,200,96,0.9)" : "rgba(110,160,225,0.8)";
  return (
    <div
      className={`absolute ${far ? "bottom-[15%] opacity-50" : "bottom-[6%]"}`}
      style={{ left: `${f.x}%`, transform: `scale(${f.s})`, transformOrigin: "bottom" }}
    >
      <div className="relative">
        {/* lueur de l'écran */}
        <motion.div
          className="absolute -left-2 bottom-1 h-4 w-7 rounded-full blur-[5px]"
          style={{ background: glow }}
          animate={
            f.e
              ? { opacity: [0.6, 1, 0.7], scale: [1, 1.25, 1] }
              : { opacity: [0.5, 0.85, 0.5] }
          }
          transition={{
            duration: f.e ? 3.4 : 2.2 + (f.x % 3),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* corps */}
        {awake ? (
          <>
            {/* redressé : assis */}
            <div className="h-7 w-3.5 rounded-t-md bg-[#060f1b]" />
            <div className="absolute -top-3 left-0 h-3 w-3.5 rounded-full bg-[#060f1b]" />
          </>
        ) : (
          <>
            {/* allongé / avachi */}
            <div className="h-3 w-12 rounded-t-[30px] rounded-b-sm bg-[#05101c]" />
            <div className="absolute -top-2 left-8 h-3 w-3 rounded-full bg-[#05101c]" />
          </>
        )}
      </div>
    </div>
  );
}

export function Mosque({ dawn }) {
  const body = "#050f1b";
  const win = dawn ? "rgba(224,200,96,0.92)" : "rgba(112,162,228,0.75)";
  const finial = dawn ? "#ffe9a8" : "rgba(224,200,96,0.7)";
  const Minaret = ({ h }) => (
    <div className="relative flex flex-col items-center">
      <div
        className="mb-0.5 h-1.5 w-1.5 rounded-full"
        style={{ background: finial, boxShadow: `0 0 8px ${finial}` }}
      />
      <div style={{ width: 7, height: 12, background: body, borderRadius: "50% 50% 0 0" }} />
      <div style={{ width: 9, height: h, background: body }} />
    </div>
  );
  return (
    <div className="relative flex items-end gap-2">
      {/* La mosquée « appelle » : halo doré discret la nuit, ardent à l'aube */}
      <div
        className="absolute -inset-6 -z-10 rounded-full blur-2xl animate-breathe"
        style={{ background: dawn ? "rgba(224,200,96,0.28)" : "rgba(224,200,96,0.09)" }}
      />
      <Minaret h={118} />
      <div className="relative flex flex-col items-center">
        <div
          className="mb-0.5 h-2 w-2 rounded-full"
          style={{ background: finial, boxShadow: `0 0 10px ${finial}` }}
        />
        <div
          style={{
            width: 80,
            height: 48,
            background: body,
            borderRadius: "50% 50% 6% 6% / 88% 88% 12% 12%",
          }}
        />
        <div
          className="relative flex items-end justify-center gap-2"
          style={{ width: 96, height: 76, background: body, borderRadius: "6px 6px 0 0" }}
        >
          {[0, 1, 2].map((k) => (
            <span
              key={k}
              className="mb-2 block"
              style={{
                width: 12,
                height: 30,
                borderRadius: "12px 12px 0 0",
                background: win,
                boxShadow: `0 0 8px ${win}`,
              }}
            />
          ))}
        </div>
      </div>
      <Minaret h={118} />
    </div>
  );
}

export default function CityScene({ mode = "sleep", className = "" }) {
  const dawn = mode === "dawn";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Étoiles */}
      {!dawn &&
        STARS.map((s) => (
          <span
            key={s.key}
            className="absolute rounded-full bg-cream/60 animate-flicker"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.s,
              height: s.s,
              animationDelay: `${(s.key % 5) * 0.6}s`,
            }}
          />
        ))}

      {/* Lune / Soleil */}
      <motion.div
        className="absolute"
        style={dawn ? { bottom: "30%", left: "50%", x: "-50%" } : { top: "12%", right: "16%" }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="rounded-full"
          style={{
            width: dawn ? 220 : 90,
            height: dawn ? 220 : 90,
            background: dawn
              ? "radial-gradient(circle, rgba(255,240,190,0.95) 0%, rgba(224,200,96,0.5) 40%, transparent 72%)"
              : "radial-gradient(circle, rgba(245,242,230,0.95) 0%, rgba(200,210,230,0.5) 55%, transparent 75%)",
            filter: dawn ? "blur(2px)" : "none",
            boxShadow: dawn
              ? "0 0 120px 40px rgba(224,200,96,0.35)"
              : "0 0 60px 10px rgba(220,228,245,0.25)",
          }}
        />
      </motion.div>

      {/* Horizon désertique réel, au lointain (la cité dans le désert) */}
      <div
        className="absolute inset-x-0 bottom-[20%] h-[34%] bg-cover bg-bottom"
        style={{
          backgroundImage: "url(/desert.jpg)",
          opacity: dawn ? 0.4 : 0.3,
          filter: dawn ? "saturate(1.1) brightness(1.05)" : "brightness(0.7)",
          maskImage: "linear-gradient(180deg, transparent 0%, #000 45%, #000 100%)",
          WebkitMaskImage: "linear-gradient(180deg, transparent 0%, #000 45%, #000 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-[20%] h-[34%]"
        style={{
          background: dawn
            ? "linear-gradient(180deg, transparent, rgba(28,16,6,0.45))"
            : "linear-gradient(180deg, transparent, rgba(6,18,31,0.62))",
        }}
      />

      {/* Plan lointain — skyline */}
      <div className="absolute inset-x-0 bottom-[24%] flex h-[26%] items-end justify-center gap-[2px] opacity-50">
        {FAR.map((b) => (
          <div
            key={b.key}
            className="flex-shrink-0 rounded-t-[2px]"
            style={{
              width: b.w,
              height: `${b.h}%`,
              background: dawn ? "#1a2433" : "#0a1726",
            }}
          />
        ))}
      </div>

      {/* Plan moyen — immeubles + fenêtres-écrans */}
      <div className="absolute inset-x-0 bottom-[16%] flex h-[48%] items-end justify-center gap-[3px]">
        {MID.map((b) => (
          <div
            key={b.key}
            className="relative flex-shrink-0 rounded-t-[3px]"
            style={{
              width: b.w,
              height: `${b.h}%`,
              background: "linear-gradient(180deg, #0a1a2b 0%, #04101c 100%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="absolute inset-x-[3px] top-2 grid gap-[3px]"
              style={{ gridTemplateColumns: `repeat(${b.cols}, 1fr)` }}
            >
              {b.windows.map((win, j) => {
                const golden = win.gold || dawn;
                return (
                  <span
                    key={j}
                    className="block rounded-[1px]"
                    style={{
                      height: 4,
                      background: win.on
                        ? golden
                          ? "rgba(224,200,96,0.92)"
                          : "rgba(112,162,228,0.85)"
                        : "rgba(255,255,255,0.04)",
                      boxShadow: win.on
                        ? golden
                          ? "0 0 7px rgba(224,200,96,0.85)"
                          : "0 0 7px rgba(112,162,228,0.7)"
                        : "none",
                      animation: win.on
                        ? `flicker ${2.2 + (j % 3) * 0.6}s ease-in-out ${(j % 5) * 0.5}s infinite`
                        : "none",
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* La mosquée — le cœur de la cité */}
      <div className="absolute bottom-[16%] left-1/2 z-[1] -translate-x-1/2">
        <Mosque dawn={dawn} />
      </div>

      {/* Brume */}
      <div
        className="absolute inset-x-0 bottom-[10%] h-[18%] blur-2xl animate-drift"
        style={{
          background: dawn
            ? "linear-gradient(180deg, transparent, rgba(224,200,96,0.12))"
            : "linear-gradient(180deg, transparent, rgba(40,74,99,0.35))",
        }}
      />

      {/* Sol */}
      <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-night-deep via-night-deep/70 to-transparent" />

      {/* Les dormeurs — rangée lointaine puis proche (profondeur) */}
      {FAR_FIGS.map((f, i) => (
        <Sleeper key={`far${i}`} f={f} dawn={dawn} far />
      ))}
      {FIGS.map((f, i) => (
        <Sleeper key={i} f={f} dawn={dawn} />
      ))}

      {/* Le Tyran qui marche (seulement quand la cité dort) */}
      {!dawn && (
        <motion.div
          className="absolute bottom-[7%] z-10"
          animate={{ x: ["-8%", "108%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative">
            <div className="absolute -inset-5 rounded-full bg-blood/20 blur-xl" />
            {/* corps */}
            <div className="h-16 w-6 rounded-t-[16px] bg-black" />
            {/* tête */}
            <div className="absolute -top-4 left-0.5 h-5 w-5 rounded-full bg-black" />
            {/* couronne */}
            <div
              className="absolute -top-7 left-0 h-3 w-6 bg-black"
              style={{ clipPath: "polygon(0 100%,15% 0,35% 100%,50% 0,65% 100%,85% 0,100% 100%)" }}
            />
            <div className="absolute -top-[26px] left-1 h-1 w-4 rounded bg-blood/60 blur-[2px]" />
          </div>
        </motion.div>
      )}
    </div>
  );
}
