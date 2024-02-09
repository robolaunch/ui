import { ReactElement } from "react";
import CFInputToggle from "../CFInputToggle/CFInputToggle";
import { FormikProps } from "formik/dist/types";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";

interface ICFJupyterNotebook {
  formik: FormikProps<IEnvironmentStep1>;
  disabled?: boolean;
}

export default function CFJupyterNotebook({
  formik,
  disabled,
}: ICFJupyterNotebook): ReactElement {
  return (
    <CFInputToggle
      labelName="Include Jupyter Notebook:"
      labelInfoTip="
        Jupyter Notebook is a web-based interactive development environment for Jupyter notebooks, code, and data."
      disabled={disabled || formik.isSubmitting}
      checked={formik?.values?.services.jupyterNotebook.isEnabled}
      onChange={(e: boolean) => {
        formik.setFieldValue("services.jupyterNotebook.isEnabled", e);
      }}
    />
  );
}
