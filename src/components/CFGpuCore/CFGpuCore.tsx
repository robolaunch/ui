import FormInputRange from "../FormInputRange/FormInputRange";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import { ReactElement } from "react";

interface ICFGpuCore {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFGpuCore({
  formik,
  disabled,
}: ICFGpuCore): ReactElement {
  return (
    <FormInputRange
      label={`GPU Core Count (${formik.values.ideGpuResource} Core):`}
      tip="GPU Core Count is the number of GPU cores that will be allocated to the application. The GPU cores are used to accelerate the rendering of the application. The GPU cores are allocated from the GPU resource pool that is available on the instance. The GPU cores are allocated from the GPU resource pool that."
      InputProps={formik.getFieldProps("ideGpuResource")}
      min={0}
      max={formik.values.ideGpuResourceMaxCore || 0}
      disabled={formik.isSubmitting || disabled}
      error={formik.errors.ideGpuResource}
      touched={true}
    />
  );
}
