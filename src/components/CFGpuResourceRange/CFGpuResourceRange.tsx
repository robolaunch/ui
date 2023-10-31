import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import FormInputRange from "../FormInputRange/FormInputRange";
import React, { Fragment, ReactElement } from "react";
import { FormikProps } from "formik/dist/types";

interface ICFGpuResourceRange {
  formik: FormikProps<IRobotStep1>;
  disabled?: boolean;
}

export default function CFGpuResourceRange({
  formik,
  disabled,
}: ICFGpuResourceRange): ReactElement {
  return (
    <Fragment>
      <FormInputRange
        label="GPU Resource:"
        tip="GPU Resource"
        dataTut="create-environment-gpu-resource"
        InputProps={formik.getFieldProps("ideGpuResource")}
        min={1}
        max={32}
        disabled={formik.isSubmitting || disabled}
      />
    </Fragment>
  );
}
