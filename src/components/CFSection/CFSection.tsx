import { ReactElement } from "react";

interface ICFSection {
  children: ReactElement | ReactElement[];
  gap?: number;
  vertical?: boolean;
}

export default function CFSection({
  children,
  gap = 4,
  vertical = false,
}: ICFSection): ReactElement {
  return (
    <div className={`flex w-full gap-${gap} ${!vertical && "flex-col"}`}>
      {children}
    </div>
  );
}
