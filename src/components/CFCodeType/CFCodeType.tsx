import React, { Fragment, ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import InputSelect from "../InputSelect/InputSelect";
import { IBuildSteps } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFCodeType {
  formik: FormikProps<IBuildSteps>;
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
        formik?.errors?.steps?.[buildStepIndex]?.isShellCode
      }
      touched={true}
    >
      <InputSelect
        {...formik.getFieldProps(`steps.${buildStepIndex}.isShellCode`)}
        value={
          formik.values.steps[buildStepIndex]?.isShellCode
            ? "isShellCode"
            : "isScriptCode"
        }
        onChange={(e) => {
          const isShellCode = e.target.value === "isShellCode";
          const updateValue = isShellCode ? { script: "" } : { command: "" };

          formik.setValues({
            ...formik.values,
            steps: formik.values.steps.map((item, index) => {
              if (index === buildStepIndex) {
                return { ...item, isShellCode, ...updateValue };
              }
              return item;
            }),
          });
        }}
        disabled={formik?.isSubmitting}
      >
        <Fragment>
          <option value="isShellCode">Bash Code</option>
          <option value="isScriptCode">Script Code</option>
        </Fragment>
      </InputSelect>
    </CFInfoBar>
  );
}
