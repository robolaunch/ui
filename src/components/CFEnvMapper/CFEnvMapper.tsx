import React, { Fragment, ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import CreateRobotFormEnvItem from "../CreateRobotFormEnvItem/CreateRobotFormEnvItem";
import CFAddEnvButton from "../CFAddEnvButton/CFAddEnvButton";
import { IRobotLaunchStep } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFEnvMapper {
  formik: FormikProps<IRobotLaunchStep>;
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
      error={!!formik.errors.robotLmEnvs}
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