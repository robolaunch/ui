import React, { ReactElement } from "react";
import WidgetLayout from "../../layouts/WidgetLayout";
import { VscHistory } from "react-icons/vsc";

interface IRobotStatusWidget {
  data: any;
}

export default function AdrinActivitiesWidget({
  data,
}: IRobotStatusWidget): ReactElement {
  return (
    <WidgetLayout
      title={`Acitivities`}
      subtitle={`Last Activities`}
      icon={<VscHistory size={20} className="text-layer-light-700" />}
    >
      <ul className="flex flex-col p-5 text-sm">
        {data?.map((item: any, index: number) => {
          return (
            <li
              key={index}
              className="grid grid-cols-12 gap-2 animate__animated animate__fadeIn"
            >
              <span className="col-span-1 text-xs font-medium">
                {item?.time}
              </span>
              <div className="col-span-2 justify-center">
                <div
                  className={`flex items-center justify-center w-4 h-4 rounded-full  mx-auto ${item?.color}`}
                >
                  <div className="w-2 h-2 rounded-full bg-layer-light-50 " />
                </div>
                {data?.length - 1 !== index && (
                  <div className="w-1 h-4 bg-layer-light-200 mx-auto"></div>
                )}
              </div>
              <span className="col-span-9 text-xs font-light">
                {item?.description}
              </span>
            </li>
          );
        })}
      </ul>
    </WidgetLayout>
  );
}
