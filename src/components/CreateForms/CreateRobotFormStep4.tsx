import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { IRobotLaunchSteps } from "../../interfaces/robotInterfaces";
import useCreateRobot from "../../hooks/useCreateRobot";
import { FormikProps, useFormik } from "formik";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import CreateRobotFormLaunchStepItem from "../CreateRobotFormLaunchStepItem/CreateRobotFormLaunchStepItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import { createRobotLaunchManager } from "../../resources/RobotSlice";
import { BsPlusCircle } from "react-icons/bs";
import Button from "../Button/Button";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useFunctions from "../../hooks/useFunctions";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";

interface ICreateRobotFormStep4 {
  isImportRobot?: boolean;
  robotDataLaunchIndex?: number;
}

export default function CreateRobotFormStep4({
  isImportRobot,
  robotDataLaunchIndex,
}: ICreateRobotFormStep4): ReactElement {
  const { robotData, setRobotData, handleAddStepToLaunchStep } =
    useCreateRobot();
  const { selectedState } = useSidebar();
  const dispatch = useAppDispatch();
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const navigate = useNavigate();
  const { handleSetterResponseBuildManager } = useFunctions();

  const formik: FormikProps<IRobotLaunchSteps> = useFormik<IRobotLaunchSteps>({
    initialValues: robotData?.step4[robotDataLaunchIndex || 0],
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
        handleSetterResponseBuildManager(
          robotData?.step1?.robotName,
          setResponseBuildManager
        );
      }

      const timer = setInterval(() => {
        handleSetterResponseBuildManager(
          robotData?.step1?.robotName,
          setResponseBuildManager
        );
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

  useEffect(() => {
    setRobotData((prevState: any) => {
      return {
        ...robotData,
        step4: [
          ...prevState.step4.map((step: any, index: number) => {
            if (index === robotDataLaunchIndex) {
              return {
                launchManagerName: formik.values?.launchManagerName,
                robotLaunchSteps: formik.values?.robotLaunchSteps,
              };
            }
            return step;
          }),
        ],
      };
    });
    // eslint-disable-next-line
  }, [formik.values]);

  return (
    <CreateRobotFormLoader
      isLoading={
        !responseBuildManager ||
        responseBuildManager?.robotClusters.filter(
          (item: any) => item?.buildManagerStatus !== "Ready"
        )?.length
      }
      loadingItems={responseBuildManager?.robotClusters.map((item: any) => {
        return {
          name: item?.name,
          status: item?.buildManagerStatus,
        };
      })}
    >
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
          {robotData?.step4[robotDataLaunchIndex || 0].robotLaunchSteps?.map(
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
          {!isImportRobot && (
            <Button
              type="reset"
              className="!h-11 !bg-layer-light-50 !text-primary border border-primary hover:!bg-layer-primary-100 transition-all duration-500 text-xs"
              text={`Previous Step`}
            />
          )}
          <Button
            type="submit"
            disabled={!formik?.isValid || formik.isSubmitting}
            className="!h-11 text-xs"
            text={isImportRobot ? `Update Launch Step` : `Create Robot`}
          />
        </div>
      </form>
    </CreateRobotFormLoader>
  );
}
