import { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik/dist/types";
import { IEnvironmentStep4LaunchStep } from "../../interfaces/environment/environment.step4.interface";

interface ICFBuildName {
  formik: FormikProps<IEnvironmentStep4LaunchStep>;
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
