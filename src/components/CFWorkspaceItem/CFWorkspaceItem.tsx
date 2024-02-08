import CFWorkspaceItemAccordionHeader from "../CFWorkspaceItemAccordionHeader/CFWorkspaceItemAccordionHeader";
import CFDeleteWorkspaceButton from "../CFDeleteWorkspaceButton/CFDeleteWorkspaceButton";
import CFWorkspaceNameDistro from "../CFWorkspaceNameDistro/CFWorkspaceNameDistro";
import CFRepositoryMapper from "../CFRepositoryMapper/CFRepositoryMapper";
import Accordion from "../Accordion/AccordionV2";
import { FormikProps } from "formik/dist/types";
import { ReactElement, useState } from "react";
import CFSection from "../CFSection/CFSection";
import {
  IEnvironmentStep2,
  IEnvironmentStep2Workspace,
} from "../../interfaces/environment/environment.step2.interface";

interface ICFWorkspaceItem {
  formik: FormikProps<IEnvironmentStep2>;
  workspace: IEnvironmentStep2Workspace;
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

        <CFRepositoryMapper
          formik={formik}
          workspaceIndex={workspaceIndex}
          disabled={isImportRobot}
        />

        <CFDeleteWorkspaceButton
          formik={formik}
          workspaceIndex={workspaceIndex}
          disabled={disabled}
        />
      </div>
    </Accordion>
  );
}
