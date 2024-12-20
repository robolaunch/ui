import { ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import FormInputText from "../FormInputText/FormInputText";

interface ICFContainerEnv {
  formik: FormikProps<IEnvironmentStep1>;
  containerIndex: number;
  envIndex: number;
}

export default function CFContainerEnv({
  formik,
  containerIndex,
  envIndex,
}: ICFContainerEnv): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Accordion
      handleOpen={() => setIsOpen(!isOpen)}
      isOpen={isOpen}
      header={`Environment Variable ${envIndex + 1}`}
      id={envIndex}
    >
      <div className="flex flex-col items-center gap-3 pb-2">
        <div className="flex w-full gap-4 p-4">
          <FormInputText
            classNameContainer="w-full"
            labelName="Environment Variable Name:"
            labelInfoTip="Type Environment Variable Name"
            inputProps={{
              ...formik.getFieldProps(
                `launchContainers[${containerIndex}].container.environmentVariables[${envIndex}].name`,
              ),
            }}
            inputTouched={
              formik.touched.launchContainers?.[containerIndex]?.container
                ?.environmentVariables?.[envIndex]?.name
            }
            inputError={
              // @ts-ignore
              formik.errors.launchContainers?.[containerIndex]?.container
                ?.environmentVariables?.[envIndex]?.name
            }
          />
          <FormInputText
            classNameContainer="w-full"
            labelName="Environment Variable Value:"
            labelInfoTip="Type Environment Variable Value"
            inputProps={{
              ...formik.getFieldProps(
                `launchContainers[${containerIndex}].container.environmentVariables[${envIndex}].value`,
              ),
            }}
            inputTouched={
              formik.touched.launchContainers?.[containerIndex]?.container
                ?.environmentVariables?.[envIndex]?.value
            }
            inputError={
              // @ts-ignore
              formik.errors.launchContainers?.[containerIndex]?.container
                ?.environmentVariables?.[envIndex]?.value
            }
          />
        </div>
        <p
          className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
          onClick={() => {
            formik.setFieldValue(
              `launchContainers[${containerIndex}].container.environmentVariables`,
              formik.values?.launchContainers[
                containerIndex
              ]?.container?.environmentVariables?.filter(
                (_, index) => index !== envIndex,
              ),
            );
          }}
        >
          Delete Environment
        </p>
      </div>
    </Accordion>
  );
}
