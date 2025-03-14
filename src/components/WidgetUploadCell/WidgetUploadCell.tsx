import { ReactElement, useEffect, useState } from "react";
import useMain from "../../hooks/useMain";
import PercentageWidget from "../PercentageBar/PercentageBar";
import { TiArrowUp } from "react-icons/ti";

export default function WidgetUploadCell(): ReactElement {
  const [uploadState, setUploadState] = useState<any>(undefined);

  const { pagesState } = useMain();

  useEffect(() => {
    setUploadState({
      upload: Number(
        (
          Number(pagesState.instance?.resources?.hardware?.network?.[0]?.out) /
          1024
        )?.toFixed(2),
      ),
      name: pagesState.instance?.resources?.hardware?.network?.[0]?.name,
    });
  }, [pagesState.instance?.resources?.hardware?.network]);

  return (
    <div className="flex items-center justify-center">
      <div className=" flex w-full flex-col items-center gap-1 ">
        <p className="text-xs font-medium">Network (Upload)</p>
        {pagesState.instance?.resources?.hardware?.network?.[0]?.out ? (
          <div className="flex items-center">
            <TiArrowUp size={28} className="-mr-2 mb-5 text-primary-400" />
            <PercentageWidget
              isHiddenCircle
              percentage={uploadState?.upload}
              title={`${uploadState?.name} Interface`}
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
