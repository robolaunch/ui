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
import { BsPlusCircle } from "react-icons/bs";
import CreateRobotFormRepositoryItem from "../CreateRobotFormRepositoryItem/CreateRobotFormRepositoryItem";
import useCreateRobot from "../../hooks/useCreateRobot";
import stringCapitalization from "../../helpers/stringCapitalization";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";

interface ICreateRobotFormWorkspaceItem {
  formik: FormikProps<IRobotWorkspaces>;
  workspace: IRobotWorkspace;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CreateRobotFormWorkspaceItem({
  formik,
  workspace,
  workspaceIndex,
  disabled,
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
        <span className="font-medium">
          {workspace.name
            ? workspace?.name + " Workspace"
            : `Workspace #${workspaceIndex + 1}`}
        </span>
      }
    >
      <div className="flex flex-col gap-7 p-4">
        <div>
          <InputText
            {...formik.getFieldProps(`workspaces.${workspaceIndex}.name`)}
            placeholder="Workspace Name"
            disabled={disabled}
          />
          <InputError
            // @ts-ignore
            error={formik?.errors?.workspaces?.[workspaceIndex]?.name}
            touched={formik?.touched?.workspaces?.[workspaceIndex]?.name}
          />
        </div>
        <div>
          <InputSelect
            {...formik.getFieldProps(
              `workspaces.${workspaceIndex}.workspaceDistro`
            )}
            placeholder="Workspace Distro"
            disabled={disabled}
          >
            <Fragment>
              {!formik?.values?.workspaces[workspaceIndex]?.workspaceDistro && (
                <option value=""></option>
              )}
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
                disabled={disabled}
              />
            )
          )}
          <CreateRobotFormAddButton
            onClick={() =>
              handleAddRepositoryToWorkspaceStep(formik, workspaceIndex)
            }
            disabled={disabled}
          />
        </div>
        {robotData?.step2?.workspaces?.length > 1 && (
          <CreateRobotFormDeleteButton
            disabled={disabled}
            onClick={() => {
              handleRemoveWorkspaceStep(formik, workspaceIndex);
            }}
            text={`Delete ${
              workspace?.name ? workspace.name : "this"
            } Workspace`}
          />
        )}
      </div>
    </Accordion>
  );
}
