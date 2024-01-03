import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { getPort as getFreePort } from "../../toolkit/PortSlice";
import CFPortInput from "../CFPortInput/CFPortInput";
import { useAppDispatch } from "../../hooks/redux";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";
import { toast } from "sonner";
import { FormikProps } from "formik";
import { IDetails } from "../../interfaces/robotInterfaces";

interface ICFPortSetter {
  formik: FormikProps<IDetails>;
  type: "ide" | "vdi" | "jupyter-notebook";
  isImportRobot?: boolean;
}

export default function CFPortSetter({
  formik,
  type,
  isImportRobot,
}: ICFPortSetter): ReactElement {
  const { selectedState } = useMain();

  const dispatch = useAppDispatch();

  async function getPort(): Promise<unknown> {
    try {
      const result = await dispatch(
        getFreePort({
          organizationId: selectedState?.organization?.organizationId!,
          instanceId: selectedState?.instance?.instanceId!,
          region: selectedState?.roboticsCloud?.region!,
          roboticsCloudName: selectedState?.roboticsCloud?.name!,
        }),
      );

      if (
        formik.values.ideCustomPorts
          ?.map((port: any) => port.backendPort)
          .includes(result.payload) ||
        formik.values.vdiCustomPorts
          ?.map((port: any) => port.backendPort)
          .includes(result.payload) ||
        formik.values.jupyterNotebook.customPorts
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
      case "jupyter-notebook":
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
              case "jupyter-notebook":
                return formik.values?.jupyterNotebook?.customPorts?.map(
                  (_: any, index: number) => {
                    return (
                      <CFPortInput
                        key={index}
                        formik={formik}
                        portIndex={index}
                        type={type}
                        disabled={isImportRobot}
                      />
                    );
                  },
                );

              default:
                return formik.values?.[`${type}CustomPorts`]?.map(
                  (_: any, index: number) => {
                    return (
                      <CFPortInput
                        key={index}
                        formik={formik}
                        portIndex={index}
                        type={type}
                        disabled={isImportRobot}
                      />
                    );
                  },
                );
            }
          })()}
        </div>
      </CFInfoBar>

      <CreateRobotFormAddButton
        disabled={isImportRobot}
        onClick={async () => {
          if (type === "ide" || type === "vdi") {
            await formik.setFieldValue(
              `${type}CustomPorts`,
              formik.values?.[`${type}CustomPorts`]?.concat({
                name: "",
                port: undefined,
                backendPort: await getPort(),
              }),
            );
          } else if (type === "jupyter-notebook") {
            await formik.setFieldValue(
              `jupyterNotebook.customPorts`,
              formik.values?.jupyterNotebook.customPorts?.concat({
                name: "",
                port: undefined,
                backendPort: await getPort(),
              }),
            );
          }
        }}
        className="!mt-1"
      />
    </div>
  );
}
