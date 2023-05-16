import React, { Fragment, ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import {
  IRobotBuildStep,
  IRobotBuildSteps,
  IRobotWorkspace,
} from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import InputSelect from "../InputSelect/InputSelect";
import { Editor } from "@monaco-editor/react";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICreateRobotFormBuildStepItem {
  buildStepIndex: number;
  buildStep: IRobotBuildStep;
  formik: FormikProps<IRobotBuildSteps>;
}

export default function CreateRobotFormBuildStepItem({
  buildStepIndex,
  buildStep,
  formik,
}: ICreateRobotFormBuildStepItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(false);

  const { robotData } = useCreateRobot();

  return (
    <Accordion
      key={buildStepIndex}
      id={buildStepIndex}
      isOpen={isShowAccordion}
      handleOpen={() => setIsShowAccordion(!isShowAccordion)}
      header={
        <span className="font-medium">
          {buildStep.name
            ? buildStep?.name + " buildStep"
            : `buildStep ${buildStepIndex + 1}`}
        </span>
      }
    >
      <div className="flex flex-col gap-7 p-4">
        <div>
          <InputText
            {...formik.getFieldProps(`steps.${buildStepIndex}.name`)}
            placeholder="Build Step Name"
            disabled={formik?.isSubmitting}
          />
          <InputError
            // @ts-ignore
            error={formik?.errors?.steps?.[buildStepIndex]?.name}
            touched={formik?.touched?.steps?.[buildStepIndex]?.name}
          />
        </div>
        <div>
          <InputSelect
            {...formik.getFieldProps(`steps.${buildStepIndex}.workspace`)}
            placeholder="Workspace"
          >
            <Fragment>
              {!formik?.values?.steps[buildStepIndex]?.workspace && (
                <option value=""></option>
              )}
              {robotData?.step2?.workspaces?.map(
                (workspace: IRobotWorkspace, index: number) => (
                  <option key={index} value={workspace.name}>
                    {workspace.name}
                  </option>
                )
              )}
            </Fragment>
          </InputSelect>
          <InputError
            error={
              // @ts-ignore
              formik?.errors?.steps?.[buildStepIndex]?.workspace
            }
            touched={formik?.touched?.steps?.[buildStepIndex]?.workspace}
          />
        </div>
        <div>
          <Editor
            height="140px"
            defaultLanguage="shell"
            defaultValue={formik.values.steps[buildStepIndex]?.code || ""}
            options={{
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
                      code: e,
                    };
                  } else {
                    return item;
                  }
                }),
              });
            }}
          />
        </div>
        <span
          onClick={() => {
            formik.setValues({
              ...formik.values,
              steps: formik.values.steps.filter(
                (item: any, index: number) => index !== buildStepIndex
              ),
            });
          }}
          className="text-[0.66rem] text-red-500 cursor-pointer mx-auto hover:underline"
        >
          Delete {buildStep?.name ? buildStep.name : `this`} Build Step
        </span>
      </div>
    </Accordion>
  );
}
