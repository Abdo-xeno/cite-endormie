"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * MONDE SONORE VIVANT (Web Audio, 100% synthétisé).
 * Ce n'est pas une suite d'effets : c'est un paysage continu qui ÉVOLUE
 * avec la descente —
 *   • froid/aérien quand la cité dort (haut de page),
 *   • grave et tendu près du Tyran et des sceaux (milieu),
 *   • lumineux et résolu vers l'aube (bas).
 * Couches fondues selon le scroll + filtre qui s'ouvre + vie générative
 * (notes lointaines aléatoires). Effets (pose, erreur, sceau, éveil) joués
 * dans la même tonalité (ré) pour rester musicaux.
 */
export default function Ambience() {
  const [on, setOn] = useState(false);
  const [invite, setInvite] = useState(false);
  const onRef = useRef(false);
  const ctxRef = useRef(null);
  const gRef = useRef(null);
  const progRef = useRef(0);
  const genRef = useRef(null);

  const ensureCtx = () => {
    if (ctxRef.current) return ctxRef.current;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctxRef.current = new AC();
    return ctxRef.current;
  };

  // ---- Construction du monde sonore ----
  const startWorld = () => {
    const ctx = ensureCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    if (gRef.current) return;

    const oscs = [];
    const master = ctx.createGain();
    master.gain.value = 0;
    const masterLP = ctx.createBiquadFilter();
    masterLP.type = "lowpass";
    masterLP.frequency.value = 800;
    masterLP.Q.value = 0.5;
    masterLP.connect(master);
    master.connect(ctx.destination);

    const voice = (type, freq, detune, dest) => {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = freq;
      o.detune.value = detune || 0;
      o.connect(dest);
      o.start();
      oscs.push(o);
      return o;
    };
    const layer = (v) => {
      const g = ctx.createGain();
      g.gain.value = v;
      g.connect(masterLP);
      return g;
    };

    // BED — toujours là : ré grave + quinte + sub
    const gBed = layer(0.11);
    voice("sine", 146.83, -4, gBed);
    voice("sine", 220.0, 5, gBed);
    voice("triangle", 73.42, 0, gBed);

    // COLD — sommeil : aigus aériens, légère tension (haut de page)
    const gCold = layer(0);
    voice("sine", 587.33, -6, gCold);
    voice("sine", 659.25, 4, gCold);

    // TENSION — le Tyran : basse menaçante + trémolo (milieu)
    const gTension = layer(0);
    const tInner = ctx.createGain();
    tInner.gain.value = 0.5;
    tInner.connect(gTension);
    const tlp = ctx.createBiquadFilter();
    tlp.type = "lowpass";
    tlp.frequency.value = 190;
    tlp.connect(tInner);
    voice("sawtooth", 55, 0, tlp);
    const trem = ctx.createOscillator();
    trem.frequency.value = 4.6;
    const tremG = ctx.createGain();
    tremG.gain.value = 0.35;
    trem.connect(tremG).connect(tInner.gain);
    trem.start();
    oscs.push(trem);

    // WARM — l'aube : accord de ré majeur lumineux (bas de page)
    const gWarm = layer(0);
    voice("sine", 369.99, -3, gWarm); // fa#4
    voice("sine", 440.0, 4, gWarm); // la4
    voice("triangle", 587.33, 0, gWarm); // ré5

    // Respiration : LFO lent sur le filtre maître
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.05;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 260;
    lfo.connect(lfoG).connect(masterLP.frequency);
    lfo.start();
    oscs.push(lfo);

    master.gain.setValueAtTime(0.0001, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 2.4);

    gRef.current = { master, masterLP, gBed, gCold, gTension, gWarm, oscs };
    updateFromScroll();
    scheduleGen();
  };

  const stopWorld = () => {
    const ctx = ctxRef.current;
    const g = gRef.current;
    if (!ctx || !g) return;
    if (genRef.current) clearTimeout(genRef.current);
    genRef.current = null;
    g.master.gain.cancelScheduledValues(ctx.currentTime);
    g.master.gain.setValueAtTime(g.master.gain.value, ctx.currentTime);
    g.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
    const dead = g;
    gRef.current = null;
    setTimeout(() => {
      try {
        dead.oscs.forEach((o) => o.stop());
      } catch (e) {}
    }, 1700);
  };

  // ---- Évolution selon le scroll ----
  const updateFromScroll = () => {
    const g = gRef.current;
    const ctx = ctxRef.current;
    if (!g || !ctx) return;
    const p = progRef.current;
    const t = ctx.currentTime;
    const cold = Math.max(0, 1 - p * 1.8) * 0.05;
    const tension = Math.exp(-Math.pow((p - 0.5) / 0.2, 2)) * 0.06;
    const warm = Math.max(0, (p - 0.4) / 0.6) * 0.09;
    const cut = 700 + p * 2400;
    g.gCold.gain.setTargetAtTime(cold, t, 0.6);
    g.gTension.gain.setTargetAtTime(tension, t, 0.6);
    g.gWarm.gain.setTargetAtTime(warm, t, 0.6);
    g.masterLP.frequency.setTargetAtTime(cut, t, 0.9);
  };

  // ---- Vie générative : notes lointaines qui surgissent ----
  const playSoft = (f, peak, dur, pan) => {
    const ctx = ctxRef.current;
    const g = gRef.current;
    if (!ctx || !g) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    o.connect(gain);
    let out = gain;
    if (ctx.createStereoPanner) {
      const sp = ctx.createStereoPanner();
      sp.pan.value = pan || 0;
      gain.connect(sp);
      out = sp;
    }
    out.connect(g.masterLP);
    gain.gain.linearRampToValueAtTime(peak, t + 0.9);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t);
    o.stop(t + dur + 0.1);
  };

  const scheduleGen = () => {
    const g = gRef.current;
    if (!g) return;
    const p = progRef.current;
    const minor = [293.66, 349.23, 440, 587.33]; // ré mineur (froid)
    const major = [293.66, 369.99, 440, 659.25]; // ré majeur (chaud)
    const scale = p > 0.5 ? major : minor;
    const f = scale[Math.floor(Math.random() * scale.length)];
    playSoft(f, 0.03, 5, Math.random() * 1.6 - 0.8);
    genRef.current = setTimeout(scheduleGen, 6000 + Math.random() * 9000);
  };

  // ---- Effets (crisp, en ré) ----
  const note = (f, peak, dur, type, delay) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    const t = ctx.currentTime + (delay || 0);
    const o = ctx.createOscillator();
    o.type = type || "sine";
    o.frequency.value = f;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    o.connect(gain).connect(ctx.destination);
    gain.gain.linearRampToValueAtTime(peak, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t);
    o.stop(t + dur + 0.05);
  };
  const tick = () => gRef.current && note(587.33, 0.05, 0.16, "sine");
  const wrong = () => {
    if (!gRef.current) return;
    note(146.83, 0.09, 0.34, "sawtooth");
    note(138.59, 0.06, 0.38, "sine");
  };
  const chime = () => {
    if (!gRef.current) return;
    [587.33, 880, 1174.7].forEach((f, i) => note(f, i === 0 ? 0.11 : 0.06, 2.4, "sine", i * 0.05));
  };
  const awaken = () => {
    if (!gRef.current) return;
    const ctx = ctxRef.current;
    [293.66, 369.99, 440, 587.33].forEach((f) => {
      const t = ctx.currentTime;
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.setValueAtTime(f, t);
      o.frequency.linearRampToValueAtTime(f * 1.5, t + 2.2);
      const gain = ctx.createGain();
      gain.gain.value = 0;
      o.connect(gain).connect(ctx.destination);
      gain.gain.linearRampToValueAtTime(0.07, t + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);
      o.start(t);
      o.stop(t + 3.3);
    });
    [880, 1174.7, 1318.5, 1760].forEach((f, i) => note(f, 0.07, 2.6, "sine", 0.3 + i * 0.16));
  };

  const setOnSafe = (v) => {
    onRef.current = v;
    setOn(v);
  };
  const enable = () => {
    if (onRef.current) return;
    startWorld();
    setOnSafe(true);
    setInvite(false);
    setTimeout(() => chime(), 90); // preuve audible immédiate
  };
  const toggle = () => {
    setInvite(false);
    if (onRef.current) {
      stopWorld();
      setOnSafe(false);
    } else {
      enable();
    }
  };

  // Scroll → le monde évolue (met aussi à jour avant que le son démarre)
  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      progRef.current = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      updateFromScroll();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Invite « activez le son » même si le seuil a été passé
  useEffect(() => {
    const t = setTimeout(() => {
      if (!onRef.current) setInvite(true);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onSeal = () => chime();
    const onTick = () => tick();
    const onWrong = () => wrong();
    const onAwaken = () => awaken();
    const onSound = () => enable();
    window.addEventListener("seal:broken", onSeal);
    window.addEventListener("seal:tick", onTick);
    window.addEventListener("seal:wrong", onWrong);
    window.addEventListener("cite:awaken", onAwaken);
    window.addEventListener("cite:sound", onSound);
    return () => {
      window.removeEventListener("seal:broken", onSeal);
      window.removeEventListener("seal:tick", onTick);
      window.removeEventListener("seal:wrong", onWrong);
      window.removeEventListener("cite:awaken", onAwaken);
      window.removeEventListener("cite:sound", onSound);
    };
  }, []);

  const pathname = usePathname();
  if (pathname && pathname.startsWith("/v2")) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex items-center gap-3">
      <button
        onClick={toggle}
        aria-label={on ? "Couper le son" : "Activer le son"}
        className="no-tap-highlight flex items-center gap-2 rounded-full border border-gold/30 bg-night-900/70 px-4 py-2 text-xs uppercase tracking-[0.15em] text-cream/70 backdrop-blur-sm transition-all duration-300 hover:border-gold/60 hover:text-cream"
      >
        <span className="relative flex h-3 w-3 items-center justify-center">
          {on ? (
            <span className="flex items-end gap-[2px]">
              <span className="h-2 w-[2px] animate-pulse-soft bg-gold" />
              <span
                className="h-3 w-[2px] animate-pulse-soft bg-gold"
                style={{ animationDelay: "0.3s" }}
              />
              <span
                className="h-1.5 w-[2px] animate-pulse-soft bg-gold"
                style={{ animationDelay: "0.6s" }}
              />
            </span>
          ) : (
            <span className="h-[2px] w-3 bg-cream/40" />
          )}
        </span>
        {on ? "Le monde résonne" : "Silence"}
      </button>

      <AnimatePresence>
        {invite && (
          <motion.button
            onClick={enable}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="no-tap-highlight flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-2 text-xs italic text-gold-light animate-pulse-soft"
          >
            🔊 Activez le son — entrez dans le monde
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
