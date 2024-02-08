import { ReactElement } from "react";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { FormikProps } from "formik/dist/types";
import { handleAddRepository } from "../../functions/form.repository.function";
import { IEnvironmentStep2 } from "../../interfaces/environment/environment.step2.interface";

interface ICFAddRepositoryButton {
  formik: FormikProps<IEnvironmentStep2>;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CFAddRepositoryButton({
  formik,
  workspaceIndex,
  disabled,
}: ICFAddRepositoryButton): ReactElement {
  return (
    <div data-tut="create-robot-step2-repository-add-button">
      <CreateRobotFormAddButton
        onClick={() => handleAddRepository(formik, workspaceIndex)}
        disabled={formik.isSubmitting || disabled}
      />
    </div>
  );
}
