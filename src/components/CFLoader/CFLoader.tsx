import { Fragment, ReactElement } from "react";
import "react-step-progress-bar/styles.css";
import CreateFormTourSwither from "../CreateFormTourSwither/CreateFormTourSwither";
import CFLoading from "../CFLoading/CFLoading";
interface ICFLoader {
  type: "step1-robot" | "step1-app" | "workspace" | "build" | "launch";
  isLoading?: boolean;
  loadingItems?: any[];
  loadingText?: string;
  children?: ReactElement | ReactElement[];
  stepbarItems?: any[];
  currentStep?: number;
  formik?: any;
  disabledLoading?: boolean;
}

export default function CFLoader({
  type,
  isLoading,
  loadingItems,
  loadingText,
  children,
  stepbarItems,
  currentStep,
  formik,
  disabledLoading,
}: ICFLoader): ReactElement {
  return (
    <Fragment>
      {!disabledLoading && isLoading ? (
        <CFLoading
          currentStep={currentStep}
          loadingItems={loadingItems}
          loadingText={loadingText}
          stepbarItems={stepbarItems}
        />
      ) : (
        <form
          onSubmit={formik?.handleSubmit}
          className="animate-fadeIn relative flex h-full w-full flex-col gap-4"
        >
          {children}
        </form>
      )}
      <CreateFormTourSwither type={type} isLoading={isLoading} />
    </Fragment>
  );
}
