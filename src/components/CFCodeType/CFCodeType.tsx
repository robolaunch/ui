import React, { Fragment, ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import InputSelect from "../InputSelect/InputSelect";
import { IRobotBuildSteps } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFCodeType {
  formik: FormikProps<IRobotBuildSteps>;
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
        formik?.errors?.robotBuildSteps?.[buildStepIndex]?.isCommandCode
      }
      touched={true}
    >
      <InputSelect
        {...formik.getFieldProps(
          `robotBuildSteps.${buildStepIndex}.isCommandCode`,
        )}
        value={
          formik.values.robotBuildSteps[buildStepIndex]?.isCommandCode
            ? "isCommandCode"
            : "isScriptCode"
        }
        onChange={(e) => {
          const isCommandCode = e.target.value === "isCommandCode";
          const updateValue = isCommandCode ? { script: "" } : { command: "" };

          formik.setValues({
            ...formik.values,
            robotBuildSteps: formik.values.robotBuildSteps.map(
              (item, index) => {
                if (index === buildStepIndex) {
                  return { ...item, isCommandCode, ...updateValue };
                }
                return item;
              },
            ),
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
