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
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import useSidebar from "../../hooks/useSidebar";

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

  const { selectedState } = useSidebar();
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
            {...formik.getFieldProps(`robotBuildSteps.${buildStepIndex}.name`)}
            placeholder="Build Step Name"
            disabled={formik?.isSubmitting}
          />
          <InputError
            // @ts-ignore
            error={formik?.errors?.robotBuildSteps?.[buildStepIndex]?.name}
            touched={formik?.touched?.robotBuildSteps?.[buildStepIndex]?.name}
          />
        </div>
        <div>
          <InputSelect
            {...formik.getFieldProps(
              `robotBuildSteps.${buildStepIndex}.workspace`
            )}
            placeholder="Workspace"
          >
            <Fragment>
              {!formik?.values?.robotBuildSteps[buildStepIndex]?.workspace && (
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
              formik?.errors?.robotBuildSteps?.[buildStepIndex]?.workspace
            }
            touched={
              formik?.touched?.robotBuildSteps?.[buildStepIndex]?.workspace
            }
          />
        </div>
        <div>
          <InputSelect
            {...formik.getFieldProps(
              `robotBuildSteps.${buildStepIndex}.isCommandCode`
            )}
            value={
              formik.values.robotBuildSteps[buildStepIndex]?.isCommandCode
                ? "isCommandCode"
                : "isScriptCode"
            }
            placeholder="isCommandCode"
            onChange={(e) => {
              if (e.target.value === "isCommandCode") {
                formik.setValues({
                  ...formik.values,
                  robotBuildSteps: formik.values.robotBuildSteps.map(
                    (item: any, index: number) => {
                      if (index === buildStepIndex) {
                        return {
                          ...item,
                          script: "",
                          isCommandCode:
                            e.target.value === "isCommandCode" ? true : false,
                        };
                      }
                      return item;
                    }
                  ),
                });
              } else {
                formik.setValues({
                  ...formik.values,
                  robotBuildSteps: formik.values.robotBuildSteps.map(
                    (item: any, index: number) => {
                      if (index === buildStepIndex) {
                        return {
                          ...item,
                          command: "",

                          isCommandCode:
                            e.target.value === "isCommandCode" ? true : false,
                        };
                      }
                      return item;
                    }
                  ),
                });
              }
            }}
          >
            <Fragment>
              <option value="isCommandCode">Command Code</option>
              <option value="isScriptCode">Script Code</option>
            </Fragment>
          </InputSelect>
          <InputError
            error={
              // @ts-ignore
              formik?.errors?.robotBuildSteps?.[buildStepIndex]?.workspace
            }
            touched={
              formik?.touched?.robotBuildSteps?.[buildStepIndex]?.workspace
            }
          />
        </div>
        <div>
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
              if (
                formik.values.robotBuildSteps[buildStepIndex]?.isCommandCode
              ) {
                formik.setValues({
                  ...formik.values,
                  robotBuildSteps: formik.values.robotBuildSteps.map(
                    (item: any, index: number) => {
                      if (index === buildStepIndex) {
                        return {
                          ...item,
                          command: e,
                        };
                      } else {
                        return item;
                      }
                    }
                  ),
                });
              } else {
                formik.setValues({
                  ...formik.values,
                  robotBuildSteps: formik.values.robotBuildSteps.map(
                    (item: any, index: number) => {
                      if (index === buildStepIndex) {
                        return {
                          ...item,
                          script: e,
                        };
                      } else {
                        return item;
                      }
                    }
                  ),
                });
              }
            }}
          />
          <InputError
            error={
              // @ts-ignore
              formik?.errors?.robotBuildSteps?.[buildStepIndex]?.command ||
              // @ts-ignore
              formik?.errors?.robotBuildSteps?.[buildStepIndex]?.script
            }
            touched={
              formik?.touched?.robotBuildSteps?.[buildStepIndex]?.command ||
              formik?.touched?.robotBuildSteps?.[buildStepIndex]?.script
            }
          />
        </div>

        <div>
          <div>
            <span>Virtual Instance: </span>
            <InputCheckbox
              onChange={(e) => {
                if (e.target.checked) {
                  formik.setValues({
                    ...formik.values,
                    robotBuildSteps: formik.values.robotBuildSteps.map(
                      (item: any, index: number) => {
                        if (index === buildStepIndex) {
                          return {
                            ...item,
                            instancesName: [
                              ...item.instancesName,
                              selectedState?.instance?.name,
                            ],
                          };
                        } else {
                          return item;
                        }
                      }
                    ),
                  });
                } else {
                  formik.setValues({
                    ...formik.values,
                    robotBuildSteps: formik.values.robotBuildSteps.map(
                      (item: any, index: number) => {
                        if (index === buildStepIndex) {
                          return {
                            ...item,
                            instancesName: [
                              ...item.instancesName.filter(
                                (item: any) =>
                                  item !== selectedState?.instance?.name
                              ),
                            ],
                          };
                        } else {
                          return item;
                        }
                      }
                    ),
                  });
                }
              }}
            />
          </div>

          <div>
            <span>Physical Instance: </span>
            <InputCheckbox
              onChange={(e) => {
                if (e.target.checked) {
                  formik.setValues({
                    ...formik.values,
                    robotBuildSteps: formik.values.robotBuildSteps.map(
                      (item: any, index: number) => {
                        if (index === buildStepIndex) {
                          return {
                            ...item,
                            instancesName: [
                              ...item.instancesName,
                              robotData?.step1?.physicalInstanceName,
                            ],
                          };
                        } else {
                          return item;
                        }
                      }
                    ),
                  });
                } else {
                  formik.setValues({
                    ...formik.values,
                    robotBuildSteps: formik.values.robotBuildSteps.map(
                      (item: any, index: number) => {
                        if (index === buildStepIndex) {
                          return {
                            ...item,
                            instancesName: [
                              ...item.instancesName.filter(
                                (item: any) =>
                                  item !==
                                  robotData?.step1?.physicalInstanceName
                              ),
                            ],
                          };
                        } else {
                          return item;
                        }
                      }
                    ),
                  });
                }
              }}
            />
          </div>
        </div>

        <span
          onClick={() => {
            formik.setValues({
              ...formik.values,
              robotBuildSteps: formik.values.robotBuildSteps.filter(
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
