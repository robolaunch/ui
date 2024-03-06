import { Fragment, ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import FormInputSelect from "../FormInputSelect/FormInputSelect";

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
          <FormInputSelect
            labelName="Volume"
            tip="Select Volume"
            inputTouched={
              formik.touched?.launchContainers?.[containerIndex]?.container
                ?.mountedVolumes?.[volumeIndex]?.name
            }
            inputError={
              // @ts-ignore
              formik.errors?.launchContainers?.[containerIndex]?.container
                ?.mountedVolumes?.[volumeIndex]?.name
            }
            inputProps={{
              ...formik.getFieldProps(
                `containers[${containerIndex}].mountedVolumes[${volumeIndex}].name`,
              ),
            }}
            options={
              <Fragment>
                {!formik.values?.launchContainers?.[containerIndex]?.container
                  ?.mountedVolumes?.[volumeIndex]?.name && (
                  <option value="">Select a volume</option>
                )}
                {formik.values?.volumes?.map((volume, index) => (
                  <option key={index} value={volume.name}>
                    {volume.name}
                  </option>
                ))}
              </Fragment>
            }
          />
          <FormInputText
            classNameContainer="w-full"
            labelName="Path:"
            labelInfoTip="Type Path"
            inputProps={{
              ...formik.getFieldProps(
                `launchContainers[${containerIndex}].container.mountedVolumes[${volumeIndex}].mountPath`,
              ),
            }}
          />
        </div>
        <p
          className="cursor-pointer text-xs font-medium text-red-500 hover:underline"
          onClick={() => {
            formik.setFieldValue(
              `launchContainers[${containerIndex}].container.mountedVolumes`,
              formik.values?.launchContainers[
                containerIndex
              ]?.container?.mountedVolumes?.filter(
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
