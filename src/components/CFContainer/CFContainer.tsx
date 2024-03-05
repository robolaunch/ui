import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import FormInputSelect from "../FormInputSelect/FormInputSelect";
import FormInputText from "../FormInputText/FormInputText";
import CFPrivileged from "../CFPrivileged/CFPrivileged";
import CFAddButton from "../CFAddButton/CFAddButton";
import { Fragment, ReactElement, useState } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import CFEditor from "../CFEditor/CFEditor";
import { FormikProps } from "formik";
import Accordion from "../Accordion/AccordionV2";

interface ICFContainer {
  formik: FormikProps<IEnvironmentStep1>;
  index: number;
}

export default function CFContainer({
  formik,
  index,
}: ICFContainer): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <Accordion
      handleOpen={() => setIsOpen(!isOpen)}
      isOpen={isOpen}
      id={index}
      header={`Container ${index + 1}`}
    >
      <div
        className="flex flex-col items-center gap-3 p-5 shadow-sm"
        key={index}
      >
        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex w-full gap-4">
            <FormInputSelect
              classNameContainer="w-3/4"
              labelName="Volumes Name:"
              tip="Type Volumes Name"
              // @ts-ignore
              inputError={formik.errors.containers?.[index]?.name}
              inputTouched={formik.touched.containers?.[index]?.name}
              options={
                <Fragment>
                  {!formik.values.containers?.[index]?.mountedVolumes && (
                    <option selected value="">
                      Select a volume
                    </option>
                  )}
                  {formik.values.volumes.map((volume, index) => {
                    return (
                      <option key={index} value={volume.name}>
                        {volume.name}
                      </option>
                    );
                  })}
                </Fragment>
              }
              inputProps={{
                ...formik.getFieldProps(`containers[${index}].mountedVolumes`),
              }}
            />
            <FormInputText
              type="number"
              classNameContainer="w-1/4"
              labelName="Replica Count:"
              labelInfoTip="Replica count for the container"
              inputProps={{
                ...formik.getFieldProps(`containers[${index}].replicaCount`),
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
            <CFEditor
              language="shell"
              defaultValue={formik.values.containers[index].command}
              value={formik.values.containers[index].command}
              readonly={formik.isSubmitting}
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
                {formik?.values?.containers[index]?.environmentVariables?.map(
                  (_, envIndex: number) => {
                    return <></>;
                  },
                )}
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

          <CFPrivileged formik={formik} index={index} />
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
      </div>
    </Accordion>
  );
}
