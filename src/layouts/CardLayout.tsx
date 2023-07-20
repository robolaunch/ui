import React, { ReactElement } from "react";

interface ICard {
  children: ReactElement | ReactElement[];
  ref?: any;
  loading?: boolean;
  className?: string;
  style?: any;
}

export default function CardLayout({
  children,
  ref,
  loading,
  className,
  style,
}: ICard): ReactElement {
  return (
    <div
      ref={ref}
      className={`bg-layer-light-50 shadow-lg p-1.5 rounded-lg animate__animated animate__fadeIn transition-all duration-500 border border-layer-light-200 ${className}`}
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
    >
      {children}
    </div>
  );
}
