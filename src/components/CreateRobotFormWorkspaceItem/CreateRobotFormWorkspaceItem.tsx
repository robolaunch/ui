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
  const [activeWorkspace, setActiveWorkspace] = useState<number>(-1);
  const [activeRepository, setActiveRepository] = useState<number>(-1);

  function handleAddRepository(workspaceIndex: number): void {
    const temp: any = [...formik.values.workspaces];
    temp[workspaceIndex].repositories.push({
      name: "",
      url: "",
      branch: "",
    });
    formik.setFieldValue("workspaces", temp);
  }

  function handleRemoveWorkspace(workspaceIndex: number) {
    const temp: any = [...formik.values.workspaces];
    temp.splice(workspaceIndex, 1);
    formik.setFieldValue("workspaces", temp);
  }

  return (
    <Accordion
      key={workspaceIndex}
      id={workspaceIndex}
      isOpen={activeWorkspace === workspaceIndex}
      handleOpen={() => {
        if (activeWorkspace === workspaceIndex) {
          setActiveWorkspace(-1);
          setActiveRepository(-1);
        } else {
          setActiveWorkspace(workspaceIndex);
        }
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
            {...formik.getFieldProps(`workspaces.${workspaceIndex}.distro`)}
            placeholder="Workspace Distro"
          >
            <Fragment>
              {!formik?.values?.workspaces[workspaceIndex]?.distro && (
                <option value=""></option>
              )}
              <option value="humble">Humble</option>
              <option value="foxy">Foxy</option>
              <option value="galactic">Galactic</option>
            </Fragment>
          </InputSelect>
          <InputError
            // @ts-ignore
            error={formik?.errors?.workspaces?.[workspaceIndex]?.distro}
            touched={formik?.touched?.workspaces?.[workspaceIndex]?.distro}
          />
        </div>
        <div className="flex flex-col gap-3 border border-layer-light-100 p-5 pb-10 rounded !shadow">
          <span className="mx-auto text-[0.75rem] font-medium">
            Workspace Repositories
          </span>
          <span className="w-full h-[2px] bg-primary" />
          {formik.values.workspaces[workspaceIndex]?.repositories?.map(
            (repository: any, repositoryIndex: number) => (
              <CreateRobotFormRepositoryItem
                key={repositoryIndex}
                activeRepository={activeRepository}
                setActiveRepository={setActiveRepository}
                formik={formik}
                workspaceIndex={workspaceIndex}
                repositoryIndex={repositoryIndex}
                repository={repository}
              />
            )
          )}
          <BsPlusCircle
            onClick={() => handleAddRepository(workspaceIndex)}
            size={22}
            className="mx-auto text-layer-secondary-700 hover:scale-90 transition-all duration-500 cursor-pointer"
          />
        </div>
        <span
          onClick={() => {
            setActiveWorkspace(-1);
            handleRemoveWorkspace(workspaceIndex);
          }}
          className="text-[0.66rem] text-red-500 cursor-pointer mx-auto hover:underline"
        >
          Delete {workspace?.name ? workspace.name : `this`} Workspace
        </span>
      </div>
    </Accordion>
  );
}
