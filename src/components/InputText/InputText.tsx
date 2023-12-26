import React, { ReactElement, useState } from "react";

interface InputTextProps {
  type?: "text" | "password" | "email" | "number";
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputPlaceholder?: string;
  inputHoverText?: string | undefined;
  onSubmitEnter?: () => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputText({
  type,
  name,
  value,
  placeholder,
  disabled,
  className,
  inputPlaceholder,
  inputHoverText,
  onSubmitEnter,
  onFocus,
  onChange,
  onBlur,
}: InputTextProps): ReactElement {
  const [isFocused, setIsFocused] = useState(
    value && value.length > 0 ? true : false,
  );

  return (
    <div className="animate__animated animate__fadeIn relative">
      <label
        className={`pointer-events-none absolute z-10 text-xs text-light-700 transition-all duration-300 ${
          isFocused ? "-top-6 left-0 text-xs" : "left-3 top-2.5 text-sm"
        }`}
        htmlFor=""
      >
        {placeholder}
      </label>
      <input
        autoComplete="off"
        disabled={disabled}
        className={`h-9 w-full rounded border border-light-300 p-3
      text-xs  outline-none
       transition-all duration-500 focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed ${className}`}
        type={type || "text"}
        name={name}
        value={value}
        onFocus={() => !disabled && setIsFocused(true)}
        onChange={onChange}
        onBlur={(e) => {
          onBlur && onBlur(e);
          !value && setIsFocused(false);
        }}
        onKeyDown={(e: any) => {
          if (e.key === "Enter") {
            onSubmitEnter && onSubmitEnter();
          }
        }}
        placeholder={inputPlaceholder}
        title={inputHoverText}
      />
    </div>
  );
}
