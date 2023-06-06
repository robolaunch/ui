import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { IRobotBuildSteps } from "../../interfaces/robotInterfaces";
import Button from "../Button/Button";
import { BsPlusCircle } from "react-icons/bs";
import CreateRobotFormBuildStepItem from "../CreateRobotFormBuildStepItem/CreateRobotFormBuildStepItem";
import useSidebar from "../../hooks/useSidebar";
import useCreateRobot from "../../hooks/useCreateRobot";
import { useAppDispatch } from "../../hooks/redux";
import {
  createRobotBuildManager,
  getFederatedRobot,
} from "../../resources/RobotSlice";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import { MdVerified } from "react-icons/md";
import InfoTip from "../InfoTip/InfoTip";

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
  const {
    handleCreateRobotPreviousStep,
    handleCreateRobotNextStep,
    selectedState,
  } = useSidebar();

  useEffect(
    () => {
      if (!responseRobot) {
        getRobot();
      }

      const timer = setInterval(() => {
        getRobot();
      }, 10000);

      if (
        responseRobot?.robotClusters.filter(
          (robotCluster: any) =>
            robotCluster?.robotStatus !== "EnvironmentReady"
        )?.length < 1
      ) {
        clearInterval(timer);
      }

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseRobot]
  );

  const formik: FormikProps<IRobotBuildSteps> = useFormik<IRobotBuildSteps>({
    validationSchema: Yup.object().shape({
      buildManagerName: Yup.string().required("Build Manager Name is required"),
      robotBuildSteps: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .required("Step Name is required")
            .test("unique-name", "This name is already taken", (value) => {
              const temp = formik.values.robotBuildSteps.filter(
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
      ).then(async (res: any) => {
        formik.setSubmitting(false);
        handleCreateRobotNextStep();
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

  function getRobot() {
    dispatch(
      getFederatedRobot({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName,
      })
    ).then((responseRobot: any) => {
      if (
        Array.isArray(responseRobot?.payload?.data) &&
        Array.isArray(responseRobot?.payload?.data[0]?.roboticsClouds) &&
        Array.isArray(
          responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
        ) &&
        Array.isArray(
          responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
            ?.robolaunchFederatedRobots
        ) &&
        responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
          ?.robolaunchFederatedRobots[0]
      ) {
        setResponseRobot(
          responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
            ?.robolaunchFederatedRobots[0]
        );
      }
    });
  }

  return (
    <Fragment>
      {responseRobot?.robotClusters.filter(
        (robotCluster: any) => robotCluster?.robotStatus !== "EnvironmentReady"
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
            {responseRobot?.robotClusters.map(
              (robotCluster: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-full flex flex-col gap-3 justify-center items-center border border-layer-light-100 shadow rounded p-4"
                  >
                    <div className="flex items-center justify-center">
                      {robotCluster?.robotStatus === "EnvironmentReady" ? (
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
                      {robotCluster?.robotStatus}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </div>
      ) : responseRobot ? (
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
                    />
                  );
                }
              )}
            </div>
          </div>
          <BsPlusCircle
            onClick={() => handleAddStepToBuildStep(formik)}
            size={22}
            className="h-14 mx-auto text-layer-secondary-700 hover:scale-90 transition-all duration-500 cursor-pointer -mt-4"
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
                ) : (
                  `Next Step`
                )
              }
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
