import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import { envOnPremiseRobot } from "../../helpers/envProvider";
import FormInputRange from "../FormInputRange/FormInputRange";
import { FormikProps } from "formik/dist/types";
import React, { ReactElement } from "react";

interface ICFStorageRange {
  formik: FormikProps<IRobotStep1>;
  disabled?: boolean;
}

export default function CFStorageRange({
  formik,
  disabled,
}: ICFStorageRange): ReactElement {
  return (
    <FormInputRange
      label={`${envOnPremiseRobot ? "Application" : "Robot"} Storage (${formik
        ?.values?.robotStorage} GB):`}
      tip={`Storage is the amount of disk space available to the ${
        envOnPremiseRobot ? "application" : "robot"
      }. This is where the ${
        envOnPremiseRobot ? "application" : "robot"
      }'s files and data are stored. The storage is persistent, meaning that it will not be deleted when the ${
        envOnPremiseRobot ? "application" : "robot"
      } is shut down. If you need more storage, you can not upgrade it later. You will need to create a new ${
        envOnPremiseRobot ? "application" : "robot"
      } with the desired storage size.`}
      dataTut="create-robot-step1-storage"
      InputProps={formik.getFieldProps("robotStorage")}
      min={20}
      max={100}
      disabled={formik.isSubmitting || disabled}
    />
  );
}
