import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormStep4 from "../CreateForms/CreateRobotFormStep4";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import UpdateLaunchAccordion from "../UpdateLaunchAccordion/UpdateLaunchAccordion";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import useCreateRobot from "../../hooks/useCreateRobot";
import StateCell from "../Cells/StateCell";
import InfoTip from "../InfoTip/InfoTip";
import useSidebar from "../../hooks/useSidebar";

export default function UpdateRobotLaunchsForm(): ReactElement {
  const [isAddedForm, setIsAddedForm] = useState<boolean>(false);
  const [responseRobotLaunchManagers, setResponseRobotLaunchManagers] =
    useState<any>(undefined);
  const { getLaunchManagers } = useFunctions();
  const url = useParams();
  const { robotData, setRobotData } = useCreateRobot();
  const { selectedState } = useSidebar();
  useEffect(() => {
    console.log(responseRobotLaunchManagers);
    if (!responseRobotLaunchManagers) {
      handleGetLaunchManagers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseRobotLaunchManagers, url]);

  function handleGetLaunchManagers() {
    getLaunchManagers(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseRobotLaunchManagers,
        setRobotData: true,
      }
    );
  }

  return (
    <Fragment>
      {!responseRobotLaunchManagers ? (
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <img
            className="w-12 mx-auto pt-10"
            src="/svg/general/loading.svg"
            alt="Loading..."
          />
          <span className="text-sm text-layer-light-900 pb-4">Loading...</span>
        </div>
      ) : (
        <Fragment>
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 animate__animated animate__fadeIn">
            Launch Steps:
            <InfoTip content="Launch Steps" />
          </div>
          {responseRobotLaunchManagers?.map((step: any, index: number) => {
            return (
              <UpdateLaunchAccordion
                id={index}
                key={index}
                header={
                  <div className="flex justify-between animate__animated animate__fadeIn">
                    <span className="font-medium">
                      {step?.name || `Launch Step # ${index + 1}`}
                    </span>

                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex gap-1.5">
                        <span
                          title={`Launch State of Cloud Instance`}
                          className="font-medium"
                        >
                          CI:
                        </span>
                        <StateCell
                          state={
                            Array.isArray(step?.robotClusters) &&
                            step?.robotClusters[0]?.launchManagerStatus
                          }
                        />
                      </div>
                      {step?.robotClusters[1]?.launchManagerStatus && (
                        <div className="flex gap-1.5">
                          <span
                            title={`Launch State of Physical Instance`}
                            className="font-medium"
                          >
                            PI:
                          </span>
                          <StateCell
                            state={
                              Array.isArray(step?.robotClusters) &&
                              step?.robotClusters[1]?.launchManagerStatus
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                }
              >
                <div className="p-4 animate__animated animate__fadeIn">
                  <CreateRobotFormStep4
                    isImportRobot
                    key={index}
                    robotDataLaunchIndex={index}
                  />
                </div>
              </UpdateLaunchAccordion>
            );
          })}

          {isAddedForm ? (
            <UpdateLaunchAccordion
              id={1111111}
              key={1111111}
              header={
                <span className="font-medium">
                  {`Launch Step # ${responseRobotLaunchManagers?.length + 1}`}
                </span>
              }
            >
              <div className="p-4 animate__animated animate__fadeIn">
                <CreateRobotFormStep4
                  robotDataLaunchIndex={responseRobotLaunchManagers?.length}
                />
              </div>
            </UpdateLaunchAccordion>
          ) : (
            <CreateRobotFormAddButton
              onClick={() => {
                setRobotData((prev: any) => {
                  return {
                    ...prev,
                    step4: {
                      ...prev.step4,
                      robotLaunchSteps: [
                        ...prev.step4.robotLaunchSteps,
                        {
                          workspace: "",
                          entryPointType: "custom",
                          entryPointCmd: "",
                          instancesName: [],
                          robotLmEnvs: [
                            {
                              name: "",
                              value: "",
                            },
                          ],
                        },
                      ],
                    },
                  };
                });
                setIsAddedForm(true);
              }}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
