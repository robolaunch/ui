import React, { ReactElement } from "react";

interface IDashboardLayout {
  widget1: ReactElement;
  widget2: ReactElement;
  widget3: ReactElement;
  table: ReactElement;
}

export default function DashboardLayout({
  widget1,
  widget2,
  widget3,
  table,
}: IDashboardLayout): ReactElement {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-full lg:col-span-4">{widget1}</div>
      <div className="col-span-full lg:col-span-5">{widget2}</div>
      <div className="col-span-full lg:col-span-3">{widget3}</div>
      <div className="col-span-full order-last">{table}</div>
    </div>
  );
}
