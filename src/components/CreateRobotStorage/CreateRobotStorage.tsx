import React, { ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";
import { envOnPremiseRobot } from "../../helpers/envProvider";

interface ICreateRobotStorage {
  formik: any;
  isImportRobot?: boolean;
}

export default function CreateRobotStorage({
  formik,
  isImportRobot,
}: ICreateRobotStorage): ReactElement {
  return (
    <div data-tut="create-robot-step1-storage" className="flex gap-2">
      <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
        {envOnPremiseRobot ? "Application" : "Robot"} Storage (
        {formik?.values?.robotStorage} GB) :
        <InfoTip
          content="
          Storage is the amount of disk space available to the robot. This is where the robot's files and data are stored. The storage is persistent, meaning that it will not be deleted when the robot is shut down. If you need more storage, you can not upgrade it later. You will need to create a new robot with the desired storage size."
        />
      </div>
      <input
        min="20"
        max="100"
        type="range"
        autoComplete="off"
        {...formik.getFieldProps("robotStorage")}
        className={`w-full ${isImportRobot && "cursor-not-allowed"}`}
        style={{
          appearance: "auto",
          padding: "0px",
          color: "#AC2DFE",
          accentColor: "currentcolor",
        }}
        disabled={formik.isSubmitting || isImportRobot}
        title={
          (formik.isSubmitting || isImportRobot) &&
          "You can't change robot storage because this robot is created before."
        }
      />
    </div>
  );
}
