"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Fine ligne dorée en haut de l'écran qui se remplit au scroll — on mesure
 * sa descente dans la cité. Donne un sentiment de progression « jeu ».
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light"
      style={{ scaleX, boxShadow: "0 0 12px rgba(212,175,55,0.6)" }}
    />
  );
}
