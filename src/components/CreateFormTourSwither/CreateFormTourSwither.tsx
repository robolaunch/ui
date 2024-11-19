import CreateEnvironmentFormStep1Tour from "../CreateEnvironmentFormStep1Tour/CreateEnvironmentFormStep1Tour";
import CreateRobotFormStep1Tour from "../CreateRobotFormStep1Tour/CreateRobotFormStep1Tour";
import CreateFormStep3Tour from "../CreateFormStep3Tour/CreateFormStep3Tour";
import CreateFormStep2Tour from "../CreateFormStep2Tour/CreateFormStep2Tour";
import CreateFormStep4Tour from "../CreateFormStep4Tour/CreateFormStep4Tour";
import { Fragment, ReactElement } from "react";

interface ICreateFormTourSwither {
  isLoading?: boolean;
  type:
    | "step1-robot-development"
    | "step1-robot-deploy"
    | "step1-app"
    | "workspace"
    | "build"
    | "launch";
}

export default function CreateFormTourSwither({
  isLoading,
  type,
}: ICreateFormTourSwither): ReactElement {
  return (
    <Fragment>
      {(() => {
        if (!isLoading) {
          switch (type) {
            case "step1-robot-development":
              return <CreateRobotFormStep1Tour />;
            case "step1-app":
              return <CreateEnvironmentFormStep1Tour />;
            case "workspace":
              return <CreateFormStep2Tour />;
            case "build":
              return <CreateFormStep3Tour />;
            case "launch":
              return <CreateFormStep4Tour />;
          }
        }
      })()}
    </Fragment>
  );
}
