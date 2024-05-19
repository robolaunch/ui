import { ReactElement } from "react";

interface IButton {
  type?: "button" | "submit" | "reset";
  text: any;
  onClick?: () => void;
  onMouseDown?: () => void;
  loading?: boolean | null;
  disabled?: boolean;
  className?: string;
  tooltip?: string;
}

export default function Button({
  type,
  text,
  onClick,
  onMouseDown,
  loading,
  disabled,
  className,
  tooltip,
}: IButton): ReactElement {
  return (
    <button
      title={tooltip}
      type={type || "button"}
      disabled={disabled}
      onClick={() => (onClick ? onClick() : null)}
      onMouseDown={onMouseDown}
      className={`transition-300 flex h-12 w-full items-center justify-center rounded-md bg-primary-500 text-xs font-medium text-white hover:scale-[0.99] hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 active:bg-purple-900 disabled:cursor-not-allowed disabled:bg-primary-300 disabled:hover:scale-100 ${className}`}
    >
      {loading ? (
        <img
          className="h-10 w-10"
          src="/svg/general/loading.svg"
          alt="loading"
        />
      ) : (
        text
      )}
    </button>
  );
}
