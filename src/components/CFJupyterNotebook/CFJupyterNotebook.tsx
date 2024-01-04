import React, { ReactElement } from "react";
import CFInputToggle from "../CFInputToggle/CFInputToggle";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFJupyterNotebook {
  formik: FormikProps<IDetails>;
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
      disabled={disabled}
      checked={formik?.values?.services.jupyterNotebook.isEnabled}
      onChange={(e: boolean) => {
        formik.setFieldValue("services.jupyterNotebook.isEnabled", e);
      }}
    />
  );
}
