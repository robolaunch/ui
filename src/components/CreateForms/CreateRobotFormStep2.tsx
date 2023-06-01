import React, { ReactElement, useEffect } from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { BsPlusCircle } from "react-icons/bs";
import { IRobotWorkspaces } from "../../interfaces/robotInterfaces";
import Button from "../Button/Button";
import CreateRobotFormWorkspaceItem from "../CreateRobotFormWorkspaceItem/CreateRobotFormWorkspaceItem";
import useSidebar from "../../hooks/useSidebar";
import useCreateRobot from "../../hooks/useCreateRobot";
import { useAppDispatch } from "../../hooks/redux";
import { createFederatedRobot } from "../../resources/RobotSlice";

export default function CreateRobotFormStep2(): ReactElement {
  const {
    selectedState,
    handleCreateRobotPreviousStep,
    handleCreateRobotNextStep,
    setSidebarState,
  } = useSidebar();
  const { robotData, setRobotData, handleAddWorkspaceStep } = useCreateRobot();
  const dispatch = useAppDispatch();

  const formik: FormikProps<IRobotWorkspaces> = useFormik<IRobotWorkspaces>({
    validationSchema: Yup.object().shape({
      workspaces: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Workspace Name is required"),
          workspaceDistro: Yup.string().required(
            "Workspace Distro is required"
          ),
          robotRepositories: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required("Repository Name is required"),
              url: Yup.string().required("Repository URL is required"),
              branch: Yup.string().required("Repository Branch is required"),
            })
          ),
        })
      ),
    }),
    initialValues: robotData?.step2,
    onSubmit: async (values: any) => {
      await formik.setSubmitting(true);
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
      await formik.setSubmitting(false);

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

  return (
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
              />
            );
          }
        )}
      </div>
      <BsPlusCircle
        onClick={() => handleAddWorkspaceStep(formik)}
        size={22}
        className="mx-auto text-layer-secondary-700 hover:scale-90 transition-all duration-500 cursor-pointer -mt-4"
      />
      <div className="flex gap-6">
        <Button
          onClick={handleCreateRobotPreviousStep}
          type="reset"
          className="!h-11 !bg-layer-light-50 !text-primary border border-primary hover:!bg-layer-primary-100 transition-all duration-500 text-xs"
          text={`Previous Step`}
        />
        <Button
          type="submit"
          disabled={!formik?.isValid || formik.isSubmitting}
          className="!h-11 text-xs"
          text={
            formik.isSubmitting ? (
              <img
                className="w-10 h-10"
                src="/svg/general/loading.svg"
                alt="loading"
              />
            ) : robotData?.step1?.isDevelopmentMode ? (
              `Create Robot`
            ) : (
              `Next Step`
            )
          }
        />
      </div>
    </form>
  );
}
