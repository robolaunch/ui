/* eslint-disable react-hooks/exhaustive-deps */
import { ReactElement, useState } from "react";
import CFSection from "../CFSection/CFSection";
import { FormikProps } from "formik/dist/types";
import Accordion from "../Accordion/AccordionV2";
import CFRepositoryName from "../CFRepositoryName/CFRepositoryName";
import { IWorkspace, IWorkspaces } from "../../interfaces/robotInterfaces";
import CFRepositoryURLBranch from "../CFRepositoryURLBranch/CFRepositoryURLBranch";
import CFDeleteRepositoryButton from "../CFDeleteRepositoryButton/CFDeleteRepositoryButton";
interface ICFRepositoryItem {
  formik: FormikProps<IWorkspaces>;
  repository: IWorkspace;
  repositoryIndex: number;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CFRepositoryItem({
  formik,
  repository,
  repositoryIndex,
  workspaceIndex,
  disabled,
}: ICFRepositoryItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(true);

  return (
    <Accordion
      key={repositoryIndex}
      id={repositoryIndex}
      isOpen={isShowAccordion}
      handleOpen={() => setIsShowAccordion(!isShowAccordion)}
      header={
        <span className="font-medium">
          {repository.name
            ? repository?.name + " Repository"
            : `Repository ${repositoryIndex + 1}`}
        </span>
      }
    >
      <div className="flex flex-col gap-2 p-2">
        <CFSection>
          <CFRepositoryName
            formik={formik}
            workspaceIndex={workspaceIndex}
            repositoryIndex={repositoryIndex}
            disabled={disabled}
          />
        </CFSection>

        <CFSection>
          <CFRepositoryURLBranch
            formik={formik}
            repositoryIndex={repositoryIndex}
            workspaceIndex={workspaceIndex}
            disabled={disabled}
          />
        </CFSection>

        <CFDeleteRepositoryButton
          formik={formik}
          workspaceIndex={workspaceIndex}
          repositoryIndex={repositoryIndex}
        />
      </div>
    </Accordion>
  );
}
