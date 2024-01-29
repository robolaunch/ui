import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { Editor } from "@monaco-editor/react";
import { ReactElement } from "react";
import { FormikProps } from "formik";
import { IEnvironmentStep3 } from "../../interfaces/environment/environment.step3.interface";

interface ICFCode {
  formik: FormikProps<IEnvironmentStep3>;
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
        formik?.errors?.steps?.[buildStepIndex]?.isShellCode
      }
      touched={true}
    >
      <Editor
        height="140px"
        defaultLanguage="shell"
        defaultValue={
          formik.values.steps[buildStepIndex]?.isShellCode
            ? formik.values.steps[buildStepIndex]?.command
            : formik.values.steps[buildStepIndex]?.script
        }
        value={
          formik.values.steps[buildStepIndex]?.isShellCode
            ? formik.values.steps[buildStepIndex]?.command
            : formik.values.steps[buildStepIndex]?.script
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
            steps: formik.values.steps.map((item: any, index: number) => {
              if (index === buildStepIndex) {
                return {
                  ...item,
                  [formik.values.steps[buildStepIndex]?.isShellCode
                    ? "command"
                    : "script"]: e,
                };
              } else {
                return item;
              }
            }),
          });
        }}
      />
    </CFInfoBar>
  );
}
