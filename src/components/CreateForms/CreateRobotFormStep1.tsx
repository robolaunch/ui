import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { envOnPremiseRobot } from "../../helpers/envProvider";
import CreateRobotRosDistrobutions from "../CreateRobotRosDistrobutions/CreateRobotRosDistrobutions";
import CreateRobotFormCancelButton from "../CreateRobotFormCancelButton/CreateRobotFormCancelButton";
import { CreateRobotFormStep1Validations } from "../../validations/RobotsValidations";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";
import CreateRobotStorage from "../CreateRobotStorage/CreateRobotStorage";
import { addPhysicalInstanceToFleet } from "../../toolkit/InstanceSlice";
import CreateRobotTypes from "../CreateRobotTypes/CreateRobotTypes";
import { getGuideItem } from "../../functions/handleGuide";
import useCreateRobot from "../../hooks/useCreateRobot";
import { createRobot } from "../../toolkit/RobotSlice";
import InputToggle from "../InputToggle/InputToggle";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import TourGuide from "../TourGuide/TourGuide";
import Seperator from "../Seperator/Seperator";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import InfoTip from "../InfoTip/InfoTip";
import Button from "../Button/Button";
import { useFormik } from "formik";
import { toast } from "sonner";
import FormInputText from "../FormInputText/FormInputText";

interface ICreateRobotFormStep1 {
  isImportRobot?: boolean;
}

export default function CreateRobotFormStep1({
  isImportRobot,
}: ICreateRobotFormStep1): ReactElement {
  const { robotData, setRobotData } = useCreateRobot();
  const { selectedState, handleCreateRobotNextStep } = useMain();
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const dispatch = useAppDispatch();
  const { getRobot, getEnvironment } = useFunctions();
  const url = useParams();

  useEffect(() => {
    if (!responseRobot && isImportRobot) {
      envOnPremiseRobot ? handleGetEnvironment() : handleGetRobot();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGetRobot() {
    getRobot(
      {
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName || url?.robotName!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseRobot,
        setRobotData: true,
      },
    );
  }

  function handleGetEnvironment() {
    getEnvironment(
      {
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name,
        environmentName: url?.robotName!,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        setResponse: setResponseRobot,
        setRobotData: true,
      },
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
            organizationId: selectedState?.organization?.organizationId!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.roboticsCloud?.region!,
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
          }),
        );

        toast.success(
          "Robot updated successfully. Redirecting to fleet page...",
        );
        setTimeout(() => {
          window.location.href = `/${selectedState?.organization?.organizationName?.split(
            "_",
          )[1]}/${selectedState?.roboticsCloud?.name}/${selectedState?.instance
            ?.name}/${selectedState?.fleet?.name}/${robotData?.step1
            ?.robotName}}`;
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
          }),
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
            className="animate__animated animate__fadeIn relative flex flex-col gap-2"
          >
            {/* RobotName */}
            <FormInputText
              dataTut="create-robot-step1-name"
              labelName="Robot Name:"
              labelInfoTip="Type a new robot name."
              inputProps={formik.getFieldProps("robotName")}
              disabled={formik.isSubmitting || isImportRobot}
              inputHoverText={
                formik.isSubmitting || isImportRobot
                  ? "You can't change robot name because this robot is created before."
                  : ""
              }
              inputError={formik.errors.robotName}
              inputTouched={formik.touched.robotName}
            />
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
                {/* ROS2 Bridge */}
                <div
                  data-tut="create-robot-step1-ros2-bridge"
                  className="flex items-center gap-1"
                >
                  <div className="flex min-w-fit gap-1 text-xs font-medium text-layer-light-700">
                    ROS2 (Bridge) :
                    <InfoTip content="The ROS2 Bridge allows you to connect your robot to the ecosystem. This allows you to use ROS2 tools to interact with your robot." />
                  </div>
                  <InputToggle
                    checked={formik?.values?.isEnabledROS2Bridge}
                    onChange={(e: any) => {
                      formik.setFieldValue("isEnabledROS2Bridge", e);
                    }}
                  />
                </div>
                {/* ROS2 Bridge */}

                {/* Remote Desktop Session Count */}
                {formik?.values?.remoteDesktop?.isEnabled && (
                  <div
                    data-tut="create-robot-step1-vdi-session-count"
                    className="flex w-full gap-2 pl-10"
                  >
                    <div className="flex min-w-fit gap-1 text-xs font-medium text-layer-light-700">
                      VDI: Session Count (
                      {formik?.values?.remoteDesktop?.sessionCount} User) :
                      <InfoTip
                        content="Session Count is the number of simultaneous remote desktop sessions that can for robot. Each session is independent of the other, meaning that each session can be used by a different user. The session count is expandable, meaning that you can increase the session count at any time."
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
                {/* Remote Desktop Session Count */}
              </div>
              {/* Robot Services */}

              <Seperator />

              {/* GPU Resource */}
              <div
                data-tut="create-robot-step1-gpu-resource"
                className="flex items-center gap-1"
              >
                <div className="flex min-w-fit gap-1 text-xs font-medium text-layer-light-700">
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

              <Seperator />

              {/* Development Mode */}
              {!isImportRobot && (
                <Fragment>
                  <div
                    data-tut="create-robot-step1-development-mode"
                    className="flex items-center gap-1"
                  >
                    <div className="flex min-w-fit gap-1 text-xs font-medium text-layer-light-700">
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

            {/* <AdvancedSettings /> */}

            {/* Buttons */}
            <div className="mt-10 flex gap-2 ">
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
                      className="h-10 w-10"
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
            {/* Buttons */}
          </form>
        </CreateRobotFormLoader>
      }
      <TourGuide
        hiddenButton
        type="createRobotStep1"
        tourConfig={[
          getGuideItem("[data-tut='create-robot-step1-name']"),
          getGuideItem("[data-tut='create-robot-step1-type']"),
          getGuideItem("[data-tut='create-robot-step1-ros-distrobutions']"),
          getGuideItem("[data-tut='create-robot-step1-storage']"),
          getGuideItem("[data-tut='create-robot-step1-ros2-bridge']"),
          getGuideItem("[data-tut='create-robot-step1-vdi-session-count']"),
          getGuideItem("[data-tut='create-robot-step1-gpu-resource']"),
          getGuideItem("[data-tut='create-robot-step1-development-mode']"),
        ]}
      />
    </Fragment>
  );
}
