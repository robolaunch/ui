import { IDetails } from "../../interfaces/robotInterfaces";
import FormInputRange from "../FormInputRange/FormInputRange";
import { FormikProps } from "formik/dist/types";
import React, { ReactElement, useEffect } from "react";

interface ICFVDICount {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFVDICount({
  formik,
  disabled,
}: ICFVDICount): ReactElement {
  useEffect(() => {}, [formik.values.remoteDesktop.sessionCount]);

  return (
    <FormInputRange
      label={`VDI Session Count (${formik.values.remoteDesktop.sessionCount} Sessions):`}
      tip="Here you can determine how many people can connect to your application's VDI service at the same time."
      dataTut="create-environment-vdi-session-count"
      InputProps={formik.getFieldProps("remoteDesktop.sessionCount")}
      min={2}
      max={10}
      disabled={formik.isSubmitting || disabled}
    />
  );
}
