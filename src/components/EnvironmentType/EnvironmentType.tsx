import { Fragment, ReactElement } from "react";
import Skeleton from "../Skeleton/Skeleton";
import { useAppSelector } from "../../hooks/redux";
import useMain from "../../hooks/useMain";

export default function EnvironmentType(): ReactElement {
  const { robotData } = useMain();
  const { applicationMode } = useAppSelector((state) => state.user);

  return (
    <Fragment>
      {robotData.step1.details?.name ? (
        <div className="animate-fadeIn transition-500 w-fit rounded-lg bg-primary-100 px-2 py-1 text-[0.58rem] font-medium capitalize text-primary-500">
          {robotData?.step1.details?.isVirtualRobot
            ? `Virtual ${applicationMode ? "Application" : "Robot"}`
            : `Physical ${applicationMode ? "Application" : "Robot"}`}
        </div>
      ) : (
        <Skeleton className="min-h-5 min-w-24" />
      )}
    </Fragment>
  );
}
