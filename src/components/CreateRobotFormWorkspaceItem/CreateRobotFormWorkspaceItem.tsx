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
import StateCell from "../Cells/StateCell";
import { envOnPremise } from "../../helpers/envProvider";

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
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(false);

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
        <div className="flex justify-between">
          <span className="font-medium">
            {workspace.name
              ? workspace?.name + " Workspace"
              : `Workspace #${workspaceIndex + 1}`}
          </span>
          <div className="flex items-center gap-2 text-xs">
            {Array.isArray(workspaceState) && workspaceState?.[0] && (
              <div className="flex gap-1.5">
                <span
                  title={`Launch State of Cloud Instance`}
                  className="font-medium"
                >
                  V:
                </span>
                <StateCell state={workspaceState?.[0]} />
              </div>
            )}
            {Array.isArray(workspaceState) && workspaceState?.[1] && (
              <div className="flex gap-1.5">
                <span
                  title={`Launch State of Physical Instance`}
                  className="font-medium"
                >
                  P:
                </span>
                <StateCell state={workspaceState?.[1]} />
              </div>
            )}
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-2 p-4">
        <div>
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
            Workspace Name:
            <InfoTip content="Type a workspace name." />
          </div>
          <InputText
            {...formik.getFieldProps(`workspaces.${workspaceIndex}.name`)}
          />
          <InputError
            // @ts-ignore
            error={formik?.errors?.workspaces?.[workspaceIndex]?.name}
            touched={formik?.touched?.workspaces?.[workspaceIndex]?.name}
          />
        </div>

        {!envOnPremise && (
          <div>
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
              Workspace Distro:
              <InfoTip content="Select a workspace ros2 distro." />
            </div>
            <InputSelect
              {...formik.getFieldProps(
                `workspaces.${workspaceIndex}.workspaceDistro`
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
                  }
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
        <div className="flex flex-col gap-3 p-4">
          <span className="mx-auto text-[0.75rem] font-medium">
            Workspace Repositories
          </span>
          <span className="w-full h-[2px] bg-primary" />
          {formik.values.workspaces[workspaceIndex]?.robotRepositories?.map(
            (repository: any, repositoryIndex: number) => (
              <CreateRobotFormRepositoryItem
                key={repositoryIndex}
                formik={formik}
                workspaceIndex={workspaceIndex}
                repositoryIndex={repositoryIndex}
                repository={repository}
              />
            )
          )}
          <CreateRobotFormAddButton
            onClick={() =>
              handleAddRepositoryToWorkspaceStep(formik, workspaceIndex)
            }
            disabled={formik.isSubmitting}
          />
        </div>
        <CreateRobotFormDeleteButton
          disabled={robotData?.step2?.workspaces?.length > 1 ? false : true}
          onClick={() => {
            handleRemoveWorkspaceStep(formik, workspaceIndex);
          }}
          text={`Delete ${workspace?.name ? workspace.name : "this"} Workspace`}
        />
      </div>
    </Accordion>
  );
}
