"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Le monde, en fond, qui VIT et RÉAGIT. Champ de particules en profondeur
 * (poussière lointaine, braises, rares lucioles), brume qui dérive, rais de
 * lumière. Voile bleu froid en haut (le sommeil) qui se consume en or vers
 * le bas (l'aube) — tout couplé au scroll.
 */
export default function Atmosphere() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const cold = useTransform(scrollYProgress, [0, 0.4], [0.32, 0]);
  const warm = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.16, 0.55]);
  const rays = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.16, 0.3]);
  const nightSky = useTransform(scrollYProgress, [0, 0.45], [0.55, 0]);
  const dawnSky = useTransform(scrollYProgress, [0.5, 1], [0, 0.62]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    const parts = [];
    const COUNT = 78;
    const rand = (a, b) => a + Math.random() * (b - a);
    let mx = -9999;
    let my = -9999;
    const onMove = (ev) => {
      mx = ev.clientX;
      my = ev.clientY;
    };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(initial) {
      const r = Math.random();
      const kind = r > 0.93 ? "fire" : r > 0.55 ? "ember" : "dust";
      const base = {
        x: rand(0, w),
        y: initial ? rand(0, h) : h + rand(0, 80),
        tw: rand(0, Math.PI * 2),
        kind,
      };
      if (kind === "dust")
        return { ...base, r: rand(0.4, 1.1), vy: rand(0.05, 0.2), vx: rand(-0.05, 0.05), a: rand(0.05, 0.18), tws: rand(0.004, 0.02), blue: Math.random() < 0.45, sway: 0 };
      if (kind === "fire")
        return { ...base, r: rand(1.6, 3.2), vy: rand(0.1, 0.32), vx: 0, a: rand(0.5, 0.9), tws: rand(0.02, 0.05), blue: false, sway: rand(0.2, 0.5) };
      return { ...base, r: rand(0.8, 2.2), vy: rand(0.2, 0.6), vx: rand(-0.15, 0.15), a: rand(0.18, 0.55), tws: rand(0.01, 0.04), blue: Math.random() < 0.18, sway: 0 };
    }

    function init() {
      parts.length = 0;
      for (let i = 0; i < COUNT; i++) parts.push(spawn(true));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const e of parts) {
        e.tw += e.tws;
        e.y -= e.vy;
        e.x += e.vx + (e.sway ? Math.sin(e.tw) * e.sway : 0);
        // La torche du curseur écarte la poussière.
        const dx = e.x - mx;
        const dy = e.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d2 / 16000) * 1.5;
          e.x += (dx / d) * f;
          e.y += (dy / d) * f;
        }
        if (e.y < -14) Object.assign(e, spawn(false));
        const flick = 0.55 + 0.45 * Math.sin(e.tw);
        const alpha = e.a * flick;
        const color = e.blue
          ? `rgba(122,170,232,${alpha})`
          : `rgba(224,200,96,${alpha})`;
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.shadowBlur = e.kind === "fire" ? 16 : e.kind === "ember" ? 9 : 0;
        ctx.shadowColor = color;
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => {
      resize();
      init();
    };

    resize();
    init();
    draw();
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dégradé de base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 95% at 50% 8%, #123654 0%, #0b2236 36%, #06121f 70%, #040c15 100%)",
        }}
      />

      {/* Ciel étoilé réel (haut), fondu dans la nuit — se dissipe au scroll */}
      <motion.div
        className="absolute inset-0 bg-cover bg-top"
        style={{
          opacity: nightSky,
          backgroundImage: "url(/sky-night.jpg)",
          maskImage:
            "linear-gradient(180deg, #000 0%, #000 42%, transparent 78%)",
          WebkitMaskImage:
            "linear-gradient(180deg, #000 0%, #000 42%, transparent 78%)",
        }}
      />
      {/* Aube réelle (bas) — surgit en descendant */}
      <motion.div
        className="absolute inset-0 bg-cover bg-bottom"
        style={{
          opacity: dawnSky,
          backgroundImage: "url(/sky-dawn.jpg)",
          maskImage:
            "linear-gradient(0deg, #000 0%, #000 36%, transparent 72%)",
          WebkitMaskImage:
            "linear-gradient(0deg, #000 0%, #000 36%, transparent 72%)",
        }}
      />

      {/* Voile froid (le sommeil) — se consume en descendant */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: cold,
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(86,130,196,0.4) 0%, rgba(60,96,150,0.12) 40%, transparent 70%)",
        }}
      />

      {/* Rais de lumière */}
      <motion.div className="absolute inset-0" style={{ opacity: rays }}>
        <div
          className="absolute -top-1/4 left-[15%] h-[150%] w-40 rotate-12 bg-gradient-to-b from-gold/25 to-transparent blur-2xl animate-breathe"
          style={{ animationDelay: "-2s" }}
        />
        <div className="absolute -top-1/4 right-[22%] h-[150%] w-28 -rotate-12 bg-gradient-to-b from-sky-300/20 to-transparent blur-2xl animate-breathe" />
      </motion.div>

      {/* Brume qui dérive */}
      <div className="absolute -top-40 left-1/4 h-[60vw] w-[60vw] rounded-full bg-gold/[0.05] blur-[130px] animate-drift" />
      <div
        className="absolute top-1/3 -right-48 h-[52vw] w-[52vw] rounded-full bg-night-700/30 blur-[130px] animate-drift"
        style={{ animationDelay: "-7s" }}
      />

      {/* Champ de particules vivant */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Réchauffement doré (l'aube) */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: warm,
          background:
            "radial-gradient(120% 80% at 50% 100%, rgba(224,200,96,0.24) 0%, rgba(212,175,55,0.07) 40%, transparent 70%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(115% 80% at 50% 38%, transparent 50%, rgba(2,7,12,0.62) 100%)",
        }}
      />
    </div>
  );
}
