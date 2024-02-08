import { ReactElement } from "react";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { FormikProps } from "formik/dist/types";
import { handleAddBuild } from "../../functions/form.build.function";
import { IEnvironmentStep3 } from "../../interfaces/environment/environment.step3.interface";

interface ICFAddBuildButton {
  formik: FormikProps<IEnvironmentStep3>;
}

export default function CFAddBuildButton({
  formik,
}: ICFAddBuildButton): ReactElement {
  return (
    <div data-tut="create-robot-step3-build-add-button">
      <CreateRobotFormAddButton
        onClick={() => handleAddBuild(formik)}
        disabled={formik?.isSubmitting}
      />
    </div>
  );
}
