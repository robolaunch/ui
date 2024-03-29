import CFCancelButton from "../CFCancelButton/CFCancelButton";
import { FormikProps } from "formik/dist/types";
import Button from "../Button/Button";
import { ReactElement } from "react";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";

interface ICFEnvButtons {
  formik: FormikProps<IEnvironmentStep1>;
  disabled?: boolean;
  isImportRobot?: boolean;
}

export default function CFEnvButtons({
  formik,
  disabled,
  isImportRobot,
}: ICFEnvButtons): ReactElement {
  return (
    <div className="mt-10 flex gap-2">
      {!isImportRobot && (
        <CFCancelButton disabled={formik.isSubmitting || disabled} />
      )}
      <Button
        disabled={!formik.isValid || formik.isSubmitting || disabled}
        type="submit"
        className="!h-11 text-xs"
        loading={formik.isSubmitting}
        text={
          isImportRobot
            ? "Update Application"
            : formik.values.details.configureWorkspace
              ? "Next Step"
              : "Create Application"
        }
      />
    </div>
  );
}
