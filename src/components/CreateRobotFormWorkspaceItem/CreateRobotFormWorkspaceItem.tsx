import React, { Fragment, ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import {
  IRobotWorkspace,
  IRobotWorkspaces,
} from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import CreateRobotFormRepositoryItem from "../CreateRobotFormRepositoryItem/CreateRobotFormRepositoryItem";
import useCreateRobot from "../../hooks/useCreateRobot";
import { stringCapitalization } from "../../functions/GeneralFunctions";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { envOnPremiseRobot } from "../../helpers/envProvider";
import CreateRobotWorkspaceItemAccordionHeader from "../CreateRobotWorkspaceItemAccordionHeader/CreateRobotWorkspaceItemAccordionHeader";
import FormInputText from "../FormInputText/FormInputText";
import FormInputSelect from "../FormInputSelect/FormInputSelect";

interface ICreateRobotFormWorkspaceItem {
  formik: FormikProps<IRobotWorkspaces>;
  workspace: IRobotWorkspace;
  workspaceIndex: number;
  workspaceState: string[];
  disabled?: boolean;
  isImportRobot?: boolean;
}

export default function CreateRobotFormWorkspaceItem({
  formik,
  workspace,
  workspaceIndex,
  workspaceState,
  disabled,
  isImportRobot,
}: ICreateRobotFormWorkspaceItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(true);

  const {
    robotData,
    handleAddRepositoryToWorkspaceStep,
    handleRemoveWorkspaceStep,
  } = useCreateRobot();

  return (
    <Accordion
      key={workspaceIndex}
      id={workspaceIndex}
      isOpen={isShowAccordion}
      handleOpen={() => {
        setIsShowAccordion(!isShowAccordion);
      }}
      header={
        <CreateRobotWorkspaceItemAccordionHeader
          workspace={workspace}
          workspaceIndex={workspaceIndex}
          workspaceState={workspaceState}
        />
      }
    >
      <div className="flex flex-col gap-2 p-2">
        <div className="flex gap-2">
          <FormInputText
            dataTut="create-robot-step2-workspace-name"
            labelName="Workspace Name:"
            labelInfoTip="Type a workspace name."
            inputProps={formik.getFieldProps(
              `workspaces.${workspaceIndex}.name`,
            )}
            classNameContainer="w-full"
            disabled={disabled}
            inputError={
              // @ts-ignore
              formik?.errors?.workspaces?.[workspaceIndex]?.name
            }
            inputTouched={formik?.touched?.workspaces?.[workspaceIndex]?.name}
            inputHoverText="Type a workspace name."
          />

          {!envOnPremiseRobot && (
            <FormInputSelect
              dataTut="create-robot-step2-workspace-distro"
              labelName="Workspace Distro:"
              labelInfoTip="Select a workspace ROS2 distro."
              disabled={disabled}
              classNameContainer="w-60"
              inputProps={formik.getFieldProps(
                `workspaces.${workspaceIndex}.workspaceDistro`,
              )}
              inputError={
                // @ts-ignore
                formik?.errors?.workspaces?.[workspaceIndex]?.workspaceDistro
              }
              inputTouched={
                formik?.touched?.workspaces?.[workspaceIndex]?.workspaceDistro
              }
              options={
                <Fragment>
                  {!formik?.values?.workspaces[workspaceIndex]
                    ?.workspaceDistro && <option value=""></option>}
                  {robotData.step1.rosDistros?.map(
                    (rosDistro: string, index: number) => {
                      return (
                        <option
                          key={index}
                          value={rosDistro}
                          className="capitalize"
                        >
                          {stringCapitalization({
                            str: rosDistro,
                          })}
                        </option>
                      );
                    },
                  )}
                </Fragment>
              }
            />
          )}
        </div>
        <div
          className="flex flex-col gap-3 p-2"
          data-tut="create-robot-step2-workspace-repositories"
        >
          <span className="mx-auto text-[0.75rem] font-medium">
            Workspace Repositories
          </span>
          <span className="h-[2px] w-full bg-primary" />
          {formik.values.workspaces[workspaceIndex]?.robotRepositories?.map(
            (repository: any, repositoryIndex: number) => (
              <CreateRobotFormRepositoryItem
                key={repositoryIndex}
                formik={formik}
                workspaceIndex={workspaceIndex}
                repositoryIndex={repositoryIndex}
                repository={repository}
              />
            ),
          )}
          <div data-tut="create-robot-step2-repository-add-button">
            <CreateRobotFormAddButton
              onClick={() =>
                handleAddRepositoryToWorkspaceStep(formik, workspaceIndex)
              }
              disabled={formik.isSubmitting}
            />
          </div>
        </div>
        <div
          className="flex items-center"
          data-tut="create-robot-step2-workspace-delete-button"
        >
          <CreateRobotFormDeleteButton
            disabled={robotData?.step2?.workspaces?.length > 1 ? false : true}
            onClick={() => {
              handleRemoveWorkspaceStep(formik, workspaceIndex);
            }}
            text={`Delete ${
              workspace?.name ? workspace.name : "this"
            } Workspace`}
          />
        </div>
      </div>
    </Accordion>
  );
}
