import React, { createContext, useState } from "react";
import {
  IRobotData,
  IRobotWorkspace,
  IRobotWorkspaceRepository,
} from "../interfaces/robotInterfaces";
import { envOnPremiseRobot } from "../helpers/envProvider";

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
      isDevelopmentMode: envOnPremiseRobot ? true : false,
      domainName: "",
      application: {
        name: "",
        version: "",
      },
      devspace: {
        ubuntuDistro: "",
        desktop: "",
        version: "",
      },
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
    step4: {
      robotLaunchSteps: [
        {
          name: "",
          workspace: "",
          entryPointType: "custom",
          entryPointCmd: "",
          instancesName: [],
          robotLmEnvs: [
            // {
            //   name: "",
            //   value: "",
            // },
          ],
        },
      ],
    },
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
              robotLmEnvs: [
                // {
                //   name: "",
                //   value: "",
                // },
              ],
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
        robotLmEnvs: [
          // {
          //   name: "",
          //   value: "",
          // },
        ],
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
    repositoryIndex: number
  ) {
    formik.setFieldValue(
      `workspaces.${workspaceIndex}.robotRepositories`,
      formik.values.workspaces[workspaceIndex].robotRepositories.filter(
        (item: any, index: number) => index !== repositoryIndex
      )
    );
  }

  function handleRemoveStepFromBuildStep(formik: any, buildStepIndex: number) {
    const temp: any = [...formik.values.robotBuildSteps];
    temp.splice(buildStepIndex, 1);
    formik.setFieldValue("robotBuildSteps", temp);
  }

  function handleRemoveStepFromLaunchStep(
    formik: any,
    launchStepIndex: number
  ) {
    const temp: any = [...formik.values.robotLaunchSteps];
    temp.splice(launchStepIndex, 1);
    formik.setFieldValue("robotLaunchSteps", temp);
  }

  function handleRemoveENVFromLaunchStep(formik: any, index: number) {
    formik.setFieldValue(
      `robotLmEnvs`,
      formik.values.robotLmEnvs.filter(
        (env: any, envIndex: number) => envIndex !== index
      )
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
