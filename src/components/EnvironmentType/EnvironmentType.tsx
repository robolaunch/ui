import { envApplication } from "../../helpers/envProvider";
import useCreateRobot from "../../hooks/useCreateRobot";
import { Fragment, ReactElement } from "react";
import Skeleton from "../Skeleton/Skeleton";

export default function EnvironmentType(): ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <Fragment>
      {robotData.step1.details?.name ? (
        <div className="animate-fadeIn transition-500 w-fit rounded-lg bg-primary-100 px-2 py-1 text-[0.58rem] font-medium capitalize text-primary-500">
          {robotData?.step1.details?.isVirtualRobot
            ? `Virtual ${envApplication ? "Application" : "Robot"}`
            : `Physical ${envApplication ? "Application" : "Robot"}`}
        </div>
      ) : (
        <Skeleton className="min-h-5 min-w-24" />
      )}
    </Fragment>
  );
}
