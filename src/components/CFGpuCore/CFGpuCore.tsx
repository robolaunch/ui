import FormInputRange from "../FormInputRange/FormInputRange";
import { FormikProps } from "formik/dist/types";
import { ReactElement } from "react";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";

interface ICFGpuCore {
  formik: FormikProps<IEnvironmentStep1>;
  disabled?: boolean;
}

export default function CFGpuCore({
  formik,
  disabled,
}: ICFGpuCore): ReactElement {
  return (
    <FormInputRange
      label={`GPU Core Count (${formik.values.services.ide.gpuAllocation} vGPU/MIG):`}
      tip="GPU Core Count is the number of GPU cores that will be allocated to the application. The GPU cores are used to accelerate the rendering of the application. The GPU cores are allocated from the GPU resource pool that is available on the instance. The GPU cores are allocated from the GPU resource pool that."
      InputProps={formik.getFieldProps("services.ide.gpuAllocation")}
      min={0}
      max={formik.values.services.ide.maxGpuAllocation || 0}
      disabled={formik.isSubmitting || disabled}
      error={formik.errors.services?.ide?.gpuAllocation}
      touched={true}
    />
  );
}
