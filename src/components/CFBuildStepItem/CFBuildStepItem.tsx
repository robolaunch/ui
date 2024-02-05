import CFBuildStepItemAccordionHeader from "../CFBuildStepItemAccordionHeader/CFBuildStepItemAccordionHeader";
import CFDeleteBuildButton from "../CFDeleteBuildButton/CFDeleteBuildButton";
import { IBuildStep } from "../../interfaces/robotInterfaces";
import CFBuildWorkspace from "../CFBuildWorkspace/CFBuildWorkspace";
import CFBuildStepName from "../CFBuildStepName/CFBuildStepName";
import CFBuildScope from "../CFBuildScope/CFBuildScope";
import CFCodeType from "../CFCodeType/CFCodeType";
import Accordion from "../Accordion/AccordionV2";
import { FormikProps } from "formik/dist/types";
import { ReactElement, useState } from "react";
import CFCode from "../CFCode/CFCode";
import { IEnvironmentStep3 } from "../../interfaces/environment/environment.step3.interface";
import { useAppSelector } from "../../hooks/redux";

interface ICFBuildStepItem {
  formik: FormikProps<IEnvironmentStep3>;
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

  const { applicationMode } = useAppSelector((state) => state.user);

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

        {!applicationMode && (
          <CFBuildWorkspace formik={formik} buildStepIndex={buildStepIndex} />
        )}

        <CFCodeType formik={formik} buildStepIndex={buildStepIndex} />

        <CFCode formik={formik} buildStepIndex={buildStepIndex} />

        <CFBuildScope formik={formik} buildStepIndex={buildStepIndex} />

        <CFDeleteBuildButton formik={formik} buildStepIndex={buildStepIndex} />
      </div>
    </Accordion>
  );
}
