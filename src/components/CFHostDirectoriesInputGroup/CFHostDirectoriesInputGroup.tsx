import CFDirectoriesSelectInput from "../CFDirectoriesSelectInput/CFDirectoriesSelectInput";
import CFDellButton from "../CFDellButton/CFDellButton";
import { ReactElement, useEffect, useState } from "react";
import { FormikProps } from "formik";
import FormInputText from "../FormInputText/FormInputText";
import useFunctions from "../../hooks/useFunctions";
import useMain from "../../hooks/useMain";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";

interface ICFDirectoriesInputGroup {
  formik: FormikProps<IEnvironmentStep1>;
  disabled?: boolean;
  index: number;
}

export default function CFDirectoriesInputGroup({
  formik,
  disabled,
  index,
}: ICFDirectoriesInputGroup): ReactElement {
  const { getFilesFromFileManager: getHealthFromFileManager } = useFunctions();
  const [isFileManagerHealthly, setIsFileManagerHealthly] =
    useState<boolean>(true);

  useEffect(() => {
    handleGetHealthFromFileManager();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { selectedState } = useMain();

  async function handleGetHealthFromFileManager() {
    const { items: response } = await getHealthFromFileManager({
      instanceIP: `https://${selectedState?.instance?.endpoint!}/host`,
    });

    setIsFileManagerHealthly(response?.length > 0);
  }

  useEffect(() => {
    console.log("!!!!!!!!!", formik.values.directories?.hostDirectories?.[0]);
  }, [formik]);

  return (
    <div className="flex w-full  gap-4 rounded-md border border-light-100 p-4 shadow-sm">
      {isFileManagerHealthly ? (
        <CFDirectoriesSelectInput
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
      ) : (
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
          classNameContainer="w-full"
        />
      )}

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
        classNameContainer="w-full"
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
