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

interface ICreateRobotFormWorkspaceItem {
  formik: FormikProps<IRobotWorkspaces>;
  workspace: IRobotWorkspace;
  workspaceIndex: number;
}

export default function CreateRobotFormWorkspaceItem({
  formik,
  workspace,
  workspaceIndex,
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
            : `Workspace ${workspaceIndex + 1}`}
        </span>
      }
    >
      <div className="flex flex-col gap-7 p-4">
        <div>
          <InputText
            {...formik.getFieldProps(`workspaces.${workspaceIndex}.name`)}
            placeholder="Workspace Name"
            disabled={formik?.isSubmitting}
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
        <div className="flex flex-col gap-3 border-[3px] border-layer-light-100 p-10 rounded !shadow">
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
          <BsPlusCircle
            onClick={() =>
              handleAddRepositoryToWorkspaceStep(formik, workspaceIndex)
            }
            size={22}
            className="mx-auto text-layer-secondary-700 hover:scale-90 transition-all duration-500 cursor-pointer"
          />
        </div>
        <span
          onClick={() => {
            handleRemoveWorkspaceStep(formik, workspaceIndex);
          }}
          className="text-[0.66rem] text-red-500 cursor-pointer mx-auto hover:underline"
        >
          Delete {workspace?.name ? workspace.name : `this`} Workspace
        </span>
      </div>
    </Accordion>
  );
}
