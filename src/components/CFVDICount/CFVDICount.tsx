import FormInputRange from "../FormInputRange/FormInputRange";
import { FormikProps } from "formik/dist/types";
import { ReactElement } from "react";
import { IEnvironmentStep1 } from "../../interfaces/envitonment.step1.interface";

interface ICFVDICount {
  formik: FormikProps<IEnvironmentStep1>;
  disabled?: boolean;
}

export default function CFVDICount({
  formik,
  disabled,
}: ICFVDICount): ReactElement {
  return (
    <FormInputRange
      label={`VDI Session Count (${formik.values.services.vdi.sessionCount} Sessions):`}
      tip="Here you can determine how many people can connect to your application's VDI service at the same time."
      dataTut="create-environment-vdi-session-count"
      InputProps={formik.getFieldProps("services.vdi.sessionCount")}
      min={2}
      max={10}
      disabled={formik.isSubmitting || disabled}
    />
  );
}
