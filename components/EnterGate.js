"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTeam } from "./TeamProvider";

/**
 * Le lobby de l'escape game. Étape 1 : l'appel de l'Éveillé. Étape 2 :
 * l'équipe s'inscrit au registre et choisit d'entrer avec ou sans le son.
 */
export default function EnterGate() {
  const { setTeam } = useTeam();
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("cite-entered")) setOpen(false);
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (step === 1 && inputRef.current) inputRef.current.focus();
  }, [step]);

  const enter = (withSound) => {
    const team = (name || "").trim() || "Les Éveillés";
    setTeam(team);
    try {
      sessionStorage.setItem("cite-entered", "1");
    } catch (e) {}
    try {
      window.dispatchEvent(new Event("cite:enter"));
      if (withSound) window.dispatchEvent(new Event("cite:sound"));
    } catch (e) {}
    setOpen(false);
  };

  const pathname = usePathname();
  if (pathname && pathname.startsWith("/v2")) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-[#04090f] px-6 text-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
        >
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />

          {/* Braises */}
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 h-1 w-1 rounded-full bg-gold/70"
              style={{ left: `${6 + i * 8}%` }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -500 - (i % 4) * 60, opacity: [0, 1, 0] }}
              transition={{
                duration: 5 + (i % 5),
                delay: i * 0.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

          <AnimatePresence mode="wait">
            {step === 0 ? (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Bougie */}
                <div className="mb-10 flex flex-col items-center">
                  <motion.div
                    className="mb-1 h-4 w-3 rounded-full bg-gold"
                    style={{ filter: "drop-shadow(0 0 14px #d4af37)" }}
                    animate={{
                      scale: [1, 1.18, 0.95, 1],
                      opacity: [1, 0.8, 1, 0.9],
                    }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="h-14 w-2 rounded-sm bg-gradient-to-b from-cream/80 to-cream/30" />
                </div>

                <p className="mb-5 text-xs uppercase tracking-[0.35em] text-gold/70">
                  La salle est scellée
                </p>
                <div className="relative overflow-hidden">
                  <h1 className="font-display text-5xl font-bold leading-none text-cream text-glow-gold md:text-7xl">
                    LA CITÉ ENDORMIE
                  </h1>
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-0 h-full w-1/4 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-sweep" />
                  </div>
                </div>
                <p className="mt-6 max-w-md font-display text-lg italic text-gold-light/80">
                  L'Éveillé vous appelle à l'aide. Le Sage vous guidera.
                  <br />
                  Trois sceaux vous séparent du réveil de la cité.
                </p>

                <button
                  onClick={() => setStep(1)}
                  className="no-tap-highlight mt-12 rounded-full border border-gold/50 bg-gold/10 px-10 py-4 font-display text-lg tracking-wide text-cream transition-all duration-500 hover:border-gold hover:bg-gold/20"
                >
                  <span className="text-glow-gold">Commencer l'épreuve →</span>
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="team"
                onSubmit={(e) => {
                  e.preventDefault();
                  enter(true);
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 flex w-full max-w-lg flex-col items-center"
              >
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold/70">
                  Registre de la cité
                </p>
                <h2 className="mb-2 font-display text-3xl font-bold text-cream md:text-4xl">
                  Nommez votre équipe
                </h2>
                <p className="mb-10 text-sm italic text-cream/45">
                  Le nom sous lequel l'Histoire retiendra votre réveil.
                </p>

                <input
                  ref={inputRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={28}
                  placeholder="Les Gardiens de l'Aube…"
                  className="w-full border-b-2 border-gold/40 bg-transparent pb-3 text-center font-display text-3xl text-cream caret-gold outline-none transition-colors duration-300 placeholder:text-cream/20 focus:border-gold md:text-4xl"
                  style={{ textShadow: "0 0 30px rgba(212,175,55,0.4)" }}
                />

                <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="submit"
                    className="no-tap-highlight rounded-full border border-gold/50 bg-gold/15 px-8 py-3.5 font-display text-lg tracking-wide text-cream transition-all duration-500 hover:border-gold hover:bg-gold/25"
                  >
                    <span className="text-glow-gold">🔊 Entrer avec le son</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => enter(false)}
                    className="no-tap-highlight rounded-full border border-white/20 px-7 py-3.5 text-sm uppercase tracking-widest text-cream/60 transition-all duration-500 hover:border-white/40 hover:text-cream"
                  >
                    Entrer en silence
                  </button>
                </div>
                <p className="mt-6 text-xs text-cream/30">
                  Pour l'expérience complète, activez le son.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
