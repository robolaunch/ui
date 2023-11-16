import { IDetails } from "../../interfaces/robotInterfaces";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik/dist/types";
import React, { ReactElement } from "react";

interface ICFAppName {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFAppName({
  formik,
  disabled,
}: ICFAppName): ReactElement {
  return (
    <FormInputText
      labelName="Application Name:"
      labelInfoTip="You can specify the name of your application here."
      dataTut="create-application-step1-name"
      disabled={formik.isSubmitting || disabled}
      inputHoverText="You can't change application name because this application is created before."
      inputProps={formik.getFieldProps("robotName")}
      inputError={formik.errors.robotName}
      inputTouched={formik.touched.robotName}
    />
  );
}
