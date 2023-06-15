import React, { ReactElement } from "react";

interface InterfaceInputError {
  touched: any;
  error: any;
}

export default function InputError({
  touched,
  error,
}: InterfaceInputError): ReactElement {
  return (
    <div className="flex items-center justify-center py-1">
      {touched && error && (
        <span className="text-[0.64rem] font-medium text-red-400 italic">
          * {error}
        </span>
      )}
    </div>
  );
}
