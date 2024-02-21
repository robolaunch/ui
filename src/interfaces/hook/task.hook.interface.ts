import { ImissionReducerState } from "../context/misssion.context.interface";

export interface IuseTask {
  missionReducer: ImissionReducerState;
  ///
  handleCreateLocation: (values: {
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
  }) => void;
  handleGetLocations: () => void;
  handleUpdateLocation: (values: {
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
  }) => void;
  ///
  handleCreateJob: (values: {
    jobID: string;
    robotUrl: string | undefined;
    taskList: {
      ActionName: string;
      LocationId: string;
    }[];
    deadline: string;
    priority: 0 | 1 | 2 | 3 | 4 | 5;
  }) => void;
  handleGetJobs: () => void;
  handleDeleteJob: (values: { jobID: string }) => void;
}
