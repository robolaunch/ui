import { FormikProps } from "formik";
import { IEnvironmentStep3 } from "../interfaces/environment/environment.step3.interface";

export function handleAddBuild(formik: FormikProps<IEnvironmentStep3>) {
  formik.setFieldValue(
    "steps",
    formik.values.steps.concat({
      workspace: "",
      name: "",
      command: "",
      script: "",
      isCommandCode: true,
      status: "",
      log: "",
      instanceScope: [],
    }),
  );
}

export function handleRemoveBuild(
  formik: FormikProps<IEnvironmentStep3>,
  buildIndex: number,
) {
  formik.setFieldValue(
    "steps",
    formik.values.steps.filter((_: any, index: number) => index !== buildIndex),
  );
}
