import { envApplication } from "../../helpers/envProvider";
import WidgetLayout from "../../layouts/WidgetLayout";
import { VscHistory } from "react-icons/vsc";
import { ReactElement } from "react";

interface IActivitiesWidget {
  responseRobot: any;
}

export default function ActivitiesWidget({
  responseRobot,
}: IActivitiesWidget): ReactElement {
  const data: any[] = [
    {
      show: responseRobot ? true : false,
      time: "",
      description: `${envApplication ? "Application" : "Robot"} is created.`,
    },
    {
      show: responseRobot ? true : false,
      time: "",
      description: "Workspaces are created.",
    },
    {
      show: responseRobot?.ideEnabled,
      time: "",
      description: "VDI and IDE is created.",
    },
    {
      show: responseRobot?.ideEnabled,
      time: "",
      description: "IDE is opened.",
    },
    {
      show: responseRobot?.vdiEnabled,
      time: "",
      description: "VDI is opened.",
    },
  ];

  return (
    <WidgetLayout
      dataTut="robot-activities-widget"
      title={`Acitivities`}
      subtitle={`Last Activities`}
      icon={<VscHistory size={20} className="text-light-700" />}
    >
      <ul className="flex flex-col p-5 text-sm">
        {data
          .filter((item: any) => item !== undefined)
          .map((item: any, index: number) => {
            return (
              <li key={index} className="grid grid-cols-12 gap-2">
                <span className="col-span-1 text-xs font-medium">
                  {item?.time}
                </span>

                <div className="col-span-2 justify-center">
                  <div className="bg-primary-500 mx-auto flex h-4 w-4 items-center justify-center rounded-full">
                    <div className="bg-light-50 h-2 w-2 rounded-full " />
                  </div>
                  <div className="bg-light-200 mx-auto h-6 w-1"></div>
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
