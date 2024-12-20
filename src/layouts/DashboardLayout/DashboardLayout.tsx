/* eslint-disable jsx-a11y/iframe-has-title */
import { ReactElement } from "react";

interface IDashboardLayout {
  widget1: ReactElement;
  widget2?: ReactElement;
  widget3: ReactElement;
  table: ReactElement;
  isMainDashboard?: boolean;
}

export default function DashboardLayout({
  widget1,
  widget2,
  widget3,
  table,
  isMainDashboard,
}: IDashboardLayout): ReactElement {
  return (
    <div className=".my-element my-element grid grid-cols-12 gap-6">
      <div
        className={`col-span-full ${
          isMainDashboard ? "lg:col-span-9" : "lg:col-span-4"
        } `}
      >
        {widget1}
      </div>
      {!isMainDashboard && (
        <div className="col-span-full lg:col-span-5">{widget2}</div>
      )}
      <div className="col-span-full lg:col-span-3">{widget3}</div>
      <div className="order-last col-span-full">{table}</div>
    </div>
  );
}
