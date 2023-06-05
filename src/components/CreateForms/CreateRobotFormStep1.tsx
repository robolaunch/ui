import React, { ReactElement, useEffect, useState } from "react";
import { useFormik } from "formik";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import InputToggle from "../InputToggle/InputToggle";
import stringSlugify from "../../helpers/stringSlugify";
import { toast } from "sonner";
import { MdVerified } from "react-icons/md";
import InfoTip from "../InfoTip/InfoTip";
import useSidebar from "../../hooks/useSidebar";
import useCreateRobot from "../../hooks/useCreateRobot";
import { useAppDispatch } from "../../hooks/redux";
import {
  addPhysicalInstanceToFleet,
  getPhysicalInstances,
} from "../../resources/InstanceSlice";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import { CreateRobotFormStep1Validations } from "../../validations/RobotsValidations";
import { useNavigate, useParams } from "react-router-dom";
import {
  createFederatedRobot,
  getFederatedRobot,
} from "../../resources/RobotSlice";

interface ICreateRobotFormStep1 {
  isImportRobot?: boolean;
}

export default function CreateRobotFormStep1({
  isImportRobot,
}: ICreateRobotFormStep1): ReactElement {
  const [responsePhysicalInstances, setResponsePhysicalInstances] =
    useState<any>(undefined);
  const { robotData, setRobotData }: any = useCreateRobot();
  const { selectedState, handleCreateRobotNextStep } = useSidebar();
  const navigate = useNavigate();
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const url = useParams();

  useEffect(() => {
    if (isImportRobot && !responseRobot) {
      dispatch(
        getFederatedRobot({
          organizationId: selectedState?.organization?.organizationId,
          roboticsCloudName: selectedState?.roboticsCloud?.name,
          instanceId: selectedState?.instance?.instanceId,
          region: selectedState?.instance?.region,
          fleetName: selectedState?.fleet?.name,
          robotName: url?.robotName,
        })
      ).then((response: any) => {
        setResponseRobot(
          response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
            ?.robolaunchFederatedRobots[0]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responseRobot]);

  const formik = useFormik({
    validationSchema: CreateRobotFormStep1Validations,
    initialValues: robotData?.step1,
    onSubmit: async () => {
      formik.setSubmitting(true);

      if (isImportRobot) {
        dispatch(
          createFederatedRobot({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.instance?.region,
            fleetName: selectedState?.fleet?.name,
            robotName: formik.values?.robotName,
            physicalInstanceName: formik.values?.physicalInstanceName,
            distributions: formik.values?.rosDistros,
            bridgeEnabled: formik.values?.isEnabledROS2Bridge,
            vdiEnabled: formik.values?.remoteDesktop?.isEnabled,
            vdiSessionCount: formik.values?.remoteDesktop?.sessionCount,
            ideEnabled: formik.values?.isEnabledIde,
            storageAmount: formik.values?.robotStorage,
            gpuEnabledForCloudInstance:
              formik.values?.gpuEnabledForCloudInstance,
            robotWorkspaces: responseRobot?.robotWorkspaces,
          })
        ).then((res: any) => {
          toast.success(
            "Robot updated successfully. Redirecting to fleet page..."
          );

          setTimeout(() => {
            navigate(
              `/${selectedState?.organization?.name}/${selectedState?.roboticsCloud?.name}/${selectedState?.instance?.name}/${selectedState?.fleet?.name}`
            );
          }, 2000);
        });

        return;
      }

      if (!formik.values?.isVirtualRobot) {
        await dispatch(
          addPhysicalInstanceToFleet({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.instance?.region,
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
  const dispatch = useAppDispatch();

  useEffect(() => {
    setRobotData({
      ...robotData,
      step1: formik.values,
    });
    // eslint-disable-next-line
  }, [formik.values]);

  useEffect(() => {
    !formik.values?.isVirtualRobot &&
      !Array.isArray(responsePhysicalInstances) &&
      dispatch(
        getPhysicalInstances({
          organizationId: selectedState?.organization?.organizationId,
          roboticsCloudName: selectedState?.roboticsCloud?.name,
          instanceId: selectedState?.instance?.instanceId,
          region: selectedState?.instance?.region,
        })
      ).then((response: any) => {
        console.log(response);
        setResponsePhysicalInstances(
          response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchPhysicalInstances?.filter(
            (instance: any) =>
              instance?.federationPhase === "Connected" &&
              instance?.multicastPhase === "Connected" &&
              instance?.phase === "Connected"
          ) || []
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    formik.values.isVirtualRobot,
    selectedState?.instance?.instanceId,
    selectedState?.instance?.region,
    selectedState?.organization?.organizationId,
    selectedState?.roboticsCloud?.name,
  ]);

  function handleRosDistroFilter(item: string) {
    if (item === "HUMBLE" || item === "IRON") {
      if (
        formik.values.rosDistros.includes("GALACTIC") ||
        formik.values.rosDistros.includes("FOXY")
      ) {
        return 1;
      }

      return 0;
    } else {
      if (
        formik.values.rosDistros.includes("IRON") ||
        formik.values.rosDistros.includes("HUMBLE")
      ) {
        return 1;
      }

      return 0;
    }
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-3 animate__animated animate__fadeIn"
    >
      {/* RobotName */}
      <div>
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
          Robot Name:
          <InfoTip content="Robot Name" />
        </div>
        <InputText
          {...formik.getFieldProps("robotName")}
          className="!text-sm"
          disabled={formik.isSubmitting || isImportRobot}
        />
        <InputError
          error={formik.errors.robotName}
          touched={formik.touched.robotName}
        />
      </div>
      {/* RobotName */}

      {/* RobotType */}

      <div className="flex flex-col gap-1.5">
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
          Robot Type:
          <InfoTip
            content="
             Robot Type"
          />
        </div>
        <div className="flex gap-6">
          {[
            {
              name: "Virtual Robot",
              isVirtualRobot: true,
              disabled: isImportRobot,
            },
            {
              name: "Hybrid Robot",
              isVirtualRobot: false,
              disabled: isImportRobot,
            },
          ]?.map((robotType: any, index: number) => (
            <div
              key={index}
              className={`relative flex justify-center items-center gap-1 border-2 p-4 rounded cursor-pointer w-full  ${
                formik.values?.isVirtualRobot === robotType?.isVirtualRobot
                  ? "border-layer-primary-600 shadow"
                  : "border-layer-light-100"
              } transition-all duration-300
               `}
              onClick={() => {
                robotType?.disabled
                  ? toast.error("You can't change robot type in update mode")
                  : formik.setFieldValue(
                      "isVirtualRobot",
                      robotType?.isVirtualRobot
                    );
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-layer-light-800">
                  {robotType?.name}
                </span>
              </div>
              <div className="absolute inset-0 flex items-start justify-end p-2"></div>
            </div>
          ))}
        </div>
        <InputError error={formik?.errors?.instance} touched={true} />
      </div>

      {/* RobotType */}

      {/* PhysicalInstance */}
      {!formik.values?.isVirtualRobot &&
      Array.isArray(responsePhysicalInstances) ? (
        responsePhysicalInstances?.length > 0 ? (
          <div className="flex flex-col gap-1.5">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
              Physical Instances:
              <InfoTip
                content="
             Regions are the cloud regions that you can use to create your cloud instance."
              />
            </div>
            <div className="flex gap-6">
              {responsePhysicalInstances?.map(
                (instance: any, index: number) => (
                  <div
                    key={index}
                    className={`relative flex justify-center items-center gap-1 border-2 p-4 rounded cursor-pointer w-40  ${
                      formik.values?.physicalInstanceName === instance?.name
                        ? "border-layer-primary-600 shadow"
                        : "border-layer-light-100"
                    } transition-all duration-300
               `}
                    onClick={() => {
                      isImportRobot
                        ? toast.error(
                            "You can't change physical instance in update mode"
                          )
                        : formik.setFieldValue(
                            "physicalInstanceName",
                            instance?.name
                          );
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs text-layer-light-800">
                        {instance?.name}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-start justify-end p-2"></div>
                  </div>
                )
              )}
            </div>
            <InputError
              error={
                formik?.errors?.instance || formik.errors?.physicalInstance
              }
              touched={true}
            />
          </div>
        ) : (
          <div className="relative h-8">
            <SidebarInfo text="You need to create a physical instance first" />
          </div>
        )
      ) : (
        !formik.values?.isVirtualRobot && (
          <div className="relative h-8">
            <img
              className="w-12 mx-auto"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          </div>
        )
      )}
      {/* PhysicalInstance */}

      {/* ROS Distro */}
      <div className="flex flex-col gap-3">
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
          Ros Distrobutions
          <InfoTip
            content="
          ROS Distributions are the versions of ROS that are installed on the robot. Each ROS distribution is independent of the other, meaning that you can use multiple ROS distributions on the same robot."
          />
          :
        </div>
        <div className="flex gap-4">
          {["IRON", "HUMBLE", "GALACTIC", "FOXY"]?.map(
            (item: string, index: number) => (
              <div
                key={index}
                className={`relative flex items-center gap-1 border-2 p-2 rounded cursor-pointer w-full justify-center ${
                  formik.values.rosDistros.includes(item)
                    ? "border-layer-primary-600 shadow"
                    : "border-layer-light-100"
                } transition-all duration-300`}
                onClick={(e: any) => {
                  if (isImportRobot) {
                    return toast.error(
                      "You can't change ros distro in update mode"
                    );
                  }

                  const { rosDistros } = formik.values;

                  if (rosDistros.includes(item)) {
                    formik.setFieldValue(
                      "rosDistros",
                      rosDistros.filter((ros: string) => ros !== item)
                    );
                  } else if (
                    (item === "HUMBLE" || item === "IRON") &&
                    (rosDistros.includes("GALACTIC") ||
                      rosDistros.includes("FOXY"))
                  ) {
                    toast.error(
                      "You can't select Humble with Galactic or Foxy"
                    );
                  } else if (
                    (item === "GALACTIC" || item === "FOXY") &&
                    (rosDistros.includes("IRON") ||
                      rosDistros.includes("HUMBLE"))
                  ) {
                    toast.error(
                      "You can't select Galactic or Foxy with Humble or Iron"
                    );
                  } else {
                    formik.setFieldValue("rosDistros", [...rosDistros, item]);
                  }
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    className="h-12"
                    src={`/svg/ros/${stringSlugify(item)}.svg`}
                    alt={item}
                    style={{
                      filter: `grayscale(${handleRosDistroFilter(item)})`,
                    }}
                  />
                  <span className="text-[0.68rem] text-layer-light-700 text-center">
                    ROS2{" "}
                    {item === "FOXY"
                      ? "Foxy"
                      : item === "HUMBLE"
                      ? "Humble"
                      : item === "GALACTIC"
                      ? "Galactic"
                      : item === "IRON" && "Iron"}
                  </span>
                </div>
                {formik.values.rosDistros.includes(item) && (
                  <div className="absolute inset-0 flex items-start justify-end p-2">
                    <MdVerified size={16} className="!text-primary" />
                  </div>
                )}
              </div>
            )
          )}
        </div>
        <InputError error={formik?.errors?.rosDistros} touched={true} />
      </div>
      {/* ROS Distro */}

      <div className="flex flex-col gap-5 py-4">
        {/* Seperator */}
        <div className="w-full h-0.5 bg-layer-light-100 rounded-lg" />
        {/* Seperator */}

        {/* Robot Storage */}
        <div className="flex gap-2">
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
            Robot Storage
            <InfoTip
              content="
          Storage is the amount of disk space available to the robot. This is where the robot's files and data are stored. The storage is persistent, meaning that it will not be deleted when the robot is shut down."
            />
            : ({formik?.values?.robotStorage}GB)
          </div>
          <input
            min="20"
            max="100"
            type="range"
            autoComplete="off"
            {...formik.getFieldProps("robotStorage")}
            className="w-full"
            style={{
              appearance: "auto",
              padding: "0px",
              color: "#AC2DFE",
              accentColor: "currentcolor",
            }}
            disabled={formik.isSubmitting || isImportRobot}
          />
        </div>
        {/* Robot Storage */}

        {/* Seperator */}
        <div className="w-full h-0.5 bg-layer-light-100 rounded-lg" />
        {/* Seperator */}

        {/* Robot Services */}
        <div className="flex items-center justify-between">
          {/* Code Editor */}
          <div className="flex items-center gap-1">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
              Code Editor (IDE)
              <InfoTip
                content="
          The IDE is a web-based code editor that allows you to write code for your robot. The IDE is accessible from any device with a web browser, and it is pre-configured with all the tools you need to develop code for your robot.
          "
              />
              :
            </div>
            <InputToggle
              checked={formik?.values?.isEnabledIde}
              onChange={(e: any) => {
                formik.setFieldValue("isEnabledIde", e);
              }}
            />
          </div>
          {/* Code Editor */}

          {/* ROS2 Bridge */}
          <div className="flex items-center gap-1">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
              ROS2 Bridge
              <InfoTip
                content="
          The ROS2 Bridge allows you to connect your robot to the ROS2 ecosystem. This allows you to use ROS2 tools to interact with your robot, such as RViz, RQT, and ROS2 tools.
          "
              />
              :
            </div>
            <InputToggle
              checked={formik?.values?.isEnabledROS2Bridge}
              onChange={(e: any) => {
                formik.setFieldValue("isEnabledROS2Bridge", e);
              }}
            />
          </div>
          {/* ROS2 Bridge */}

          {/* Remote Desktop */}
          <div className="flex items-center gap-1">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
              Remote Desktop
              <InfoTip
                rightTip
                content="
          Remote Desktop allows you to connect to your robot's desktop from any device with a web browser. This allows you to use your robot's desktop from anywhere, and it is pre-configured with all the tools you need to develop code for your robot.
          "
              />
              :
            </div>
            <InputToggle
              checked={formik?.values?.remoteDesktop?.isEnabled}
              onChange={(e: any) => {
                formik.setFieldValue("remoteDesktop.isEnabled", e);
              }}
            />
          </div>
          {/* Remote Desktop */}
        </div>
        {/* Robot Services */}

        {formik?.values?.remoteDesktop?.isEnabled && (
          <div className="flex gap-2 pt-2">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
              Session Count
              <InfoTip
                content="
          Session Count is the number of simultaneous remote desktop sessions that can be created for the robot. Each session is independent of the other, meaning that each session can be used by a different user. The session count is expandable, meaning that you can increase the session count at any time.
          "
              />
              : ({formik?.values?.remoteDesktop?.sessionCount} User)
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
              disabled={formik.isSubmitting || isImportRobot}
            />
          </div>
        )}

        {/* Seperator */}
        <div className="w-full h-0.5 bg-layer-light-100 rounded-lg" />
        {/* Seperator */}

        {/* GPU Resource */}
        <div className="flex items-center gap-1">
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
            GPU Usage enabled for Cloud Instance
            <InfoTip content="GPU Usage enabled for Cloud Instance" />:
          </div>
          <InputToggle
            checked={formik?.values?.gpuEnabledForCloudInstance}
            onChange={(e: any) => {
              formik.setFieldValue("gpuEnabledForCloudInstance", e);
            }}
            disabled={formik.isSubmitting || isImportRobot}
          />
        </div>
        {/* GPU Resource */}

        {/* Seperator */}
        <div className="w-full h-0.5 bg-layer-light-100 rounded-lg" />
        {/* Seperator */}

        {/* Development Mode */}
        <div className="flex items-center gap-1">
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
            Development Mode
            <InfoTip
              content="
            Development Mode"
            />
            :
          </div>
          <InputToggle
            checked={formik?.values?.isDevelopmentMode}
            onChange={(e: any) => {
              formik.setFieldValue("isDevelopmentMode", e);
            }}
            disabled={formik.isSubmitting || isImportRobot}
          />
        </div>
        {/* Development Mode */}

        {/* Seperator */}
        <div className="w-full h-0.5 bg-layer-light-100 rounded-lg" />
        {/* Seperator */}
      </div>

      <div className="flex gap-4">
        <Button
          disabled={!formik.isValid || formik.isSubmitting}
          type="submit"
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
  );
}
