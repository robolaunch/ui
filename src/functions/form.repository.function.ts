import { FormikProps } from "formik";
import { IEnvironmentStep2 } from "../interfaces/environment/environment.step2.interface";

export function handleAddRepository(
  formik: FormikProps<IEnvironmentStep2>,
  workspaceIndex: number,
) {
  formik.setFieldValue(
    `workspaces.[${workspaceIndex}].robotRepositories`,
    (formik.values?.workspaces[workspaceIndex]?.robotRepositories || []).concat(
      {
        name: "",
        url: "",
        branch: "",
      },
    ),
  );
}

export function handleRemoveRepository(
  formik: FormikProps<IEnvironmentStep2>,
  workspaceIndex: number,
  repositoryIndex: number,
) {
  formik.setFieldValue(
    `workspaces.[${workspaceIndex}].robotRepositories`,
    formik.values?.workspaces[workspaceIndex]?.robotRepositories?.filter(
      (_: any, index: number) => index !== repositoryIndex,
    ),
  );
}
