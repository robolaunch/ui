import React, { ReactElement, useState } from "react";

interface InputSelectProps {
  children: ReactElement | ReactElement[];
  placeholder?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
  wrapClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

export default function InputSelect({
  children,
  placeholder,
  name,
  value,
  disabled,
  className,
  wrapClassName,
  onChange,
  onBlur,
}: InputSelectProps): ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative ${wrapClassName}`}>
      <label
        className={`pointer-events-none absolute z-10 text-layer-light-700 transition-all duration-300 ${
          isFocused || value
            ? "-top-6 left-0 text-xs"
            : "left-3 top-2.5 text-sm"
        }
        ${disabled && "cursor-not-allowed"}
        
        `}
        htmlFor=""
      >
        {placeholder}
      </label>
      <select
        className={`focus:border-layer-primary h-10 w-full rounded-md border border-layer-light-300 bg-transparent
      p-2 text-sm outline-none
      transition-all duration-500 focus:ring-2 focus:ring-primary ${
        disabled ? "cursor-not-allowed" : "hover:cursor-pointer"
      } ${className}`}
        name={name}
        value={value}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onChange={onChange}
        onBlur={(e) => {
          onBlur && onBlur(e);
          !value && setIsFocused(false);
        }}
      >
        {children}
      </select>
    </div>
  );
}
