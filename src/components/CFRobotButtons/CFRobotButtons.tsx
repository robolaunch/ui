import CFCancelButton from "../CFCancelButton/CFCancelButton";
import { envApplication } from "../../helpers/envProvider";
import useCreateRobot from "../../hooks/useCreateRobot";
import { useParams } from "react-router-dom";
import Button from "../Button/Button";
import { ReactElement } from "react";

interface ICFRobotButtons {
  step: 1 | 2 | 3 | 4;
  formik: any;
  isImportRobot?: boolean;
}

export default function CFRobotButtons({
  step,
  formik,
  isImportRobot,
}: ICFRobotButtons): ReactElement {
  const url = useParams();

  const { robotData } = useCreateRobot();

  function handleDisabled(): boolean {
    switch (step) {
      case 1:
        return (
          !formik.isValid ||
          formik.isSubmitting ||
          JSON.stringify(formik.initialValues) === JSON.stringify(formik.values)
        );

      case 2:
        return !!(
          !formik?.isValid ||
          formik.isSubmitting ||
          JSON.stringify(formik.initialValues) ===
            JSON.stringify(formik.values) ||
          (envApplication && url?.robotName)
        );

      case 3:
        return (
          !formik?.isValid ||
          formik.isSubmitting ||
          JSON.stringify(formik.initialValues) === JSON.stringify(formik.values)
        );
      case 4:
        return !formik?.isValid || formik.isSubmitting;
    }
  }

  function handleText(): string {
    switch (step) {
      case 1:
        return isImportRobot ? "Update Robot" : `Next Step`;

      case 2:
        return isImportRobot
          ? "Update Robot"
          : robotData?.step1?.isDevelopmentMode
          ? envApplication
            ? "Create Application with Workspaces"
            : "Create Robot"
          : "Next Step";

      case 3:
        return isImportRobot ? `Update Build Configration` : `Next Step`;

      case 4:
        return url?.robotName ? `Add Launch Step` : `Create Robot`;
    }
  }

  return (
    <div className="mt-10 flex gap-2">
      {!isImportRobot && <CFCancelButton disabled={formik?.isSubmitting} />}
      <Button
        type="submit"
        className="!h-11 text-xs"
        disabled={handleDisabled()}
        loading={formik?.isSubmitting}
        text={handleText()}
      />
    </div>
  );
}
