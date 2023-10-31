import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik/dist/types";
import React, { ReactElement } from "react";

interface ICFEnvName {
  formik: FormikProps<IRobotStep1>;
  disabled?: boolean;
}

export default function CFEnvName({
  formik,
  disabled,
}: ICFEnvName): ReactElement {
  return (
    <FormInputText
      labelName="Environment Name:"
      labelInfoTip="Type a new environment name."
      dataTut="create-application-step1-name"
      disabled={formik.isSubmitting || disabled}
      inputHoverText="You can't change environment name because this environment is created before."
      inputProps={formik.getFieldProps("robotName")}
      inputError={formik.errors.robotName}
      inputTouched={formik.touched.robotName}
    />
  );
}
