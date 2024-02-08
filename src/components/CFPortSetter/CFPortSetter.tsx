import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import CFPortInput from "../CFPortInput/CFPortInput";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { ReactElement } from "react";
import { FormikProps } from "formik";
import useFunctions from "../../hooks/useFunctions";

interface ICFPortSetter {
  formik: FormikProps<IEnvironmentStep1>;
  type: "ide" | "vdi" | "jupyterNotebook";
}

export default function CFPortSetter({
  formik,
  type,
}: ICFPortSetter): ReactElement {
  const { getFreePort } = useFunctions();

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
          const backendPort = await getFreePort();

          if (typeof backendPort === "number") {
            await formik.setFieldValue(
              `services.${type}.customPorts`,
              (formik.values?.services?.[`${type}`]?.customPorts || []).concat({
                name: "",
                port: "",
                backendPort: backendPort,
              }),
            );
          }
        }}
        className="!mt-1"
      />
    </div>
  );
}
