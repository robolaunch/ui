import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormStep3 from "../CreateForms/CreateRobotFormStep3";
import useCreateRobot from "../../hooks/useCreateRobot";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";

interface IBuildUpdateForm {
  reload: boolean;
  setItemCount: any;
}

export default function BuildUpdateForm({
  reload,
  setItemCount,
}: IBuildUpdateForm): ReactElement {
  const [responseRobotBuildManager, setResponseRobotBuildManager] =
    useState<any>(undefined);
  const { handleSetterResponseBuildManager } = useFunctions();
  const url = useParams();
  const { setRobotData } = useCreateRobot();

  useEffect(() => {
    if (!responseRobotBuildManager) {
      handleSetterResponseBuildManager(
        url?.robotName,
        setResponseRobotBuildManager
      );
    } else {
      setRobotData((prevState: any) => {
        return {
          ...prevState,

          step3: {
            buildManagerName: responseRobotBuildManager?.buildManagerName,
            robotBuildSteps: responseRobotBuildManager?.robotBuildSteps,
          },
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseRobotBuildManager, url]);

  return (
    <Fragment>
      <CreateRobotFormStep3 isImportRobot />
    </Fragment>
  );
}
