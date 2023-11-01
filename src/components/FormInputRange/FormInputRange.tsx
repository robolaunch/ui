import React, { ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";

interface IFormInputRange {
  label: string;
  tip: string;
  dataTut?: string;
  InputProps: any;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function FormInputRange({
  label,
  tip,
  dataTut,
  InputProps,
  min,
  max,
  disabled,
}: IFormInputRange): ReactElement {
  return (
    <CFInfoBar label={label} tip={tip} dataTut={dataTut}>
      <input
        min={min}
        max={max}
        type="range"
        autoComplete="off"
        {...InputProps}
        className={`mb-3 ml-2 w-full ${disabled && "cursor-not-allowed"}`}
        style={{
          appearance: "auto",
          color: "#AC2DFE",
          accentColor: "currentcolor",
        }}
        disabled={disabled}
      />
    </CFInfoBar>
  );
}