import { FormikProps } from "formik";
import { IEnvironmentStep4 } from "../interfaces/environment/environment.step4.interface";

export function handleAddEnv(formik: FormikProps<IEnvironmentStep4>) {
  formik.setFieldValue(
    "robotLaunchSteps.[0].robotLmEnvs",
    formik.values.robotLaunchSteps?.[0].robotLmEnvs.concat({
      name: "",
      value: "",
    }),
  );
}

export function handleRemoveEnv(
  formik: FormikProps<IEnvironmentStep4>,
  envIndex: number,
) {
  formik.setFieldValue(
    "robotLaunchSteps.[0].robotLmEnvs",
    formik.values.robotLaunchSteps?.[0].robotLmEnvs.filter(
      (_: any, index: number) => index !== envIndex,
    ),
  );
}
