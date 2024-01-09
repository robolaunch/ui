import { ReactElement } from "react";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik";
import CFInputToggle from "../CFInputToggle/CFInputToggle";

interface ICFBridgeToggle {
  formik: FormikProps<IDetails>;
  isImportRobot?: boolean;
}

export default function CFBridgeToggle({
  formik,
  isImportRobot,
}: ICFBridgeToggle): ReactElement {
  return (
    <CFInputToggle
      labelName="ROS2 Bridge:"
      labelInfoTip="The ROS2 Bridge allows you to connect your robot to the ecosystem. This allows you to use ROS2 tools to interact with your robot."
      dataTut="create-robot-step1-ros2-bridge"
      disabled={isImportRobot}
      checked={formik?.values?.services.ros.isEnabled}
      onChange={(e: any) => {
        formik.setFieldValue("services.ros.isEnabled", e);
      }}
    />
  );
}
