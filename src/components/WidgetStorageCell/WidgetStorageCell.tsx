import { ReactElement, useEffect, useState } from "react";
import useMain from "../../hooks/useMain";
import PercentageWidget from "../PercentageBar/PercentageBar";

export default function WidgetStorageCell(): ReactElement {
  const [memoryState, setMemoryState] = useState<any>(undefined);

  const { pagesState } = useMain();

  useEffect(() => {
    setMemoryState({
      storage: pagesState?.instance?.cloudInstanceResource?.storageTotal,
      percentage:
        pagesState?.instance?.cloudInstanceResource?.storageUsage &&
        pagesState?.instance?.cloudInstanceResource?.storageTotal &&
        Math.floor(
          (pagesState?.instance?.cloudInstanceResource?.storageUsage /
            pagesState?.instance?.cloudInstanceResource?.storageTotal) *
            100,
        ),
    });
  }, [pagesState?.instance?.cloudInstanceResource]);

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
