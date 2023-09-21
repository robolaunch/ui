import React, { Fragment, ReactElement, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import {
  IRobotWorkspace,
  IRobotWorkspaces,
} from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import InputSelect from "../InputSelect/InputSelect";
import CreateRobotFormRepositoryItem from "../CreateRobotFormRepositoryItem/CreateRobotFormRepositoryItem";
import useCreateRobot from "../../hooks/useCreateRobot";
import { stringCapitalization } from "../../functions/GeneralFunctions";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import InfoTip from "../InfoTip/InfoTip";
import { envOnPremiseRobot } from "../../helpers/envProvider";
import CreateRobotWorkspaceItemAccordionHeader from "../CreateRobotWorkspaceItemAccordionHeader/CreateRobotWorkspaceItemAccordionHeader";

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
      <div className="flex flex-col gap-2 p-4">
        <div data-tut="create-robot-step2-workspace-name">
          <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
            Workspace Name:
            <InfoTip content="Type a workspace name." />
          </div>
          <InputText
            {...formik.getFieldProps(`workspaces.${workspaceIndex}.name`)}
            disabled={disabled}
          />
          <InputError
            // @ts-ignore
            error={formik?.errors?.workspaces?.[workspaceIndex]?.name}
            touched={formik?.touched?.workspaces?.[workspaceIndex]?.name}
          />
        </div>

        {!envOnPremiseRobot && (
          <div data-tut="create-robot-step2-workspace-distro">
            <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
              Workspace Distro:
              <InfoTip content="Select a workspace ros2 distro." />
            </div>
            <InputSelect
              {...formik.getFieldProps(
                `workspaces.${workspaceIndex}.workspaceDistro`,
              )}
            >
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
            </InputSelect>
            <InputError
              error={
                // @ts-ignore
                formik?.errors?.workspaces?.[workspaceIndex]?.workspaceDistro
              }
              touched={
                formik?.touched?.workspaces?.[workspaceIndex]?.workspaceDistro
              }
            />
          </div>
        )}
        <div
          className="flex flex-col gap-3 p-4"
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
