import { ReactElement, useEffect, useState } from "react";
import useMain from "../../hooks/useMain";
import PercentageWidget from "../PercentageBar/PercentageBar";

export default function WidgetCPUCell(): ReactElement {
  const [cpuState, setCpuState] = useState<any>(undefined);

  const { pagesState } = useMain();

  useEffect(() => {
    setCpuState({
      coreCount: pagesState?.instance?.resources?.hardware?.cpu?.totalCore,
      percentage: pagesState?.instance?.resources?.hardware?.cpu?.usagePercent,
    });
  }, [pagesState?.instance?.resources?.hardware?.cpu]);

  return (
    <div className="flex items-center justify-center">
      <div className=" flex w-full flex-col items-center gap-1 ">
        <p className="text-xs font-medium">CPU</p>
        <PercentageWidget
          percentage={cpuState?.percentage}
          title={`${cpuState?.coreCount} Core`}
        />
      </div>
    </div>
  );
}
