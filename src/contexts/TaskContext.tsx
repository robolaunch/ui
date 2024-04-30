import { useEffect, createContext, useState, useReducer } from "react";
import {
  IJob,
  IWaypoint,
  ImissionReducer,
  ImissionReducerAction,
  ImissionReducerState,
} from "../interfaces/context/misssion.context.interface";
import io from "socket.io-client";

export const TaskContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const [reload, setReload] = useState<boolean>(false);
  const [socketIO, setSocketIO] = useState<any>(null);
  const [missionReducer, dispatcher] = useReducer<ImissionReducer>(
    handleReducer,
    {
      waypoints: [],
      waitingPoints: [],
      jobs: [],
    },
  );

  function handleReducer(
    prevState: ImissionReducerState,
    action: ImissionReducerAction,
  ): ImissionReducerState {
    switch (action.type) {
      case "LocationQuery":
        return {
          ...prevState,
          waypoints: action.payload,
        };
      case "WaitingPointQuery":
        return {
          ...prevState,
          waitingPoints: action.payload,
        };
      case "JobQuery":
        return {
          ...prevState,
          jobs: action.payload,
        };
    }

    return prevState;
  }

  useEffect(() => {
    const socket = io("ws://localhost:8076", {
      autoConnect: true,
      transports: ["websocket"],
    });
    console.log("Connecting to server");

    setSocketIO(socket);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("error", (data: any) => {
      console.log("Error", data);
    });

    socket.on("LocationQuery", (data: IWaypoint[]) => {
      dispatcher({
        type: "LocationQuery",
        payload: data,
      });
    });

    socket.on("WaitingPointQuery", (data: IWaypoint[]) => {
      dispatcher({
        type: "WaitingPointQuery",
        payload: data,
      });
    });

    socket.on("JobQuery", (data: IJob[]) => {});

    socket.on("JobQuery", (data: IJob[]) => {
      dispatcher({
        type: "JobQuery",
        payload: data,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socketIO && handleGetLocations();
    socketIO && handleGetJobs();
    socketIO && handleGetWaitingPoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketIO, reload]);

  function handleCreateLocation(values: IWaypoint) {
    socketIO &&
      socketIO.emit("LocationCreate", {
        messageType: "LocationCreate",
        locationID: values.locationID,
        position: {
          x: values.position.x,
          y: values.position.y,
          z: values.position.z,
        },
        orientation: {
          x: values.orientation.x,
          y: values.orientation.y,
          z: values.orientation.z,
          w: values.orientation.w,
        },
        locationStatus: values.locationStatus,
      });
  }

  function handleCreateWaitingPoint(values: IWaypoint) {
    socketIO &&
      socketIO.emit("WaitingPointCreate", {
        messageType: "WaitingPointCreate",
        waitingPointID: values.waitingPointID,
        position: {
          x: values.position.x,
          y: values.position.y,
          z: values.position.z,
        },
        orientation: {
          x: values.orientation.x,
          y: values.orientation.y,
          z: values.orientation.z,
          w: values.orientation.w,
        },
        waitingPointStatus: values.waitingPointStatus,
      });
  }

  function handleGetWaitingPoints() {
    socketIO &&
      socketIO.emit("WaitingPointQuery", {
        since: new Date("2023-01-01T00:00:00").toISOString(), // JSON.stringify(new Date())
        until: new Date(
          new Date().getTime() + 3 * 60 * 60 * 1000,
        ).toISOString(), // JSON.stringify(new Date())
      });
  }

  function handleUpdateWaitingPoint(values: IWaypoint) {
    socketIO &&
      socketIO.emit("WaitingPointUpdate", {
        messageType: "WaitingPointUpdate",
        waitingPointID: values.waitingPointID,
        position: {
          x: values.position.x,
          y: values.position.y,
          z: values.position.z,
        },
        orientation: {
          x: values.orientation.x,
          y: values.orientation.y,
          z: values.orientation.z,
          w: values.orientation.w,
        },
      });
  }

  function handleGetLocations() {
    socketIO &&
      socketIO.emit("LocationQuery", {
        since: new Date("2023-01-01T00:00:00").toISOString(), // JSON.stringify(new Date())
        until: new Date(
          new Date().getTime() + 3 * 60 * 60 * 1000,
        ).toISOString(), // JSON.stringify(new Date())
      });
  }

  function handleUpdateWaypoint(values: IWaypoint) {
    socketIO &&
      socketIO.emit("LocationUpdate", {
        messageType: "LocationUpdate",
        locationID: values.locationID,
        locationStatus: values.locationStatus,
        position: {
          x: values.position.x,
          y: values.position.y,
          z: values.position.z,
        },
        orientation: {
          x: values.orientation.x,
          y: values.orientation.y,
          z: values.orientation.z,
          w: values.orientation.w,
        },
      });
  }

  function handleRemoveWaitingWaypoint(values: IWaypoint) {
    socketIO &&
      socketIO.emit("WaitingPointRemove", {
        messageType: "WaitingPointRemove",
        waitingPointID: values.waitingPointID,
      });
  }

  function handleRemoveWaypoint(values: IWaypoint) {
    socketIO &&
      socketIO.emit("LocationRemove", {
        messageType: "LocationRemove",
        locationID: values.locationID,
      });
  }

  function handleCreateJob(values: {
    jobID: string;
    robotUrl: string | undefined;
    taskList: {
      ActionName: string;
      LocationId: string;
    }[];
    deadline: string;
    priority: 0 | 1 | 2 | 3 | 4 | 5;
  }) {
    socketIO &&
      socketIO.emit("JobCreate", {
        messageType: "JobCreate",
        jobID: values.jobID,
        robotUrl: values.robotUrl,
        taskList: values.taskList,
        deadline: values.deadline,
        priority: values.priority,
        jobStatus: "NULL",
      });
  }

  function handleGetJobs() {
    socketIO &&
      socketIO.emit("JobQuery", {
        since: new Date("2023-01-01T00:00:00").toISOString(), // JSON.stringify(new Date())
        until: new Date().toISOString(), // JSON.stringify(new Date())
      });
  }

  function handleDeleteJob(values: { jobID: string }) {
    socketIO &&
      socketIO.emit("JobRemove", {
        mesageType: "JobRemove",
        jobID: values.jobID,
      });
  }

  function handleReload() {
    setTimeout(() => setReload(!reload), 1000);
  }

  useEffect(() => {
    console.log("missionReducer", missionReducer);
  }, [missionReducer]);

  return (
    <TaskContext.Provider
      value={{
        missionReducer,
        ///
        handleCreateLocation,
        handleGetLocations,
        handleUpdateWaypoint,
        handleRemoveWaypoint,
        ///
        handleCreateWaitingPoint,
        handleGetWaitingPoints,
        handleUpdateWaitingPoint,
        handleRemoveWaitingWaypoint,
        ///
        handleCreateJob,
        handleGetJobs,
        handleDeleteJob,
        ///
        handleReload,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
