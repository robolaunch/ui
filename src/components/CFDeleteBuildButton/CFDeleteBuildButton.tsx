import { Fragment, ReactElement } from "react";
import { FormikProps } from "formik/dist/types";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import useCreateRobot from "../../hooks/useCreateRobot";
import { IEnvironmentStep3 } from "../../interfaces/environment/environment.step3.interface";

interface ICFDeleteBuildButton {
  formik: FormikProps<IEnvironmentStep3>;
  buildStepIndex: number;
}

export default function CFDeleteBuildButton({
  formik,
  buildStepIndex,
}: ICFDeleteBuildButton): ReactElement {
  const { handleRemoveStepFromBuildStep } = useCreateRobot();

  return (
    <Fragment>
      {formik.values?.steps?.length > 1 && (
        <CreateRobotFormDeleteButton
          onClick={() => {
            handleRemoveStepFromBuildStep(formik, buildStepIndex);
          }}
          text={`Delete ${
            formik.values.steps?.[buildStepIndex]?.name || "this"
          } Build Step`}
          disabled={formik?.isSubmitting}
        />
      )}
    </Fragment>
  );
}
