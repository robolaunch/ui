import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormBuildStepItem from "../CreateRobotFormBuildStepItem/CreateRobotFormBuildStepItem";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";
import { createBuildManager } from "../../toolkit/RobotSlice";
import { IRobotBuildSteps } from "../../interfaces/robotInterfaces";
import useCreateRobot from "../../hooks/useCreateRobot";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import InputError from "../InputError/InputError";
import { FormikProps, useFormik } from "formik";
import useSidebar from "../../hooks/useSidebar";
import InputText from "../InputText/InputText";
import InfoTip from "../InfoTip/InfoTip";
import Button from "../Button/Button";
import { toast } from "sonner";
import * as Yup from "yup";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import RobotDeleteBuildManagerButton from "../RobotDeleteBuildManagerButton/RobotDeleteBuildManagerButton";

interface ICreateRobotFormStep3 {
  isImportRobot?: boolean;
}

export default function CreateRobotFormStep3({
  isImportRobot,
}: ICreateRobotFormStep3): ReactElement {
  const { robotData, setRobotData, handleAddStepToBuildStep } =
    useCreateRobot();
  const dispatch = useAppDispatch();
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const { handleCreateRobotNextStep, selectedState } = useSidebar();
  const { getRobot, getBuildManager } = useFunctions();

  useEffect(
    () => {
      if (!responseRobot && isImportRobot) {
        handleGetRobot();

        handleGetBuildManager();
      } else if (!responseRobot && !isImportRobot) {
        setTimeout(() => {
          handleGetRobot();
        }, 10000);
      }

      const timer = setInterval(() => {
        !isImportRobot && handleGetRobot();
      }, 10000);

      if (
        !responseRobot?.robotClusters?.filter(
          (robotCluster: any) =>
            robotCluster?.robotStatus !== "EnvironmentReady"
        )?.length &&
        !isImportRobot
      ) {
        clearInterval(timer);
      }

      return () => {
        !isImportRobot && clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseRobot]
  );

  function handleGetRobot() {
    getRobot(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.roboticsCloud?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName,
      },
      {
        ifErrorNavigateTo404: false,
        setRobotData: true,
        setResponse: setResponseRobot,
      }
    );
  }

  function handleGetBuildManager() {
    getBuildManager(
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
        setRobotData: true,
        setResponse: setResponseBuildManager,
      }
    );
  }

  const formik: FormikProps<IRobotBuildSteps> = useFormik<IRobotBuildSteps>({
    validationSchema: Yup.object().shape({
      buildManagerName: Yup.string().required("Build Manager Name is required"),
      robotBuildSteps: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .required("Step Name is required")
            .test("unique-name", "This name is already taken", (value) => {
              const temp = formik.values.robotBuildSteps?.filter(
                (item: any) => item.name === value && item
              );
              return temp.length > 1 ? false : true;
            }),
          workspace: Yup.string().required("Workspace is required"),
          isCommandCode: Yup.boolean(),
          command: Yup.string().when("isCommandCode", {
            is: true,
            then: Yup.string().required("Command is required"),
            otherwise: Yup.string(),
          }),
          script: Yup.string().when("isCommandCode", {
            is: false,
            then: Yup.string().required("Script is required"),
            otherwise: Yup.string(),
          }),
          instancesName: Yup.array().min(
            1,
            "At least one instance is required"
          ),
        })
      ),
    }),

    initialValues: robotData?.step3,
    onSubmit: async (values: any) => {
      formik.setSubmitting(true);
      await dispatch(
        createBuildManager({
          organizationId: selectedState?.organization?.organizationId,
          roboticsCloudName: selectedState?.roboticsCloud?.name,
          instanceId: selectedState?.instance?.instanceId,
          region: selectedState?.instance?.region,
          robotName: robotData?.step1?.robotName,
          fleetName: selectedState?.fleet?.name,
          physicalInstanceName: robotData?.step1?.physicalInstanceName,
          buildManagerName: values?.buildManagerName,
          robotBuildSteps: values?.robotBuildSteps,
        })
      ).then(() => {
        if (isImportRobot) {
          toast.success("Robot updated successfully. Redirecting...");
          formik.setSubmitting(true);
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } else {
          handleCreateRobotNextStep();
        }
      });
    },
  });

  useEffect(() => {
    setRobotData({
      ...robotData,
      step3: formik.values,
    });
    // eslint-disable-next-line
  }, [formik.values]);

  return (
    <CreateRobotFormLoader
      loadingText={
        isImportRobot
          ? "Loading..."
          : "Please wait while we create your robot. This may take a few minutes."
      }
      isLoading={
        !responseRobot?.robotClusters ||
        responseRobot?.robotClusters?.filter(
          (robotCluster: any) =>
            robotCluster?.robotStatus !== "EnvironmentReady"
        )?.length
      }
      loadingItems={responseRobot?.robotClusters?.map((item: any) => {
        return {
          name: item?.name,
          status: item?.robotStatus,
        };
      })}
      currentStep={
        !responseRobot
          ? 1
          : responseRobot?.robotClusters?.filter(
              (robotCluster: any) =>
                robotCluster?.robotStatus === "CreatingEnvironment" ||
                robotCluster?.robotStatus === "CreatingDiscoveryServer" ||
                robotCluster?.robotStatus === "ConfiguringEnvironment"
            )?.length
          ? 1
          : responseRobot?.robotClusters?.filter(
              (robotCluster: any) =>
                robotCluster?.robotStatus === "CreatingBridge" ||
                robotCluster?.robotStatus === "CreatingDevelopmentSuite"
            )?.length
          ? 2
          : 3
      }
      stepbarItems={[
        {
          name: "Creating Environment",
          process: [
            {
              name: "Creating Environment",
              isFinished: !responseRobot
                ? false
                : responseRobot?.robotClusters?.filter(
                    (robotCluster: any) =>
                      robotCluster?.robotStatus === "CreatingEnvironment"
                  )?.length
                ? false
                : true,
            },
            {
              name: "Creating Discovery Server",
              isFinished: !responseRobot
                ? false
                : responseRobot?.robotClusters?.filter(
                    (robotCluster: any) =>
                      robotCluster?.robotStatus === "CreatingEnvironment" ||
                      robotCluster?.robotStatus === "CreatingDiscoveryServer"
                  )?.length
                ? false
                : true,
            },

            {
              name: "Pulling ROS2 Image",
              isFinished: !responseRobot
                ? false
                : responseRobot?.robotClusters?.filter(
                    (robotCluster: any) =>
                      robotCluster?.robotStatus === "CreatingEnvironment" ||
                      robotCluster?.robotStatus === "CreatingDiscoveryServer" ||
                      robotCluster?.robotStatus === "ConfiguringEnvironment"
                  )?.length
                ? false
                : true,
            },
            {
              name: "Setting up ROS2 Environment",
              isFinished: !responseRobot
                ? false
                : responseRobot?.robotClusters?.filter(
                    (robotCluster: any) =>
                      robotCluster?.robotStatus === "CreatingEnvironment" ||
                      robotCluster?.robotStatus === "CreatingDiscoveryServer" ||
                      robotCluster?.robotStatus === "ConfiguringEnvironment"
                  )?.length
                ? false
                : true,
            },
            {
              name: "Creating Directories",
              isFinished: !responseRobot
                ? false
                : responseRobot?.robotClusters?.filter(
                    (robotCluster: any) =>
                      robotCluster?.robotStatus === "CreatingEnvironment" ||
                      robotCluster?.robotStatus === "CreatingDiscoveryServer" ||
                      robotCluster?.robotStatus === "ConfiguringEnvironment"
                  )?.length
                ? false
                : true,
            },
            {
              name: "Setting up Ubuntu",
              isFinished: !responseRobot
                ? false
                : responseRobot?.robotClusters?.filter(
                    (robotCluster: any) =>
                      robotCluster?.robotStatus === "CreatingEnvironment" ||
                      robotCluster?.robotStatus === "CreatingDiscoveryServer" ||
                      robotCluster?.robotStatus === "ConfiguringEnvironment"
                  )?.length
                ? false
                : true,
            },
          ],
        },
        {
          name: "Creating Development Suite",
          process: [
            {
              name: "Creating ROS Bridge Suite",
              isFinished: responseRobot?.robotClusters?.filter(
                (robotCluster: any) =>
                  robotCluster?.robotStatus === "CreatingBridge"
              )?.length
                ? false
                : true,
            },
            {
              name: "Creating Development Suite",
              isFinished: responseRobot?.robotClusters?.filter(
                (robotCluster: any) =>
                  robotCluster?.robotStatus === "CreatingBridge" ||
                  robotCluster?.robotStatus === "CreatingDevelopmentSuite"
              )?.length
                ? false
                : true,
            },
          ],
        },
        {
          name: "Configuring Workspaces",
          process: [
            {
              name: "Cloning Repositories",
              isFinished: responseRobot?.robotClusters?.filter(
                (robotCluster: any) =>
                  robotCluster?.robotStatus === "ConfiguringWorkspaces"
              )?.length
                ? false
                : true,
            },
            {
              name: "Setting up ROS2 Workspaces",
              isFinished: responseRobot?.robotClusters?.filter(
                (robotCluster: any) =>
                  robotCluster?.robotStatus === "ConfiguringWorkspaces"
              )?.length
                ? false
                : true,
            },
          ],
        },
      ]}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 animate__animated animate__fadeIn"
      >
        {isImportRobot && robotData?.step3?.robotBuildSteps?.length === 0 ? (
          <div className="h-full w-full flex flex-col items-center gap-4">
            <SidebarInfo
              text="It seems that you have not configured any build steps for this
              robot. If you want to configure build steps, please click on the +
              button below."
              component={
                <CreateRobotFormAddButton
                  onClick={() => handleAddStepToBuildStep(formik)}
                  disabled={formik?.isSubmitting}
                />
              }
            />
          </div>
        ) : (
          <Fragment>
            <div>
              <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
                Build Manager Name:
                <InfoTip content="Type a new build manager name." />
              </div>
              <InputText
                {...formik.getFieldProps("buildManagerName")}
                className="!text-sm"
                disabled={formik?.isSubmitting}
              />
              <InputError
                error={formik.errors.buildManagerName}
                touched={formik.touched.buildManagerName}
              />
            </div>

            <div>
              <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
                Build Steps:
                <InfoTip content="Build Steps" />
              </div>
              <div className="flex flex-col gap-2">
                {robotData?.step3?.robotBuildSteps?.map(
                  (buildStep: any, buildStepIndex: number) => {
                    console.log(buildStep);
                    return (
                      <CreateRobotFormBuildStepItem
                        key={buildStepIndex}
                        formik={formik}
                        buildStep={buildStep}
                        buildStepIndex={buildStepIndex}
                        stepState={responseBuildManager?.robotClusters?.map(
                          (item: any) => item?.buildManagerStatus
                        )}
                        disabled={isImportRobot || formik?.isSubmitting}
                        isImportRobot={isImportRobot || false}
                      />
                    );
                  }
                )}
              </div>
            </div>

            <CreateRobotFormAddButton
              onClick={() => handleAddStepToBuildStep(formik)}
              disabled={formik?.isSubmitting}
            />

            <div className="w-full flex gap-2">
              {isImportRobot && (
                <RobotDeleteBuildManagerButton
                  disabled={formik?.isSubmitting}
                  submitting={formik?.isSubmitting}
                />
              )}
              <Button
                type="submit"
                disabled={!formik?.isValid || formik.isSubmitting}
                className="w-full !h-11 text-xs"
                text={
                  formik.isSubmitting ? (
                    <img
                      className="w-10 h-10"
                      src="/svg/general/loading.svg"
                      alt="loading"
                    />
                  ) : isImportRobot ? (
                    `Update Build Configration`
                  ) : (
                    `Next Step`
                  )
                }
              />
            </div>
          </Fragment>
        )}
      </form>
    </CreateRobotFormLoader>
  );
}
