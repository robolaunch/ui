import { CSSProperties, ReactElement } from "react";

interface ICard {
  children: ReactElement | ReactElement[];
  className?: string;
  style?: CSSProperties;
  loading?: boolean;
  dataTut?: string;
}

export default function Card({
  children,
  className,
  style,
  loading,
  dataTut,
}: ICard): ReactElement {
  return (
    <div
      data-tut={dataTut}
      className={`animate-fadeIn h-full w-full rounded-lg border border-light-200 bg-light-50 p-1 shadow-md ${className}`}
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
