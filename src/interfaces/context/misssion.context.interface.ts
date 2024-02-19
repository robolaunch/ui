export interface ILocation {
  locationID: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  orientation: {
    x: number;
    y: number;
    z: number;
    w: number;
  };
  locationStatus: string; // "UNCONNECTED" | "CONNECTED";
}

export interface IJob {
  jobID: string;
  robotUrl: string | undefined;
  taskList: {
    ActionName: string;
    LocationId: string;
  }[];
  deadline: string;
  priority: number;
  jobStatus: string; // "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
}
