import { Fragment, ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import InputSelect from "../InputSelect/InputSelect";
import { FormikProps } from "formik/dist/types";
import { IEnvironmentStep3 } from "../../interfaces/environment/environment.step3.interface";

interface ICFCodeType {
  formik: FormikProps<IEnvironmentStep3>;
  buildStepIndex: number;
}

export default function CFCodeType({
  formik,
  buildStepIndex,
}: ICFCodeType): ReactElement {
  return (
    <CFInfoBar
      label="Code Type"
      tip="Select command or script code"
      dataTut="create-robot-build-step-code-type"
      vertical
      error={
        // @ts-ignore
        formik?.errors?.steps?.[buildStepIndex]?.isCommandCode
      }
      touched={true}
    >
      <InputSelect
        {...formik.getFieldProps(`steps.${buildStepIndex}.isCommandCode`)}
        value={
          formik.values.steps[buildStepIndex]?.isCommandCode
            ? "isCommandCode"
            : "isScriptCode"
        }
        onChange={(e) => {
          const isCommandCode = e.target.value === "isCommandCode";
          const updateValue = isCommandCode ? { script: "" } : { command: "" };

          formik.setValues({
            ...formik.values,
            steps: formik.values.steps.map((item, index) => {
              if (index === buildStepIndex) {
                return { ...item, isCommandCode, ...updateValue };
              }
              return item;
            }),
          });
        }}
        disabled={formik?.isSubmitting}
      >
        <Fragment>
          <option value="isCommandCode">Bash Code</option>
          <option value="isScriptCode">Script Code</option>
        </Fragment>
      </InputSelect>
    </CFInfoBar>
  );
}
