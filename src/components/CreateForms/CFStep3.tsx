import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import CFAddBuildButton from "../CFAddBuildButton/CFAddBuildButton";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { IBuildSteps } from "../../interfaces/robotInterfaces";
import CFRobotButtons from "../CFRobotButtons/CFRobotButtons";
import CFBuildMapper from "../CFBuildMapper/CFBuildMapper";
import CreateRobotFormLoader from "../CFLoader/CFLoader";
import useCreateRobot from "../../hooks/useCreateRobot";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import CFBuildName from "../CFBuildName/CFBuildName";
import useFunctions from "../../hooks/useFunctions";
import { FormikProps, useFormik } from "formik";
import useMain from "../../hooks/useMain";
import { toast } from "sonner";
import * as Yup from "yup";

interface ICFStep3 {
  isImportRobot?: boolean;
}

export default function CFStep3({ isImportRobot }: ICFStep3): ReactElement {
  const { robotData, setRobotData, handleAddBuildStep } = useCreateRobot();
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const { handleCreateRobotNextStep, selectedState } = useMain();
  const { getRobot, getBuildManager, createBuildManager } = useFunctions();

  useEffect(
    () => {
      if (!robotData.step1.clusters.environment && isImportRobot) {
        handleGetRobot();

        handleGetBuildManager();
      } else if (!robotData.step1.clusters.environment && !isImportRobot) {
        setTimeout(() => {
          handleGetRobot();
        }, 10000);
      }

      const timer = setInterval(() => {
        !isImportRobot && handleGetRobot();
      }, 10000);

      if (
        !robotData.step1.clusters.environment?.filter(
          (cluster) => cluster?.status !== "EnvironmentReady",
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
    [robotData],
  );

  function handleGetRobot() {
    getRobot(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name!,
        robotName: robotData?.step1.details.name,
      },
      {
        ifErrorNavigateTo404: false,
        setRobotData: true,
      },
    );
  }

  function handleGetBuildManager() {
    getBuildManager({
      ifErrorNavigateTo404: false,
      setRobotData: true,
      setResponse: setResponseBuildManager,
    });
  }

  const formik: FormikProps<IBuildSteps> = useFormik<IBuildSteps>({
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Build Manager Name is required"),
      steps: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .required("Step Name is required")
            .test("unique-name", "This name is already taken", (value) => {
              const temp = formik.values.steps?.filter(
                (item: any) => item.name === value && item,
              );
              return temp.length > 1 ? false : true;
            }),
          workspace: Yup.string().required("Workspace is required"),
          isShellCode: Yup.boolean(),
          command: Yup.string().when("isShellCode", {
            is: true,
            then: Yup.string().required("Bash is required"),
            otherwise: Yup.string(),
          }),
          script: Yup.string().when("isShellCode", {
            is: false,
            then: Yup.string().required("Script is required"),
            otherwise: Yup.string(),
          }),
          instanceScope: Yup.array().min(
            1,
            "At least one instance is required",
          ),
        }),
      ),
    }),
    initialValues: robotData?.step3,
    onSubmit: async () => {
      formik.setSubmitting(true);
      await createBuildManager().then(() => {
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
    <Fragment>
      <CreateRobotFormLoader
        type="build"
        loadingText={
          isImportRobot
            ? "Loading..."
            : "Please wait while we create your robot. This may take a few minutes."
        }
        isLoading={
          !robotData?.step1?.clusters?.environment?.length ||
          robotData.step1.clusters.environment.some(
            (cluster) => cluster?.status !== "EnvironmentReady",
          )
        }
        loadingItems={robotData?.step1?.clusters?.environment}
        currentStep={
          !robotData?.step1?.clusters?.environment?.length
            ? 1
            : robotData.step1.clusters.environment.some((cluster) =>
                  [
                    "CreatingEnvironment",
                    "CreatingDiscoveryServer",
                    "ConfiguringEnvironment",
                  ].includes(cluster?.status),
                )
              ? 1
              : robotData.step1.clusters.environment.some((cluster) =>
                    ["CreatingBridge", "CreatingDevelopmentSuite"].includes(
                      cluster?.status,
                    ),
                  )
                ? 2
                : 3
        }
        stepbarItems={(() => {
          function createProcessItem(statuses: string[], processName: string) {
            return {
              name: processName,
              isFinished:
                robotData?.step1?.clusters?.environment?.some((cluster) =>
                  statuses.includes(cluster?.status),
                ) ?? false,
            };
          }

          return [
            {
              name: "Creating Environment",
              process: [
                createProcessItem(
                  ["CreatingEnvironment"],
                  "Creating Environment",
                ),
                createProcessItem(
                  [
                    "CreatingEnvironment",
                    "CreatingDiscoveryServer",
                    "ConfiguringEnvironment",
                  ],
                  "Pulling ROS 2 Image",
                ),
                createProcessItem(
                  [
                    "CreatingEnvironment",
                    "CreatingDiscoveryServer",
                    "ConfiguringEnvironment",
                  ],
                  "Setting up ROS 2 Environment",
                ),
                createProcessItem(
                  [
                    "CreatingEnvironment",
                    "CreatingDiscoveryServer",
                    "ConfiguringEnvironment",
                  ],
                  "Creating Directories",
                ),
                createProcessItem(
                  [
                    "CreatingEnvironment",
                    "CreatingDiscoveryServer",
                    "ConfiguringEnvironment",
                  ],
                  "Setting up Ubuntu",
                ),
              ],
            },
            {
              name: "Creating Development Suite",
              process: [
                createProcessItem(
                  ["CreatingBridge"],
                  "Creating ROS Bridge Suite",
                ),
                createProcessItem(
                  ["CreatingBridge", "CreatingDevelopmentSuite"],
                  "Creating Development Suite",
                ),
              ],
            },
            {
              name: "Configuring Workspaces",
              process: [
                createProcessItem(
                  ["ConfiguringWorkspaces"],
                  "Cloning Repositories",
                ),
                createProcessItem(
                  ["ConfiguringWorkspaces"],
                  "Setting up ROS 2 Workspaces",
                ),
              ],
            },
          ];
        })()}
        formik={formik}
      >
        {isImportRobot && robotData?.step3?.steps?.length === 0 ? (
          <div className="flex h-full w-full flex-col items-center gap-4">
            <SidebarInfo
              text="It seems that you have not configured any build steps for this
              robot. If you want to configure build steps, please click on the +
              button below."
              component={
                <CreateRobotFormAddButton
                  onClick={() => handleAddBuildStep(formik)}
                  disabled={formik?.isSubmitting}
                />
              }
            />
          </div>
        ) : (
          <Fragment>
            <CFBuildName formik={formik} />

            <CFBuildMapper
              formik={formik}
              responseBuildManager={responseBuildManager}
              isImportRobot={isImportRobot}
            />

            <CFAddBuildButton formik={formik} />

            <CFRobotButtons
              formik={formik}
              step={3}
              isImportRobot={isImportRobot}
            />
          </Fragment>
        )}
      </CreateRobotFormLoader>
      {!isImportRobot &&
        !(
          !robotData.step1.clusters.environment ||
          robotData.step1.clusters.environment?.filter(
            (cluster) => cluster?.status !== "EnvironmentReady",
          )?.length
        )}
    </Fragment>
  );
}
