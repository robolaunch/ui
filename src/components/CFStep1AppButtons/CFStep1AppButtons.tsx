import CFCancelButton from "../CFCancelButton/CFCancelButton";
import Button from "../Button/Button";
import { ReactElement } from "react";
import useForm from "../../hooks/useForm";
import useMain from "../../hooks/useMain";

interface ICFStep1AppButtons {
  disabled?: boolean;
  isImportRobot?: boolean;
}

export default function CFStep1AppButtons({
  disabled,
  isImportRobot,
}: ICFStep1AppButtons): ReactElement {
  const { step1AppFormik, step3Formik } = useForm();
  const { robotData } = useMain();

  const formiks = {
    isInitialValues:
      JSON.stringify(robotData.step1) ===
        JSON.stringify(step1AppFormik.initialValues) &&
      JSON.stringify(robotData.step3) ===
        JSON.stringify(step3Formik.initialValues),
    isSubmitting: step1AppFormik.isSubmitting || step3Formik.isSubmitting,
    isInvalid: !step1AppFormik.isValid || !step3Formik.isValid,
  };

  return (
    <div className="mt-10 flex gap-2">
      {!isImportRobot && (
        <CFCancelButton disabled={formiks.isSubmitting || disabled} />
      )}
      <Button
        disabled={
          formiks.isInitialValues ||
          formiks.isInvalid ||
          formiks.isSubmitting ||
          disabled
        }
        type="submit"
        className="!h-11 text-xs"
        loading={formiks.isSubmitting}
        text={isImportRobot ? "Update Application" : "Create Application"}
      />
    </div>
  );
}
