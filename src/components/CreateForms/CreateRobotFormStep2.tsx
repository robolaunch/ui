import React, { ReactElement, useEffect, useState } from "react";
import { FormikProps, useFormik } from "formik";
import { IRobotWorkspaces } from "../../interfaces/robotInterfaces";
import Button from "../Button/Button";
import CreateRobotFormWorkspaceItem from "../CreateRobotFormWorkspaceItem/CreateRobotFormWorkspaceItem";
import useSidebar from "../../hooks/useSidebar";
import useCreateRobot from "../../hooks/useCreateRobot";
import { useAppDispatch } from "../../hooks/redux";
import { createFederatedRobot } from "../../resources/RobotSlice";
import useFunctions from "../../hooks/useFunctions";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";
import { useParams } from "react-router-dom";
import { CreateRobotFormStep2Validations } from "../../validations/RobotsValidations";
import { toast } from "sonner";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";

interface ICreateRobotFormStep2 {
  isImportRobot?: boolean;
}

export default function CreateRobotFormStep2({
  isImportRobot,
}: ICreateRobotFormStep2): ReactElement {
  const [responseFleet, setResponseFleet] = useState<any>();
  const { selectedState, handleCreateRobotNextStep, setSidebarState } =
    useSidebar();
  const { robotData, setRobotData, handleAddWorkspaceStep } = useCreateRobot();
  const dispatch = useAppDispatch();
  const { handleSetterResponseFleet } = useFunctions();
  const [isLoadingImportRobot, setIsLoadingImportRobot] =
    useState<boolean>(true);
  const { handleSetterResponseRobot } = useFunctions();
  const url = useParams();

  const formik: FormikProps<IRobotWorkspaces> = useFormik<IRobotWorkspaces>({
    validationSchema: CreateRobotFormStep2Validations,
    initialValues: robotData?.step2,
    onSubmit: async (values: any) => {
      formik.setSubmitting(true);
      await dispatch(
        createFederatedRobot({
          organizationId: selectedState?.organization?.organizationId,
          roboticsCloudName: selectedState?.roboticsCloud?.name,
          instanceId: selectedState?.instance?.instanceId,
          region: selectedState?.instance?.region,
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
          workspaces: values?.workspaces,
        })
      );
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
        handleSetterResponseRobot(url?.robotName);
        setTimeout(() => {
          setIsLoadingImportRobot(false);
        }, 2000);
      } else {
        if (!responseFleet) {
          handleSetterResponseFleet(setResponseFleet);
        }
      }

      const timer = setInterval(() => {
        !isImportRobot && handleSetterResponseFleet(setResponseFleet);
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseFleet]
  );

  return (
    <CreateRobotFormLoader
      isLoading={
        isImportRobot
          ? isLoadingImportRobot
          : !responseFleet || responseFleet?.fleetStatus !== "Ready"
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
                status: responseFleet?.fleetStatus,
              },
            ]
      }
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-8 animate__animated animate__fadeIn"
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
                  disabled={formik.isSubmitting || isImportRobot}
                />
              );
            }
          )}
        </div>

        <CreateRobotFormAddButton
          disabled={formik.isSubmitting || isImportRobot}
          onClick={() => handleAddWorkspaceStep(formik)}
        />

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
              `Update Robot`
            ) : robotData?.step1?.isDevelopmentMode ? (
              `Create Robot`
            ) : (
              `Next Step`
            )
          }
        />
      </form>
    </CreateRobotFormLoader>
  );
}
