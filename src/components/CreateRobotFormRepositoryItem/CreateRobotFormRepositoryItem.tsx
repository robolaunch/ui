import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import Accordion from "../Accordion/AccordionV2";
import {
  IRobotWorkspace,
  IRobotWorkspaces,
} from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import {
  getGithubUserRepositories,
  getGithubRepositoryBranches,
} from "../../api/github/githubApi";
import InputSelect from "../InputSelect/InputSelect";
import { GithubContext } from "../../contexts/GithubContext";
import { IGithubContext } from "../../interfaces/githubInterfaces";
interface ICreateRobotFormRepositoryItem {
  formik: FormikProps<IRobotWorkspaces>;
  repository: IRobotWorkspace;
  repositoryIndex: number;
  workspaceIndex: number;
}

export default function CreateRobotFormRepositoryItem({
  formik,
  repository,
  repositoryIndex,
  workspaceIndex,
}: ICreateRobotFormRepositoryItem): ReactElement {
  const [isShowAccordion, setIsShowAccordion] = useState<boolean>(false);
  const [responseRepositories, setResponseRepositories] = useState<any[]>([]);
  const [responseBranches, setResponseBranches] = useState<any[]>([]);

  const { githubAuth }: IGithubContext = useContext(GithubContext);

  useEffect(() => {
    githubAuth &&
      getGithubUserRepositories().then((res: any[]) => {
        console.log(res);
        setResponseRepositories(res || []);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (githubAuth) {
      formik.setFieldValue(
        `workspaces.${workspaceIndex}.repositories.${repositoryIndex}.branch`,
        ""
      );
      if (
        formik?.values?.workspaces?.[workspaceIndex]?.repositories?.[
          repositoryIndex
        ]?.url
      ) {
        getGithubRepositoryBranches({
          // eslint-disable-next-line array-callback-return
          owner: responseRepositories?.filter((repo: any) => {
            if (
              repo?.html_url ===
              formik?.values?.workspaces?.[workspaceIndex]?.repositories?.[
                repositoryIndex
              ]?.url
            ) {
              return repo;
            }
          })[0]?.owner?.login,
          // eslint-disable-next-line array-callback-return
          repo: responseRepositories?.filter((repo: any) => {
            if (
              repo?.html_url ===
              formik?.values?.workspaces?.[workspaceIndex]?.repositories?.[
                repositoryIndex
              ]?.url
            ) {
              return repo;
            }
          })[0]?.name,
        }).then((res: any[]) => {
          setResponseBranches(res || []);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    formik.values?.workspaces?.[workspaceIndex]?.repositories?.[repositoryIndex]
      .url,
  ]);

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
          {githubAuth ? (
            <InputSelect
              {...formik.getFieldProps(
                `workspaces.${workspaceIndex}.repositories.${repositoryIndex}.url`
              )}
              placeholder="Repository"
            >
              <Fragment>
                {!formik?.values?.workspaces?.[workspaceIndex]?.repositories?.[
                  repositoryIndex
                ]?.url && <option value=""></option>}
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
                `workspaces.${workspaceIndex}.repositories.${repositoryIndex}.url`
              )}
              placeholder="Repository URL"
              disabled={formik?.isSubmitting}
            />
          )}
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
          {githubAuth ? (
            <InputSelect
              {...formik.getFieldProps(
                `workspaces.${workspaceIndex}.repositories.${repositoryIndex}.branch`
              )}
              placeholder="Repository Branch"
            >
              <Fragment>
                {!formik?.values?.workspaces?.[workspaceIndex]?.repositories?.[
                  repositoryIndex
                ]?.branch && <option value=""></option>}
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
                `workspaces.${workspaceIndex}.repositories.${repositoryIndex}.branch`
              )}
              placeholder="Repository URL"
              disabled={formik?.isSubmitting}
            />
          )}
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
