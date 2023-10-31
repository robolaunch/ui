import React, { ReactElement } from "react";

interface ICFSection {
  children: ReactElement | ReactElement[];
}

export default function CFSection({ children }: ICFSection): ReactElement {
  return <div className="flex w-full flex-col gap-1">{children}</div>;
}
