import { Fragment, ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import Card from "../Card/Card";
import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import FormInputText from "../FormInputText/FormInputText";
import CFAddButton from "../CFAddButton/CFAddButton";
import { Editor } from "@monaco-editor/react";

interface ICFContainers {
  formik: FormikProps<IEnvironmentStep1>;
  isImportRobot?: boolean;
}

export default function CFContainers({
  formik,
  isImportRobot,
}: ICFContainers): ReactElement {
  return (
    <CFInfoBar
      label="Containers:"
      tip="Type Containers"
      dataTut="create-robot-step1-containers"
      vertical
      gap={4}
    >
      <Fragment>
        {formik.values.containers.map((_, index) => {
          return (
            <Card
              className="flex flex-col items-center gap-3 p-5 shadow-sm"
              key={index}
            >
              <div className="flex w-full flex-col justify-between gap-4">
                <div className="flex w-full gap-4">
                  <FormInputText
                    classNameContainer=" w-3/4"
                    labelName="Volume Name:"
                    labelInfoTip="Type a new volume name."
                    inputProps={{
                      ...formik.getFieldProps(`containers[${index}].name`),
                    }}
                  />
                  <FormInputText
                    classNameContainer=" w-1/4"
                    labelName="Replica Count:"
                    labelInfoTip="Replica count for the container"
                    inputProps={{
                      ...formik.getFieldProps(
                        `containers[${index}].replicaCount`,
                      ),
                    }}
                  />
                </div>
                <FormInputText
                  classNameContainer="w-full"
                  labelName="Image:"
                  labelInfoTip="Image for the container"
                  inputProps={{
                    ...formik.getFieldProps(`containers[${index}].image`),
                  }}
                />
                <CFInfoBar
                  label="Command:"
                  tip="Type Command"
                  dataTut="create-robot-step1-command"
                  vertical
                >
                  <Editor
                    height="140px"
                    defaultLanguage="shell"
                    defaultValue={formik?.values?.containers[index]?.command}
                    value={formik?.values?.containers[index]?.command}
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
                      formik.setFieldValue(`containers[${index}].command`, e);
                    }}
                  />
                  <CFInfoBar
                    label="Environment Variables:"
                    tip="Type Environment Variables"
                    dataTut="create-robot-step4-environments"
                    vertical
                    touched={true}
                  >
                    <Fragment>
                      {formik?.values?.containers[
                        index
                      ]?.environmentVariables?.map((_, envIndex: number) => {
                        return <></>;
                      })}
                      <div data-tut="create-robot-step4-environments-add-button">
                        <CFAddButton
                          onClick={() => {
                            formik.setFieldValue(
                              `containers[${index}].environmentVariables`,
                              [
                                ...formik?.values?.containers[index]
                                  ?.environmentVariables,
                                {
                                  name: "",
                                  value: "",
                                },
                              ],
                            );
                          }}
                          disabled={formik?.isSubmitting}
                        />
                      </div>
                    </Fragment>
                  </CFInfoBar>
                </CFInfoBar>
              </div>
              <p
                className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
                onClick={() => {
                  formik.setFieldValue(
                    "containers",
                    formik.values.containers.filter(
                      (_, contIndex) => contIndex !== index,
                    ),
                  );
                }}
              >
                Delete Volume
              </p>
            </Card>
          );
        })}
      </Fragment>
      <CFAddButton
        // @ts-ignore
        onClick={() => {
          formik.setFieldValue("containers", [
            ...formik.values.containers,
            {
              name: "",
              replicaCount: 1,
              image: "",
              command: "",
              privileged: false,
              mountedVolumes: [],
              environmentVariables: [],
            },
          ]);
        }}
        disabled={formik?.isSubmitting}
      />
    </CFInfoBar>
  );
}
