import { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik/dist/types";
import { IEnvironmentStep2 } from "../../interfaces/environment/environment.step2.interface";

interface ICFWorkspaceName {
  formik: FormikProps<IEnvironmentStep2>;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CFWorkspaceName({
  formik,
  workspaceIndex,
  disabled,
}: ICFWorkspaceName): ReactElement {
  return (
    <FormInputText
      dataTut="create-robot-step2-workspace-name"
      labelName="Workspace Name:"
      labelInfoTip="You can specify the name of your workspace here."
      placeholder="ros2_ws"
      inputProps={formik.getFieldProps(`workspaces.${workspaceIndex}.name`)}
      classNameContainer="w-full"
      disabled={formik.isSubmitting}
      inputError={
        // @ts-ignore
        formik?.errors?.workspaces?.[workspaceIndex]?.name
      }
      inputTouched={formik?.touched?.workspaces?.[workspaceIndex]?.name}
      inputHoverText="You can specify the name of your workspace here.

"
    />
  );
}
