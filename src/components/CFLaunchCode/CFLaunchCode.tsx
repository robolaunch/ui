import React, { ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { Editor } from "@monaco-editor/react";
import { FormikProps } from "formik/dist/types";
import { IEnvironmentStep4LaunchStep } from "../../interfaces/environment/environment.step4.interface";

interface ICFLaunchCode {
  formik: FormikProps<IEnvironmentStep4LaunchStep>;
  disabled?: boolean;
}

export default function CFLaunchCode({
  formik,
  disabled,
}: ICFLaunchCode): ReactElement {
  return (
    <CFInfoBar
      label="Bash Code"
      tip="Type Bash code"
      dataTut="create-robot-step4-code"
      error={
        // @ts-ignore
        formik?.errors?.entryPointCmd
      }
      touched={true}
      vertical
    >
      <Editor
        height="140px"
        defaultLanguage="shell"
        defaultValue={formik?.values?.entryPointCmd}
        value={formik?.values?.entryPointCmd}
        options={{
          readOnly: disabled || formik?.isSubmitting,
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
            entryPointCmd: e,
          });
        }}
      />
    </CFInfoBar>
  );
}
