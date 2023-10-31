import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import FormInputRange from "../FormInputRange/FormInputRange";
import { FormikProps } from "formik/dist/types";
import React, { ReactElement, useEffect } from "react";

interface ICFVDICount {
  formik: FormikProps<IRobotStep1>;
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
      tip="Session Count is the number of simultaneous remote desktop sessions that can be created for the robot/application. Each session is independent of the other, meaning that each session can be used by a different user. The session count is expandable, meaning that you can increase the session count at any time."
      dataTut="create-environment-vdi-session-count"
      InputProps={formik.getFieldProps("remoteDesktop.sessionCount")}
      min={2}
      max={10}
      disabled={formik.isSubmitting || disabled}
    />
  );
}
