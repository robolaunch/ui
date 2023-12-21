import { Fragment, ReactElement } from "react";
import { IBuildSteps } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICFDeleteBuildButton {
  formik: FormikProps<IBuildSteps>;
  buildStepIndex: number;
}

export default function CFDeleteBuildButton({
  formik,
  buildStepIndex,
}: ICFDeleteBuildButton): ReactElement {
  const { handleRemoveStepFromBuildStep } = useCreateRobot();

  return (
    <Fragment>
      {formik.values?.robotBuildSteps?.length > 1 && (
        <CreateRobotFormDeleteButton
          onClick={() => {
            handleRemoveStepFromBuildStep(formik, buildStepIndex);
          }}
          text={`Delete ${
            formik.values.robotBuildSteps[buildStepIndex]?.name || "this"
          } Build Step`}
          disabled={formik?.isSubmitting}
        />
      )}
    </Fragment>
  );
}
