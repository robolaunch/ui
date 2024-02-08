import { FormikProps } from "formik";
import { IEnvironmentStep2 } from "../interfaces/environment/environment.step2.interface";

export function handleAddWorkspace(formik: FormikProps<IEnvironmentStep2>) {
  formik.setFieldValue(
    `workspaces`,
    (formik.values?.workspaces || []).concat({
      name: "",
      workspaceDistro: "",
      robotRepositories: [{ name: "", url: "", branch: "" }],
    }),
  );
}

export function handleRemoveWorkspace(
  formik: FormikProps<IEnvironmentStep2>,
  workspaceIndex: number,
) {
  formik.setFieldValue(
    `workspaces`,
    formik.values?.workspaces?.filter(
      (_: any, index: number) => index !== workspaceIndex,
    ),
  );
}
