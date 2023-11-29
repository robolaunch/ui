import React, { ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";
import { toast } from "sonner";
import { stringSlugify } from "../../functions/GeneralFunctions";
import { MdVerified } from "react-icons/md";
import InputError from "../InputError/InputError";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik";

interface ICFRosDistros {
  formik: FormikProps<IDetails>;
  isImportRobot?: boolean;
}

export default function CFRosDistros({
  formik,
  isImportRobot,
}: ICFRosDistros): ReactElement {
  function handleRosDistroFilter(item: string) {
    if (item === "HUMBLE" || item === "IRON") {
      if (
        formik.values.rosDistros?.includes("GALACTIC") ||
        formik.values.rosDistros?.includes("FOXY")
      ) {
        return 1;
      }

      return 0;
    } else {
      if (
        formik.values.rosDistros?.includes("IRON") ||
        formik.values.rosDistros?.includes("HUMBLE")
      ) {
        return 1;
      }

      return 0;
    }
  }

  return (
    <div
      data-tut="create-robot-step1-ros-distrobutions"
      className="flex flex-col gap-2"
    >
      <div className="flex min-w-fit gap-1 text-xs font-medium text-layer-light-700">
        Ros Distrobutions:
        <InfoTip
          content="
          ROS Distributions are the versions of ROS that are installed on the robot. Each ROS distribution is independent of the other, meaning that you can use multiple ROS distributions on the same robot."
        />
      </div>
      <div className="flex gap-4">
        {["IRON", "HUMBLE", "GALACTIC", "FOXY"]?.map(
          (item: string, index: number) => (
            <div
              title={
                isImportRobot
                  ? "You can't change Ros Distrobutions because this robot is created before."
                  : undefined
              }
              key={index}
              className={`relative flex w-full items-center justify-center gap-1 rounded  border-2 p-2 transition-all duration-300 ${
                formik.values.rosDistros?.includes(item)
                  ? isImportRobot
                    ? "border-layer-primary-300"
                    : "border-layer-primary-600 shadow"
                  : "border-layer-light-100"
              } ${isImportRobot ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={(e: any) => {
                if (isImportRobot) {
                  return toast.error(
                    "You can't change Ros Distrobutions because this robot is created before.",
                  );
                }

                const { rosDistros } = formik.values;

                if (rosDistros.includes(item)) {
                  formik.setFieldValue(
                    "rosDistros",
                    rosDistros.filter((ros: string) => ros !== item),
                  );
                } else if (
                  (item === "HUMBLE" || item === "IRON") &&
                  (rosDistros?.includes("GALACTIC") ||
                    rosDistros?.includes("FOXY"))
                ) {
                  toast.error("You can't select Humble with Galactic or Foxy");
                } else if (
                  (item === "GALACTIC" || item === "FOXY") &&
                  (rosDistros.includes("IRON") ||
                    rosDistros?.includes("HUMBLE"))
                ) {
                  toast.error(
                    "You can't select Galactic or Foxy with Humble or Iron",
                  );
                } else {
                  formik.setFieldValue("rosDistros", [...rosDistros, item]);
                }
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <img
                  className="h-12"
                  src={`/svg/apps/${stringSlugify(item)}.svg`}
                  alt={item}
                  style={{
                    filter: `grayscale(${handleRosDistroFilter(item)})`,
                  }}
                />
                <span className="text-center text-[0.68rem] text-layer-light-700">
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
              {formik.values.rosDistros?.includes(item) && (
                <div className="absolute inset-0 flex items-start justify-end p-2">
                  <MdVerified
                    size={16}
                    className={
                      isImportRobot
                        ? "!text-layer-primary-300"
                        : "!text-primary"
                    }
                  />
                </div>
              )}
            </div>
          ),
        )}
      </div>
      <InputError
        // @ts-ignore
        error={formik?.errors?.rosDistros}
        touched={true}
      />
    </div>
  );
}
