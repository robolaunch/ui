import { IDetails } from "../../interfaces/robotInterfaces";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik/dist/types";
import { ReactElement } from "react";

interface ICFEnvironmentName {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFEnvironmentName({
  formik,
  disabled,
}: ICFEnvironmentName): ReactElement {
  return (
    <FormInputText
      labelName="Application Name:"
      labelInfoTip="You can specify the name of your application here."
      dataTut="create-application-step1-name"
      disabled={formik.isSubmitting || disabled}
      inputHoverText="You can't change application name because this application is created before."
      inputProps={formik.getFieldProps("details.name")}
      inputError={formik.errors.details?.name}
      inputTouched={formik.touched.details?.name}
    />
  );
}
