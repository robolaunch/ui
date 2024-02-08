import { IBuildSteps, IWorkspace } from "../interfaces/robotInterfaces";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import { FormikProps } from "formik";
import { IEnvironment } from "../interfaces/environment/environment.interface";
import { environmentInitialConfig } from "../configs/environment.initial.config";

export const CreateRobotContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const url = useParams();

  const initialRobotData: IEnvironment = environmentInitialConfig;

  const [robotData, setRobotData] = useState<IEnvironment>(initialRobotData);

  const { sidebarState } = useMain();

  useEffect(() => {
    console.log("robotData", robotData);
  }, [robotData]);

  useEffect(() => {
    if (
      !url.robotName &&
      JSON.stringify(initialRobotData) !== JSON.stringify(robotData) &&
      !sidebarState.isCreateMode
    ) {
      setRobotData(initialRobotData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarState.isCreateMode, url]);

  function handleResetRobotForm() {
    setRobotData(initialRobotData);
  }

  function handleAddWorkspaceStep(formik: any) {
    formik.setFieldValue("workspaces", [
      ...formik.values.workspaces,
      {
        name: "",
        workspaceDistro: "",
        robotRepositories: [{ name: "", url: "", branch: "" }],
      },
    ]);
  }

  function handleRemoveWorkspaceStep(formik: any, workspaceIndex: number) {
    formik.setFieldValue("workspaces", [
      ...formik.values.workspaces.slice(0, workspaceIndex),
      ...formik.values.workspaces.slice(workspaceIndex + 1),
    ]);
  }

  function handleAddRepositoryToWorkspaceStep(
    formik: any,
    workspaceIndex: number,
  ): void {
    formik.setFieldValue(
      "workspaces",
      formik.values.workspaces.map((workspace: IWorkspace, index: number) => {
        if (index === workspaceIndex) {
          return {
            ...workspace,
            robotRepositories: [
              ...workspace.robotRepositories,
              { name: "", url: "", branch: "" },
            ],
          };
        }
        return workspace;
      }),
    );
  }

  function handleAddBuildStep(formik: FormikProps<IBuildSteps>) {
    formik.setFieldValue("steps", [
      ...formik.values.steps,
      {
        workspace: "",
        name: "",
        command: "",
        script: "",
        isCommandCode: true,
        status: "",
        log: "",
        instanceScope: [],
      },
    ]);
  }

  function handleRemoveStepFromBuildStep(formik: any, buildStepIndex: number) {
    formik.setFieldValue(
      "steps",
      formik.values.steps.filter(
        (_: any, index: number) => index !== buildStepIndex,
      ),
    );
  }

  function handleAddLaunchManager() {
    setRobotData((prev: any) => ({
      ...prev,
      step4: {
        ...prev.step4,
        robotLaunchSteps: [
          ...prev.step4.robotLaunchSteps,
          {
            workspace: "",
            entryPointType: "custom",
            entryPointCmd: "",
            instancesName: [],
            robotLmEnvs: [],
          },
        ],
      },
    }));
  }

  function handleAddStepToLaunchStep(formik: any) {
    formik.setFieldValue("robotLaunchSteps", [
      ...formik.values.robotLaunchSteps,
      {
        workspace: "",
        entryPointType: "custom",
        entryPointCmd: "",
        instancesName: [],
        robotLmEnvs: [],
      },
    ]);
  }

  function handleAddENVToLaunchStep(formik: any) {
    formik.setFieldValue("robotLmEnvs", [
      ...formik.values.robotLmEnvs,
      {
        name: "",
        value: "",
      },
    ]);
  }

  function handleRemoveRepositoryFromWorkspaceStep(
    formik: any,
    workspaceIndex: number,
    repositoryIndex: number,
  ) {
    const updatedWorkspaces = [...formik.values.workspaces];
    updatedWorkspaces[workspaceIndex].robotRepositories.splice(
      repositoryIndex,
      1,
    );
    formik.setFieldValue(`workspaces`, updatedWorkspaces);
  }

  function handleRemoveStepFromLaunchStep(
    formik: any,
    launchStepIndex: number,
  ) {
    formik.setFieldValue(
      "robotLaunchSteps",
      formik.values.robotLaunchSteps.filter(
        (_: any, index: number) => index !== launchStepIndex,
      ),
    );
  }

  function handleRemoveENVFromLaunchStep(formik: any, index: number) {
    formik.setFieldValue(
      "robotLmEnvs",
      formik.values.robotLmEnvs.filter(
        (_: any, envIndex: number) => envIndex !== index,
      ),
    );
  }

  return (
    <CreateRobotContext.Provider
      value={{
        robotData,
        setRobotData,
        handleResetRobotForm,
        handleAddWorkspaceStep,
        handleRemoveWorkspaceStep,
        handleAddLaunchManager,
        handleAddRepositoryToWorkspaceStep,
        handleRemoveRepositoryFromWorkspaceStep,
        handleAddBuildStep,
        handleRemoveStepFromBuildStep,
        handleAddENVToLaunchStep,
        handleRemoveENVFromLaunchStep,
        handleAddStepToLaunchStep,
        handleRemoveStepFromLaunchStep,
      }}
    >
      {children}
    </CreateRobotContext.Provider>
  );
};
