export interface ISystemStatus {
  operators: {
    log: string;
    status: string;
  };
  backend: {
    log: string;
    status: string;
  };
}

export interface ISystemStatusBE {
  log: string;
  name: string;
  status: string;
}
