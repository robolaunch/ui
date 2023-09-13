import React, { ReactElement } from "react";

interface InputCheckboxProps {
  name?: string;
  ref?: any;
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export default function InputCheckbox({
  name,
  ref,
  value,
  onChange,
  onBlur,
  className,
  disabled,
}: InputCheckboxProps): ReactElement {
  return (
    <div className="flex gap-2">
      <label
        className="min-w-fit flex flex-wrap gap-1 text-xs font-medium text-layer-light-700"
        htmlFor={name}
      >
        {name}
      </label>
      <input
        ref={ref}
        disabled={disabled}
        className={`scale-150 outline-none accent-primary ${className}`}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        type="checkbox"
        checked={value}
      />
    </div>
  );
}
