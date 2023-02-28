import React, { ReactElement, useState } from "react";

interface InputTextProps {
  type?: "text" | "password" | "email";
  name?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
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
  onSubmitEnter,
  onFocus,
  onChange,
  onBlur,
}: InputTextProps): ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <label
        className={`absolute z-10 transition-all duration-300 text-layer-light-700 ${
          isFocused ? "text-xs left-0 -top-6" : "text-sm left-3 top-2.5"
        }`}
        htmlFor=""
      >
        {placeholder}
      </label>
      <input
        className={`w-full p-3 h-10 outline-none transition-all duration-500
      border border-layer-light-300 rounded-md
      focus:border-layer-primary focus:ring-2 focus:ring-primary ${className}`}
        type={type || "text"}
        name={name}
        value={value}
        onFocus={() => setIsFocused(true)}
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
      />
    </div>
  );
}
