import FormInputRange from "../FormInputRange/FormInputRange";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import { ReactElement } from "react";

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
      label={`Storage (${formik?.values?.resources.storage.allocatedCapacity} GB):`}
      tip={`You can determine how much storage space will be allocated for your application or robot here.`}
      dataTut="create-robot-step1-storage"
      InputProps={formik.getFieldProps("resources.storage.allocatedCapacity")}
      min={20}
      max={100}
      disabled={formik.isSubmitting || disabled}
      error={formik.errors.resources?.storage?.allocatedCapacity}
      touched={formik.touched.resources?.storage?.allocatedCapacity}
    />
  );
}
