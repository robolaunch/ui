import FormInputRange from "../FormInputRange/FormInputRange";
import { FormikProps } from "formik/dist/types";
import { ReactElement } from "react";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import useMain from "../../hooks/useMain";
import { environmentGPUCoreUsagebility } from "../../functions/environment.function";

interface ICFGpuCore {
  formik: FormikProps<IEnvironmentStep1>;
  disabled?: boolean;
}

export default function CFGpuCore({
  formik,
  disabled,
}: ICFGpuCore): ReactElement {
  const { selectedState } = useMain();

  return (
    <FormInputRange
      label={`GPU Core Count (${formik.values.services.ide.gpuAllocation} vGPU/MIG):`}
      tip="GPU Core Count is the number of GPU cores that will be allocated to the application. The GPU cores are used to accelerate the rendering of the application. The GPU cores are allocated from the GPU resource pool that is available on the instance. The GPU cores are allocated from the GPU resource pool that."
      InputProps={formik.getFieldProps("services.ide.gpuAllocation")}
      min={0}
      max={
        selectedState?.instance?.resources?.hardware?.gpu.platform?.find(
          ({ name }) => name === formik.values.services?.ide?.gpuModelName!,
        )?.available! -
          environmentGPUCoreUsagebility(
            selectedState.instance!.resources.hardware.gpu.hardware!,
          ) || 0
      }
      disabled={formik.isSubmitting || disabled}
      error={formik.errors.services?.ide?.gpuAllocation}
      touched={true}
    />
  );
}
