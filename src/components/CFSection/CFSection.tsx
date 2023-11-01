import React, { ReactElement } from "react";

interface ICFSection {
  children: ReactElement | ReactElement[];
  gap?: number;
}

export default function CFSection({
  children,
  gap = 1,
}: ICFSection): ReactElement {
  return <div className={`flex w-full flex-col gap-${gap}`}>{children}</div>;
}
