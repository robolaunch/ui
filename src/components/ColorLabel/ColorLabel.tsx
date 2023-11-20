import { envApplication } from "../../helpers/envProvider";
import ContentLoader from "react-content-loader";
import useRobot from "../../hooks/useRobot";
import { ReactElement } from "react";

export default function ColorLabel(): ReactElement {
  const { responseRobot } = useRobot();

  return (
    <div className="w-fit rounded-lg bg-layer-primary-100 px-2 py-1 text-[0.58rem] font-medium capitalize text-layer-primary-500">
      {responseRobot?.robotClusters?.length === 1
        ? `Virtual ${envApplication ? "Application" : "Robot"}`
        : (responseRobot?.robotClusters?.length === 2 &&
            `Physical ${envApplication ? "Application" : "Robot"}`) || (
            <ContentLoader
              speed={1}
              width={64}
              height={18}
              backgroundColor="#f5e5ff"
              foregroundColor="#fbf4ff"
            >
              <rect width="64" height="18" />
            </ContentLoader>
          )}
    </div>
  );
}
