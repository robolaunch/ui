import ColorLabel from "../ColorLabel/ColorLabel";
import { ReactElement } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useCreateRobot from "../../hooks/useCreateRobot";

export default function EnvironmentNameLabel(): ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <span className="flex min-w-40 items-center gap-2">
      <span className="min-w-32 text-lg font-medium">
        {robotData?.step1?.robotName || <Skeleton />}
      </span>
      <ColorLabel />
    </span>
  );
}
