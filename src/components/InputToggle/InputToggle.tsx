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
  className?: string;
}

export default function InputToggle({
  placeholder,
  checked,
  onChange,
  leftLabel,
  rightLabel,
  icons,
  color,
  className,
}: IInputToggle): ReactElement {
  return (
    <div
      className={`flex flex-col text-xs text-layer-light-700 ${
        placeholder && "gap-1"
      } ${className} `}
    >
      <label>{placeholder}</label>
      <div className="flex items-center gap-2">
        {leftLabel && <span>{leftLabel}</span>}
        <Toggle
          className={`toggle-color `}
          icons={icons}
          onChange={(e) => onChange(e.target.checked)}
          checked={checked || false}
        />
        {rightLabel && <span>{rightLabel}</span>}
      </div>
    </div>
  );
}
