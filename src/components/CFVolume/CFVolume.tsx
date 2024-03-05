import { ReactElement, useState } from "react";
import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import FormInputText from "../FormInputText/FormInputText";
import Accordion from "../Accordion/AccordionV2";

interface ICFVolume {
  formik: FormikProps<IEnvironmentStep1>;
  index: number;
}

export default function CFVolume({ formik, index }: ICFVolume): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Accordion
      handleOpen={() => setIsOpen(!isOpen)}
      isOpen={isOpen}
      id={index}
      header={`Volume (${formik.values.volumes?.[index]?.name})`}
    >
      <div className="flex flex-col items-center gap-3 p-5 shadow-sm">
        <div className="flex w-full justify-between gap-4">
          <FormInputText
            classNameContainer="w-1/4"
            labelName="Volume Name:"
            labelInfoTip="Type a new volume name."
            disabled
            inputProps={{
              ...formik.getFieldProps(`volumes[${index}].name`),
            }}
          />
          <FormInputText
            classNameContainer="w-3/4"
            labelName="Volume Path:"
            labelInfoTip="Type a new volume path."
            inputProps={{
              ...formik.getFieldProps(`volumes[${index}].mountPath`),
            }}
          />
        </div>
        <p
          className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
          onClick={() => {
            formik.setFieldValue(
              "volumes",
              formik.values.volumes.filter(
                (_, volumeIndex) => volumeIndex !== index,
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
