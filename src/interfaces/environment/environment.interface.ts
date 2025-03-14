import { IEnvironmentStep1 } from "./environment.step1.interface";
import { IEnvironmentStep2 } from "./environment.step2.interface";
import { IEnvironmentStep3 } from "./environment.step3.interface";
import { IEnvironmentStep4 } from "./environment.step4.interface";

export interface IEnvironment {
  step1: IEnvironmentStep1;
  step2: IEnvironmentStep2;
  step3: IEnvironmentStep3;
  step4: IEnvironmentStep4;
}

export interface IEnvironmentBE {
  application: {
    name: string;
    version: string;
  };
  devspace: {
    desktop: string;
    ubuntuDistro: string;
    version: string;
  };
  domainName: string;
  fleetName: string;
  ideApplicationLog: string;
  ideEnabled: boolean;
  ideFileBrowserIngressEndpoint: string;
  ideGpuModelName: string;
  ideGpuResource: number;
  ideIngressEndpoint: string;
  ideGpuResourceResource: string;
  idePodName: string;
  name: string;
  notebookEnabled: boolean;
  notebookPodName: string;
  notebookApplicationLog: string;
  notebookFileBrowserIngressEndpoint: string;
  notebookGpuResource: number;
  notebookIngressEndpoint: string;
  notebookCustomPorts: string;
  permittedDirectories: string;
  persistentDirectories: string;
  robotClusters: {
    name: string;
    robotStatus: string;
  }[];
  physicalInstance: string;
  storageAmount: number;
  vdiApplicationLog: string;
  vdiEnabled: boolean;
  vdiFileBrowserIngressEndpoint: string;
  vdiGpuResource: number;
  vdiIngressEndpoint: string;
  vdiPodName: string;
  vdiSessionCount: number;
  robotWorkspaces: {
    name: string;
    workspaceDistro: "IRON" | "HUMBLE" | "GALACTIC" | "FOXY" | "";
    robotRepositories: {
      name: string;
      url: string;
      branch: string;
    }[];
  }[];
  hostDirectories: string;
  physicalIdeIngressEndpoint: string;
  ideCustomPorts: string;
  vdiCustomPorts: string;
  bridgeEnabled: boolean;
  distributions: any[];
  bridgeIngressEndpoint: string;
  bridgePodName: string;
  bridgeApplicationLog: string;
  templateName: string;
  templateContent: string;
  templatePrivate: boolean;
  templateOrganizationLevelAvailable: boolean;
  templatePublicLevelAvailable: boolean;
}
