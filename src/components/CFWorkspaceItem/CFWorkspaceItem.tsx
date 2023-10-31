import React, { ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import {
  IRobotWorkspace,
  IRobotWorkspaces,
} from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import CFWorkspaceItemAccordionHeader from "../CFWorkspaceItemAccordionHeader/CFWorkspaceItemAccordionHeader";
import CFWorkspaceNameDistro from "../CFWorkspaceNameDistro/CFWorkspaceNameDistro";
import CFSection from "../CFSection/CFSection";
import CFDeleteWorkspaceButton from "../CFDeleteWorkspaceButton/CFDeleteWorkspaceButton";
import CFRepositoryMapper from "../CFRepositoryMapper/CFRepositoryMapper";

interface ICFWorkspaceItem {
  formik: FormikProps<IRobotWorkspaces>;
  workspace: IRobotWorkspace;
  workspaceIndex: number;
  workspaceState: string[];
  disabled?: boolean;
  isImportRobot?: boolean;
}

export default function CFWorkspaceItem({
  formik,
  workspace,
  workspaceIndex,
  workspaceState,
  disabled,
  isImportRobot,
}: ICFWorkspaceItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(true);

  return (
    <Accordion
      key={workspaceIndex}
      id={workspaceIndex}
      isOpen={isShowAccordion}
      handleOpen={() => {
        setIsShowAccordion(!isShowAccordion);
      }}
      header={
        <CFWorkspaceItemAccordionHeader
          workspace={workspace}
          workspaceIndex={workspaceIndex}
          workspaceState={workspaceState}
        />
      }
    >
      <div className="flex flex-col gap-2 p-2">
        <CFSection>
          <CFWorkspaceNameDistro
            formik={formik}
            workspaceIndex={workspaceIndex}
            disabled={disabled}
          />
        </CFSection>

        <CFRepositoryMapper formik={formik} workspaceIndex={workspaceIndex} />

        <CFDeleteWorkspaceButton
          formik={formik}
          workspaceIndex={workspaceIndex}
        />
      </div>
    </Accordion>
  );
}
