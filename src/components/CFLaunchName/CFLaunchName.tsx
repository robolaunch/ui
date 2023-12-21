import { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { ILaunchStep } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFBuildName {
  formik: FormikProps<ILaunchStep>;
  disabled?: boolean;
}

export default function CFLaunchName({
  formik,
  disabled,
}: ICFBuildName): ReactElement {
  return (
    <FormInputText
      dataTut="create-robot-step4-name"
      labelName="Launch Manager Name:"
      labelInfoTip="Type a new launch manager name."
      inputHoverText="Type a new launch manager name."
      inputProps={formik.getFieldProps("name")}
      disabled={disabled || formik?.isSubmitting}
      inputError={formik.errors.name}
      inputTouched={formik.touched.name}
    />
  );
}
