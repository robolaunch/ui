import { ReactElement } from "react";
import CFInputToggle from "../CFInputToggle/CFInputToggle";
import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";

interface ICFGPUToggle {
  formik: FormikProps<IEnvironmentStep1>;
  isImportRobot?: boolean;
}

export default function CFGPUToggle({
  formik,
  isImportRobot,
}: ICFGPUToggle): ReactElement {
  return (
    <CFInputToggle
      labelName="GPU Usage Enabled for Cloud Instance:"
      labelInfoTip="If you want or need to GPU resource on cloud instance set active"
      dataTut="create-robot-step1-gpu-resource"
      disabled={formik.isSubmitting || isImportRobot}
      checked={formik?.values?.resources.gpu.enabledForCloudInstance}
      onChange={(e: any) =>
        formik.setFieldValue("resources.gpu.enabledForCloudInstance", e)
      }
    />
  );
}
