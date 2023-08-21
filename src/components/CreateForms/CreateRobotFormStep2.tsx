import React, { ReactElement, useEffect, useState } from "react";
import {
  envOnPremiseFleet,
  envOnPremiseRobot,
} from "../../helpers/envProvider";
import CreateRobotFormWorkspaceItem from "../CreateRobotFormWorkspaceItem/CreateRobotFormWorkspaceItem";
import CreateRobotFormCancelButton from "../CreateRobotFormCancelButton/CreateRobotFormCancelButton";
import { CreateEnvironmentFormStep2Validations } from "../../validations/EnvironmentsValidations";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { CreateRobotFormStep2Validations } from "../../validations/RobotsValidations";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";
import { IRobotWorkspaces } from "../../interfaces/robotInterfaces";
import { createEnvironment } from "../../toolkit/EnvironmentSlice";
import useCreateRobot from "../../hooks/useCreateRobot";
import { createRobot } from "../../toolkit/RobotSlice";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import { FormikProps, useFormik } from "formik";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import Button from "../Button/Button";
import { toast } from "sonner";

interface ICreateRobotFormStep2 {
  isImportRobot?: boolean;
}

export default function CreateRobotFormStep2({
  isImportRobot,
}: ICreateRobotFormStep2): ReactElement {
  const [responseFleet, setResponseFleet] = useState<any>(undefined);
  const { selectedState, handleCreateRobotNextStep, setSidebarState } =
    useMain();
  const { robotData, setRobotData, handleAddWorkspaceStep } = useCreateRobot();
  const dispatch = useAppDispatch();
  const [isLoadingImportRobot, setIsLoadingImportRobot] =
    useState<boolean>(true);
  const { getRobot, getFleet, getEnvironment, getNamespace } = useFunctions();
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const url = useParams();

  const formik: FormikProps<IRobotWorkspaces> = useFormik<IRobotWorkspaces>({
    validationSchema: envOnPremiseRobot
      ? CreateEnvironmentFormStep2Validations
      : CreateRobotFormStep2Validations,
    initialValues: robotData?.step2,
    onSubmit: (values: any) => {
      formik.setSubmitting(true);

      if (envOnPremiseRobot) {
        dispatch(
          createEnvironment({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            region: selectedState?.roboticsCloud?.region,
            instanceId: selectedState?.instance?.instanceId,
            fleetName: selectedState?.fleet?.name,
            environmentName: robotData?.step1?.robotName,
            domainName: robotData?.step1?.domainName,
            storageAmount: robotData?.step1?.robotStorage,
            vdiSessionCount: robotData?.step1?.remoteDesktop?.sessionCount,
            applicationName: robotData?.step1?.application?.name,
            applicationVersion: robotData?.step1?.application?.version,
            devspaceUbuntuDistro: robotData?.step1?.devspace?.ubuntuDistro,
            devspaceDesktop: robotData?.step1?.devspace?.desktop,
            devspaceVersion: robotData?.step1?.devspace?.version,
            workspaces: values?.workspaces,
          })
        ).then(async () => {
          await handleSubmit();
        });
      } else {
        dispatch(
          createRobot({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.roboticsCloud?.region,
            robotName: robotData?.step1?.robotName,
            fleetName: selectedState?.fleet?.name,
            workspaceUpdated: isImportRobot ? true : false,
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
            workspaces: values?.workspaces,
          })
        ).then(async () => {
          await handleSubmit();
        });
      }

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
    },
  });

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
        envOnPremiseRobot ? handleGetEnvironment() : handleGetRobot();
        setTimeout(() => {
          setIsLoadingImportRobot(false);
        }, 2000);
      } else {
        if (!responseFleet) {
          envOnPremiseFleet ? handleGetNamespace() : handleGetFleet();
        }
      }

      const timer = setInterval(() => {
        if (!isImportRobot && !robotData?.step1?.isVirtualRobot) {
          envOnPremiseFleet ? handleGetNamespace() : handleGetFleet();
        }
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseFleet]
  );

  function handleGetRobot() {
    getRobot(
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
        setResponse: setResponseRobot,
      }
    );
  }
  function handleGetEnvironment() {
    getEnvironment(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.roboticsCloud?.region,
        fleetName: selectedState?.fleet?.name,
        environmentName: url?.robotName as string,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        setResponse: setResponseRobot,
        setRobotData: true,
      }
    );
  }

  function handleGetFleet() {
    getFleet(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseFleet,
      }
    );
  }

  function handleGetNamespace() {
    getNamespace(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        namespaceName: selectedState?.fleet?.name,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseFleet,
      }
    );
  }

  useEffect(() => {
    console.log(
      !formik?.isValid,
      formik.isSubmitting,
      JSON.stringify(formik.initialValues) === JSON.stringify(formik.values),
      formik?.initialValues,
      formik?.values
    );
  }, [formik]);

  useEffect(() => {
    console.log(formik);
  }, [formik]);

  return (
    <CreateRobotFormLoader
      isLoading={
        isImportRobot
          ? isLoadingImportRobot
          : !responseFleet ||
            (envOnPremiseFleet
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
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 animate__animated animate__fadeIn"
      >
        <div className="flex flex-col gap-2">
          {robotData?.step2?.workspaces?.map(
            (workspace: any, workspaceIndex: number) => {
              return (
                <CreateRobotFormWorkspaceItem
                  key={workspaceIndex}
                  formik={formik}
                  workspace={workspace}
                  workspaceIndex={workspaceIndex}
                  workspaceState={responseRobot?.robotClusters?.map(
                    (cluster: any) => cluster.robotStatus
                  )}
                  disabled={formik.isSubmitting || isImportRobot}
                  isImportRobot={isImportRobot}
                />
              );
            }
          )}
        </div>

        <CreateRobotFormAddButton
          onClick={() => handleAddWorkspaceStep(formik)}
        />

        {/* Buttons */}
        <div className="flex gap-2 mt-10">
          {!isImportRobot && (
            <CreateRobotFormCancelButton disabled={formik.isSubmitting} />
          )}
          <Button
            type="submit"
            disabled={
              !formik?.isValid ||
              formik.isSubmitting ||
              JSON.stringify(formik.initialValues) ===
                JSON.stringify(formik.values)
            }
            loading={formik.isSubmitting}
            className="w-full !h-11 text-xs"
            text={
              formik.isSubmitting ? (
                <img
                  className="w-10 h-10"
                  src="/svg/general/loading.svg"
                  alt="loading"
                />
              ) : isImportRobot ? (
                `Update Robot`
              ) : robotData?.step1?.isDevelopmentMode ? (
                envOnPremiseRobot ? (
                  `Create Application`
                ) : (
                  `Create Robot`
                )
              ) : (
                `Next Step`
              )
            }
          />
        </div>
        {/* Buttons */}
      </form>
    </CreateRobotFormLoader>
  );
}
