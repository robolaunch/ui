import React, { ReactElement } from "react";
import "react-toggle/style.css";
import Toggle from "react-toggle";

interface IInputToggle {
  placeholder?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  leftLabel?: string;
  rightLabel?: string;
  icons?: any;
  color?: string;
}

export default function InputToggle({
  placeholder,
  checked,
  onChange,
  leftLabel,
  rightLabel,
  icons,
  color,
}: IInputToggle): ReactElement {
  return (
    <div className="flex flex-col gap-1 text-xs text-layer-light-700 ">
      <label>{placeholder}</label>
      <div className="flex items-center gap-2">
        {leftLabel && <span>{leftLabel}</span>}
        <Toggle
          className="toggle-color"
          color={"#AC2DFE"}
          icons={icons}
          onChange={(e) => onChange(e.target.checked)}
          checked={checked || false}
        />
        {rightLabel && <span>{rightLabel}</span>}
      </div>
    </div>
  );
}
