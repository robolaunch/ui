import { ReactElement } from "react";

interface ICardLayout {
  children: ReactElement | ReactElement[];
  ref?: any;
  loading?: boolean;
  className?: string;
  style?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
}

export default function CardLayout({
  children,
  ref,
  loading,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
}: ICardLayout): ReactElement {
  return (
    <div
      ref={ref}
      className={`animate-fadeIn rounded-lg border border-light-200 bg-light-50 p-1.5 shadow-md transition-all duration-500 ${className}`}
      style={
        loading
          ? {
              backgroundImage: `url("/svg/general/loading.svg")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "5%",
            }
          : style
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
