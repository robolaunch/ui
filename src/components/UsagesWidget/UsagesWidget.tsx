import CirclePercentageBar from "../CirclePercentageBar/CirclePercentageBar";
import NetworkChart from "../NetworkChart/NetworkChart";
import Widget from "../../layouts/WidgetLayout";
import GPUChart from "../GPUChart/GPUChart";
import { GoGraph } from "react-icons/go";
import { ReactElement } from "react";

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
