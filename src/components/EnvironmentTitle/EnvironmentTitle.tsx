import useCreateRobot from "../../hooks/useCreateRobot";
import { Fragment, ReactElement } from "react";
import Skeleton from "../Skeleton/Skeleton";

export default function EnvironmentTitle(): ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <Fragment>
      {robotData?.step1.details?.name ? (
        <p className="animate-fadeIn text-lg font-medium">
          {robotData?.step1.details?.name}
        </p>
      ) : (
        <Skeleton className="min-h-5 min-w-24" />
      )}
    </Fragment>
  );
}
