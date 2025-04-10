// src/context/ColorContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const ColorContext = createContext();

// Exportamos colorMap para usarlo en ColorPicker
export const colorMap = {
  orange: "#f97316",
  blue: "#3b82f6",
  green: "#22c55e",
  red: "#ef4444",
  purple: "#8b5cf6",
  pink: "#ec4899",
  yellow: "#eab308",
  teal: "#14b8a6",
  indigo: "#6366f1",
  gray: "#6b7280",
  cyan: "#06b6d4",
  lime: "#84cc16",
  amber: "#f59e0b",
  emerald: "#10b981",
  fuchsia: "#d946ef"
};

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState(() => {
    const stored = localStorage.getItem("theme-color");
    return stored || "orange";
  });

  useEffect(() => {
    const cssColor = colorMap[color] || color;
    document.documentElement.style.setProperty("--custom-color", cssColor);
    localStorage.setItem("theme-color", color);
  }, [color]);

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  return (
    <ColorContext.Provider value={{ color, changeColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = () => useContext(ColorContext);