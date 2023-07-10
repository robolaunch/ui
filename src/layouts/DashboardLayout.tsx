import React, { ReactElement } from "react";

interface IDashboardLayout {
  widget1: ReactElement;
  widget2: ReactElement;
  widget3: ReactElement;
  widget4: ReactElement;
  table: ReactElement;
}

export default function DashboardLayout({
  widget1,
  widget2,
  widget3,
  widget4,
  table,
}: IDashboardLayout): ReactElement {
  return (
    <div
      className="grid gap-8"
      style={{
        gridTemplateColumns: "repeat(24, minmax(0, 1fr))",
      }}
    >
      <div className="col-span-full md:col-span-12 xl:col-span-8 2xl:col-span-5">
        {widget1}
      </div>
      <div className="col-span-full md:col-span-12 xl:col-span-9 2xl:col-span-6">
        {widget2}
      </div>
      <div className="col-span-full md:col-span-12 xl:col-span-full xl:order-4 2xl:col-span-8">
        {widget3}
      </div>
      <div className="col-span-full md:col-span-12 xl:col-span-7 xl:order-3 2xl:col-span-5">
        {widget4}
      </div>
      <div
        className="col-span-full order-last"
        style={{
          gridColumn: "span 24 / span 24",
        }}
      >
        {table}
      </div>
    </div>
  );
}
