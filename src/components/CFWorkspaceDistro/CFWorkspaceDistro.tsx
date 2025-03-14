import { Fragment, ReactElement } from "react";
import FormInputSelect from "../FormInputSelect/FormInputSelect";
import { FormikProps } from "formik/dist/types";
import { stringCapitalization } from "../../functions/general.function";
import { IEnvironmentStep2 } from "../../interfaces/environment/environment.step2.interface";
import useMain from "../../hooks/useMain";

interface ICFWorkspaceDistro {
  formik: FormikProps<IEnvironmentStep2>;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CFWorkspaceDistro({
  formik,
  workspaceIndex,
  disabled,
}: ICFWorkspaceDistro): ReactElement {
  const { robotData } = useMain();

  return (
    <FormInputSelect
      dataTut="create-robot-step2-workspace-distro"
      labelName="Workspace Distro:"
      tip="Select a workspace ROS 2 distro."
      disabled={formik.isSubmitting}
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
          {robotData.step1.services.ros.rosDistros?.map(
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
