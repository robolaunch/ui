import React, { Fragment, ReactElement } from "react";
import FormInputSelect from "../FormInputSelect/FormInputSelect";
import { IRobotWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import { stringCapitalization } from "../../functions/GeneralFunctions";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICFWorkspaceDistro {
  formik: FormikProps<IRobotWorkspaces>;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CFWorkspaceDistro({
  formik,
  workspaceIndex,
  disabled,
}: ICFWorkspaceDistro): ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <FormInputSelect
      dataTut="create-robot-step2-workspace-distro"
      labelName="Workspace Distro:"
      labelInfoTip="Select a workspace ROS2 distro."
      disabled={disabled}
      classNameContainer="w-60"
      inputProps={formik.getFieldProps(
        `workspaces.${workspaceIndex}.workspaceDistro`,
      )}
      inputError={
        // @ts-ignore
        formik?.errors?.workspaces?.[workspaceIndex]?.workspaceDistro
      }
      inputTouched={
        formik?.touched?.workspaces?.[workspaceIndex]?.workspaceDistro
      }
      options={
        <Fragment>
          {!formik?.values?.workspaces[workspaceIndex]?.workspaceDistro && (
            <option value=""></option>
          )}
          {robotData.step1.rosDistros?.map(
            (rosDistro: string, index: number) => {
              return (
                <option key={index} value={rosDistro} className="capitalize">
                  {stringCapitalization({
                    str: rosDistro,
                  })}
                </option>
              );
            },
          )}
        </Fragment>
      }
    />
  );
}