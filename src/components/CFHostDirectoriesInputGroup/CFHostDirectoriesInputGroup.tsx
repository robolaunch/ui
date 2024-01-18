import CFDirectoriesSelectInput from "../CFDirectoriesSelectInput/CFDirectoriesSelectInput";
import { IDetails } from "../../interfaces/robotInterfaces";
import CFDellButton from "../CFDellButton/CFDellButton";
import { ReactElement } from "react";
import { FormikProps } from "formik";

interface ICFDirectoriesInputGroup {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
  index: number;
}

export default function CFDirectoriesInputGroup({
  formik,
  disabled,
  index,
}: ICFDirectoriesInputGroup): ReactElement {
  return (
    <div className="flex w-full  gap-4 rounded-md border border-light-100 p-4 shadow-sm">
      <CFDirectoriesSelectInput
        type="host"
        formik={formik}
        index={index}
        labelName="Host Directory:"
        labelInfoTip="Select a directory on your host machine to share with the environment."
        classNameContainer="w-full"
        inputError={
          // @ts-ignore
          formik.errors.directories?.hostDirectories?.[index]?.hostDirectory
        }
        inputTouched={true}
      />
      <CFDirectoriesSelectInput
        type="mount"
        formik={formik}
        index={index}
        labelName="Mount Path:"
        labelInfoTip="Select a directory on your host machine to share with the environment."
        classNameContainer="w-full"
        rightTip
        inputError={
          // @ts-ignore
          formik.errors.directories?.hostDirectories?.[index]?.mountPath
        }
        inputTouched={true}
      />
      <div className="flex items-center justify-center pt-3 text-sm text-light-800">
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
