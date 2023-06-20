import React, { ReactElement } from "react";
import WidgetLayout from "../../layouts/WidgetLayout";
import { VscHistory } from "react-icons/vsc";

interface IActivitiesWidget {
  responseRobot: any;
}

export default function ActivitiesWidget({
  responseRobot,
}: IActivitiesWidget): ReactElement {
  const data: any[] = [
    {
      time: "",
      description: "Robot is defined.",
    },
    {
      time: "",
      description: "Robot is created.",
    },
    {
      time: "",
      description: "Defined workspaces are created.",
    },
    responseRobot?.ideEnabled && {
      time: "",
      description: "IDE is opened.",
    },
    responseRobot?.bridgeEnabled && {
      time: "",
      description: "Bridge is opened.",
    },
    responseRobot?.vdiEnabled && {
      time: "",
      description: "VDI is opened.",
    },
    {
      time: "",
      description: "Robot is started.",
    },
  ];

  return (
    <WidgetLayout
      title={`Acitivities`}
      subtitle={`Last Activities`}
      icon={<VscHistory size={20} className="text-layer-light-700" />}
    >
      <ul className="flex flex-col p-5 text-sm">
        {data
          .filter((item: any) => item !== undefined)
          .map((item: any, index: number) => {
            console.log(data);
            return (
              <li key={index} className="grid grid-cols-12 gap-2">
                <span className="col-span-1 text-xs font-medium">
                  {item?.time}
                </span>

                <div className="col-span-2 justify-center">
                  <div className="flex items-center justify-center w-4 h-4 rounded-full bg-layer-primary-500 mx-auto">
                    <div className="w-2 h-2 rounded-full bg-layer-light-50 " />
                  </div>
                  <div className="w-1 h-6 bg-layer-light-200 mx-auto"></div>
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
