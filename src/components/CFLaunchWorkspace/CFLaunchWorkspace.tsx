import { Fragment, ReactElement } from "react";
import FormInputSelect from "../FormInputSelect/FormInputSelect";
import { FormikProps } from "formik/dist/types";
import useCreateRobot from "../../hooks/useCreateRobot";
import { IEnvironmentStep4LaunchStep } from "../../interfaces/environment/environment.step4.interface";
import { IEnvironmentStep2Workspace } from "../../interfaces/environment/environment.step2.interface";

interface ICFBuildWorkspace {
  formik: FormikProps<IEnvironmentStep4LaunchStep>;
  disabled?: boolean;
}

export default function CFLaunchWorkspace({
  formik,
  disabled,
}: ICFBuildWorkspace): ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <FormInputSelect
      labelName="Workspace:"
      tip="Select a workspace."
      dataTut="create-robot-step4-workspace"
      options={
        <Fragment>
          {!formik?.values?.workspace && <option value=""></option>}
          {robotData?.step2?.workspaces?.map(
            (workspace: IEnvironmentStep2Workspace, index: number) => (
              <option key={index} value={workspace.name}>
                {workspace.name}
              </option>
            ),
          )}
        </Fragment>
      }
      inputError={formik.errors.workspace}
      inputTouched={formik.touched.workspace}
      disabled={disabled || formik?.isSubmitting}
      inputProps={formik.getFieldProps("workspace")}
    />
  );
}
