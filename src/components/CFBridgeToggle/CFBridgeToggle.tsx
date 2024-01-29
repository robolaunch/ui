import { ReactElement } from "react";
import { FormikProps } from "formik";
import CFInputToggle from "../CFInputToggle/CFInputToggle";
import { IEnvironmentStep1 } from "../../interfaces/envitonment.step1.interface";

interface ICFBridgeToggle {
  formik: FormikProps<IEnvironmentStep1>;
  isImportRobot?: boolean;
}

export default function CFBridgeToggle({
  formik,
  isImportRobot,
}: ICFBridgeToggle): ReactElement {
  return (
    <CFInputToggle
      labelName="ROS 2 Bridge:"
      labelInfoTip="The ROS 2 Bridge allows you to connect your robot to the ecosystem. This allows you to use ROS 2 tools to interact with your robot."
      dataTut="create-robot-step1-ros2-bridge"
      disabled={isImportRobot}
      checked={formik?.values?.services.ros.isEnabled}
      onChange={(e: any) => {
        formik.setFieldValue("services.ros.isEnabled", e);
      }}
    />
  );
}
