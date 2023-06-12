import React, { ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";

interface ICreateRobotStorage {
  formik: any;
  isImportRobot?: boolean;
}

export default function CreateRobotStorage({
  formik,
  isImportRobot,
}: ICreateRobotStorage): ReactElement {
  return (
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
  );
}
