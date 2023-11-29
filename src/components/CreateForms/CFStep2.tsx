import CFAddWorkspaceButton from "../CFAddWorkspaceButton/CFAddWorkspaceButton";
import { CFRobotStep2Validations } from "../../validations/RobotsValidations";
import CFWorkspacesMapper from "../CFWorkspacesMapper/CFWorkspacesMapper";
import { CFAppStep2Validations } from "../../validations/AppsValidations";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import CFCancelButton from "../CFCancelButton/CFCancelButton";
import { envApplication } from "../../helpers/envProvider";
import useCreateRobot from "../../hooks/useCreateRobot";
import { createRobot } from "../../toolkit/RobotSlice";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import { useParams } from "react-router-dom";
import CFLoader from "../CFLoader/CFLoader";
import useMain from "../../hooks/useMain";
import Button from "../Button/Button";
import { useFormik } from "formik";
import { toast } from "sonner";

interface ICFStep2 {
  isImportRobot?: boolean;
}

export default function CFStep2({ isImportRobot }: ICFStep2): ReactElement {
  const [responseFleet, setResponseFleet] = useState<any>(undefined);
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const { selectedState, handleCreateRobotNextStep, setSidebarState } =
    useMain();
  const { robotData, setRobotData } = useCreateRobot();
  const [isLoadingImportRobot, setIsLoadingImportRobot] =
    useState<boolean>(true);
  const {
    getRobot,
    getFleet,
    getEnvironment,
    getNamespace,
    createEnvironment,
  } = useFunctions();
  const url = useParams();
  const dispatch = useAppDispatch();

  const formik = useFormik<IWorkspaces>({
    validationSchema: envApplication
      ? CFAppStep2Validations
      : CFRobotStep2Validations,
    initialValues: robotData?.step2,
    onSubmit: () => {
      formik.setSubmitting(true);

      if (envApplication) {
        createEnvironment(false).then(async () => {
          await handleSubmit();
        });
      } else {
        dispatch(
          createRobot({
            organizationId: selectedState?.organization?.organizationId!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.instanceId!,
            region: selectedState?.roboticsCloud?.region!,
            robotName: robotData?.step1?.robotName,
            fleetName: selectedState?.fleet?.name,
            physicalInstanceName: robotData?.step1?.isVirtualRobot
              ? undefined
              : robotData?.step1?.physicalInstanceName,
            distributions: robotData?.step1?.rosDistros,
            bridgeEnabled: robotData?.step1?.isEnabledROS2Bridge,
            vdiEnabled: robotData?.step1?.remoteDesktop?.isEnabled,
            vdiSessionCount: robotData?.step1?.remoteDesktop?.sessionCount,
            ideEnabled: robotData?.step1?.isEnabledIde,
            storageAmount: robotData?.step1?.robotStorage,
            gpuEnabledForCloudInstance:
              robotData?.step1?.gpuEnabledForCloudInstance,
            workspaces: robotData.step2.workspaces,
          }),
        ).then(async () => {
          await handleSubmit();
        });
      }
    },
  });

  async function handleSubmit() {
    formik.setSubmitting(false);

    if (isImportRobot) {
      toast.success("Robot updated successfully");
      return window.location.reload();
    }

    if (robotData?.step1?.isDevelopmentMode) {
      setSidebarState((prevState: any) => {
        return {
          ...prevState,
          isCreateMode: false,
          page: "robot",
        };
      });
    } else {
      handleCreateRobotNextStep();
    }
  }

  useEffect(() => {
    setRobotData({
      ...robotData,
      step2: formik.values,
    });
    // eslint-disable-next-line
  }, [formik.values]);

  useEffect(
    () => {
      if (isImportRobot) {
        envApplication ? handleGetEnvironment() : handleGetRobot();
        setTimeout(() => {
          setIsLoadingImportRobot(false);
        }, 2000);
      } else {
        if (!responseFleet) {
          envApplication ? handleGetNamespace() : handleGetFleet();
        }
      }

      const timer = setInterval(() => {
        if (!isImportRobot && !robotData?.step1?.isVirtualRobot) {
          envApplication ? handleGetNamespace() : handleGetFleet();
        }
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseFleet],
  );

  function handleGetRobot() {
    getRobot(
      {
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.instance?.region!,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName,
      },
      {
        ifErrorNavigateTo404: false,
        setRobotData: true,
        setResponse: setResponseRobot,
      },
    );
  }

  function handleGetEnvironment() {
    getEnvironment(
      {
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name,
        environmentName: url?.robotName as string,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        setResponse: setResponseRobot,
        setRobotData: true,
      },
    );
  }

  function handleGetFleet() {
    getFleet(
      {
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.instance?.region!,
        fleetName: selectedState?.fleet?.name,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseFleet,
      },
    );
  }

  function handleGetNamespace() {
    getNamespace(
      {
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.instance?.region!,
        namespaceName: selectedState?.fleet?.name,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseFleet,
      },
    );
  }

  return (
    <CFLoader
      type="workspace"
      isLoading={
        isImportRobot
          ? isLoadingImportRobot
          : !responseFleet ||
            (envApplication
              ? responseFleet?.namespaceStatus !== "Active"
              : responseFleet?.fleetStatus !== "Ready")
      }
      loadingText={
        isImportRobot
          ? "Loading..."
          : "Please wait while we preparing your robot. This may take a few minutes."
      }
      loadingItems={
        isImportRobot
          ? []
          : [
              {
                name: responseFleet?.name,
                status:
                  responseFleet?.fleetStatus || responseFleet?.namespaceStatus,
              },
            ]
      }
      formik={formik}
    >
      {isImportRobot && envApplication && !formik.values.workspaces?.length ? (
        <SidebarInfo text={`No Workspace Available`} />
      ) : (
        <Fragment>
          <CFWorkspacesMapper
            formik={formik}
            responseRobot={responseRobot}
            isImportRobot={isImportRobot}
          />

          <CFAddWorkspaceButton formik={formik} />
        </Fragment>
      )}

      <Fragment>
        {!(envApplication && url?.robotName) && (
          <div className="mt-10 flex w-full flex-col gap-6">
            <div className="flex gap-2">
              {!isImportRobot && (
                <CFCancelButton disabled={formik.isSubmitting} />
              )}
              <Button
                type="submit"
                disabled={
                  !!(
                    !formik?.isValid ||
                    formik.isSubmitting ||
                    JSON.stringify(formik.initialValues) ===
                      JSON.stringify(formik.values) ||
                    (envApplication && url?.robotName)
                  )
                }
                loading={formik.isSubmitting}
                className="!h-11 w-full text-xs"
                text={
                  formik.isSubmitting ? (
                    <img
                      className="h-10 w-10"
                      src="/svg/general/loading.svg"
                      alt="loading"
                    />
                  ) : isImportRobot ? (
                    "Update Robot"
                  ) : robotData?.step1?.isDevelopmentMode ? (
                    envApplication ? (
                      "Create Application with Workspaces"
                    ) : (
                      "Create Robot"
                    )
                  ) : (
                    "Next Step"
                  )
                }
              />
            </div>
          </div>
        )}
      </Fragment>
    </CFLoader>
  );
}
