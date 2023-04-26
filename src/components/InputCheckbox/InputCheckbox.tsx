import React, { ReactElement } from "react";

interface InputCheckboxProps {
  name?: string;
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function InputCheckbox({
  name,
  value,
  onChange,
  onBlur,
  className,
}: InputCheckboxProps): ReactElement {
  return (
    <input
      className={`scale-150 outline-none accent-primary ${className}`}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      type="checkbox"
      checked={value}
    />
  );
}
