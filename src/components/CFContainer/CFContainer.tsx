import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import FormInputText from "../FormInputText/FormInputText";
import CFPrivileged from "../CFPrivileged/CFPrivileged";
import { ReactElement, useState } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import CFEditor from "../CFEditor/CFEditor";
import { FormikProps } from "formik";
import Accordion from "../Accordion/AccordionV2";
import CFContainerEnvMapper from "../CFContainerEnvMapper/CFContainerEnvMapper";
import CFContainerVolumeMapper from "../CFContainerVolumeMapper/CFContainerVolumeMapper";

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
            <FormInputText
              classNameContainer="w-4/5"
              labelName="Image:"
              labelInfoTip="Image for the container"
              inputProps={{
                ...formik.getFieldProps(`containers[${index}].image`),
              }}
            />
            <FormInputText
              type="number"
              classNameContainer="w-1/5"
              labelName="Replica Count:"
              labelInfoTip="Replica count for the container"
              inputProps={{
                ...formik.getFieldProps(`containers[${index}].replicaCount`),
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
              defaultValue={formik.values.containers[index].command}
              value={formik.values.containers[index].command}
              readonly={formik.isSubmitting}
              onChange={(e: any) => {
                formik.setFieldValue(`containers[${index}].command`, e);
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
