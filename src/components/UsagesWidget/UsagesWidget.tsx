import { ReactElement } from "react";
import { GoGraph } from "react-icons/go";
import Widget from "../../layouts/WidgetLayout";
import CirclePercentageBar from "../CirclePercentageBar/CirclePercentageBar";
import NetworkChart from "../NetworkChart/NetworkChart";
import GPUChart from "../GPUChart/GPUChart";

interface IUsagesWidget {
  title: string;
  datas: any[];
  gpuData: any[];
}

export default function UsagesWidget({
  title,
  datas,
}: IUsagesWidget): ReactElement {
  return (
    <Widget
      dataTut="usages-widget"
      title={`Hardware Resources & Usages`}
      subtitle={`${title} Usages`}
      icon={<GoGraph size={20} className="text-light-700" />}
    >
      <div className="flex h-full items-center justify-between">
        <div className="flex gap-4">
          {datas?.map((data: any, index: number) => {
            return <CirclePercentageBar key={index} {...data} size={88} />;
          })}
        </div>

        <NetworkChart />
        <GPUChart />
      </div>
    </Widget>
  );
}
