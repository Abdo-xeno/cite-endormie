"use client";

import { createContext, useContext, useState, useCallback } from "react";

const SealsContext = createContext({
  seals: { 1: false, 2: false, 3: false },
  lightSeal: () => {},
  litCount: 0,
});

export function SealsProvider({ children }) {
  const [seals, setSeals] = useState({ 1: false, 2: false, 3: false });

  const lightSeal = useCallback((n) => {
    setSeals((s) => (s[n] ? s : { ...s, [n]: true }));
  }, []);

  const litCount = (seals[1] ? 1 : 0) + (seals[2] ? 1 : 0) + (seals[3] ? 1 : 0);

  return (
    <SealsContext.Provider value={{ seals, lightSeal, litCount }}>
      {children}
    </SealsContext.Provider>
  );
}

export const useSeals = () => useContext(SealsContext);
