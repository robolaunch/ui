import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import CFContainerVolumeMapper from "../CFContainerVolumeMapper/CFContainerVolumeMapper";
import CFContainerEnvMapper from "../CFContainerEnvMapper/CFContainerEnvMapper";
import FormInputText from "../FormInputText/FormInputText";
import CFPrivileged from "../CFPrivileged/CFPrivileged";
import Accordion from "../Accordion/AccordionV2";
import { ReactElement, useState } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import CFEditor from "../CFEditor/CFEditor";
import { FormikProps } from "formik";

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
        <FormInputText
          classNameContainer="w-full"
          labelName="Name:"
          labelInfoTip="Name for the container"
          inputProps={{
            ...formik.getFieldProps(
              `launchContainers[${index}].container.name`,
            ),
          }}
          inputTouched={
            formik.touched.launchContainers?.[index]?.container?.name
          }
          // @ts-ignore
          inputError={formik.errors.launchContainers?.[index]?.container?.name}
        />
        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex w-full gap-4">
            <FormInputText
              classNameContainer="w-4/5"
              labelName="Image:"
              labelInfoTip="Image for the container"
              inputProps={{
                ...formik.getFieldProps(
                  `launchContainers[${index}].container.image`,
                ),
              }}
              inputTouched={
                formik.touched.launchContainers?.[index]?.container?.image
              }
              inputError={
                // @ts-ignore
                formik.errors.launchContainers?.[index]?.container?.image
              }
            />
            <FormInputText
              type="number"
              classNameContainer="w-1/5"
              labelName="Replica Count:"
              labelInfoTip="Replica count for the container"
              inputProps={{
                ...formik.getFieldProps(
                  `launchContainers[${index}].replicaCount`,
                ),
              }}
            />
          </div>

          <CFPrivileged formik={formik} index={index} />
          <CFInfoBar
            label="Command:"
            tip="Type Command"
            dataTut="create-robot-step1-command"
            vertical
          >
            <CFEditor
              language="shell"
              defaultValue={
                formik.values.launchContainers[index].container.command
              }
              value={formik.values.launchContainers[index].container.command}
              readonly={formik.isSubmitting}
              onChange={(e: any) => {
                formik.setFieldValue(
                  `launchContainers[${index}].container.command`,
                  e,
                );
              }}
            />
            <CFInfoBar
              label="Volumes:"
              tip="Type volumes"
              vertical
              touched={true}
            >
              <CFContainerVolumeMapper formik={formik} containerIndex={index} />
            </CFInfoBar>
            <CFInfoBar
              label="Environment Variables:"
              tip="Type Environment Variables"
              dataTut="create-robot-step4-environments"
              vertical
              touched={true}
            >
              <CFContainerEnvMapper formik={formik} containerIndex={index} />
            </CFInfoBar>
          </CFInfoBar>
        </div>
        <p
          className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
          onClick={() => {
            formik.setFieldValue(
              `launchContainers`,
              formik.values.launchContainers.filter((_, i) => i !== index),
            );
          }}
        >
          Delete Volume
        </p>
      </div>
    </Accordion>
  );
}
