import {
  IRobotBuildStep,
  IRobotBuildSteps,
  IRobotWorkspace,
} from "../../interfaces/robotInterfaces";
import React, { Fragment, ReactElement, useState } from "react";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import CreateRobotFormCodeScope from "../CreateRobotFormCodeScope/CreateRobotFormCodeScope";
import InputSelect from "../InputSelect/InputSelect";
import InputError from "../InputError/InputError";
import Accordion from "../Accordion/AccordionV2";
import { FormikProps } from "formik/dist/types";
import InputText from "../InputText/InputText";
import { Editor } from "@monaco-editor/react";
import useCreateRobot from "../../hooks/useCreateRobot";
import useMain from "../../hooks/useMain";
import InfoTip from "../InfoTip/InfoTip";
import CreateRobotFormBuildStepItemAccordionHeader from "../CreateRobotFormBuildStepItemAccordionHeader/CreateRobotFormBuildStepItemAccordionHeader";

interface ICreateRobotFormBuildStepItem {
  buildStepIndex: number;
  buildStep: IRobotBuildStep;
  stepState?: string[];
  formik: FormikProps<IRobotBuildSteps>;
  disabled?: boolean;
  isImportRobot?: boolean;
}

export default function CreateRobotFormBuildStepItem({
  buildStepIndex,
  buildStep,
  stepState,
  formik,
  disabled,
  isImportRobot,
}: ICreateRobotFormBuildStepItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(true);
  const { selectedState } = useMain();
  const { robotData, handleRemoveStepFromBuildStep } = useCreateRobot();

  return (
    <Accordion
      key={buildStepIndex}
      id={buildStepIndex}
      isOpen={isShowAccordion}
      handleOpen={() => setIsShowAccordion(!isShowAccordion)}
      header={
        <CreateRobotFormBuildStepItemAccordionHeader
          buildStep={buildStep}
          buildStepIndex={buildStepIndex}
          isImportRobot={isImportRobot}
        />
      }
    >
      <Fragment>
        <div className="flex flex-col gap-4 p-4">
          <div data-tut="create-robot-build-step-name">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
              Build Step Name:
              <InfoTip content="Type a unique build step name." />
            </div>
            <InputText
              {...formik.getFieldProps(
                `robotBuildSteps.${buildStepIndex}.name`
              )}
              className="!text-sm"
              disabled={formik?.isSubmitting}
            />
            <InputError
              error={
                // @ts-ignore
                formik?.errors?.robotBuildSteps?.[buildStepIndex]?.name
              }
              touched={formik?.touched?.robotBuildSteps?.[buildStepIndex]?.name}
            />
          </div>

          <div data-tut="create-robot-build-step-workspace">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
              Workspace:
              <InfoTip content="Select a workspace name." />
            </div>
            <InputSelect
              {...formik.getFieldProps(
                `robotBuildSteps.${buildStepIndex}.workspace`
              )}
              placeholder=""
              disabled={formik?.isSubmitting}
            >
              <Fragment>
                {!formik?.values?.robotBuildSteps[buildStepIndex]
                  ?.workspace && <option value=""></option>}
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

          <div data-tut="create-robot-build-step-code-type">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
              Bash/Script Code:
              <InfoTip content="Select command or script code" />
            </div>
            <InputSelect
              {...formik.getFieldProps(
                `robotBuildSteps.${buildStepIndex}.isCommandCode`
              )}
              value={
                formik.values.robotBuildSteps[buildStepIndex]?.isCommandCode
                  ? "isCommandCode"
                  : "isScriptCode"
              }
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
              disabled={formik?.isSubmitting}
            >
              <Fragment>
                <option value="isCommandCode">Bash Code</option>
                <option value="isScriptCode">Script Code</option>
              </Fragment>
            </InputSelect>
          </div>

          <div data-tut="create-robot-build-step-code">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
              Code:
              <InfoTip content="Type code" />
            </div>
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
                    }
                  ),
                });
              }}
            />
            <InputError
              error={
                formik.values.robotBuildSteps[buildStepIndex]?.isCommandCode
                  ? // @ts-ignore
                    formik?.errors?.robotBuildSteps?.[buildStepIndex]?.command
                  : // @ts-ignore
                    formik?.errors?.robotBuildSteps?.[buildStepIndex]?.script
              }
              touched={true}
            />
          </div>

          <CreateRobotFormCodeScope
            virtualInstanceDisabled={formik?.isSubmitting}
            physicalInstanceDisabled={formik?.isSubmitting}
            virtualInstanceChecked={formik.values.robotBuildSteps[
              buildStepIndex
            ]?.instancesName?.includes(selectedState?.instance?.name)}
            physicalInstanceChecked={formik.values.robotBuildSteps[
              buildStepIndex
            ]?.instancesName?.includes(robotData?.step1?.physicalInstanceName)}
            virtualInstanceOnChange={(e) => {
              formik.setValues((prevValues) => ({
                ...prevValues,
                robotBuildSteps: prevValues.robotBuildSteps.map(
                  (item, index) => {
                    if (index === buildStepIndex) {
                      return {
                        ...item,
                        instancesName: e.target.checked
                          ? [
                              ...item.instancesName,
                              selectedState?.instance?.name,
                            ]
                          : item.instancesName.filter(
                              (name) => name !== selectedState?.instance?.name
                            ),
                      };
                    }
                    return item;
                  }
                ),
              }));
            }}
            physicalInstanceOnChange={(e) => {
              formik.setValues((prevValues) => ({
                ...prevValues,
                robotBuildSteps: prevValues.robotBuildSteps.map(
                  (item, index) => {
                    if (index === buildStepIndex) {
                      return {
                        ...item,
                        instancesName: e.target.checked
                          ? [
                              ...item.instancesName,
                              robotData?.step1?.physicalInstanceName,
                            ]
                          : item.instancesName.filter(
                              (name) =>
                                name !== robotData?.step1?.physicalInstanceName
                            ),
                      };
                    }
                    return item;
                  }
                ),
              }));
            }}
            isVisiblePhysicalInstanceCheckbox={
              robotData?.step1?.physicalInstanceName
            }
            error={
              // @ts-ignore
              formik?.errors?.robotBuildSteps?.[buildStepIndex]?.instancesName
            }
          />

          {formik.values?.robotBuildSteps?.length > 1 && (
            <CreateRobotFormDeleteButton
              onClick={() => {
                handleRemoveStepFromBuildStep(formik, buildStepIndex);
              }}
              text={`Delete ${
                buildStep?.name ? buildStep.name : "this"
              } Build Step`}
              disabled={formik?.isSubmitting}
            />
          )}
        </div>
      </Fragment>
    </Accordion>
  );
}
