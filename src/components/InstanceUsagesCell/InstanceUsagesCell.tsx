import { ReactElement } from "react";
import CirclePercentageBar from "../CirclePercentageBar/CirclePercentageBar";
import InstanceNetworkCell from "../InstanceNetworkCell/InstanceNetworkCell";

interface IInstanceUsagesCell {
  data: any;
}

export default function InstanceUsagesCell({
  data,
}: IInstanceUsagesCell): ReactElement {
  return (
    <div className="flex gap-4">
      <CirclePercentageBar
        percentage={data?.cpu?.percentage || 0}
        title={data?.cpu?.core ? `CPU (${data?.cpu?.core} Core)` : "Pending..."}
        size={46}
      />
      {/* <CirclePercentageBar
        percentage={data?.gpu?.percentage}
        title={`GPU (${data?.gpu?.core} Core)`}
        size={46}
      /> */}
      <CirclePercentageBar
        percentage={data?.memory?.percentage || 0}
        title={
          data?.memory?.size
            ? `Memory (${data?.memory?.size} GB)`
            : "Pending..."
        }
        size={46}
      />
      <CirclePercentageBar
        percentage={data?.storage?.percentage || 0}
        title={
          data?.storage?.size
            ? `Storage (${data?.storage?.size || "Pending..."} GB)`
            : "Pending..."
        }
        size={46}
      />
      <InstanceNetworkCell
        type="in"
        mbps={data?.network?.in}
        interfaceName={data?.network?.title}
      />
      <InstanceNetworkCell
        type="out"
        mbps={data?.network?.out}
        interfaceName={data?.network?.title}
      />
    </div>
  );
}
