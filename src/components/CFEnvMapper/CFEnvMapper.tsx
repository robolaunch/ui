import { Fragment, ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import CreateRobotFormEnvItem from "../CreateRobotFormEnvItem/CreateRobotFormEnvItem";
import CFAddEnvButton from "../CFAddEnvButton/CFAddEnvButton";
import { FormikProps } from "formik/dist/types";
import { IEnvironmentStep4LaunchStep } from "../../interfaces/environment/environment.step4.interface";

interface ICFEnvMapper {
  formik: FormikProps<IEnvironmentStep4LaunchStep>;
  disabled?: boolean;
}

export default function CFEnvMapper({
  formik,
  disabled,
}: ICFEnvMapper): ReactElement {
  return (
    <CFInfoBar
      label="Environment Variables:"
      tip="Type Environment Variables"
      dataTut="create-robot-step4-environments"
      vertical
      error={formik.errors.robotLmEnvs as string}
      touched={true}
    >
      <Fragment>
        {formik?.values?.robotLmEnvs?.map((_, envIndex: number) => {
          return (
            <CreateRobotFormEnvItem
              key={envIndex}
              formik={formik}
              envIndex={envIndex}
              disabled={disabled || formik?.isSubmitting}
            />
          );
        })}
        <CFAddEnvButton formik={formik} disabled={disabled} />
      </Fragment>
    </CFInfoBar>
  );
}
