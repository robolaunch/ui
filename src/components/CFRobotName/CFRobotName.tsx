import { IDetails } from "../../interfaces/robotInterfaces";
import FormInputText from "../FormInputText/FormInputText";
import { ReactElement } from "react";
import { FormikProps } from "formik";

interface ICFRobotName {
  formik: FormikProps<IDetails>;
  isImportRobot?: boolean;
}

export default function CFRobotName({
  formik,
  isImportRobot,
}: ICFRobotName): ReactElement {
  return (
    <FormInputText
      dataTut="create-robot-step1-name"
      labelName="Robot Name:"
      labelInfoTip="Type a new robot name."
      inputProps={formik.getFieldProps("details.name")}
      disabled={formik.isSubmitting || isImportRobot}
      inputHoverText="You can't change robot name because this robot is created before."
      inputError={formik.errors.details?.name}
      inputTouched={formik.touched.details?.name}
    />
  );
}
