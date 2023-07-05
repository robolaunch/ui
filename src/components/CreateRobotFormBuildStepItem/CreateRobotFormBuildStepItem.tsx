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
import useSidebar from "../../hooks/useSidebar";
import CreateRobotFormCodeScope from "../CreateRobotFormCodeScope/CreateRobotFormCodeScope";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import StateCell from "../Cells/StateCell";
import InfoTip from "../InfoTip/InfoTip";

interface ICreateRobotFormBuildStepItem {
  buildStepIndex: number;
  buildStep: IRobotBuildStep;
  formik: FormikProps<IRobotBuildSteps>;
  disabled?: boolean;
}

export default function CreateRobotFormBuildStepItem({
  buildStepIndex,
  buildStep,
  formik,
  disabled,
}: ICreateRobotFormBuildStepItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(false);

  const { selectedState } = useSidebar();
  const { robotData } = useCreateRobot();
  const { handleRemoveStepFromBuildStep } = useCreateRobot();

  return (
    <Accordion
      key={buildStepIndex}
      id={buildStepIndex}
      isOpen={isShowAccordion}
      handleOpen={() => setIsShowAccordion(!isShowAccordion)}
      header={
        <div className="flex justify-between">
          <span className="font-medium">
            {buildStep.name
              ? buildStep?.name + ` (Build Step #${buildStepIndex + 1})`
              : `Build Step #${buildStepIndex + 1}`}
          </span>
          <div className="flex items-center gap-2 text-xs">
            {Array.isArray(buildStep?.robotClusters) &&
              buildStep?.robotClusters[0]?.buildManagerStatus && (
                <div className="flex gap-1.5">
                  <span
                    title={`Launch State of Cloud Instance`}
                    className="font-medium"
                  >
                    CI:
                  </span>
                  <StateCell
                    state={
                      Array.isArray(buildStep?.robotClusters) &&
                      buildStep?.robotClusters[0]?.buildManagerStatus
                    }
                  />
                </div>
              )}
            {Array.isArray(buildStep?.robotClusters) &&
              buildStep?.robotClusters[1]?.buildManagerStatus && (
                <div className="flex gap-1.5">
                  <span
                    title={`Launch State of Physical Instance`}
                    className="font-medium"
                  >
                    PI:
                  </span>
                  <StateCell
                    state={
                      Array.isArray(buildStep?.robotClusters) &&
                      buildStep?.robotClusters[1]?.buildManagerStatus
                    }
                  />
                </div>
              )}
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4 p-4">
        <div>
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
            Build Step Name:
            <InfoTip content="Type a unique build step name." />
          </div>
          <InputText
            {...formik.getFieldProps(`robotBuildSteps.${buildStepIndex}.name`)}
            className="!text-sm"
            disabled={formik?.isSubmitting}
          />
          <InputError
            // @ts-ignore
            error={formik?.errors?.robotBuildSteps?.[buildStepIndex]?.name}
            touched={formik?.touched?.robotBuildSteps?.[buildStepIndex]?.name}
          />
        </div>

        <div>
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
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
            Command/Script Code:
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
              <option value="isCommandCode">Command Code</option>
              <option value="isScriptCode">Script Code</option>
            </Fragment>
          </InputSelect>
        </div>
        <div>
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
              robotBuildSteps: prevValues.robotBuildSteps.map((item, index) => {
                if (index === buildStepIndex) {
                  return {
                    ...item,
                    instancesName: e.target.checked
                      ? [...item.instancesName, selectedState?.instance?.name]
                      : item.instancesName.filter(
                          (name) => name !== selectedState?.instance?.name
                        ),
                  };
                }
                return item;
              }),
            }));
          }}
          physicalInstanceOnChange={(e) => {
            formik.setValues((prevValues) => ({
              ...prevValues,
              robotBuildSteps: prevValues.robotBuildSteps.map((item, index) => {
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
              }),
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
    </Accordion>
  );
}
