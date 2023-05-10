import React, { ReactElement, useState } from "react";

interface InputSelectProps {
  children: ReactElement | ReactElement[];
  placeholder?: string;
  name?: string;
  value?: string;
  disabled?: boolean;
  className?: string;
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
  onChange,
  onBlur,
}: InputSelectProps): ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`relative`}>
      <label
        className={`absolute z-10 transition-all duration-300 text-layer-light-700 ${
          isFocused || value
            ? "text-xs left-0 -top-6"
            : "text-sm left-3 top-2.5"
        }
        ${disabled && "cursor-not-allowed"}
        
        `}
        htmlFor=""
      >
        {placeholder}
      </label>
      <select
        className={`w-full p-2 h-10 bg-transparent outline-none transition-all duration-500
      border border-layer-light-300 rounded-md
      focus:border-layer-primary focus:ring-2 focus:ring-primary ${
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
