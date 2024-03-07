import { ReactElement, useEffect, useState } from "react";
import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import FormInputText from "../FormInputText/FormInputText";
import Accordion from "../Accordion/AccordionV2";
import FormInputRange from "../FormInputRange/FormInputRange";

interface ICFVolume {
  formik: FormikProps<IEnvironmentStep1>;
  index: number;
}

export default function CFVolume({ formik, index }: ICFVolume): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    formik.setFieldValue(
      `volumes[${index}].name`,
      `${formik.values.details.name}-pvc-${index}`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.details.name, index]);

  return (
    <Accordion
      handleOpen={() => setIsOpen(!isOpen)}
      isOpen={isOpen}
      id={index}
      header={`Volume (${formik.values.volumes?.[index]?.name})`}
    >
      <div className="flex flex-col items-center gap-3 p-5 shadow-sm">
        <div className="flex w-full gap-4">
          <FormInputText
            classNameContainer="w-full"
            labelName="Volume Name:"
            labelInfoTip="Type a new volume name."
            disabled
            inputProps={{
              ...formik.getFieldProps(`volumes[${index}].name`),
            }}
          />
          <FormInputRange
            rightTip
            classNameContainer="w-full"
            classNameLabel="pt-1.5"
            vertical
            label={`Storage (${formik?.values?.volumes?.[index]?.capacity} GB):`}
            tip={`
                Select the storage capacity for the volume. 
                The capacity is the amount of storage that will be allocated to the volume.
            `}
            dataTut="create-robot-step1-storage"
            InputProps={{
              ...formik.getFieldProps(`volumes[${index}].capacity`),
            }}
            min={20}
            max={100}
            disabled={formik.isSubmitting}
            // @ts-ignore
            error={formik.errors.volumes?.[index]?.capacity}
            touched={formik.touched.volumes?.[index]?.capacity}
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
