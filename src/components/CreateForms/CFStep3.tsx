import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import CFAddBuildButton from "../CFAddBuildButton/CFAddBuildButton";
import CFRobotButtons from "../CFRobotButtons/CFRobotButtons";
import CFBuildMapper from "../CFBuildMapper/CFBuildMapper";
import { Fragment, ReactElement, useEffect } from "react";
import CreateRobotFormLoader from "../CFLoader/CFLoader";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import CFBuildName from "../CFBuildName/CFBuildName";
import useFunctions from "../../hooks/useFunctions";
import useMain from "../../hooks/useMain";
import { handleAddBuild } from "../../functions/form.build.function";
import useForm from "../../hooks/useForm";

interface ICFStep3 {
  isImportRobot?: boolean;
  disabledLoading?: boolean;
}

export default function CFStep3({
  isImportRobot,
  disabledLoading,
}: ICFStep3): ReactElement {
  const { robotData, setRobotData } = useMain();
  const { getRobotFC, getBuildManager } = useFunctions();
  const { step3Formik: formik } = useForm();

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
    getRobotFC(false, robotData?.step1?.details?.name!);
  }

  function handleGetBuildManager() {
    getBuildManager({
      ifErrorNavigateTo404: false,
      setRobotData: true,
      setResponse: false,
    });
  }

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
        disabledLoading={disabledLoading}
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
        {isImportRobot && robotData?.step3?.steps?.length! === 0 ? (
          <div className="flex h-full w-full flex-col items-center gap-4">
            <SidebarInfo
              text="It seems that you have not configured any build steps for this
              robot. If you want to configure build steps, please click on the +
              button below."
              component={
                <CreateRobotFormAddButton
                  onClick={() => handleAddBuild(formik)}
                  disabled={formik?.isSubmitting}
                />
              }
            />
          </div>
        ) : (
          <Fragment>
            <CFBuildName formik={formik} />

            <CFBuildMapper formik={formik} isImportRobot={isImportRobot} />

            <CFAddBuildButton formik={formik} />

            {!disabledLoading && (
              <CFRobotButtons
                formik={formik}
                step={3}
                isImportRobot={isImportRobot}
              />
            )}
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
