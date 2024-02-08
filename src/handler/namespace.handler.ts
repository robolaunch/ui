import {
  INamespace,
  INamespaceBE,
} from "../interfaces/global/namespace.interface";

function handleMapper(data: INamespaceBE[]): INamespace[] {
  return (
    data?.map((item: INamespaceBE) => {
      return {
        name: item.name,
        status: item.namespaceStatus,
      };
    }) || []
  );
}

export function namespacesMapper(data: INamespaceBE[]): INamespace[] {
  return handleMapper(data);
}

export function namespaceMapper(
  data: INamespaceBE[],
  filter: string,
): null | INamespace {
  return (
    handleMapper(data).find((item: INamespace) => item.name === filter) || null
  );
}
