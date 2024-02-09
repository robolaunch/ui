export interface IPhysicalInstance {
  name: string;
  status: string;
  k8sStatus: string;
  connectionStatus: string;
}

export interface IPhysicalInstanceBE {
  federationPhase: string;
  multicastPhase: string;
  phase: string;
  name: string;
}
