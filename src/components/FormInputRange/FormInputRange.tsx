import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { ReactElement } from "react";

interface IFormInputRange {
  label: string;
  tip: string;
  dataTut?: string;
  InputProps: any;
  min?: number;
  max?: number;
  disabled?: boolean;
  error?: any;
  touched?: boolean;
  vertical?: boolean;
  classNameContainer?: string;
  classNameLabel?: string;
  rightTip?: boolean;
}

export default function FormInputRange({
  label,
  tip,
  dataTut,
  InputProps,
  min,
  max,
  disabled,
  error,
  touched,
  vertical,
  classNameContainer,
  classNameLabel,
  rightTip = false,
}: IFormInputRange): ReactElement {
  return (
    <CFInfoBar
      label={label}
      tip={tip}
      dataTut={dataTut}
      error={error}
      touched={touched}
      vertical={vertical}
      classNameContainer={classNameContainer}
      classNameLabel={classNameLabel}
      rightTip={rightTip}
    >
      <input
        min={min}
        max={max}
        type="range"
        autoComplete="off"
        {...InputProps}
        className={`ml-2 w-full ${disabled && "cursor-not-allowed"}`}
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
