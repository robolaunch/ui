import { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { IBuildSteps } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFBuildStepName {
  formik: FormikProps<IBuildSteps>;
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
        formik?.errors?.steps?.[buildStepIndex]?.name
      }
      inputTouched={formik?.touched?.steps?.[buildStepIndex]?.name}
      disabled={formik?.isSubmitting}
      inputProps={formik.getFieldProps(`steps.${buildStepIndex}.name`)}
      inputHoverText="Type a unique build step name."
    />
  );
}
