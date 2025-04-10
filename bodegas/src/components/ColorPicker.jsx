// src/components/ColorPicker.jsx
import React from "react";
import { useColor } from "../context/ColorContext"; 
import { colorMap } from "../context/ColorContext"; // Importamos colorMap

const ColorPicker = () => {
  const { color, changeColor } = useColor();

  const colors = [
     "green", "red", "purple", "pink", "yellow", "teal", 
    "indigo", "gray", "cyan", "lime", "amber", "emerald", "fuchsia","blue","orange", 
  ];

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn custom-bg m-1">
        Tema
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>

      <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl">
        {colors.map((c) => (
          <li key={c}>
            <label className="w-full btn btn-sm btn-block btn-ghost justify-start gap-2 cursor-pointer">
              <input
                type="radio"
                name="theme-dropdown"
                value={c}
                checked={color === c}
                onChange={() => changeColor(c)}
                className="hidden"
              />
              <span
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: colorMap[c] }}
              ></span>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorPicker;