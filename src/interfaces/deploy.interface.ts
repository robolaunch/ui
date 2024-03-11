export interface IDeployBE {
  name: string;
  bridgeDistro: string;
  bridgeEnabled: boolean;
  bridgeIngressEndpoint: string;
  fleetName: string;
  isPhysicalInstance: boolean;
  instanceName: string;
  launchContainers: {
    replicas: number;
    container: {
      name: string;
      command: string;
      image: string;
      containerStatus: boolean;
      envs: {
        name: string;
        value: string;
      }[];
      volumeMounts: {
        name: string;
        mountPath: string;
      }[];
    };
  }[];
  volumeClaimTemplates: {
    name: string;
    capacity: {
      value: string;
    };
  }[];
}
