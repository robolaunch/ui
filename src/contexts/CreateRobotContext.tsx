import React, { createContext, useEffect, useState } from "react";
import {
  IRobotData,
  IRobotWorkspace,
  IRobotWorkspaceRepository,
} from "../interfaces/robotInterfaces";

export const CreateRobotContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [robotData, setRobotData] = useState<IRobotData>({
    step1: {
      robotName: "",
      isVirtualRobot: true,
      physicalInstanceName: "",
      robotStorage: 40,
      isEnabledIde: true,
      isEnabledROS2Bridge: true,
      remoteDesktop: {
        isEnabled: true,
        sessionCount: 1,
      },
      rosDistros: [],
      gpuEnabledForCloudInstance: true,
      isDevelopmentMode: true,
    },
    step2: {
      workspaces: [
        {
          name: "",
          workspaceDistro: "",
          robotRepositories: [
            {
              name: "",
              url: "",
              branch: "",
            },
          ],
        },
      ],
    },
    step3: {
      buildManagerName: "",
      robotBuildSteps: [
        {
          name: "",
          workspace: "",
          isCommandCode: true,
          command: "",
          script: "",
          instancesName: [],
        },
      ],
    },
  });

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
    workspaceIndex: number
  ): void {
    const robotWorkspaces: IRobotWorkspace[] = [...formik.values.workspaces];

    const robotWorkspace: IRobotWorkspaceRepository = {
      name: "",
      url: "",
      branch: "",
    };

    robotWorkspaces[workspaceIndex].robotRepositories.push(robotWorkspace);
    formik.setFieldValue("workspaces", robotWorkspaces);
  }

  function handleRemoveRepositoryFromWorkspaceStep(
    formik: any,
    workspaceIndex: number,
    repositoryIndex: number
  ) {
    const temp: any = [...formik.values.workspaces];
    temp[workspaceIndex].repositories.splice(repositoryIndex, 1);
    formik.setFieldValue("workspaces", temp);
  }

  function handleAddBuildStep(formik: any) {
    formik.setFieldValue("robotBuildSteps", [
      ...formik.values.robotBuildSteps,
      {
        name: "",
        workspace: "",
        isCommandCode: true,
        command: "",
        script: "",
        instancesName: [],
      },
    ]);
  }

  useEffect(() => {
    console.log(robotData);
  }, [robotData]);

  return (
    <CreateRobotContext.Provider
      value={{
        robotData,
        setRobotData,
        handleAddWorkspaceStep,
        handleRemoveWorkspaceStep,
        handleAddRepositoryToWorkspaceStep,
        handleRemoveRepositoryFromWorkspaceStep,
        handleAddBuildStep,
      }}
    >
      {children}
    </CreateRobotContext.Provider>
  );
};
