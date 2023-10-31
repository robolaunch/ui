import { IRobotBuildSteps } from "../../interfaces/robotInterfaces";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { Editor } from "@monaco-editor/react";
import React, { ReactElement } from "react";
import { FormikProps } from "formik";

interface ICFCode {
  formik: FormikProps<IRobotBuildSteps>;
  buildStepIndex: number;
}

export default function CFCode({
  formik,
  buildStepIndex,
}: ICFCode): ReactElement {
  return (
    <CFInfoBar
      label="Code"
      tip="Type code"
      dataTut="create-robot-build-step-code"
      vertical
      error={
        // @ts-ignore
        formik?.errors?.robotBuildSteps?.[buildStepIndex]?.isCommandCode
      }
      touched={true}
    >
      <Editor
        height="140px"
        defaultLanguage="shell"
        defaultValue={
          formik.values.robotBuildSteps[buildStepIndex]?.isCommandCode
            ? formik.values.robotBuildSteps[buildStepIndex]?.command
            : formik.values.robotBuildSteps[buildStepIndex]?.script
        }
        value={
          formik.values.robotBuildSteps[buildStepIndex]?.isCommandCode
            ? formik.values.robotBuildSteps[buildStepIndex]?.command
            : formik.values.robotBuildSteps[buildStepIndex]?.script
        }
        options={{
          readOnly: formik?.isSubmitting,
          minimap: {
            enabled: false,
          },
          fontSize: 12,
          fontFamily: "monospace",
          lineDecorationsWidth: 10,
          wordWrap: "on",
          lineNumbersMinChars: 3,
          folding: false,
          padding: {
            top: 6,
            bottom: 6,
          },
        }}
        theme="vs-dark"
        onChange={(e: any) => {
          formik.setValues({
            ...formik.values,
            robotBuildSteps: formik.values.robotBuildSteps.map(
              (item: any, index: number) => {
                if (index === buildStepIndex) {
                  return {
                    ...item,
                    [formik.values.robotBuildSteps[buildStepIndex]
                      ?.isCommandCode
                      ? "command"
                      : "script"]: e,
                  };
                } else {
                  return item;
                }
              },
            ),
          });
        }}
      />
    </CFInfoBar>
  );
}
