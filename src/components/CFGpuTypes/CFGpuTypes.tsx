import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import { IGpuUsage } from "../../interfaces/instanceInferfaces";
import CFGridItem from "../CFGridItem/CFGridItem";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import React, { ReactElement, useEffect } from "react";
import useMain from "../../hooks/useMain";
import { toast } from "sonner";
import useFunctions from "../../hooks/useFunctions";
interface ICFGpuTypes {
  formik: FormikProps<IRobotStep1>;
  disabled?: boolean;
}

export default function CFGpuTypes({
  formik,
  disabled,
}: ICFGpuTypes): ReactElement {
  const { selectedState, pagesState } = useMain();
  const { getInstance } = useFunctions();

  function handleGetInstance() {
    getInstance(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceName: pagesState.instance?.name!,
        region: pagesState?.roboticsCloud?.region!,
        details: true,
      },
      {
        isSetState: true,
        ifErrorNavigateTo404: false,
        setPages: true,
      },
    );
  }

  useEffect(() => {
    handleGetInstance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CFInfoBar
      label="GPU Types"
      tip="Select the GPU type for Instance. If you have 1 available core, you can not select it. Because you need minimum 2 core for Application."
      vertical
      error={formik.errors.ideGpuResourceType}
      touched={true}
    >
      <div className="grid grid-cols-2 gap-2">
        {selectedState.instance?.cloudInstanceResource?.gpuUsage?.length ? (
          selectedState.instance?.cloudInstanceResource?.gpuUsage?.map(
            (type: IGpuUsage, index: number) => {
              return (
                <CFGridItem
                  key={index}
                  selected={
                    formik.values.ideGpuResourceType === type.resourceName
                  }
                  text={
                    <div className="flex w-3/4 items-center justify-evenly">
                      <img
                        className="w-10 scale-[1.8]"
                        src="/svg/apps/nvidia.svg"
                        alt="nvidia"
                      />
                      <div className="flex flex-col gap-2">
                        <p className="lowercase">{type.resourceName}</p>
                        <p className="text-[0.66rem] font-light">
                          {Number(type.capacity) - Number(type.allocated)}/
                          {type.capacity} Avaliable vGPU
                        </p>
                      </div>
                    </div>
                  }
                  onClick={() => {
                    if (!type.resourceName.includes("mig")) {
                      if (
                        !!disabled ||
                        Number(type.capacity) - Number(type.allocated) <= 1
                      ) {
                        return toast.error(
                          "You need minimum 2 vGPU for Application.",
                        );
                      }
                    } else {
                      if (
                        !!disabled ||
                        Number(type.capacity) - Number(type.allocated) <= 0
                      ) {
                        return toast.error(
                          "You need minimum 1 vGPU for Application.",
                        );
                      }
                    }

                    formik.setFieldValue(
                      "ideGpuResourceType",
                      type.resourceName,
                    );
                  }}
                  disabled={
                    !!disabled ||
                    (!type.resourceName.includes("mig") &&
                      Number(type.capacity) - Number(type.allocated) <= 1) ||
                    (type.resourceName.includes("mig") &&
                      Number(type.capacity) - Number(type.allocated) <= 0)
                  }
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
