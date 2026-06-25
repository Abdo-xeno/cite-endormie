"use client";

import { useEffect, useRef } from "react";

/**
 * Une lueur de bougie chaude qui suit le curseur — on traverse la cité
 * dans le noir, une lumière à la main. Désactivé sur écrans tactiles.
 */
export default function CursorLight() {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    const el = ref.current;
    if (!el) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;
    let shown = false;

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        shown = true;
        el.style.opacity = "1";
      }
    };
    const leave = () => {
      shown = false;
      el.style.opacity = "0";
    };
    const loop = () => {
      x += (tx - x) * 0.16;
      y += (ty - y) * 0.16;
      el.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[50] opacity-0 transition-opacity duration-700"
      style={{ mixBlendMode: "screen" }}
    >
      <div
        className="-translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(224,200,96,0.10) 0%, rgba(224,200,96,0.05) 32%, transparent 66%)",
        }}
      />
    </div>
  );
}
