import { ReactElement } from "react";
import CFInputToggle from "../CFInputToggle/CFInputToggle";
import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";

interface ICFDevMode {
  formik: FormikProps<IEnvironmentStep1>;
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
      checked={formik?.values?.details.isDevelopmentMode}
      onChange={(e: any) =>
        formik.setFieldValue("details.isDevelopmentMode", e)
      }
    />
  );
}
