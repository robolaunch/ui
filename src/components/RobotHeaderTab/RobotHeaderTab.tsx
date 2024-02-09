import { stringSlugify } from "../../functions/general.function";
import { IrobotTab } from "../../interfaces/robotInterfaces";
import { ReactElement } from "react";
import useRobot from "../../hooks/useRobot";
import Skeleton from "../Skeleton/Skeleton";
interface RobotHeaderTabProps {
  tab: IrobotTab;
}

export default function RobotHeaderTab({
  tab,
}: RobotHeaderTabProps): ReactElement {
  const { activeTab, setActiveTab, isRobotReady } = useRobot();
  const isActiveTab = tab.name === activeTab;

  const handleClick = () =>
    !tab?.isLoading && !tab?.isHidden && setActiveTab(tab.name);

  return (
    <li
      data-tut={`robot-header-tab-${stringSlugify(tab?.name)}`}
      className={`flex cursor-pointer flex-col gap-3 ${
        tab?.isHidden && "!hidden"
      }`}
      onClick={handleClick}
    >
      <div
        className={`min-w-max items-center px-2 text-xs font-medium transition-all duration-500 ${
          isActiveTab ? "text-primary-500" : "text-light-500"
        }`}
      >
        {tab?.isLoading || !isRobotReady ? (
          <Skeleton className="min-h-4 min-w-24" />
        ) : (
          <div className="animate-fadeIn flex gap-1">
            {tab?.icon}
            <span>{tab.name}</span>
          </div>
        )}
      </div>
      <div
        className={`h-[2px] w-full transition-all duration-500 ${
          isActiveTab ? "bg-primary-500" : "bg-light-100"
        }`}
      />
    </li>
  );
}
