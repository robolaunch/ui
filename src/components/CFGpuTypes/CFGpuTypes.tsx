import { IGpuUsage } from "../../interfaces/instanceInferfaces";
import { IDetails } from "../../interfaces/robotInterfaces";
import useFunctions from "../../hooks/useFunctions";
import CFGridItem from "../CFGridItem/CFGridItem";
import { ReactElement, useEffect } from "react";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import useMain from "../../hooks/useMain";
import { toast } from "sonner";

interface ICFGpuTypes {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFGpuTypes({
  formik,
  disabled,
}: ICFGpuTypes): ReactElement {
  const { selectedState } = useMain();
  const { getInstance } = useFunctions();

  function handleGetInstance() {
    getInstance(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceName: selectedState.instance?.name!,
        region: selectedState?.roboticsCloud?.region!,
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
      label="GPU Models:"
      tip="You can choose the GPU model here."
      vertical
      error={formik.errors.services?.ide?.gpuModelName}
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
                    formik.values.services?.ide?.gpuModelName ===
                    type.resourceName
                  }
                  text={
                    <div className="grid w-full grid-cols-4">
                      <img
                        className="col-span-1 mx-auto w-10 scale-110"
                        src="/svg/apps/nvidia.svg"
                        alt="img"
                      />
                      <div className="col-span-3 flex flex-col justify-around">
                        <p className="lowercase">{type.resourceName}</p>
                        <p className="text-[0.66rem] font-light">
                          {Number(type.capacity) - Number(type.allocated)}/
                          {type.capacity} Available{" "}
                          {type.resourceName.includes("mig")
                            ? "MIG Instance"
                            : "vGPU"}
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
                      "services.ide.gpuModelName",
                      type.resourceName,
                    );

                    formik.setFieldValue("services.ide.gpuAllocation", 0);

                    formik.setFieldValue(
                      "services.ide.maxGpuAllocation",
                      Number(type.capacity) -
                        Number(type.allocated) -
                        (type.resourceName.includes("mig") ? 0 : 1),
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
          <div className="animate-fadeIn col-span-2 text-center text-sm font-bold text-light-100">
            No Available GPU Types
          </div>
        )}
      </div>
    </CFInfoBar>
  );
}
