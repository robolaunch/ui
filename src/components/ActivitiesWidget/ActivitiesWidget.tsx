import WidgetLayout from "../../layouts/WidgetLayout";
import { VscHistory } from "react-icons/vsc";
import { ReactElement } from "react";
import { useAppSelector } from "../../hooks/redux";
import useMain from "../../hooks/useMain";

export default function ActivitiesWidget(): ReactElement {
  const { applicationMode } = useAppSelector((state) => state.user);

  const { robotData } = useMain();

  const data: {
    show: boolean;
    time: string;
    description: string;
  }[] = [
    {
      show: robotData?.step1?.details?.name ? true : false,
      time: "",
      description: `${applicationMode ? "Application" : "Robot"} is created.`,
    },
    {
      show: robotData?.step1?.details?.name ? true : false,
      time: "",
      description: "Workspaces are created.",
    },
    {
      show: robotData?.step1?.services?.ide?.isEnabled,
      time: "",
      description: "VDI and IDE is created.",
    },
    {
      show: robotData?.step1?.services?.ide?.isEnabled,
      time: "",
      description: "IDE is opened.",
    },
    {
      show: robotData?.step1?.services?.vdi?.isEnabled,
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
