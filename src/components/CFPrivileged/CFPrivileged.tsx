import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import CFInputToggle from "../CFInputToggle/CFInputToggle";
import { ReactElement } from "react";
import { FormikProps } from "formik";

interface ICFPrivileged {
  formik: FormikProps<IEnvironmentStep1>;
  index: number;
}

export default function CFPrivileged({
  formik,
  index,
}: ICFPrivileged): ReactElement {
  return (
    <CFInputToggle
      labelName="Privileged:"
      labelInfoTip="Privileged mode"
      dataTut="create-robot-step1-priviliged"
      disabled={formik.isSubmitting}
      checked={formik?.values?.containers?.[index]?.privileged}
      onChange={(e: boolean) =>
        formik.setFieldValue(`containers[${index}].privileged`, e)
      }
    />
  );
}
