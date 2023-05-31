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
import { getFederatedRobot } from "../../resources/RobotSlice";

export default function CreateRobotFormStep3(): ReactElement {
  const { robotData, setRobotData } = useCreateRobot();
  const dispatch = useAppDispatch();
  const [responseRobot, setResponseRobot] = useState<any>(undefined);

  const { handleCreateRobotPreviousStep, handleCreateRobotNextStep } =
    useSidebar();

  useEffect(
    () => {
      if (!responseRobot) {
        getRobot();
      }

      const timer = setInterval(() => {
        getRobot();
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseRobot]
  );

  const { selectedState } = useSidebar();

  const formik: FormikProps<IRobotBuildSteps> = useFormik<IRobotBuildSteps>({
    validationSchema: Yup.object().shape({
      steps: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .required("Step Name is required")
            .test("unique-name", "This name is already taken", (value) => {
              const temp = formik.values.steps.filter(
                (item: any) => item.name === value && item
              );
              return temp.length > 1 ? false : true;
            }),
          workspace: Yup.string().required("Workspace is required"),
          isScriptCode: Yup.boolean().required("Code Type is required"),
          code: Yup.string().required("Code is required"),
        })
      ),
    }),
    initialValues: robotData?.step3,
    onSubmit: (values: any) => {
      formik.setSubmitting(true);
      //
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

  function handleAddBuildStep() {
    formik.setFieldValue("steps", [
      ...formik.values.steps,
      {
        name: "",
        workspace: "",
        isScriptCode: false,
        code: "",
      },
    ]);
  }

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

  useEffect(() => {
    console.log(responseRobot);
  }, [responseRobot]);

  return (
    <Fragment>
      {(() => {
        if (
          responseRobot?.robotClusters[0]?.robotStatus &&
          responseRobot?.robotClusters[0]?.robotStatus === "EnvironmentReady" &&
          responseRobot?.robotClusters[1]?.robotStatus &&
          responseRobot?.robotClusters[1]?.robotStatus === "EnvironmentReady"
        ) {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-8 animate__animated animate__fadeIn"
            >
              <div className="flex flex-col gap-2">
                {robotData?.step3?.steps?.map(
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
              <BsPlusCircle
                onClick={handleAddBuildStep}
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
                  text={`Create Robot`}
                />
              </div>
            </form>
          );
        } else if (responseRobot?.physicalInstance) {
          return (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
              <img
                className="w-12 mx-auto pt-10"
                src="/svg/general/loading.svg"
                alt="Loading..."
              />
              <span className="text-sm text-layer-light-900">
                Virtual Robot State:{" "}
                {responseRobot?.robotClusters[0]?.robotStatus}
              </span>
              <span className="text-sm text-layer-light-900">
                Physical Robot State:{" "}
                {responseRobot?.robotClusters[1]?.robotStatus}
              </span>
              <span className="text-sm text-layer-light-900">
                Please wait while we create your robot. This may take a few
                minutes.
              </span>
            </div>
          );
        } else {
          return (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
              <img
                className="w-12 mx-auto pt-10"
                src="/svg/general/loading.svg"
                alt="Loading..."
              />
              <span className="text-sm text-layer-light-900">
                Virtual Robot State:{" "}
                {responseRobot?.robotClusters[0]?.robotStatus}
              </span>
              <span className="text-sm text-layer-light-900">
                Please wait while we create your robot. This may take a few
                minutes.
              </span>
            </div>
          );
        }
      })()}
    </Fragment>
  );
}
