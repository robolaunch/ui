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
        className="text-light-700 flex min-w-fit flex-wrap gap-1 text-xs font-medium"
        htmlFor={name}
      >
        {name}
      </label>
      <input
        ref={ref}
        disabled={disabled}
        className={`scale-150 accent-primary outline-none ${className}`}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        type="checkbox"
        checked={value}
      />
    </div>
  );
}
