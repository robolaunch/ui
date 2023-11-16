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
      className={`transition-300 animate__animated animate__fadeIn flex items-center justify-center rounded-lg border-2 px-1 py-3 text-xs  capitalize text-layer-dark-700
        ${selected && " shadow"}
        ${
          disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-[0.98] "
        }

        ${
          selected && disabled
            ? "border-layer-dark-400"
            : selected && !disabled
            ? "border-layer-primary-600"
            : !selected && disabled
            ? "border-layer-light-200"
            : "border-layer-light-200"
        }

        ${className}
        `}
      onClick={onClick}
    >
      {text}
    </div>
  );
}
