import { ReactElement } from "react";

interface ICard {
  children: ReactElement | ReactElement[];
  className?: string;
  dataTut?: string;
}

export default function Card({
  children,
  className,
  dataTut,
}: ICard): ReactElement {
  return (
    <div
      data-tut={dataTut}
      className={`animate__animated animate__fadeIn h-full w-full rounded-lg border border-light-200 bg-light-50 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}
