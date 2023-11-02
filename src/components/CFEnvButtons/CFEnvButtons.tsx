import CFCancelButton from "../CFCancelButton/CFCancelButton";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import Button from "../Button/Button";
import { ReactElement } from "react";

interface ICFEnvButtons {
  formik: FormikProps<IDetails>;
  disabled?: boolean;
}

export default function CFEnvButtons({
  formik,
  disabled,
}: ICFEnvButtons): ReactElement {
  return (
    <div className="mt-10 flex gap-2">
      <CFCancelButton disabled={formik.isSubmitting || disabled} />
      <Button
        disabled={!formik.isValid || formik.isSubmitting || disabled}
        type="submit"
        className="!h-11 text-xs"
        loading={formik.isSubmitting}
        text={
          formik.values.configureWorkspace ? "Next Step" : "Create Application"
        }
      />
    </div>
  );
}
