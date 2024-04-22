import { Dispatch, ReactElement, SetStateAction } from "react";
import Card from "../Card/Card";

interface IRobotManagementSidebar {
  tabs: string[];
  setter: Dispatch<SetStateAction<string>>;
  currentTab: string;
  children?: ReactElement | ReactElement[];
}

export default function RobotManagementSidebar({
  tabs,
  setter,
  currentTab,
  children,
}: IRobotManagementSidebar): ReactElement {
  return (
    <Card
      className="flex flex-col gap-2 overflow-auto p-5"
      style={{
        height: `${512 + 64 + 64 + 8}px`,
      }}
    >
      <div className="flex gap-2 pb-6">
        {tabs?.map((tab, index) => (
          <div
            key={index}
            onClick={() => setter(tab)}
            className={`flex w-full cursor-pointer flex-col items-center justify-center gap-1 text-xs ${currentTab === tab ? "text-primary-500" : "text-light-500"}`}
          >
            <span>{tab}</span>
            <div
              className={`h-[2px] w-full ${currentTab === tab ? "bg-primary-500" : "bg-light-300"}`}
            />
          </div>
        ))}
      </div>

      <div className="wh-full flex flex-col gap-4 overflow-auto">
        {children}
      </div>
    </Card>
  );
}
