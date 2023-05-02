import React, { ReactElement } from "react";

interface InputCheckboxProps {
  name?: string;
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function InputCheckbox({
  name,
  value,
  onChange,
  onBlur,
  className,
  disabled,
}: InputCheckboxProps): ReactElement {
  return (
    <input
      disabled={disabled}
      className={`scale-150 outline-none accent-primary ${className}`}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      type="checkbox"
      checked={value}
    />
  );
}
