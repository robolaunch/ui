import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../interfaces/environment/environment.step1.interface";

export function handleAddPortForService(
  formik: FormikProps<IEnvironmentStep1>,
  type: "vdi" | "ide" | "jupyterNotebook",
  backendPort: number | undefined,
) {
  if (typeof backendPort === "number") {
    formik.setFieldValue(
      `services.${type}.customPorts`,
      (formik.values?.services?.[`${type}`]?.customPorts || []).concat({
        name: "",
        port: "",
        backendPort: backendPort,
      }),
    );
  }
}

export function handleRemovePortForService(
  formik: FormikProps<IEnvironmentStep1>,
  type: "vdi" | "ide" | "jupyterNotebook",
  portIndex: number,
) {
  formik.setFieldValue(
    `services.${type}.customPorts`,
    formik.values?.services?.[`${type}`]?.customPorts?.filter(
      (_: any, index: number) => index !== portIndex,
    ),
  );
}
