import FormInputRange from "../FormInputRange/FormInputRange";
import { FormikProps } from "formik/dist/types";
import { ReactElement } from "react";
import { IEnvironmentStep1 } from "../../interfaces/envitonment.step1.interface";

interface ICFStorageRange {
  formik: FormikProps<IEnvironmentStep1>;
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
