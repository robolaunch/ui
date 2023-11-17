import { ReactElement } from "react";
import CirclePercentageBar from "../CirclePercentageBar/CirclePercentageBar";
import { IInstanceDashboardUsages } from "../../interfaces/tableInterface";
import InstanceNetworkCell from "../InstanceNetworkCell/InstanceNetworkCell";

interface IInstanceUsagesCell {
  data: IInstanceDashboardUsages;
}

export default function InstanceUsagesCell({
  data,
}: IInstanceUsagesCell): ReactElement {
  console.log("GG", data);

  return (
    <div className="flex gap-4">
      <CirclePercentageBar
        percentage={data?.cpu?.percentage}
        title={`CPU (${data?.cpu?.core} Core)`}
        size={46}
      />
      {/* <CirclePercentageBar
        percentage={data?.gpu?.percentage}
        title={`GPU (${data?.gpu?.core} Core)`}
        size={46}
      /> */}
      <CirclePercentageBar
        percentage={data?.memory?.percentage}
        title={`Memory (${data?.memory?.size} GB)`}
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
