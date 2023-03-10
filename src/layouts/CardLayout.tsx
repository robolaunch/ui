import React, { ReactElement } from "react";

interface ICard {
  children: ReactElement;
  loading?: boolean;
  className?: string;
}

export default function CardLayout({
  children,
  loading,
  className,
}: ICard): ReactElement {
  return (
    <div
      className={`bg-layer-light-50 shadow-lg p-1.5 rounded-lg animate__animated animate__fadeIn transition-all duration-500 ${className}`}
      style={
        loading
          ? {
              backgroundImage: `url("/svg/general/loading.svg")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "10%",
            }
          : {}
      }
    >
      {children}
    </div>
  );
}
