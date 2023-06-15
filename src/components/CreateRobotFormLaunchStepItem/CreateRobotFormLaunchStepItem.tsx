import React, { Fragment, ReactElement, useState } from "react";
import {
  IRobotLaunchSteps,
  IRobotWorkspace,
} from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik";
import Accordion from "../Accordion/AccordionV2";
import InputError from "../InputError/InputError";
import InputSelect from "../InputSelect/InputSelect";
import useCreateRobot from "../../hooks/useCreateRobot";
import CreateRobotFormEnvItem from "../CreateRobotFormEnvItem/CreateRobotFormEnvItem";
import { BsPlusCircle } from "react-icons/bs";
import useSidebar from "../../hooks/useSidebar";
import CreateRobotFormCodeScope from "../CreateRobotFormCodeScope/CreateRobotFormCodeScope";
import { Editor } from "@monaco-editor/react";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";

interface ICreateRobotFormLaunchStepItem {
  launchStep: any;
  launchStepIndex: number;
  formik: FormikProps<IRobotLaunchSteps>;
}

export default function CreateRobotFormLaunchStepItem({
  launchStep,
  launchStepIndex,
  formik,
}: ICreateRobotFormLaunchStepItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(false);

  const {
    robotData,
    handleAddENVToLaunchStep,
    handleRemoveStepFromLaunchStep,
  } = useCreateRobot();
  const { selectedState } = useSidebar();

  return (
    <Accordion
      key={launchStepIndex}
      id={launchStepIndex}
      isOpen={isShowAccordion}
      handleOpen={() => setIsShowAccordion(!isShowAccordion)}
      header={
        <span className="font-medium">
          {launchStep.name
            ? launchStep?.name + ` (Launch Step #${launchStepIndex + 1})`
            : `Launch Step #${launchStepIndex + 1}`}
        </span>
      }
    >
      <div className="flex flex-col gap-7 p-4">
        <div>
          <InputSelect
            {...formik.getFieldProps(
              `robotLaunchSteps.${launchStepIndex}.workspace`
            )}
            placeholder="Workspace"
          >
            <Fragment>
              {!formik?.values?.robotLaunchSteps[launchStepIndex]
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
              formik?.errors?.robotLaunchSteps?.[launchStepIndex]?.workspace
            }
            touched={
              formik?.touched?.robotLaunchSteps?.[launchStepIndex]?.workspace
            }
          />
        </div>
        <div>
          <Editor
            height="140px"
            defaultLanguage="shell"
            defaultValue={
              formik?.values?.robotLaunchSteps[launchStepIndex]?.entryPointCmd
            }
            value={
              formik?.values?.robotLaunchSteps[launchStepIndex]?.entryPointCmd
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
              formik.setValues({
                ...formik.values,
                robotLaunchSteps: formik.values.robotLaunchSteps.map(
                  (item: any, index: number) => {
                    if (index === launchStepIndex) {
                      return {
                        ...item,
                        entryPointCmd: e,
                      };
                    }
                    return item;
                  }
                ),
              });
            }}
          />
          <InputError
            error={
              // @ts-ignore
              formik?.errors?.robotLaunchSteps?.[launchStepIndex]?.entryPointCmd
            }
            touched={true}
          />
        </div>
        <CreateRobotFormCodeScope
          virtualInstanceOnChange={(e) => {
            formik.setValues({
              ...formik.values,
              robotLaunchSteps: formik.values.robotLaunchSteps.map(
                (item: any, index: number) => {
                  if (index === launchStepIndex) {
                    return {
                      ...item,
                      instancesName: e.target.checked
                        ? [...item.instancesName, selectedState?.instance?.name]
                        : item.instancesName.filter(
                            (name: any) =>
                              name !== selectedState?.instance?.name
                          ),
                    };
                  }
                  return item;
                }
              ),
            });
          }}
          physicalInstanceOnChange={(e) => {
            formik.setValues({
              ...formik.values,
              robotLaunchSteps: formik.values.robotLaunchSteps.map(
                (item: any, index: number) => {
                  if (index === launchStepIndex) {
                    return {
                      ...item,
                      instancesName: e.target.checked
                        ? [
                            ...item.instancesName,
                            robotData?.step1?.physicalInstanceName,
                          ]
                        : item.instancesName.filter(
                            (name: any) =>
                              name !== robotData?.step1?.physicalInstanceName
                          ),
                    };
                  }
                  return item;
                }
              ),
            });
          }}
          isVisiblePhysicalInstanceCheckbox={
            robotData?.step1?.physicalInstanceName
          }
          error={
            // @ts-ignore
            formik?.errors?.robotLaunchSteps?.[launchStepIndex]?.instancesName
          }
        />
        <div className="flex flex-col gap-2">
          {formik?.values?.robotLaunchSteps?.[
            launchStepIndex
          ]?.robotLmEnvs?.map((env: any, envIndex: number) => {
            return (
              <CreateRobotFormEnvItem
                key={envIndex}
                formik={formik}
                launchStepIndex={launchStepIndex}
                envIndex={envIndex}
              />
            );
          })}

          <BsPlusCircle
            onClick={() => handleAddENVToLaunchStep(formik, launchStepIndex)}
            size={22}
            className="mx-auto text-layer-secondary-700 hover:scale-90 transition-all duration-500 cursor-pointer mt-2"
          />
        </div>
        {formik.values?.robotLaunchSteps?.length > 1 && (
          <CreateRobotFormDeleteButton
            onClick={() => {
              handleRemoveStepFromLaunchStep(formik, launchStepIndex);
            }}
            text={`Delete ${
              launchStep?.name ? launchStep.name : `this`
            } Launch Step`}
          />
        )}
      </div>
    </Accordion>
  );
}
