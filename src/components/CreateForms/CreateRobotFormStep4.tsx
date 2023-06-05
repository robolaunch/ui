import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { IRobotLaunchSteps } from "../../interfaces/robotInterfaces";
import useCreateRobot from "../../hooks/useCreateRobot";
import { FormikProps, useFormik } from "formik";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import CreateRobotFormLaunchStepItem from "../CreateRobotFormLaunchStepItem/CreateRobotFormLaunchStepItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import {
  createRobotLaunchManager,
  getRobotBuildManagers,
} from "../../resources/RobotSlice";
import { BsPlusCircle } from "react-icons/bs";
import Button from "../Button/Button";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function CreateRobotFormStep4(): ReactElement {
  const { robotData, setRobotData, handleAddStepToLaunchStep } =
    useCreateRobot();
  const { selectedState } = useSidebar();
  const dispatch = useAppDispatch();
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const navigate = useNavigate();

  const formik: FormikProps<IRobotLaunchSteps> = useFormik<IRobotLaunchSteps>({
    initialValues: robotData?.step4,
    onSubmit: async (values: any) => {
      formik.setSubmitting(true);

      dispatch(
        createRobotLaunchManager({
          organizationId: selectedState?.organization?.organizationId,
          roboticsCloudName: selectedState?.roboticsCloud?.name,
          instanceId: selectedState?.instance?.instanceId,
          region: selectedState?.instance?.region,
          robotName: robotData?.step1?.robotName,
          fleetName: selectedState?.fleet?.name,
          physicalInstanceName: robotData?.step1?.physicalInstanceName,
          launchManagerName: values?.launchManagerName,
          robotLaunchSteps: values?.robotLaunchSteps,
        })
      ).then((responseRobotLaunchManager: any) => {
        toast.success(
          "Robot Launch Manager created successfully. Redirecting to robot page..."
        );
        setTimeout(() => {
          navigate(
            `/${selectedState?.organization?.name}/${selectedState?.roboticsCloud?.name}/${selectedState?.instance?.name}/${selectedState?.fleet?.name}/${robotData?.step1?.robotName}`
          );
        }, 1000);
      });
    },
  });

  useEffect(
    () => {
      if (!responseBuildManager) {
        getBuildManager();
      }

      const timer = setInterval(() => {
        getBuildManager();
      }, 10000);

      if (
        responseBuildManager?.robotClusters.filter(
          (robotCluster: any) =>
            robotCluster?.buildManagerStatus !== "EnvironmentReady"
        )?.length < 1
      ) {
        clearInterval(timer);
      }

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseBuildManager]
  );

  function getBuildManager() {
    dispatch(
      getRobotBuildManagers({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName,
      })
    ).then((responseBuildManager: any) => {
      if (
        Array.isArray(responseBuildManager?.payload?.data) &&
        Array.isArray(responseBuildManager?.payload?.data[0]?.roboticsClouds) &&
        Array.isArray(
          responseBuildManager?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        Array.isArray(
          responseBuildManager?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances[0]?.robolaunchFederatedRobots
        ) &&
        responseBuildManager?.payload?.data[0]?.roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
      ) {
        setResponseBuildManager(
          responseBuildManager?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
        );
      }
    });
  }

  useEffect(() => {
    setRobotData({
      ...robotData,
      step4: formik.values,
    });
    // eslint-disable-next-line
  }, [formik.values]);

  return (
    <Fragment>
      {responseBuildManager?.robotClusters.filter(
        (robotCluster: any) => robotCluster?.buildManagerStatus !== "Ready"
      )?.length > 0 ? (
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <img
            className="w-12 mx-auto pt-10"
            src="/svg/general/loading.svg"
            alt="Loading..."
          />
          <span className="text-sm text-layer-light-900 pb-4">
            Please wait while we create your robot. This may take a few minutes.
          </span>
          <div className="w-full flex gap-4">
            {responseBuildManager?.robotClusters.map((robotCluster: any) => {
              return (
                <div className="w-full flex flex-col gap-3 justify-center items-center border border-layer-light-100 shadow rounded p-4">
                  <div className="flex items-center justify-center">
                    {robotCluster?.buildManagerStatus === "EnvironmentReady" ? (
                      <MdVerified size={20} className="!text-green-500" />
                    ) : (
                      <img
                        className="w-12 mx-auto"
                        src="/svg/general/loading.svg"
                        alt="Loading..."
                      />
                    )}
                  </div>
                  <span className="font-semibold text-sm text-layer-light-900">
                    {robotCluster?.name}
                  </span>
                  <span className="text-sm text-layer-dark-700">
                    {robotCluster?.buildManagerStatus}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : responseBuildManager ? (
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 animate__animated animate__fadeIn pt-6"
        >
          <div>
            <InputText
              {...formik.getFieldProps(`launchManagerName`)}
              placeholder="Launch Manager Name"
              disabled={formik?.isSubmitting}
            />
            <InputError
              // @ts-ignore
              error={formik?.errors?.launchManagerName}
              touched={formik?.touched?.launchManagerName}
            />
          </div>

          <div className="flex flex-col gap-2">
            {robotData?.step4?.robotLaunchSteps?.map(
              (launchStep: any, launchStepIndex: number) => {
                return (
                  <CreateRobotFormLaunchStepItem
                    key={launchStepIndex}
                    formik={formik}
                    launchStep={launchStep}
                    launchStepIndex={launchStepIndex}
                  />
                );
              }
            )}

            <BsPlusCircle
              onClick={() => handleAddStepToLaunchStep(formik)}
              size={22}
              className="mx-auto text-layer-secondary-700 hover:scale-90 transition-all duration-500 cursor-pointer mt-2"
            />
          </div>
          <div className="flex gap-6">
            <Button
              type="reset"
              className="!h-11 !bg-layer-light-50 !text-primary border border-primary hover:!bg-layer-primary-100 transition-all duration-500 text-xs"
              text={`Previous Step`}
            />
            <Button
              type="submit"
              disabled={!formik?.isValid || formik.isSubmitting}
              className="!h-11 text-xs"
              text={`Next Step`}
            />
          </div>
        </form>
      ) : (
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <img
            className="w-12 mx-auto pt-10"
            src="/svg/general/loading.svg"
            alt="Loading..."
          />
        </div>
      )}
    </Fragment>
  );
}
