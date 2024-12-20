import { ReactElement } from "react";

interface InterfaceInputError {
  touched?: any;
  error?: any;
  className?: string;
}

export default function InputError({
  touched,
  error,
  className,
}: InterfaceInputError): ReactElement {
  return (
    <div
      className={`flex items-center justify-center py-1 ${className} transition-300`}
    >
      {touched && error && (
        <span className="text-[0.64rem] font-medium italic text-red-400">
          * {error}
        </span>
      )}
    </div>
  );
}
