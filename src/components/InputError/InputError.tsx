import React, { ReactElement } from "react";

interface InterfaceInputError {
  touched?: boolean;
  error?: string;
  className?: string;
}

export default function InputError({
  touched,
  error,
  className,
}: InterfaceInputError): ReactElement {
  return (
    <div className={`flex items-center justify-center py-1 ${className}`}>
      {touched && error && (
        <span className="text-[0.64rem] font-medium italic text-red-400">
          * {error}
        </span>
      )}
    </div>
  );
}
