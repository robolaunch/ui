import React, { ReactElement } from "react";

interface ICard {
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
}: ICard): ReactElement {
  return (
    <div
      ref={ref}
      className={`animate__animated animate__fadeIn border-light-200 bg-light-50 rounded-lg border p-1.5 shadow-md transition-all duration-500 ${className}`}
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
