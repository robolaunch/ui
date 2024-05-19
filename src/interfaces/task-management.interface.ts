export interface IWaypoint {
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
}

export interface IJob {
  job_id: number;
  job_name: string;
  waypoints: IWaypoint[];
}
