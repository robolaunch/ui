import { ReactElement, useEffect, useState } from "react";
import useMain from "../../hooks/useMain";
import PercentageWidget from "../PercentageBar/PercentageBar";

export default function WidgetStorageCell(): ReactElement {
  const [memoryState, setMemoryState] = useState<any>(undefined);

  const { pagesState } = useMain();

  useEffect(() => {
    setMemoryState({
      storage: pagesState?.instance?.resources?.hardware?.storage?.totalGB,
      percentage:
        pagesState?.instance?.resources?.hardware?.storage?.usagePercent,
    });
  }, [pagesState?.instance?.resources?.hardware?.storage]);

  return (
    <div className="flex items-center justify-center">
      <div className=" flex w-full flex-col items-center gap-1 ">
        <p className="text-xs font-medium">Storage</p>
        <PercentageWidget
          percentage={memoryState?.percentage}
          title={`${memoryState?.storage} GB`}
        />
      </div>
    </div>
  );
}
