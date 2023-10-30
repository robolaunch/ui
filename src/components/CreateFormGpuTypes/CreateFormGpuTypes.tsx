import React, { ReactElement } from "react";
import CreateFormLabelwithInfoTip from "../CreateFormLabelwithInfoTip/CreateFormLabelwithInfoTip";
import useMain from "../../hooks/useMain";
import InputError from "../InputError/InputError";
import CreateFormGpuTypesGridItem from "../CreateFormGpuTypesGridItem/CreateFormGpuTypesGridItem";

interface ICreateFormGpuTypes {
  formik: any;
  isImportRobot?: boolean;
}

export default function CreateFormGpuTypes({
  formik,
  isImportRobot,
}: ICreateFormGpuTypes): ReactElement {
  const { selectedState } = useMain();

  return (
    <CreateFormLabelwithInfoTip
      label="GPU Types"
      infoTipContent="Select the GPU type to use for the job."
      vertical
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
                  isImportRobot={isImportRobot}
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
      <InputError touched={true} error={formik.errors.ideGpuResourceType} />
    </CreateFormLabelwithInfoTip>
  );
}
