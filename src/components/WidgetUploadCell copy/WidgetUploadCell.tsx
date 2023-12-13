import { ReactElement, useEffect, useState } from "react";
import useMain from "../../hooks/useMain";
import PercentageWidget from "../PercentageBar/PercentageBar";

export default function WidgetUploadCell(): ReactElement {
  const [uploadState, setUploadState] = useState<any>(undefined);

  const { pagesState } = useMain();

  useEffect(() => {
    setUploadState({
      upload: (
        Number(
          pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]?.trafficOut?.split(
            "Kbps",
          )?.[0],
        ) / 1024
      )?.toFixed(2),
      name: pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]
        ?.interfaceName,
    });
  }, [pagesState?.instance?.cloudInstanceResource]);

  return (
    <div className="flex items-center justify-center">
      <div className=" flex w-full flex-col items-center gap-1 ">
        <p className="text-xs font-medium">Network (Upload)</p>
        <PercentageWidget
          hiddenCircle
          percentage={uploadState?.upload}
          title={`${uploadState?.name} Interface`}
        />
      </div>
    </div>
  );
}
