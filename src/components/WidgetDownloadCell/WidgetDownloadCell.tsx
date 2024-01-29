import { ReactElement, useEffect, useState } from "react";
import useMain from "../../hooks/useMain";
import PercentageWidget from "../PercentageBar/PercentageBar";
import { TiArrowDown } from "react-icons/ti";

export default function WidgetDownloadCell(): ReactElement {
  const [downloadState, setDownloadState] = useState<any>(undefined);

  const { pagesState } = useMain();

  useEffect(() => {
    setDownloadState({
      download: Number(
        (
          Number(pagesState.instance?.resources?.hardware?.network?.[0]?.in) /
          1024
        )?.toFixed(2),
      ),
      name: pagesState.instance?.resources?.hardware?.network?.[0]?.name,
    });
  }, [pagesState.instance?.resources?.hardware?.network]);

  return (
    <div className="flex items-center justify-center">
      <div className=" flex w-full flex-col items-center gap-1 ">
        <p className="text-xs font-medium">Network (Download)</p>
        {pagesState.instance?.resources?.hardware?.network?.[0]?.in ? (
          <div className="flex items-center">
            <TiArrowDown size={28} className="-mr-2 mb-5 text-secondary-400" />
            <PercentageWidget
              isHiddenCircle
              percentage={downloadState?.download}
              title={`${downloadState?.name} Interface`}
            />
          </div>
        ) : (
          <img
            className="h-14 w-14"
            src="/svg/general/loading.svg"
            alt="loading"
          />
        )}
      </div>
    </div>
  );
}
