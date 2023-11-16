import { ReactElement, useState } from "react";
import CFSection from "../CFSection/CFSection";
import { FormikProps } from "formik/dist/types";
import Accordion from "../Accordion/AccordionV2";
import CFRepositoryMapper from "../CFRepositoryMapper/CFRepositoryMapper";
import { IWorkspace, IWorkspaces } from "../../interfaces/robotInterfaces";
import CFWorkspaceNameDistro from "../CFWorkspaceNameDistro/CFWorkspaceNameDistro";
import CFDeleteWorkspaceButton from "../CFDeleteWorkspaceButton/CFDeleteWorkspaceButton";
import CFWorkspaceItemAccordionHeader from "../CFWorkspaceItemAccordionHeader/CFWorkspaceItemAccordionHeader";

interface ICFWorkspaceItem {
  formik: FormikProps<IWorkspaces>;
  workspace: IWorkspace;
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
