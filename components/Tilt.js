"use client";

import { useRef } from "react";

/**
 * Relief 3D vivant : l'élément s'incline vers le curseur (effet hologramme),
 * avec un reflet lumineux qui suit la souris. Se remet à plat à la sortie.
 */
export default function Tilt({ children, className = "", max = 7 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max * 2}deg) rotateY(${
      (px - 0.5) * max * 2
    }deg) scale(1.015)`;
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };

  const reset = () => {
    const el = ref.current;
    if (el)
      el.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`group/tilt relative transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,245,210,0.13), transparent 48%)",
        }}
      />
    </div>
  );
}
