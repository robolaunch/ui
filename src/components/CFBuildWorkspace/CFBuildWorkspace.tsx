import React, { Fragment } from "react";
import FormInputSelect from "../FormInputSelect/FormInputSelect";
import { IWorkspace } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import useCreateRobot from "../../hooks/useCreateRobot";
import { IEnvironmentStep3 } from "../../interfaces/environment/environment.step3.interface";

interface ICFBuildWorkspace {
  formik: FormikProps<IEnvironmentStep3>;
  buildStepIndex: number;
}

export default function CFBuildWorkspace({
  formik,
  buildStepIndex,
}: ICFBuildWorkspace): React.ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <FormInputSelect
      dataTut="create-robot-build-step-workspace"
      labelName="Workspace:"
      tip="Select a workspace name."
      inputError={
        // @ts-ignore
        formik?.errors?.steps?.[buildStepIndex]?.workspace
      }
      inputTouched={formik?.touched?.steps?.[buildStepIndex]?.workspace}
      inputProps={formik.getFieldProps(`steps.${buildStepIndex}.workspace`)}
      options={
        <Fragment>
          {!formik?.values?.steps[buildStepIndex]?.workspace && (
            <option value=""></option>
          )}
          {robotData?.step2?.workspaces?.map(
            (workspace: IWorkspace, index: number) => (
              <option key={index} value={workspace.name}>
                {workspace.name}
              </option>
            ),
          )}
        </Fragment>
      }
    />
  );
}
