import React, { ReactElement } from "react";

interface InputCheckboxProps {
  name?: string;
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function InputCheckbox({
  name,
  value,
  onChange,
  onBlur,
}: InputCheckboxProps): ReactElement {
  return (
    <input
      className="scale-150 outline-none accent-primary"
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      type="checkbox"
      checked={value}
    />
  );
}
