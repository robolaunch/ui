import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../interfaces/environment/environment.step1.interface";

export function handleAddHostDirectory(formik: FormikProps<IEnvironmentStep1>) {
  formik.setFieldValue(
    `directories.hostDirectories`,
    (formik.values?.directories?.hostDirectories || []).concat({
      hostDirectory: "",
      mountPath: "",
    }),
  );
}

export function handleRemoveHostDirectory(
  formik: FormikProps<IEnvironmentStep1>,
  directoryIndex: number,
) {
  formik.setFieldValue(
    `directories.hostDirectories`,
    formik.values?.directories?.hostDirectories?.filter(
      (_: any, index: number) => index !== directoryIndex,
    ),
  );
}
