import {
  IPhysicalInstance,
  IPhysicalInstanceBE,
} from "../interfaces/global/physicalInstance.interface";

function handleMapper(data: IPhysicalInstanceBE[]): IPhysicalInstance[] {
  return (
    data?.map((item) => {
      return {
        name: item.name,
        status: item.phase,
        k8sStatus: item.federationPhase,
        connectionStatus: item.multicastPhase,
      };
    }) || []
  );
}

export function physicalInstancesMapper(
  data: IPhysicalInstanceBE[],
): IPhysicalInstance[] {
  return handleMapper(data);
}

export function physicalInstanceMapper(
  data: IPhysicalInstanceBE[],
  filter: string,
): null | IPhysicalInstance {
  return handleMapper(data).find((item) => item.name === filter) || null;
}
