import { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import CFDellButton from "../CFDellButton/CFDellButton";

interface ICFHostDirectoriesInput {
  index: number;
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFHostDirectoriesInput({
  index,
  formik,
  disabled,
}: ICFHostDirectoriesInput): ReactElement {
  return (
    <div className="flex w-full  gap-3 rounded-md border border-light-100 p-4">
      <FormInputText
        labelName="Host Directory:"
        labelInfoTip="Type a host directory."
        inputProps={formik.getFieldProps(
          `directories.hostDirectories.${index}.hostDirectory`,
        )}
        disabled={disabled}
        inputError={
          // @ts-ignore
          formik.errors.directories?.hostDirectories?.[index]?.hostDirectory
        }
        inputTouched={
          formik.touched.directories?.hostDirectories?.[index]?.hostDirectory
        }
      />

      <FormInputText
        labelName="Mount Path:"
        labelInfoTip="Type a mount path."
        inputProps={formik.getFieldProps(
          `directories.hostDirectories.${index}.mountPath`,
        )}
        disabled={disabled}
        inputError={
          // @ts-ignore
          formik.errors.directories?.hostDirectories?.[index]?.mountPath
        }
        inputTouched={
          formik.touched.directories?.hostDirectories?.[index]?.mountPath
        }
      />

      <div className="flex items-center justify-center pt-2.5 text-sm text-light-800">
        <CFDellButton
          disabled={disabled}
          onClick={() => {
            const hostDirectories = [
              ...formik.values.directories.hostDirectories,
            ];
            hostDirectories.splice(index, 1);
            formik.setFieldValue(
              "directories.hostDirectories",
              hostDirectories,
            );
          }}
        />
      </div>
    </div>
  );
}
