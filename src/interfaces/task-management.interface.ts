export interface IWaypoint {
  waypoint_id: number;
  waypoint_name: string;
  position_x: number;
  position_y: number;
  position_z: number;
  orientation_x: number;
  orientation_y: number;
  orientation_z: number;
  orientation_w: number;
}

export interface IJob {
  job_id: number;
  job_name: string;
  waypoints: number[];
}
