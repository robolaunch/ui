import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormStep3 from "../CreateForms/CreateRobotFormStep3";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useCreateRobot from "../../hooks/useCreateRobot";

interface IBuildUpdateForm {
  reload: boolean;
  setItemCount: any;
}

export default function BuildUpdateForm({
  reload,
  setItemCount,
}: IBuildUpdateForm): ReactElement {
  const [responseRobotBuildManagers, setResponseRobotBuildManagers] =
    useState<any>(undefined);
  const { handleSetterResponseBuildManagers } = useFunctions();
  const url = useParams();
  const { setRobotData } = useCreateRobot();

  useEffect(() => {
    if (!responseRobotBuildManagers) {
      handleSetterResponseBuildManagers(
        url?.robotName,
        setResponseRobotBuildManagers
      );
    } else {
      setRobotData((prevState: any) => {
        return {
          ...prevState,

          step3: {
            buildManagerName: responseRobotBuildManagers?.buildManagerName,
            robotBuildSteps: responseRobotBuildManagers?.robotBuildSteps,
          },
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseRobotBuildManagers, url]);

  return (
    <Fragment>
      {!responseRobotBuildManagers ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <CreateRobotFormStep3 isImportRobot />
      )}
    </Fragment>
  );
}
