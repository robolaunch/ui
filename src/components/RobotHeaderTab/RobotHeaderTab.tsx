import { stringSlugify } from "../../functions/GeneralFunctions";
import { IrobotTab } from "../../interfaces/robotInterfaces";
import ContentLoader from "react-content-loader";
import { Fragment, ReactElement } from "react";
import useRobot from "../../hooks/useRobot";
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
        className={`flex min-w-max items-center gap-1 px-2 text-xs font-medium transition-all duration-500 ${
          isActiveTab ? "text-primary-500" : "text-light-500"
        }`}
      >
        {tab?.isLoading || !isRobotReady ? (
          <ContentLoader
            speed={1}
            width={108}
            height={16}
            backgroundColor="#f6f6ef"
            foregroundColor="#e8e8e3"
          >
            <rect width="108" height="12" />
          </ContentLoader>
        ) : (
          <Fragment>
            {tab?.icon}
            <span>{tab.name}</span>
          </Fragment>
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
