import FormInputText from "../FormInputText/FormInputText";
import { ReactElement } from "react";
import { FormikProps } from "formik";
import { IEnvironmentStep1 } from "../../interfaces/envitonment.step1.interface";

interface ICFRobotName {
  formik: FormikProps<IEnvironmentStep1>;
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
      inputProps={{
        ...formik.getFieldProps("details.name"),
        inputPlaceholder: "robolaunch-robot",
      }}
      disabled={formik.isSubmitting || isImportRobot}
      inputHoverText="You can't change robot name because this robot is created before."
      inputError={formik.errors.details?.name}
      inputTouched={formik.touched.details?.name}
    />
  );
}
