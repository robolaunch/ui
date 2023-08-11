/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, ReactElement, useEffect, useState } from "react";
import Accordion from "../Accordion/AccordionV2";
import {
  IRobotWorkspace,
  IRobotWorkspaces,
} from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import InputSelect from "../InputSelect/InputSelect";
import { useAppDispatch } from "../../hooks/redux";
import {
  getGithubRepositoryBranches,
  getGithubUserRepositories,
} from "../../toolkit/GithubSlice";
import useGithub from "../../hooks/useGithub";
import useCreateRobot from "../../hooks/useCreateRobot";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import InfoTip from "../InfoTip/InfoTip";
import axios from "axios";
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
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(false);
  const [responseRepositories, setResponseRepositories] = useState<any[]>([]);
  const [responseBranches, setResponseBranches] = useState<any[]>([]);

  const dispatch = useAppDispatch();

  const github = useGithub();

  const { handleRemoveRepositoryFromWorkspaceStep } = useCreateRobot();

  useEffect(() => {
    github?.githubAuth &&
      dispatch(getGithubUserRepositories()).then((res: any) => {
        setResponseRepositories(res.payload.data || []);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    () => {
      if (github?.githubAuth) {
        formik.setFieldValue(
          `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.branch`,
          ""
        );
        if (
          formik?.values?.workspaces?.[workspaceIndex]?.robotRepositories?.[
            repositoryIndex
          ]?.url
        ) {
          dispatch(
            getGithubRepositoryBranches({
              // eslint-disable-next-line array-callback-return
              owner: responseRepositories?.filter((repo: any) => {
                if (
                  repo?.html_url ===
                  formik?.values?.workspaces?.[workspaceIndex]
                    ?.robotRepositories?.[repositoryIndex]?.url
                ) {
                  return repo;
                }
              })[0]?.owner?.login,
              // eslint-disable-next-line array-callback-return
              repo: responseRepositories?.filter((repo: any) => {
                if (
                  repo?.html_url ===
                  formik?.values?.workspaces?.[workspaceIndex]
                    ?.robotRepositories?.[repositoryIndex]?.url
                ) {
                  return repo;
                }
              })[0]?.name,
            })
          ).then((res: any) => {
            setResponseBranches(res?.payload?.data || []);
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      // eslint-disable-next-line react-hooks/exhaustive-deps
      formik.values?.workspaces?.[workspaceIndex]?.robotRepositories?.[
        repositoryIndex
      ].url,
    ]
  );

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
        ""
      );
    }

    const branchURL = handleGetRepositoryBranchURL(
      formik?.values?.workspaces?.[workspaceIndex]?.robotRepositories?.[
        repositoryIndex
      ]?.url
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
      <div className="flex flex-col gap-2 px-5 py-2.5">
        <div>
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
            Repository Name:
            <InfoTip content="Type a repository name." />
          </div>
          <InputText
            {...formik.getFieldProps(
              `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.name`
            )}
            disabled={disabled}
          />
          <InputError
            error={
              // @ts-ignore
              formik?.errors?.workspaces?.[workspaceIndex]?.robotRepositories?.[
                repositoryIndex
              ]?.name
            }
            touched={
              formik?.touched?.workspaces?.[workspaceIndex]
                ?.robotRepositories?.[repositoryIndex]?.name
            }
          />
        </div>
        <div className="flex gap-2 w-full">
          <div className="w-full">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
              Repository URL:
              <InfoTip content="Type a repository URL." />
            </div>
            {github?.githubAuth ? (
              <InputSelect
                {...formik.getFieldProps(
                  `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.url`
                )}
                placeholder="Repository"
                disabled={disabled}
              >
                <Fragment>
                  {!formik?.values?.workspaces?.[workspaceIndex]
                    ?.robotRepositories?.[repositoryIndex]?.url && (
                    <option value=""></option>
                  )}
                  {responseRepositories?.map((repo: any, index: number) => (
                    <option key={index} value={repo?.html_url}>
                      {repo?.owner?.login} - {repo?.name}
                    </option>
                  ))}
                </Fragment>
              </InputSelect>
            ) : (
              <InputText
                {...formik.getFieldProps(
                  `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.url`
                )}
                disabled={disabled}
              />
            )}
            <InputError
              error={
                //prettier-ignore
                // @ts-ignore
                formik?.errors?.workspaces?.[workspaceIndex]?.robotRepositories?.[repositoryIndex]?.url
              }
              touched={
                formik?.touched?.workspaces?.[workspaceIndex]
                  ?.robotRepositories?.[repositoryIndex]?.url
              }
            />
          </div>
          <div className="w-36">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
              Branch Name:
              <InfoTip content="Type a repository branch name." rightTip />
            </div>
            {github?.githubAuth ? (
              <InputSelect
                {...formik.getFieldProps(
                  `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.branch`
                )}
                placeholder="Repository Branch"
                disabled={disabled}
              >
                <Fragment>
                  {!formik?.values?.workspaces?.[workspaceIndex]
                    ?.robotRepositories?.[repositoryIndex]?.branch && (
                    <option value=""></option>
                  )}
                  {responseBranches?.map((branch: any, index: number) => (
                    <option key={index} value={branch?.name}>
                      {branch?.name}
                    </option>
                  ))}
                </Fragment>
              </InputSelect>
            ) : (
              <InputSelect
                {...formik.getFieldProps(
                  `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.branch`
                )}
                disabled={disabled}
              >
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
              </InputSelect>
            )}
            <InputError
              error={
                //prettier-ignore
                // @ts-ignore
                formik?.errors?.workspaces?.[workspaceIndex]?.robotRepositories?.[repositoryIndex]?.branch
              }
              touched={
                formik?.touched?.workspaces?.[workspaceIndex]
                  ?.robotRepositories?.[repositoryIndex]?.branch
              }
            />
          </div>
        </div>

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
              repositoryIndex
            );
          }}
          text={`Delete ${
            repository?.name ? repository.name : "this"
          } Repository`}
        />
      </div>
    </Accordion>
  );
}
