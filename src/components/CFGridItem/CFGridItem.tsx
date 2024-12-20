import { ReactElement } from "react";

interface ICFGridItem {
  selected: boolean;
  disabled: boolean;
  text: string | ReactElement;
  onClick: () => void;
  className?: string;
}

export default function CFGridItem({
  selected,
  disabled,
  text,
  onClick,
  className,
}: ICFGridItem): ReactElement {
  return (
    <div
      className={`transition-300 animate-fadeIn flex items-center justify-center rounded-lg border-2 px-1 py-2 text-xs text-light-700
        ${selected && " shadow"}
        ${
          disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-[0.98] "
        }

        ${
          selected && disabled
            ? "border-light-400"
            : selected && !disabled
              ? "border-primary-400"
              : !selected && disabled
                ? "border-light-200"
                : "border-light-200"
        }

        ${className}
        `}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
