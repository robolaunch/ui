import { ReactElement } from "react";
import CFAddButton from "../CFAddButton/CFAddButton";
import { FormikProps } from "formik/dist/types";
import { handleAddEnv } from "../../functions/form.env.function";
import { IEnvironmentStep4LaunchStep } from "../../interfaces/environment/environment.step4.interface";

interface ICFAddEnvButton {
  formik: FormikProps<IEnvironmentStep4LaunchStep>;
  disabled?: boolean;
}

export default function CFAddEnvButton({
  formik,
  disabled,
}: ICFAddEnvButton): ReactElement {
  return (
    <div data-tut="create-robot-step4-environments-add-button">
      <CFAddButton
        // @ts-ignore
        onClick={() => handleAddEnv(formik)}
        disabled={disabled || formik?.isSubmitting}
      />
    </div>
  );
}
