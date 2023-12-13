import { ReactElement, useEffect, useState } from "react";
import useMain from "../../hooks/useMain";
import PercentageWidget from "../PercentageBar/PercentageBar";

export default function WidgetDownloadCell(): ReactElement {
  const [downloadState, setDownloadState] = useState<any>(undefined);

  const { pagesState } = useMain();

  useEffect(() => {
    setDownloadState({
      download: (
        Number(
          pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]?.trafficIn?.split(
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
        <p className="text-xs font-medium">Network (Download)</p>
        <PercentageWidget
          hiddenCircle
          percentage={downloadState?.download}
          title={`${downloadState?.name} Interface`}
        />
      </div>
    </div>
  );
}
