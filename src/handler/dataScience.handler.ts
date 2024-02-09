import {
  IDataScienceApp,
  IDataScienceAppBE,
} from "../interfaces/global/dataSciende.interface";

function handleMapper(data: IDataScienceAppBE[]): IDataScienceApp[] {
  return (
    data?.map((item) => {
      return {
        name: item.name,
        status: item.status,
        log: item.applicationLog,
        internalEndpoint: item.internalServiceEndpoint,
        externalEndpoint: item.externalServiceEndpoint,
        token: item.application.accessToken,
        isDeletable: item.application.isDeletable,
      };
    }) || []
  );
}

export function dataScienceAppsMapper(
  data: IDataScienceAppBE[],
): IDataScienceApp[] {
  return handleMapper(data);
}
