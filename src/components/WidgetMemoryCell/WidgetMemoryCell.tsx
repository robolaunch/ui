import { ReactElement, useEffect, useState } from "react";
import useMain from "../../hooks/useMain";
import PercentageWidget from "../PercentageBar/PercentageBar";

export default function WidgetMemoryCell(): ReactElement {
  const [memoryState, setMemoryState] = useState<any>(undefined);

  const { pagesState } = useMain();

  useEffect(() => {
    setMemoryState({
      memory: pagesState?.instance?.resources?.hardware?.memory?.totalGB,
      percentage:
        pagesState?.instance?.resources?.hardware?.memory?.usagePercent,
    });
  }, [pagesState?.instance?.resources?.hardware?.memory]);

  return (
    <div className="flex items-center justify-center">
      <div className=" flex w-full flex-col items-center gap-1 ">
        <p className="text-xs font-medium">Memory</p>
        <PercentageWidget
          percentage={memoryState?.percentage}
          title={`${memoryState?.memory} GB`}
        />
      </div>
    </div>
  );
}
