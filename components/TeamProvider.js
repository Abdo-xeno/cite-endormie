"use client";

import { createContext, useContext, useEffect, useState } from "react";

const TeamContext = createContext({ team: "", setTeam: () => {} });

export function TeamProvider({ children }) {
  const [team, setTeamState] = useState("");

  useEffect(() => {
    try {
      const t = sessionStorage.getItem("cite-team");
      if (t) setTeamState(t);
    } catch (e) {}
  }, []);

  const setTeam = (name) => {
    setTeamState(name);
    try {
      sessionStorage.setItem("cite-team", name);
    } catch (e) {}
  };

  return (
    <TeamContext.Provider value={{ team, setTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

export const useTeam = () => useContext(TeamContext);
