import { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik/dist/types";
import { IEnvironmentStep3 } from "../../interfaces/envitonment.step3.interface";

interface ICFBuildStepName {
  formik: FormikProps<IEnvironmentStep3>;
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
