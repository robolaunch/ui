import { ReactElement } from "react";
import useMain from "../../hooks/useMain";
import PercentageWidget from "../PercentageBar/PercentageBar";

export default function WidgetSystemOperatorCell(): ReactElement {
  const { pagesState } = useMain();

  return (
    <div className="flex items-center justify-center">
      <div className=" flex w-full flex-col items-center gap-1 ">
        <p className="text-xs font-medium">System Status (Operator)</p>
        <PercentageWidget
          hiddenCircle
          percentage={10}
          title={`${"systemStatus?.name"} Interface`}
        />
      </div>
    </div>
  );
}
