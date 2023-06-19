import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormStep4 from "../CreateForms/CreateRobotFormStep4";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import UpdateLaunchAccordion from "../UpdateLaunchAccordion/UpdateLaunchAccordion";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import useCreateRobot from "../../hooks/useCreateRobot";

interface IUpdateRobotLaunchsForm {
  reload: boolean;
  setItemCount: any;
}

export default function UpdateRobotLaunchsForm({
  reload,
  setItemCount,
}: IUpdateRobotLaunchsForm): ReactElement {
  const [isAddedForm, setIsAddedForm] = useState<boolean>(false);
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseRobotLaunchManagers, url]);

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
          {responseRobotLaunchManagers?.map((step: any, index: number) => {
            console.log(step);

            return (
              <UpdateLaunchAccordion
                id={index}
                key={index}
                header={
                  <span className="font-medium">
                    {step?.name || `Launch Step # ${index + 1}`}
                  </span>
                }
              >
                <div className="p-4">
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
              <div className="p-4">
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
