import useFunctions from "../../hooks/useFunctions";
import CFGridItem from "../CFGridItem/CFGridItem";
import { ReactElement, useEffect } from "react";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import useMain from "../../hooks/useMain";
import { toast } from "sonner";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";

interface ICFGpuTypes {
  formik: FormikProps<IEnvironmentStep1>;
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
        {selectedState.instance?.resources?.hardware?.gpu?.platform?.length ? (
          selectedState.instance?.resources?.hardware?.gpu?.platform?.map(
            (
              type: {
                name: string;
                available: number;
                allocated: number;
                capacity: number;
              },
              index: number,
            ) => {
              return (
                <CFGridItem
                  key={index}
                  selected={
                    formik.values.services?.ide?.gpuModelName === type.name
                  }
                  text={
                    <div className="grid w-full grid-cols-4">
                      <img
                        className="col-span-1 mx-auto w-10 scale-110"
                        src="/svg/apps/nvidia.svg"
                        alt="img"
                      />
                      <div className="col-span-3 flex flex-col justify-around">
                        <p className="lowercase">{type.name}</p>
                        <p className="text-[0.66rem] font-light">
                          {type.available}/{type.capacity} Available{" "}
                          {type.name.includes("mig") ? "MIG Instance" : "vGPU"}
                        </p>
                      </div>
                    </div>
                  }
                  onClick={() => {
                    if (!type.name.includes("mig")) {
                      if (!!disabled || type.available <= 1) {
                        return toast.error(
                          "You need minimum 2 MIG Instance for Application.",
                        );
                      }
                    } else {
                      if (!!disabled || type.available <= 0) {
                        return toast.error(
                          "You need minimum 1 vGPU for Application.",
                        );
                      }
                    }

                    formik.setFieldValue(
                      "services.ide.gpuModelName",
                      type.name,
                    );

                    formik.setFieldValue("services.ide.gpuAllocation", 0);

                    formik.setFieldValue(
                      "services.ide.maxGpuAllocation",
                      Number(type.capacity) -
                        Number(type.allocated) -
                        (type.name.includes("mig") ? 0 : 1),
                    );
                  }}
                  disabled={
                    !!disabled ||
                    (!type.name.includes("mig") &&
                      Number(type.capacity) - Number(type.allocated) <= 1) ||
                    (type.name.includes("mig") &&
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
