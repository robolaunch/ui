import React, { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";

interface ICFEnvName {
  formik: any;
  isImportRobot?: boolean;
}

export default function CFEnvName({
  formik,
  isImportRobot,
}: ICFEnvName): ReactElement {
  return (
    <FormInputText
      labelName="Environment Name:"
      labelInfoTip="Type a new environment name."
      dataTut="create-application-step1-name"
      disabled={formik.isSubmitting || isImportRobot}
      inputHoverText="You can't change environment name because this environment is created before."
      inputProps={formik.getFieldProps("robotName")}
      inputError={formik.errors.robotName}
      inputTouched={formik.touched.robotName}
    />
  );
}
