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
    <div className="w-full font-light text-xs text-center pt-1 h-2">
      {touched && error && (
        <span className="text-[0.64rem] font-medium text-red-500 italic">
          * {error}
        </span>
      )}
    </div>
  );
}
