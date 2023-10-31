import React, { ReactElement } from "react";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { IRobotLaunchStep } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICFAddEnvButton {
  formik: FormikProps<IRobotLaunchStep>;
  disabled?: boolean;
}

export default function CFAddEnvButton({
  formik,
  disabled,
}: ICFAddEnvButton): ReactElement {
  const { handleAddENVToLaunchStep } = useCreateRobot();

  return (
    <div data-tut="create-robot-step4-environments-add-button">
      <CreateRobotFormAddButton
        onClick={() => handleAddENVToLaunchStep(formik)}
        disabled={disabled || formik?.isSubmitting}
      />
    </div>
  );
}
