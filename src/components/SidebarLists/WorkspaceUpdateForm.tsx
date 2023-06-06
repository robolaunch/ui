import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormStep2 from "../CreateForms/CreateRobotFormStep2";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useCreateRobot from "../../hooks/useCreateRobot";

interface IWorkspaceUpdateForm {
  reload: boolean;
  setItemCount: any;
}

export default function WorkspaceUpdateForm({
  reload,
  setItemCount,
}: IWorkspaceUpdateForm): ReactElement {
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const { handleSetterResponseRobot } = useFunctions();
  const { setRobotData } = useCreateRobot();
  const url = useParams();

  useEffect(() => {
    if (!responseRobot) {
      handleSetterResponseRobot(url?.robotName, setResponseRobot);
    } else {
      setRobotData((prevState: any) => {
        return {
          ...prevState,
          step1: {
            ...prevState.step1,
            robotName: responseRobot?.name,
            isVirtualRobot: responseRobot?.physicalInstance ? false : true,
            physicalInstanceName: responseRobot?.physicalInstance,
            robotStorage: responseRobot?.storageAmount,
            isEnabledIde: responseRobot?.ideEnabled,
            isEnabledROS2Bridge: responseRobot?.bridgeEnabled,
            remoteDesktop: {
              isEnabled: responseRobot?.vdiEnabled,
              sessionCount: responseRobot?.vdiSessionCount,
            },
            rosDistros: responseRobot?.distributions,
            gpuEnabledForCloudInstance:
              responseRobot?.vdiGpuResource > 0 ? true : false,
            isDevelopmentMode: false,
          },
          step2: {
            workspaces: responseRobot?.robotWorkspaces,
          },
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseRobot, url]);

  return (
    <Fragment>
      {!responseRobot ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <CreateRobotFormStep2 isImportRobot />
      )}
    </Fragment>
  );
}
