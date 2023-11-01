import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import FormInputRange from "../FormInputRange/FormInputRange";
import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { FormikProps } from "formik/dist/types";
import useMain from "../../hooks/useMain";
import { IGpuUsage } from "../../interfaces/instanceInferfaces";

interface ICFGpuResourceRange {
  formik: FormikProps<IRobotStep1>;
  disabled?: boolean;
}

export default function CFGpuResourceRange({
  formik,
  disabled,
}: ICFGpuResourceRange): ReactElement {
  const [selectedGpu, setSelectedGpu] = useState<IGpuUsage | null>();
  const { selectedState } = useMain();

  useEffect(() => {
    setSelectedGpu(
      selectedState?.instance?.cloudInstanceResource?.gpuUsage?.filter(
        (gpu: IGpuUsage) =>
          gpu.resourceName === formik.values.ideGpuResourceType,
      )[0] || null,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.ideGpuResourceType]);

  return (
    <Fragment>
      <FormInputRange
        label={`GPU Resource (${formik.values.ideGpuResource} Core):`}
        tip="GPU Resource"
        dataTut="create-environment-gpu-resource"
        InputProps={formik.getFieldProps("ideGpuResource")}
        min={0}
        max={
          Number(selectedGpu?.capacity) - Number(selectedGpu?.allocated) - 1 ||
          1
        }
        disabled={formik.isSubmitting || disabled}
        error={formik.errors.ideGpuResource}
        touched={true}
      />
    </Fragment>
  );
}
