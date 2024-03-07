export interface IDeployBE {
  name: string;
  bridgeDistro: string;
  bridgeEnabled: boolean;
  bridgeIngressEndpoint: string;
  fleetName: string;
  instanceName: string;
  launchContainers: {
    replicas: number;
    container: {
      name: string;
      command: string;
      image: string;
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
