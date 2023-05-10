import React, { ReactElement, useState } from "react";
import WidgetLayout from "../../layouts/WidgetLayout";
import { BiErrorCircle } from "react-icons/bi";
import Button from "../Button/Button";
import { MdPayment } from "react-icons/md";

export default function InvoiceStatusWidget(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorCount, setErrorCount] = useState<number>(1);

  return (
    <WidgetLayout
      title={`Invoice Status Widget`}
      subtitle={""}
      icon={<MdPayment size={22} className="text-layer-light-700" />}
    >
      {(() => {
        switch (errorCount) {
          case 0:
            return (
              <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                  <div className="flex items-center justify-center text-3xl font-medium border-4 border-layer-secondary-500 rounded-full w-32 h-32">
                    <span>104$</span>
                  </div>
                  <span className="text-sm font-medium">
                    This month amount spent so far
                  </span>
                  <span className="text-xs text-center">
                    Your organization has {errorCount} unpaid invoice.
                    <br />
                    <br />
                    If you want to see more details, check the graph below.
                  </span>
                </div>
              </div>
            );
          default:
            return (
              <div className="h-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                  <BiErrorCircle size={80} className="text-red-500" />
                  <span className="text-sm font-medium">Payment Error</span>
                  <span className="text-xs text-center">
                    Your organization has {errorCount} unpaid invoice.
                    <br />
                    <br />
                    Please pay your invoice to continue using the service.
                  </span>
                  <Button
                    className="!h-10 !w-32 !text-xs"
                    text={`Pay Invoice`}
                  />
                </div>
              </div>
            );
        }
      })()}
    </WidgetLayout>
  );
}
