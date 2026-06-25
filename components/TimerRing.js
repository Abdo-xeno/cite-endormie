"use client";

import { motion } from "framer-motion";

export default function TimerRing({ minutes = 3, color = "#d4af37" }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3"
        />
        <motion.circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: 0 }}
          whileInView={{ strokeDashoffset: circumference * 0.18 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-2xl font-bold text-cream leading-none">
          {minutes}
        </span>
        <span className="text-[10px] tracking-widest text-cream/50 uppercase">min</span>
      </div>
    </div>
  );
}
