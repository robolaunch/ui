import { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { IBuildSteps } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFBuildName {
  formik: FormikProps<IBuildSteps>;
}

export default function CFBuildName({ formik }: ICFBuildName): ReactElement {
  return (
    <FormInputText
      dataTut="create-robot-step3-name"
      labelName="Build Manager Name:"
      labelInfoTip="Type a new build manager name."
      inputError={formik.errors.name}
      inputTouched={formik.touched.name}
      disabled={formik?.isSubmitting}
      inputProps={formik.getFieldProps("name")}
      inputHoverText="Type a new build manager name."
    />
  );
}
