import React, { createContext, useEffect, useState } from "react";
import {
  IRobotData,
  IRobotWorkspace,
  IRobotWorkspaceRepository,
} from "../interfaces/robotInterfaces";

export const CreateRobotContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const initialRobotData: IRobotData = {
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
    step4: [
      {
        launchManagerName: "",
        robotLaunchSteps: [
          {
            workspace: "",
            entryPointType: "custom",
            entryPointCmd: "",
            instancesName: [],
            robotLmEnvs: [
              {
                name: "",
                value: "",
              },
            ],
          },
        ],
      },
    ],
  };

  const [robotData, setRobotData] = useState<IRobotData>(initialRobotData);

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

  function handleAddStepToBuildStep(formik: any) {
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

  function handleRemoveStepFromBuildStep(formik: any, buildStepIndex: number) {
    const temp: any = [...formik.values.robotBuildSteps];
    temp.splice(buildStepIndex, 1);
    formik.setFieldValue("robotBuildSteps", temp);
  }

  function handleAddStepToLaunchStep(formik: any) {
    formik.setFieldValue("robotLaunchSteps", [
      ...formik.values.robotLaunchSteps,
      {
        workspace: "",
        entryPointType: "custom",
        entryPointCmd: "",
        instancesName: [],
        robotLmEnvs: [
          {
            name: "",
            value: "",
          },
        ],
      },
    ]);
  }

  function handleRemoveStepFromLaunchStep(
    formik: any,
    launchStepIndex: number
  ) {
    const temp: any = [...formik.values.robotLaunchSteps];
    temp.splice(launchStepIndex, 1);
    formik.setFieldValue("robotLaunchSteps", temp);
  }

  function handleAddENVToLaunchStep(formik: any, launchStepIndex: number) {
    const temp: any = [...formik.values.robotLaunchSteps];
    temp[launchStepIndex].robotLmEnvs.push({
      name: "",
      value: "",
    });
    formik.setFieldValue("robotLaunchSteps", temp);
  }

  function handleRemoveENVFromLaunchStep(
    formik: any,
    launchStepIndex: number,
    envIndex: number
  ) {
    const temp: any = [...formik.values.robotLaunchSteps];
    temp[launchStepIndex].robotLmEnvs.splice(envIndex, 1);
    formik.setFieldValue("robotLaunchSteps", temp);
  }

  useEffect(() => {
    console.log(robotData);
  }, [robotData]);

  return (
    <CreateRobotContext.Provider
      value={{
        robotData,
        setRobotData,
        handleResetRobotForm,
        handleAddWorkspaceStep,
        handleRemoveWorkspaceStep,
        handleAddRepositoryToWorkspaceStep,
        handleRemoveRepositoryFromWorkspaceStep,
        handleAddStepToBuildStep,
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
