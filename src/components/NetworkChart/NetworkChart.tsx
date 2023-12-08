import { ReactElement } from "react";
import { TiArrowDown, TiArrowUp } from "react-icons/ti";
import useMain from "../../hooks/useMain";

export default function NetworkChart(): ReactElement {
  const { pagesState } = useMain();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-0.5 text-sm">
        <TiArrowUp size={28} className="text-layer-primary-600" />
        <p>
          {(
            Number(
              pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]?.trafficIn?.split(
                "Kbps",
              )?.[0],
            ) / 1024
          )?.toFixed(2)}
          {" Mbps"}
        </p>
      </div>
      <div className="flex items-center gap-0.5 text-sm">
        <TiArrowDown size={28} className="text-layer-secondary-600" />
        <p>
          {(
            Number(
              pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]?.trafficOut?.split(
                "Kbps",
              )?.[0],
            ) / 1024
          )?.toFixed(2)}
          {" Mbps"}
        </p>
      </div>
      <span className="text-[0.66rem]">
        Network (
        {pagesState.instance?.cloudInstanceResource?.networkUsage?.[0]
          ?.interfaceName || "Pending..."}
        )
      </span>
    </div>
  );
}
