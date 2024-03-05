import { ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";

interface ICFContainerVolume {
  formik: FormikProps<IEnvironmentStep1>;
  containerIndex: number;
  volumeIndex: number;
}

export default function CFContainerVolume({
  formik,
  containerIndex,
  volumeIndex,
}: ICFContainerVolume): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Accordion
      handleOpen={() => setIsOpen(!isOpen)}
      isOpen={isOpen}
      header={`Volume ${volumeIndex + 1}`}
      id={volumeIndex}
    >
      <div className="flex flex-col items-center gap-3 pb-2">
        <div className="flex w-full gap-4 p-4">
          <FormInputText
            classNameContainer="w-full"
            labelName="Volume:"
            labelInfoTip="Volume"
            inputProps={{
              ...formik.getFieldProps(
                `containers[${containerIndex}].volumes[${volumeIndex}].name`,
              ),
            }}
          />
          <FormInputText
            classNameContainer="w-full"
            labelName="Path:"
            labelInfoTip="Type Path"
            inputProps={{
              ...formik.getFieldProps(
                `containers[${containerIndex}].volumes[${volumeIndex}].path`,
              ),
            }}
          />
        </div>
        <p
          className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
          onClick={() => {
            formik.setFieldValue(
              `containers[${containerIndex}].volumes`,
              formik.values.containers[containerIndex].mountedVolumes.filter(
                (_, index) => index !== volumeIndex,
              ),
            );
          }}
        >
          Delete Mount Volume
        </p>
      </div>
    </Accordion>
  );
}
