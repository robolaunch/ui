import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormStep4 from "../CreateForms/CreateRobotFormStep4";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useCreateRobot from "../../hooks/useCreateRobot";

interface IUpdateRobotLaunchsForm {
  reload: boolean;
  setItemCount: any;
}

export default function UpdateRobotLaunchsForm({
  reload,
  setItemCount,
}: IUpdateRobotLaunchsForm): ReactElement {
  const [responseRobotLaunchManagers, setResponseRobotLaunchManagers] =
    useState<any>(undefined);
  const { handleSetterResponseLaunchManagers } = useFunctions();
  const url = useParams();
  const { setRobotData } = useCreateRobot();

  useEffect(() => {
    if (!responseRobotLaunchManagers) {
      handleSetterResponseLaunchManagers(
        url?.robotName,
        setResponseRobotLaunchManagers
      );
    } else {
      setRobotData((prevState: any) => {
        return {
          ...prevState,

          step4: responseRobotLaunchManagers?.map((launchManager: any) => {
            return {
              launchManagerName: launchManager?.robotLaunchSteps[0]?.name,
              robotLaunchSteps: launchManager?.robotLaunchSteps.map(
                (step: any) => {
                  return {
                    workspace: step?.workspace,
                    entryPointType: "custom",
                    entryPointCmd: step?.entryPointCmd,
                    robotLmEnvs: step?.robotLmEnvs,
                    instancesName: step?.robotClusters.map((cluster: any) => {
                      return cluster?.name;
                    }),
                  };
                }
              ),
            };
          }),
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSetterResponseLaunchManagers, responseRobotLaunchManagers, url]);

  return (
    <Fragment>
      {!responseRobotLaunchManagers ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        responseRobotLaunchManagers?.map((step: any, index: number) => {
          console.log("HER LAUNCH STEP", step);
          return <CreateRobotFormStep4 isImportRobot key={index} />;
        })
      )}
    </Fragment>
  );
}
