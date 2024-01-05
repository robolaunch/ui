import {
  IRobotData,
  IWorkspace,
  IWorkspaceRepository,
} from "../interfaces/robotInterfaces";
import { createContext, useEffect, useState } from "react";
import { envApplication } from "../helpers/envProvider";
import { useParams } from "react-router-dom";

export const CreateRobotContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const url = useParams();

  useEffect(() => {
    console.log("url", url);
  }, [url]);

  const initialRobotData: IRobotData = {
    step1: {
      tree: {
        organization: {
          id: "",
          name: "",
        },
        region: {
          name: "",
        },
        cloudInstance: {
          id: "",
          name: "",
          resources: {
            cpu: {
              coreTotal: 0,
            },
            gpu: {
              coreTotal: 0,
            },
            memory: {
              capacityTotal: 0,
            },
            storage: {
              capacityTotal: 0,
            },
          },
        },
        physicalInstance: {
          name: "",
        },
        namespace: {
          name: "",
        },
      },

      resources: {
        cpu: {
          allocatedCore: 0,
        },
        gpu: {
          enabledForCloudInstance: true,
          allocatedCore: 0,
        },
        memory: {
          allocatedCapacity: 0,
        },
        storage: {
          allocatedCapacity: 40,
        },
      },

      services: {
        ros: {
          isEnabled: true,
          socketEndpoint: "",
          rosDistros: [],
        },
        vdi: {
          isEnabled: true,
          socketEndpoint: "",
          fileManagerEndpoint: "",
          customPorts: [],
          gpuAllocation: 0,
          podName: "",
          sessionCount: 0,
          log: "",
        },
        ide: {
          isEnabled: true,
          httpsEndpoint: "",
          fileManagerEndpoint: "",
          customPorts: [],
          gpuModelName: "",
          gpuAllocation: 0,
          maxGpuAllocation: 0,
          podName: "",
          log: "",
        },
        jupyterNotebook: {
          isEnabled: false,
          httpsEndpoint: "",
          fileManagerEndpoint: "",
          customPorts: [],
          gpuAllocation: 0,
          podName: "",
          log: "",
        },
      },
      directories: {
        permittedDirectories: "/home/robolaunch",
        persistentDirectories: "/var:/etc:/opt:/usr",
        hostDirectories: [],
      },

      applicationConfig: {
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
      details: {
        name: "",
        isVirtualRobot: true,
        configureWorkspace: false,
        isDevelopmentMode: envApplication,
      },
    },
    step2: {
      configureWorkspace: false,
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
          robotLmEnvs: [],
        },
      ],
    },
  };

  const [robotData, setRobotData] = useState<IRobotData>(initialRobotData);

  useEffect(() => {
    console.log("robotData", robotData);
  }, [robotData]);

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
