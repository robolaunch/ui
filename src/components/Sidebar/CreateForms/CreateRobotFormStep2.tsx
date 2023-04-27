import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { CreateRobotContext } from "../../../contexts/CreateRobotContext";
import { useFormik } from "formik";
import Accordion from "../../Accordion/AccordionV2";
import InputText from "../../InputText/InputText";
import InputError from "../../InputError/InputError";
import * as Yup from "yup";
import InputSelect from "../../InputSelect/InputSelect";

export default function CreateRobotFormStep2(): ReactElement {
  const [activeWorkspace, setActiveWorkspace] = useState<number>(-1);
  const [activeRepository, setActiveRepository] = useState<number>(-1);

  const {
    robotData,
    setRobotData,
  }: {
    robotData: {
      step1: any;
      step2: {
        workspaces: {
          name: string;
          distro: string;
          repositories: {
            name: string;
            url: string;
            branch: string;
          }[];
        }[];
      };
      step3: any;
    };
    setRobotData: any;
  } = useContext(CreateRobotContext);

  const formik = useFormik({
    validationSchema: Yup.object().shape({
      workspaces: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .required("Workspace Name is required")
            .test("unique-name", "This name is already taken", (value) => {
              const temp: any = formik.values.workspaces.filter(
                (item: any) => item.name === value && item
              );
              return temp.length > 1 ? false : true;
            }),
          distro: Yup.string()
            .required("Workspace Distro is required")
            .test(
              "test-name",
              "This distro cannot be selected. It is not among the distros selected for the robot",
              (value) => robotData?.step1?.rosDistros.includes(value)
            ),
          repositories: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required("Repository Name is required"),
            })
          ),
        })
      ),
    }),
    initialValues: robotData?.step2,
    onSubmit: (values: any) => {},
  });

  useEffect(() => {
    setRobotData({
      ...robotData,
      step2: formik.values,
    });
    // eslint-disable-next-line
  }, [formik.values]);

  useEffect(() => {
    console.log(formik.values);
    console.log(formik.errors);
  }, [formik.errors, formik.touched]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-4 animate__animated animate__fadeIn"
    >
      {robotData?.step2?.workspaces?.map(
        (workspace: any, workspaceIndex: number) => {
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
              <div className="flex flex-col gap-8 py-6">
                <div>
                  <InputText
                    {...formik.getFieldProps(
                      `workspaces.${workspaceIndex}.name`
                    )}
                    placeholder="Workspace Name"
                    disabled={formik?.isSubmitting}
                  />
                </div>
                <div>
                  <InputSelect
                    {...formik.getFieldProps(
                      `workspaces.${workspaceIndex}.distro`
                    )}
                    placeholder="Workspace Distro"
                  >
                    <Fragment>
                      {!formik.values.distro && <option value=""></option>}
                      <option value="humble">Humble</option>
                      <option value="foxy">Foxy</option>
                      <option value="galactic">Galactic</option>
                    </Fragment>
                  </InputSelect>
                </div>

                <div className="flex flex-col gap-3">
                  {formik.values.workspaces[workspaceIndex]?.repositories?.map(
                    (repository: any, repositoryIndex: number) => (
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
                              ? repository?.name + " repository"
                              : `repository ${repositoryIndex + 1}`}
                          </span>
                        }
                      >
                        <div className="flex flex-col gap-8 py-6">
                          <div>
                            <InputText
                              {...formik.getFieldProps(
                                `
                                workspaces.${workspaceIndex}.repositories.${repositoryIndex}.name
                               `
                              )}
                              placeholder="Repository Name"
                              disabled={formik?.isSubmitting}
                            />
                          </div>
                          <div>
                            <InputText
                              {...formik.getFieldProps(
                                `
                                workspaces.${workspaceIndex}.repositories.${repositoryIndex}.url
                               `
                              )}
                              placeholder="Repository URL"
                              disabled={formik?.isSubmitting}
                            />
                          </div>
                          <div>
                            <InputText
                              {...formik.getFieldProps(
                                `
                                workspaces.${workspaceIndex}.repositories.${repositoryIndex}.branch
                               `
                              )}
                              placeholder="Repository Branch"
                              disabled={formik?.isSubmitting}
                            />
                          </div>
                        </div>
                      </Accordion>
                    )
                  )}
                </div>
              </div>
            </Accordion>
          );
        }
      )}
    </form>
  );
}
