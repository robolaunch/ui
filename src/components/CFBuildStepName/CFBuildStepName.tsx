import React, { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { IRobotBuildSteps } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFBuildStepName {
  formik: FormikProps<IRobotBuildSteps>;
  buildStepIndex: number;
}

export default function CFBuildStepName({
  formik,
  buildStepIndex,
}: ICFBuildStepName): ReactElement {
  return (
    <FormInputText
      dataTut="create-robot-build-step-name"
      labelName="Build Step Name"
      labelInfoTip="Type a unique build step name."
      inputError={
        // @ts-ignore
        formik?.errors?.robotBuildSteps?.[buildStepIndex]?.name
      }
      inputTouched={formik?.touched?.robotBuildSteps?.[buildStepIndex]?.name}
      disabled={formik?.isSubmitting}
      inputProps={formik.getFieldProps(
        `robotBuildSteps.${buildStepIndex}.name`,
      )}
      inputHoverText="Type a unique build step name."
    />
  );
}
