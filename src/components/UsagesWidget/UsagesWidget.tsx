import React, { ReactElement } from "react";
import { GoGraph } from "react-icons/go";
import Widget from "../../layouts/WidgetLayout";
import CirclePercentageBar from "../CirclePercentageBar/CirclePercentageBar";

interface IUsagesWidget {
  title: string;
  datas: any[];
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
      icon={<GoGraph size={20} className="text-layer-light-700" />}
    >
      <div className="flex h-full w-full items-center justify-center gap-10 p-10 lg:p-6 xl:p-2">
        {datas?.map((data: any) => {
          return <CirclePercentageBar key={data?.title} {...data} size={88} />;
        })}
      </div>
    </Widget>
  );
}
