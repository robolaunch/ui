import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotRosDistrobutions from "../CreateRobotRosDistrobutions/CreateRobotRosDistrobutions";
import { CreateRobotFormStep1Validations } from "../../validations/RobotsValidations";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";
import { addPhysicalInstanceToFleet } from "../../toolkit/InstanceSlice";
import CreateRobotStorage from "../CreateRobotStorage/CreateRobotStorage";
import CreateRobotTypes from "../CreateRobotTypes/CreateRobotTypes";
import { createRobot } from "../../toolkit/RobotSlice";
import InputToggle from "../InputToggle/InputToggle";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import Seperator from "../Seperator/Seperator";
import { useParams } from "react-router-dom";
import useCreateRobot from "../../hooks/useCreateRobot";
import useMain from "../../hooks/useMain";
import InfoTip from "../InfoTip/InfoTip";
import Button from "../Button/Button";
import { useFormik } from "formik";
import { toast } from "sonner";
import CreateRobotFormCancelButton from "../CreateRobotFormCancelButton/CreateRobotFormCancelButton";

interface ICreateRobotFormStep1 {
  isImportRobot?: boolean;
}

export default function CreateRobotFormStep1({
  isImportRobot,
}: ICreateRobotFormStep1): ReactElement {
  const { robotData, setRobotData }: any = useCreateRobot();
  const { selectedState, handleCreateRobotNextStep } = useMain();
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const dispatch = useAppDispatch();
  const { getRobot } = useFunctions();
  const url = useParams();

  useEffect(() => {
    if (!responseRobot && isImportRobot) {
      handleGetRobot();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGetRobot() {
    getRobot(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.roboticsCloud?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName || url?.robotName,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseRobot,
        setRobotData: setRobotData,
      }
    );
  }

  const formik = useFormik({
    validationSchema: CreateRobotFormStep1Validations,
    initialValues: robotData?.step1,
    onSubmit: async () => {
      formik.setSubmitting(true);

      if (isImportRobot) {
        await dispatch(
          createRobot({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.roboticsCloud?.region,
            fleetName: selectedState?.fleet?.name,
            robotName: formik.values?.robotName,
            physicalInstanceName: robotData?.step1?.isVirtualRobot
              ? undefined
              : robotData?.step1?.physicalInstanceName,
            distributions: formik.values?.rosDistros,
            bridgeEnabled: formik.values?.isEnabledROS2Bridge,
            vdiEnabled: formik.values?.remoteDesktop?.isEnabled,
            vdiSessionCount: formik.values?.remoteDesktop?.sessionCount,
            ideEnabled: formik.values?.isEnabledIde,
            storageAmount: formik.values?.robotStorage,
            gpuEnabledForCloudInstance:
              formik.values?.gpuEnabledForCloudInstance,
            workspaces: responseRobot?.robotWorkspaces,
          })
        );

        toast.success(
          "Robot updated successfully. Redirecting to fleet page..."
        );
        setTimeout(() => {
          window.location.href = `/${
            selectedState?.organization?.organizationName?.split("_")[1]
          }/${selectedState?.roboticsCloud?.name}/${
            selectedState?.instance?.name
          }/${selectedState?.fleet?.name}/${robotData?.step1?.robotName}}`;
        }, 2000);
      } else if (!formik.values?.isVirtualRobot) {
        await dispatch(
          addPhysicalInstanceToFleet({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.roboticsCloud?.region,
            robolaunchPhysicalInstancesName:
              formik.values?.physicalInstanceName,
            robolaunchFederatedFleetsName: selectedState?.fleet?.name,
          })
        );
      }

      formik.setSubmitting(false);
      handleCreateRobotNextStep();
    },
  });

  useEffect(() => {
    setRobotData({
      ...robotData,
      step1: formik.values,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  useEffect(() => {
    if (formik.values.isVirtualRobot) {
      formik.setFieldValue("physicalInstanceName", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.isVirtualRobot]);

  return (
    <Fragment>
      {
        <CreateRobotFormLoader
          loadingText="Loading..."
          loadingItems={[]}
          isLoading={isImportRobot ? !responseRobot : false}
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 animate__animated animate__fadeIn relative"
          >
            {/* RobotName */}
            <div>
              <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
                Robot Name:
                <InfoTip content="Type a new robot name." />
              </div>
              <InputText
                {...formik.getFieldProps("robotName")}
                className="!text-sm"
                disabled={formik.isSubmitting || isImportRobot}
                inputHoverText={
                  formik.isSubmitting || isImportRobot
                    ? "You can't change robot name because this robot is created before."
                    : ""
                }
              />
              <InputError
                error={formik.errors.robotName}
                touched={formik.touched.robotName}
              />
            </div>
            {/* RobotName */}

            <Seperator />

            {/* RobotType */}
            <CreateRobotTypes formik={formik} isImportRobot={isImportRobot} />
            {/* RobotType */}

            <Seperator />

            {/* ROS Distro */}
            <CreateRobotRosDistrobutions
              formik={formik}
              isImportRobot={isImportRobot}
            />
            {/* ROS Distro */}

            <div className="flex flex-col gap-4">
              <Seperator />

              {/* Robot Storage */}
              <CreateRobotStorage
                formik={formik}
                isImportRobot={isImportRobot}
              />
              {/* Robot Storage */}

              <Seperator />

              {/* Robot Services */}
              <div className="flex items-center gap-4">
                {/* Code Editor */}
                {/* <div className="flex justify-center items-center gap-1">
                  <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
                    Code Editor (IDE) :
                    <InfoTip
                      content="
          The IDE is a web-based code editor that allows you to write code for your robot. The IDE is accessible from any device with a web browser, and it is pre-configured with all the tools you need to develop code for your robot.
          "
                    />
                  </div>
                  <InputToggle
                    checked={formik?.values?.isEnabledIde}
                    onChange={(e: any) => {
                      formik.setFieldValue("isEnabledIde", e);
                    }}
                  />
                </div> */}
                {/* Code Editor */}

                {/* ROS2 Bridge */}
                <div className="flex items-center gap-1">
                  <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
                    ROS2 (Bridge) :
                    <InfoTip
                      content="
          The ROS2 Bridge allows you to connect your robot to the ROS2 ecosystem. This allows you to use ROS2 tools to interact with your robot."
                    />
                  </div>
                  <InputToggle
                    checked={formik?.values?.isEnabledROS2Bridge}
                    onChange={(e: any) => {
                      formik.setFieldValue("isEnabledROS2Bridge", e);
                    }}
                  />
                </div>

                {formik?.values?.remoteDesktop?.isEnabled && (
                  <div className="flex gap-2 w-full pl-10">
                    <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
                      VDI: Session Count (
                      {formik?.values?.remoteDesktop?.sessionCount} User) :
                      <InfoTip
                        content="
          Session Count is the number of simultaneous remote desktop sessions that can be created for the robot. Each session is independent of the other, meaning that each session can be used by a different user. The session count is expandable, meaning that you can increase the session count at any time.
          "
                        rightTip
                      />
                    </div>
                    <input
                      min="1"
                      max="10"
                      type="range"
                      autoComplete="off"
                      {...formik.getFieldProps("remoteDesktop.sessionCount")}
                      className="w-full"
                      style={{
                        appearance: "auto",
                        padding: "0px",
                        color: "#AC2DFE",
                        accentColor: "currentcolor",
                      }}
                      disabled={formik.isSubmitting}
                    />
                  </div>
                )}

                {/* ROS2 Bridge */}

                {/* Remote Desktop */}
                {/* <div className="flex items-center gap-1">
                  <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
                    Remote Desktop (VDI) :
                    <InfoTip
                      rightTip
                      content="
          Remote Desktop allows you to connect to your robot's desktop from any device with a web browser. This allows you to use your robot's desktop from anywhere, and it is pre-configured with all the tools you need to develop code for your robot.
          "
                    />
                  </div>
                  <InputToggle
                    checked={formik?.values?.remoteDesktop?.isEnabled}
                    onChange={(e: any) => {
                      formik.setFieldValue("remoteDesktop.isEnabled", e);
                    }}
                  />
                </div> */}
                {/* Remote Desktop */}
              </div>
              {/* Robot Services */}

              {/* Seperator */}
              <Seperator />
              {/* Seperator */}

              {/* GPU Resource */}
              <div className="flex items-center gap-1">
                <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
                  GPU Usage Enabled for Cloud Instance:
                  <InfoTip content="If you want or need to GPU resource on cloud instance set active" />
                </div>
                <InputToggle
                  checked={formik?.values?.gpuEnabledForCloudInstance}
                  onChange={(e: any) => {
                    formik.setFieldValue("gpuEnabledForCloudInstance", e);
                  }}
                  disabled={formik.isSubmitting}
                />
              </div>
              {/* GPU Resource */}

              {/* Seperator */}
              <Seperator />
              {/* Seperator */}

              {/* Development Mode */}
              {!isImportRobot && (
                <Fragment>
                  <div className="flex items-center gap-1">
                    <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
                      Development Mode:
                      <InfoTip content="Leave this option turned on if you want it to be able to build and launch on the robot you want" />
                    </div>
                    <InputToggle
                      checked={formik?.values?.isDevelopmentMode}
                      onChange={(e: any) => {
                        formik.setFieldValue("isDevelopmentMode", e);
                      }}
                      disabled={formik.isSubmitting || isImportRobot}
                    />
                  </div>
                </Fragment>
              )}
              {/* Development Mode */}
            </div>
            <div className="flex gap-2 mt-10 ">
              {!isImportRobot && (
                <CreateRobotFormCancelButton disabled={formik.isSubmitting} />
              )}
              <Button
                disabled={
                  !formik.isValid ||
                  formik.isSubmitting ||
                  JSON.stringify(formik.initialValues) ===
                    JSON.stringify(formik.values)
                }
                type="submit"
                className="!h-11 text-xs"
                text={
                  formik.isSubmitting ? (
                    <img
                      className="w-10 h-10"
                      src="/svg/general/loading.svg"
                      alt="loading"
                    />
                  ) : isImportRobot ? (
                    "Update Robot"
                  ) : (
                    `Next Step`
                  )
                }
              />
            </div>
          </form>
        </CreateRobotFormLoader>
      }
    </Fragment>
  );
}
