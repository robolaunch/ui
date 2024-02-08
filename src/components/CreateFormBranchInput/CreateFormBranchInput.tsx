/* eslint-disable react-hooks/exhaustive-deps */
import { Fragment, ReactElement, useEffect, useState } from "react";
import FormInputSelect from "../FormInputSelect/FormInputSelect";
import FormInputText from "../FormInputText/FormInputText";
import { FormikProps } from "formik";
import axios from "axios";
import { IEnvironmentStep2 } from "../../interfaces/environment/environment.step2.interface";

interface ICreateFormBrachInput {
  formik: FormikProps<IEnvironmentStep2>;
  workspaceIndex: number;
  repositoryIndex: number;
  disabled?: boolean;
}

export default function CreateFormBrachInput({
  formik,
  workspaceIndex,
  repositoryIndex,
  disabled,
}: ICreateFormBrachInput): ReactElement {
  const [responseBranches, setResponseBranches] = useState<any[]>([]);

  useEffect(() => {
    if (
      formik.initialValues.workspaces?.[workspaceIndex]?.robotRepositories?.[
        repositoryIndex
      ]?.url !==
      formik.values.workspaces?.[workspaceIndex]?.robotRepositories?.[
        repositoryIndex
      ]?.url
    ) {
      formik.setFieldValue(
        `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.branch`,
        "",
      );
    }

    const branchURL = handleGetRepositoryBranchURL(
      formik?.values?.workspaces?.[workspaceIndex]?.robotRepositories?.[
        repositoryIndex
      ]?.url,
    );

    if (
      formik?.values?.workspaces?.[workspaceIndex]?.robotRepositories?.[
        repositoryIndex
      ]?.url &&
      branchURL
    ) {
      try {
        setResponseBranches([]);
        axios
          .get(branchURL)
          .then((res: any) => {
            branchURL?.includes("https://api.github.com/repos/") &&
              setResponseBranches(res.data?.map((branch: any) => branch?.name));
          })
          .catch((error: any) => {
            console.error("Error fetching branches:", error);
          });
      } catch (error) {
        console.error("Error in axios request:", error);
      }
    }
  }, [
    formik.values.workspaces?.[workspaceIndex]?.robotRepositories?.[
      repositoryIndex
    ]?.url,
  ]);

  function handleGetRepositoryBranchURL(URL: string) {
    if (URL?.includes("https://github.com")) {
      return (
        URL.replace("https://github.com/", "https://api.github.com/repos/") +
        (URL.endsWith("/") ? "branches" : "/branches")
      );
    } else if (URL?.includes("https://gitlab.com")) {
      return;
    }
  }

  return (
    <Fragment>
      {responseBranches?.length > 0 ? (
        <FormInputSelect
          dataTut="create-robot-step2-workspace-repository-branch"
          labelName="Branch Name:"
          tip="Type a repository branch name."
          disabled={disabled}
          inputProps={formik.getFieldProps(
            `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.branch`,
          )}
          inputError={
            //prettier-ignore
            // @ts-ignore
            formik?.errors?.workspaces?.[workspaceIndex]?.robotRepositories?.[repositoryIndex]?.branch
          }
          inputTouched={
            formik?.touched?.workspaces?.[workspaceIndex]?.robotRepositories?.[
              repositoryIndex
            ]?.branch
          }
          options={
            <Fragment>
              {!formik?.values?.workspaces?.[workspaceIndex]
                ?.robotRepositories?.[repositoryIndex]?.branch && (
                <option value=""></option>
              )}
              {responseBranches?.map((branch: any, index: number) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </Fragment>
          }
        />
      ) : (
        <FormInputText
          dataTut="create-robot-step2-workspace-repository-branch"
          labelName="Branch Name:"
          labelInfoTip="Type a repository branch name."
          disabled={disabled}
          inputProps={formik.getFieldProps(
            `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.branch`,
          )}
          inputError={
            //prettier-ignore
            // @ts-ignore
            formik?.errors?.workspaces?.[workspaceIndex]?.robotRepositories?.[repositoryIndex]?.branch
          }
          inputTouched={
            formik?.touched?.workspaces?.[workspaceIndex]?.robotRepositories?.[
              repositoryIndex
            ]?.branch
          }
        />
      )}
    </Fragment>
  );
}
