"use client";

import { useEffect } from "react";
import { useTeam } from "../TeamProvider";

/**
 * v2 — pas de seuil de nommage : l'équipe est fixée à « les Gardiens ».
 * Composant invisible, présent uniquement sur /v2. (La v1 garde son lobby.)
 */
export default function TeamGardiens() {
  const { team, setTeam } = useTeam();
  useEffect(() => {
    if (team !== "les Gardiens") setTeam("les Gardiens");
  }, [team, setTeam]);
  return null;
}
