import React, { Fragment, ReactElement, useEffect } from "react";
import { useFormik } from "formik";
import InputSelect from "../InputSelect/InputSelect";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import Button from "../Button/Button";
import * as Yup from "yup";
import InputToggle from "../InputToggle/InputToggle";
import stringSlugify from "../../helpers/stringSlugify";
import { toast } from "sonner";
import { MdVerified } from "react-icons/md";
import InfoTip from "../InfoTip/InfoTip";
import useSidebar from "../../hooks/useSidebar";
import useCreateRobot from "../../hooks/useCreateRobot";

export default function CreateRobotFormStep1(): ReactElement {
  const { robotData, setRobotData }: any = useCreateRobot();

  const { handleCreateRobotNextStep } = useSidebar();
  const formik = useFormik({
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      isEnabledIDE: Yup.boolean().required("IDE is required"),
      isEnabledROS2Bridge: Yup.boolean().required("ROS2 Bridge is required"),
      remoteDesktop: Yup.object().shape({
        isEnabled: Yup.boolean().required("Remote Desktop is required"),
        sessionCount: Yup.number().required("Session Count is required"),
      }),
      rosDistros: Yup.array().min(1, "At least one ROS Distro is required"),
    }),

    initialValues: robotData?.step1,
    onSubmit: (values: any) => {
      handleCreateRobotNextStep();
    },
  });

  useEffect(() => {
    console.log(formik?.values);
    setRobotData({
      ...robotData,
      step1: formik.values,
    });
    // eslint-disable-next-line
  }, [formik.values]);

  function handleRosDistroFilter(item: string) {
    if (item === "Humble") {
      if (
        formik.values.rosDistros.includes("Galactic") ||
        formik.values.rosDistros.includes("Foxy")
      ) {
        return 1;
      }
    } else {
      if (formik.values.rosDistros.includes("Humble")) {
        return 1;
      }
    }
    return 0;
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-10 animate__animated animate__fadeIn"
    >
      <div>
        <InputText
          {...formik.getFieldProps("name")}
          placeholder="Robot Name"
          className="!text-sm"
        />
        <InputError error={formik.errors.name} touched={formik.touched.name} />
      </div>
      <div>
        <InputSelect
          value={formik?.values?.isVirtualRobot ? "virtual" : "hybrid"}
          onChange={(e: any) => {
            console.log(e.target.value);
            formik.setFieldValue(
              "isVirtualRobot",
              e.target.value === "virtual" ? true : false
            );
          }}
          placeholder="Robot Type"
          className="!text-sm"
        >
          <Fragment>
            <option value="virtual">Virtual Robot</option>
            <option value="hybrid">Hybrid Robot</option>
          </Fragment>
        </InputSelect>
      </div>
      <div className="flex gap-2">
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
          Storage
          <InfoTip
            content="
          Storage is the amount of disk space available to the robot. This is where the robot's files and data are stored. The storage is persistent, meaning that it will not be deleted when the robot is shut down."
          />
          : ({formik?.values?.storage}GB)
        </div>
        <input
          min="20"
          max="100"
          type="range"
          autoComplete="off"
          {...formik.getFieldProps("storage")}
          className="w-full"
          style={{
            appearance: "auto",
            padding: "0px",
            color: "#AC2DFE",
            accentColor: "currentcolor",
          }}
        />
      </div>
      <div className="flex items-center justify-between">
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
            checked={formik?.values?.isEnabledIDE}
            onChange={(e: any) => {
              formik.setFieldValue("isEnabledIDE", e);
            }}
          />
        </div>
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
      </div>
      {formik?.values?.remoteDesktop?.isEnabled && (
        <div className="flex gap-2">
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
          />
        </div>
      )}
      <div>
        <div className="flex flex-col gap-3">
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
            Ros Distrobutions
            <InfoTip
              content="
          ROS Distributions are the versions of ROS that are installed on the robot. Each ROS distribution is independent of the other, meaning that you can use multiple ROS distributions on the same robot."
            />
            :
          </div>
          <div className="flex gap-6">
            {["Humble", "Galactic", "Foxy"]?.map(
              (item: string, index: number) => (
                <div
                  key={index}
                  className={`relative flex items-center gap-1 border-2 p-2 rounded cursor-pointer ${
                    formik.values.rosDistros.includes(item)
                      ? "border-layer-primary-600 shadow"
                      : "border-layer-light-100"
                  } transition-all duration-300`}
                  onClick={(e: any) => {
                    if (item === "Humble") {
                      if (
                        formik.values.rosDistros.includes("Galactic") ||
                        formik.values.rosDistros.includes("Foxy")
                      ) {
                        toast.error(
                          "You can't select Humble with Galactic or Foxy"
                        );
                        return;
                      }
                    } else {
                      if (formik.values.rosDistros.includes("Humble")) {
                        toast.error(
                          "You can't select Galactic or Foxy with Humble"
                        );
                        return;
                      }
                    }
                    formik.setFieldValue(
                      "rosDistros",
                      formik.values.rosDistros.includes(item)
                        ? formik.values.rosDistros.filter(
                            (ros: string) => ros !== item
                          )
                        : [...formik.values.rosDistros, item]
                    );
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
                    <span className="text-[0.68rem] text-layer-light-700">
                      ROS2{" "}
                      {item === "Foxy"
                        ? "Foxy Fitzroy"
                        : item === "Humble"
                        ? "Humble Hawksbill"
                        : "Galactic Geochelone"}
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
      </div>
      <div className="flex gap-4">
        <Button
          disabled={!formik.isValid || formik.isSubmitting}
          type="submit"
          className="!h-11 text-xs"
          text={`Next Step`}
        />
      </div>
    </form>
  );
}
