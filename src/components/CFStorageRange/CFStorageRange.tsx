import { ReactElement } from "react";
import { FormikProps } from "formik/dist/types";
import { IDetails } from "../../interfaces/robotInterfaces";
import FormInputRange from "../FormInputRange/FormInputRange";

interface ICFStorageRange {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFStorageRange({
  formik,
  disabled,
}: ICFStorageRange): ReactElement {
  return (
    <FormInputRange
      label={`Storage (${formik?.values?.robotStorage} GB):`}
      tip={`You can determine how much storage space will be allocated for your application or robot here.`}
      dataTut="create-robot-step1-storage"
      InputProps={formik.getFieldProps("robotStorage")}
      min={20}
      max={100}
      disabled={formik.isSubmitting || disabled}
    />
  );
}
