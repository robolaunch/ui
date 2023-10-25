/* eslint-disable react-hooks/exhaustive-deps */
import React, { ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import {
  IRobotWorkspace,
  IRobotWorkspaces,
} from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import useCreateRobot from "../../hooks/useCreateRobot";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import FormInputText from "../FormInputText/FormInputText";
import CreateFormBrachInput from "../CreateFormBranchInput/CreateFormBranchInput";
interface ICreateRobotFormRepositoryItem {
  formik: FormikProps<IRobotWorkspaces>;
  repository: IRobotWorkspace;
  repositoryIndex: number;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CreateRobotFormRepositoryItem({
  formik,
  repository,
  repositoryIndex,
  workspaceIndex,
  disabled,
}: ICreateRobotFormRepositoryItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(true);

  const { handleRemoveRepositoryFromWorkspaceStep } = useCreateRobot();

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
        {/* RepositoryName */}
        <FormInputText
          dataTut="create-robot-step2-workspace-repository-name"
          labelName="Repository Name:"
          labelInfoTip="Type a repository name."
          inputProps={formik.getFieldProps(
            `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.name`,
          )}
          disabled={disabled}
          inputError={
            // @ts-ignore
            formik?.errors?.workspaces?.[workspaceIndex]?.robotRepositories?.[
              repositoryIndex
            ]?.name
          }
          inputTouched={
            formik?.touched?.workspaces?.[workspaceIndex]?.robotRepositories?.[
              repositoryIndex
            ]?.name
          }
        />
        {/* RepositoryName */}

        <div className="flex w-full gap-2">
          {/* Repository URL */}
          <FormInputText
            dataTut="create-robot-step2-workspace-repository-url"
            labelName="Repository URL:"
            labelInfoTip="Type a repository URL."
            inputProps={formik.getFieldProps(
              `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.url`,
            )}
            disabled={disabled}
            inputError={
              //prettier-ignore
              // @ts-ignore
              formik?.errors?.workspaces?.[workspaceIndex]?.robotRepositories?.[repositoryIndex]?.url
            }
            inputTouched={
              formik?.touched?.workspaces?.[workspaceIndex]
                ?.robotRepositories?.[repositoryIndex]?.url
            }
          />
          {/* Repository URL */}

          {/* Repository Branch */}
          <CreateFormBrachInput
            formik={formik}
            repositoryIndex={repositoryIndex}
            workspaceIndex={workspaceIndex}
            disabled={disabled}
          />
          {/* Repository Branch */}
        </div>

        <div
          data-tut="create-robot-step2-workspace-repository-delete-button"
          className="flex items-center"
        >
          <CreateRobotFormDeleteButton
            disabled={
              formik.values?.workspaces?.[workspaceIndex]?.robotRepositories
                ?.length > 1
                ? false
                : true
            }
            onClick={() => {
              handleRemoveRepositoryFromWorkspaceStep(
                formik,
                workspaceIndex,
                repositoryIndex,
              );
            }}
            text={`Delete ${
              repository?.name ? repository.name : "this"
            } Repository`}
          />
        </div>
      </div>
    </Accordion>
  );
}
