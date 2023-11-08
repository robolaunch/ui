import { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";

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
  console.log("formik.getFieldProps", formik.values.hostDirectories);

  return (
    <div className="flex w-full  rounded-md border border-layer-light-100 p-4">
      <FormInputText
        labelName="Host Directory:"
        labelInfoTip="Type a host directory."
        inputProps={formik.getFieldProps(
          `hostDirectories.${index}.hostDirectory`,
        )}
        disabled={disabled}
        inputError={
          // @ts-ignore
          formik.errors.hostDirectories?.[index]?.hostDirectory
        }
        inputTouched={formik.touched.hostDirectories?.[index]?.hostDirectory}
      />

      <FormInputText
        labelName="Mount Path:"
        labelInfoTip="Type a mount path."
        inputProps={formik.getFieldProps(`hostDirectories.${index}.mountPath`)}
        disabled={disabled}
        inputError={
          // @ts-ignore
          formik.errors.hostDirectories?.[index]?.mountPath
        }
        inputTouched={formik.touched.hostDirectories?.[index]?.mountPath}
      />

      <div className="flex items-center justify-center text-sm text-layer-light-800">
        <CreateRobotFormDeleteButton
          text="Delete"
          onClick={() => {
            const hostDirectories = [...formik.values.hostDirectories];
            hostDirectories.splice(index, 1);
            formik.setFieldValue("hostDirectories", hostDirectories);
          }}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
