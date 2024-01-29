import {
  IBuildSteps,
  IWorkspace,
  IWorkspaceRepository,
} from "../interfaces/robotInterfaces";
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
    const temp: any = [...formik.values.workspaces];
    temp.push({
      name: "",
      workspaceDistro: "",
      robotRepositories: [
        {
          name: "",
          url: "",
          branch: "",
        },
      ],
    });
    formik.setFieldValue("workspaces", temp);
  }

  function handleRemoveWorkspaceStep(formik: any, workspaceIndex: number) {
    const temp: any = [...formik.values.workspaces];
    temp.splice(workspaceIndex, 1);
    formik.setFieldValue("workspaces", temp);
  }

  function handleAddRepositoryToWorkspaceStep(
    formik: any,
    workspaceIndex: number,
  ): void {
    const robotWorkspaces: IWorkspace[] = [...formik.values.workspaces];

    const robotWorkspace: IWorkspaceRepository = {
      name: "",
      url: "",
      branch: "",
    };

    robotWorkspaces[workspaceIndex].robotRepositories.push(robotWorkspace);
    formik.setFieldValue("workspaces", robotWorkspaces);
  }

  function handleAddBuildStep(formik: FormikProps<IBuildSteps>) {
    formik.setFieldValue("steps", [
      ...formik.values.steps,
      {
        workspace: "",
        name: "",
        command: "",
        script: "",
        isShellCode: true,
        status: "",
        log: "",
        instanceScope: [],
      },
    ]);
  }

  function handleAddLaunchManager() {
    setRobotData((prev: any) => {
      return {
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
      };
    });
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
    formik.setFieldValue(`robotLmEnvs`, [
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
    formik.setFieldValue(
      `workspaces.${workspaceIndex}.robotRepositories`,
      formik.values.workspaces[workspaceIndex].robotRepositories.filter(
        (item: any, index: number) => index !== repositoryIndex,
      ),
    );
  }

  function handleRemoveStepFromBuildStep(formik: any, buildStepIndex: number) {
    const temp: any = [...formik.values.robotBuildSteps];
    temp.splice(buildStepIndex, 1);
    formik.setFieldValue("robotBuildSteps", temp);
  }

  function handleRemoveStepFromLaunchStep(
    formik: any,
    launchStepIndex: number,
  ) {
    const temp: any = [...formik.values.robotLaunchSteps];
    temp.splice(launchStepIndex, 1);
    formik.setFieldValue("robotLaunchSteps", temp);
  }

  function handleRemoveENVFromLaunchStep(formik: any, index: number) {
    formik.setFieldValue(
      `robotLmEnvs`,
      formik.values.robotLmEnvs.filter(
        (env: any, envIndex: number) => envIndex !== index,
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
