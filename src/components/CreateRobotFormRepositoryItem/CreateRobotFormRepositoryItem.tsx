import React, { ReactElement } from "react";
import Accordion from "../Accordion/AccordionV2";
import {
  IRobotWorkspace,
  IRobotWorkspaces,
} from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";

interface ICreateRobotFormRepositoryItem {
  formik: FormikProps<IRobotWorkspaces>;
  repository: IRobotWorkspace;
  repositoryIndex: number;
  activeRepository: number;
  setActiveRepository: React.Dispatch<React.SetStateAction<number>>;
  workspaceIndex: number;
}

export default function CreateRobotFormRepositoryItem({
  formik,
  repository,
  repositoryIndex,
  activeRepository,
  setActiveRepository,
  workspaceIndex,
}: ICreateRobotFormRepositoryItem): ReactElement {
  function handleRemoveRepository(
    workspaceIndex: number,
    repositoryIndex: number
  ) {
    const temp: any = [...formik.values.workspaces];
    temp[workspaceIndex].repositories.splice(repositoryIndex, 1);
    formik.setFieldValue("workspaces", temp);
  }

  return (
    <Accordion
      key={repositoryIndex}
      id={repositoryIndex}
      isOpen={activeRepository === repositoryIndex}
      handleOpen={() => {
        if (activeRepository === repositoryIndex) {
          setActiveRepository(-1);
        } else {
          setActiveRepository(repositoryIndex);
        }
      }}
      header={
        <span className="font-medium">
          {repository.name
            ? repository?.name + " Repository"
            : `Repository ${repositoryIndex + 1}`}
        </span>
      }
    >
      <div className="flex flex-col gap-7 px-3 py-6">
        <div>
          <InputText
            {...formik.getFieldProps(
              `workspaces.${workspaceIndex}.repositories.${repositoryIndex}.name`
            )}
            placeholder="Repository Name"
            disabled={formik?.isSubmitting}
          />
          <InputError
            error={
              // @ts-ignore
              formik?.errors?.workspaces?.[workspaceIndex]?.repositories?.[
                repositoryIndex
              ]?.name
            }
            touched={
              formik?.touched?.workspaces?.[workspaceIndex]?.repositories?.[
                repositoryIndex
              ]?.name
            }
          />
        </div>
        <div>
          <InputText
            {...formik.getFieldProps(
              `workspaces.${workspaceIndex}.repositories.${repositoryIndex}.url`
            )}
            placeholder="Repository URL"
            disabled={formik?.isSubmitting}
          />
          <InputError
            error={
              // @ts-ignore
              formik?.errors?.workspaces?.[workspaceIndex]?.repositories?.[
                repositoryIndex
              ]?.url
            }
            touched={
              formik?.touched?.workspaces?.[workspaceIndex]?.repositories?.[
                repositoryIndex
              ]?.url
            }
          />
        </div>
        <div>
          <InputText
            {...formik.getFieldProps(
              `workspaces.${workspaceIndex}.repositories.${repositoryIndex}.branch`
            )}
            placeholder="Repository Branch"
            disabled={formik?.isSubmitting}
          />
          <InputError
            error={
              // @ts-ignore
              formik?.errors?.workspaces?.[workspaceIndex]?.repositories?.[
                repositoryIndex
              ]?.branch
            }
            touched={
              formik?.touched?.workspaces?.[workspaceIndex]?.repositories?.[
                repositoryIndex
              ]?.branch
            }
          />
        </div>
        <span
          onClick={() => {
            handleRemoveRepository(workspaceIndex, repositoryIndex);
          }}
          className="text-[0.66rem] text-red-500 cursor-pointer mx-auto hover:underline"
        >
          Delete {repository?.name ? repository.name : `this`} Repository
        </span>
      </div>
    </Accordion>
  );
}
