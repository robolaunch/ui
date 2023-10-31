import CreateFormGpuTypesGridItem from "../CreateFormGpuTypesGridItem/CreateFormGpuTypesGridItem";
import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import React, { ReactElement } from "react";
import useMain from "../../hooks/useMain";
interface ICFGpuTypes {
  formik: FormikProps<IRobotStep1>;
  disabled?: boolean;
}

export default function CFGpuTypes({
  formik,
  disabled,
}: ICFGpuTypes): ReactElement {
  const { selectedState } = useMain();

  return (
    <CFInfoBar
      label="GPU Types"
      tip="Select the GPU type to use for the job."
      vertical
      error={!!formik.errors.ideGpuResourceType}
      touched={true}
    >
      <div className="grid grid-cols-2 gap-2">
        {selectedState.instance?.cloudInstanceResource?.gpuUsage?.filter(
          (type: any) => type?.allocated < type?.capacity,
        )?.length ? (
          selectedState.instance?.cloudInstanceResource?.gpuUsage?.map(
            (type: any, index: number) => {
              return (
                <CreateFormGpuTypesGridItem
                  formik={formik}
                  index={index}
                  type={type}
                  disabled={disabled}
                  key={index}
                />
              );
            },
          )
        ) : (
          <div className="animate__animated animate__fadeIn col-span-2 text-center text-sm font-bold text-layer-dark-100">
            No Available GPU Types
          </div>
        )}
      </div>
    </CFInfoBar>
  );
}
