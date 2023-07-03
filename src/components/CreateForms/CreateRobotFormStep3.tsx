import React, { ReactElement, useEffect, useState } from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { IRobotBuildSteps } from "../../interfaces/robotInterfaces";
import Button from "../Button/Button";
import CreateRobotFormBuildStepItem from "../CreateRobotFormBuildStepItem/CreateRobotFormBuildStepItem";
import useSidebar from "../../hooks/useSidebar";
import useCreateRobot from "../../hooks/useCreateRobot";
import { useAppDispatch } from "../../hooks/redux";
import { createRobotBuildManager } from "../../resources/RobotSlice";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import InfoTip from "../InfoTip/InfoTip";
import useFunctions from "../../hooks/useFunctions";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";
import { toast } from "sonner";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";

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
        createRobotBuildManager({
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
      );

      if (isImportRobot) {
        toast.success("Robot updated successfully");
        return window.location.reload();
      }

      formik.setSubmitting(false);
      handleCreateRobotNextStep();
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
        !responseRobot ||
        responseRobot?.robotClusters?.filter(
          (robotCluster: any) =>
            robotCluster?.robotStatus !== "EnvironmentReady"
        )?.length
      }
      loadingItems={responseRobot?.robotClusters.map((item: any) => {
        return {
          name: item?.name,
          status: item?.robotStatus,
        };
      })}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 animate__animated animate__fadeIn pt-6"
      >
        <div>
          <InputText
            {...formik.getFieldProps(`buildManagerName`)}
            placeholder="Build Manager Name"
            disabled={formik?.isSubmitting}
          />
          <InputError
            // @ts-ignore
            error={formik?.errors?.buildManagerName}
            touched={formik?.touched?.buildManagerName}
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
                return (
                  <CreateRobotFormBuildStepItem
                    key={buildStepIndex}
                    formik={formik}
                    buildStep={buildStep}
                    buildStepIndex={buildStepIndex}
                    disabled={isImportRobot || formik?.isSubmitting}
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
      </form>
    </CreateRobotFormLoader>
  );
}
