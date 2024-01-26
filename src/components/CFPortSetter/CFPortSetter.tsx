import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { getPort as getFreePort } from "../../toolkit/PortSlice";
import { IDetails } from "../../interfaces/robotInterfaces";
import CFPortInput from "../CFPortInput/CFPortInput";
import { useAppDispatch } from "../../hooks/redux";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";
import { toast } from "sonner";
import { FormikProps } from "formik";

interface ICFPortSetter {
  formik: FormikProps<IDetails>;
  type: "ide" | "vdi" | "jupyterNotebook";
}

export default function CFPortSetter({
  formik,
  type,
}: ICFPortSetter): ReactElement {
  const { selectedState } = useMain();

  const dispatch = useAppDispatch();

  async function getPort(): Promise<unknown> {
    try {
      const result = await dispatch(
        getFreePort({
          organizationId: selectedState?.organization?.id!,
          instanceId: selectedState?.instance?.instanceId!,
          region: selectedState?.roboticsCloud?.region!,
          roboticsCloudName: selectedState?.roboticsCloud?.name!,
        }),
      );

      if (
        formik.values.services.ide.customPorts
          ?.map((port: any) => port.backendPort)
          .includes(result.payload) ||
        formik.values.services.vdi.customPorts
          ?.map((port: any) => port.backendPort)
          .includes(result.payload) ||
        formik.values.services.jupyterNotebook.customPorts
          ?.map((port: any) => port.backendPort)
          .includes(result.payload)
      ) {
        return getPort();
      }

      return result.payload;
    } catch (error) {
      toast.error("Error getting port. Please remove a port and try again.");
    }
  }

  function handleGetNameFromType(): string {
    switch (type) {
      case "ide":
        return "IDE";
      case "vdi":
        return "VDI";
      case "jupyterNotebook":
        return "Jupyter Notebook";
      default:
        return "";
    }
  }

  return (
    <div>
      <CFInfoBar
        label={`Custom Port Exposure From ${handleGetNameFromType()}:`}
        tip={`Here you can specify the custom ports you want your application running in the ${handleGetNameFromType()} service to expose.`}
        vertical
      >
        <div className="flex flex-col gap-2">
          {(() => {
            switch (type) {
              case "jupyterNotebook":
                return formik.values?.services.jupyterNotebook?.customPorts?.map(
                  (_: any, index: number) => {
                    return (
                      <CFPortInput
                        key={index}
                        formik={formik}
                        portIndex={index}
                        type={type}
                        disabled={formik.isSubmitting}
                      />
                    );
                  },
                );

              default:
                return formik.values?.services?.[`${type}`]?.customPorts?.map(
                  (_: any, index: number) => {
                    return (
                      <CFPortInput
                        key={index}
                        formik={formik}
                        portIndex={index}
                        type={type}
                        disabled={formik.isSubmitting}
                      />
                    );
                  },
                );
            }
          })()}
        </div>
      </CFInfoBar>

      <CreateRobotFormAddButton
        onClick={async () => {
          await formik.setFieldValue(
            `services.${type}.customPorts`,
            formik.values?.services?.[`${type}`]?.customPorts?.concat({
              name: "",
              port: undefined,
              backendPort: await getPort(),
            }),
          );
        }}
        className="!mt-1"
      />
    </div>
  );
}
