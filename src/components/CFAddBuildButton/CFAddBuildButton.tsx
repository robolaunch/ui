import React, { ReactElement } from "react";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { IRobotBuildSteps } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICFAddBuildButton {
  formik?: FormikProps<IRobotBuildSteps>;
}

export default function CFAddBuildButton({
  formik,
}: ICFAddBuildButton): ReactElement {
  const { handleAddStepToBuildStep } = useCreateRobot();

  return (
    <div data-tut="create-robot-step3-build-add-button">
      <CreateRobotFormAddButton
        onClick={() => handleAddStepToBuildStep(formik)}
        disabled={formik?.isSubmitting}
      />
    </div>
  );
}
