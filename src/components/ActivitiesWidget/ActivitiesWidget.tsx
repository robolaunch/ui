import WidgetLayout from "../../layouts/WidgetLayout";
import { VscHistory } from "react-icons/vsc";
import { ReactElement } from "react";
import { useAppSelector } from "../../hooks/redux";

interface IActivitiesWidget {
  responseRobot: any;
}

export default function ActivitiesWidget({
  responseRobot,
}: IActivitiesWidget): ReactElement {
  const { applicationMode } = useAppSelector((state) => state.user);

  const data: any[] = [
    {
      show: responseRobot ? true : false,
      time: "",
      description: `${applicationMode ? "Application" : "Robot"} is created.`,
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
                  <div className="mx-auto flex h-4 w-4 items-center justify-center rounded-full bg-primary-500">
                    <div className="h-2 w-2 rounded-full bg-light-50 " />
                  </div>
                  <div className="mx-auto h-6 w-1 bg-light-200"></div>
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
