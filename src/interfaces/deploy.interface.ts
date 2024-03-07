export interface IDeployBE {
  name: string;
  bridgeDistro: string;
  bridgeEnabled: boolean;
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
  volumeClaimTeplates: {
    name: string;
    capacity: {
      value: string;
    };
  };
}
