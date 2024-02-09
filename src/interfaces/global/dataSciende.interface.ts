export interface IDataScienceApp {
  name: string;
  status: string;
  log: string;
  internalEndpoint: string;
  externalEndpoint: string;
  token: string;
  isDeletable: boolean;
}

export interface IDataScienceAppBE {
  name: string;
  status: string;
  applicationLog: string;
  application: {
    hasUi: boolean;
    name: string;
    isDeletable: boolean;
    hasAccessToken: boolean;
    accessToken: string;
  };
  internalServiceEndpoint: string;
  externalServiceEndpoint: string;
}
