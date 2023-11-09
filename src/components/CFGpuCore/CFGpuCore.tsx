import FormInputRange from "../FormInputRange/FormInputRange";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import { ReactElement, useEffect } from "react";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICFGpuCore {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFGpuCore({
  formik,
  disabled,
}: ICFGpuCore): ReactElement {
  const { robotData } = useCreateRobot();

  useEffect(() => {
    !disabled && formik.setFieldValue("ideGpuResource", 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [robotData.step1.ideGpuResourceType]);

  return (
    <FormInputRange
      label={`GPU Core Count (${formik.values.ideGpuResource} Core):`}
      tip="GPU Core Count is the number of GPU cores that will be allocated to the IDE. The GPU cores are used to accelerate the rendering of the IDE. The GPU cores are allocated from the GPU resource pool that is available on the robot. The GPU cores are allocated from the GPU resource pool that."
      dataTut="create-environment-ide-gpu-core"
      InputProps={formik.getFieldProps("ideGpuResource")}
      min={0}
      max={robotData.step1.ideGpuResourceMaxCore || 0}
      disabled={formik.isSubmitting || disabled}
      error={formik.errors.ideGpuResource}
      touched={true}
    />
  );
}
