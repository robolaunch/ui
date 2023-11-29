import { IBuildStep, IBuildSteps } from "../../interfaces/robotInterfaces";
import CFBuildStepItemAccordionHeader from "../CFBuildStepItemAccordionHeader/CFBuildStepItemAccordionHeader";
import CFDeleteBuildButton from "../CFDeleteBuildButton/CFDeleteBuildButton";
import CFBuildStepName from "../CFBuildStepName/CFBuildStepName";
import CFBuildWorkspace from "../CFBuildWorkspace/CFBuildWorkspace";
import React, { ReactElement, useState } from "react";
import CFCodeType from "../CFCodeType/CFCodeType";
import Accordion from "../Accordion/AccordionV2";
import { FormikProps } from "formik/dist/types";
import CFCode from "../CFCode/CFCode";
import CFBuildScope from "../CFBuildScope/CFBuildScope";

interface ICFBuildStepItem {
  formik: FormikProps<IBuildSteps>;
  buildStepIndex: number;
  buildStep: IBuildStep;
  isImportRobot?: boolean;
}

export default function CFBuildStepItem({
  buildStepIndex,
  buildStep,
  formik,
  isImportRobot,
}: ICFBuildStepItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(true);

  return (
    <Accordion
      key={buildStepIndex}
      id={buildStepIndex}
      isOpen={isShowAccordion}
      handleOpen={() => setIsShowAccordion(!isShowAccordion)}
      header={
        <CFBuildStepItemAccordionHeader
          buildStep={buildStep}
          buildStepIndex={buildStepIndex}
          isImportRobot={isImportRobot}
        />
      }
    >
      <div className="flex flex-col gap-2 p-4">
        <CFBuildStepName formik={formik} buildStepIndex={buildStepIndex} />

        <CFBuildWorkspace formik={formik} buildStepIndex={buildStepIndex} />

        <CFCodeType formik={formik} buildStepIndex={buildStepIndex} />

        <CFCode formik={formik} buildStepIndex={buildStepIndex} />

        <CFBuildScope formik={formik} buildStepIndex={buildStepIndex} />

        <CFDeleteBuildButton formik={formik} buildStepIndex={buildStepIndex} />
      </div>
    </Accordion>
  );
}
