import { ReactElement } from "react";
import CFInputToggle from "../CFInputToggle/CFInputToggle";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik";

interface ICFDevMode {
  formik: FormikProps<IDetails>;
  isImportRobot?: boolean;
}

export default function CFDevMode({
  formik,
  isImportRobot,
}: ICFDevMode): ReactElement {
  return (
    <CFInputToggle
      labelName="Development Mode:"
      labelInfoTip="Leave this option turned on if you want it to be able to build and launch on the robot you want"
      dataTut="create-robot-step1-development-mode"
      disabled={formik.isSubmitting || isImportRobot}
      checked={formik?.values?.isDevelopmentMode}
      onChange={(e: any) => formik.setFieldValue("isDevelopmentMode", e)}
    />
  );
}
