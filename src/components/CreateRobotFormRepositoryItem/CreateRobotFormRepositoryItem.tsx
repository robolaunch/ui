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
import useRobot from "../../hooks/useRobot";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import InfoTip from "../InfoTip/InfoTip";
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

  const { handleRemoveRepositoryFromWorkspaceStep } = useRobot();

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
      <div className="flex flex-col gap-4 px-3 py-6">
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
        <div>
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
              // @ts-ignore
              formik?.errors?.workspaces?.[workspaceIndex]?.robotRepositories?.[
                repositoryIndex
              ]?.url
            }
            touched={
              formik?.touched?.workspaces?.[workspaceIndex]
                ?.robotRepositories?.[repositoryIndex]?.url
            }
          />
        </div>
        <div>
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
            Repository Branch Name:
            <InfoTip content="Type a repository branch name." />
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
            <InputText
              {...formik.getFieldProps(
                `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.branch`
              )}
              disabled={disabled}
            />
          )}
          <InputError
            error={
              // @ts-ignore
              formik?.errors?.workspaces?.[workspaceIndex]?.robotRepositories?.[
                repositoryIndex
              ]?.branch
            }
            touched={
              formik?.touched?.workspaces?.[workspaceIndex]
                ?.robotRepositories?.[repositoryIndex]?.branch
            }
          />
        </div>
        {formik.values?.workspaces?.[workspaceIndex]?.robotRepositories
          ?.length > 1 && (
          <CreateRobotFormDeleteButton
            disabled={disabled}
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
        )}
      </div>
    </Accordion>
  );
}
