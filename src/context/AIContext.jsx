import React, { createContext, useContext, useState } from "react";

const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [selectedAIQuery, setSelectedAIQuery] = useState("");

  return (
    <AIContext.Provider value={{ selectedAIQuery, setSelectedAIQuery }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => useContext(AIContext);
