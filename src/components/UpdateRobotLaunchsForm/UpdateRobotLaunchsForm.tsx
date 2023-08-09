import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormStep4 from "../CreateForms/CreateRobotFormStep4";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import UpdateLaunchAccordion from "../UpdateLaunchAccordion/UpdateLaunchAccordion";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import useRobot from "../../hooks/useRobot";
import StateCell from "../Cells/StateCell";
import InfoTip from "../InfoTip/InfoTip";
import useMain from "../../hooks/useMain";
import SidebarInfo from "../SidebarInfo/SidebarInfo";

export default function UpdateRobotLaunchsForm(): ReactElement {
  const [isAddedForm, setIsAddedForm] = useState<boolean>(false);
  const [responseRobotLaunchManagers, setResponseRobotLaunchManagers] =
    useState<any>(undefined);
  const { getLaunchManagers } = useFunctions();
  const url = useParams();
  const { robotData, handleAddLaunchManager } = useRobot();
  const { selectedState } = useMain();

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
      ) : url?.robotName && robotData?.step4?.robotLaunchSteps?.length === 0 ? (
        <div className="h-full w-full flex flex-col items-center gap-4">
          <SidebarInfo
            text={
              robotData?.step3?.robotBuildSteps?.length === 0
                ? "No build steps found. If you want to add launch step before add build manager."
                : "It seems that you have not configured any launch steps for this robot. If you want to configure launch steps, please click on the + button below."
            }
            component={
              robotData?.step3?.robotBuildSteps?.length === 0 ? (
                <></>
              ) : (
                <CreateRobotFormAddButton
                  onClick={() => {
                    handleAddLaunchManager();
                    setIsAddedForm(true);
                  }}
                />
              )
            }
          />
        </div>
      ) : (
        <Fragment>
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 animate__animated animate__fadeIn">
            Launch Steps:
            <InfoTip content="Launch Steps" />
          </div>
          {responseRobotLaunchManagers?.map((step: any, index: number) => {
            console.log(
              "xxxxxxx",
              step.robotClusters.filter(
                (cluster: any) =>
                  cluster?.name === robotData.step1.physicalInstanceName &&
                  cluster.launchManagerStatus
              )
            );
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
                      {step.robotClusters.filter(
                        (cluster: any) =>
                          cluster?.name !==
                            robotData.step1.physicalInstanceName &&
                          cluster.launchManagerStatus
                      )?.[0]?.launchManagerStatus && (
                        <div className="flex gap-1.5">
                          <span
                            title={`Launch State of Cloud Instance`}
                            className="font-medium"
                          >
                            Virtual:
                          </span>
                          <StateCell
                            state={
                              step.robotClusters.filter(
                                (cluster: any) =>
                                  cluster?.name !==
                                    robotData.step1.physicalInstanceName &&
                                  cluster.launchManagerStatus
                              )?.[0]?.launchManagerStatus || "Pending"
                            }
                          />
                        </div>
                      )}

                      {step.robotClusters.filter(
                        (cluster: any) =>
                          cluster?.name ===
                            robotData.step1.physicalInstanceName &&
                          cluster.launchManagerStatus
                      )?.[0]?.launchManagerStatus && (
                        <div className="flex gap-1.5">
                          <span
                            title={`Launch State of Physical Instance`}
                            className="font-medium"
                          >
                            Physical:
                          </span>
                          <StateCell
                            state={
                              step.robotClusters.filter(
                                (cluster: any) =>
                                  cluster?.name ===
                                    robotData.step1.physicalInstanceName &&
                                  cluster.launchManagerStatus
                              )?.[0]?.launchManagerStatus || "Pending"
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
                    robotClusters={step?.robotClusters}
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
                handleAddLaunchManager();
                setIsAddedForm(true);
              }}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
