import { createContext, useEffect, useReducer, useState } from "react";
import useRobot from "../hooks/useRobot";
import randomstring from "randomstring";
import saveAs from "file-saver";
import { toast } from "sonner";
import ROSLIB from "roslib";
import io from "socket.io-client";
import {
  IJob,
  ILocation,
} from "../interfaces/context/misssion.context.interface";
export const MissionContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const { ros } = useRobot();
  const [socketIO, setSocketIO] = useState<any>(null);

  useEffect(() => {
    const socket = io("ws://172.16.44.198:8080", { transports: ["websocket"] });
    console.log("Connecting to server");

    setSocketIO(socket);

    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("error", (data: any) => {
      console.log("Error", data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  function handleCreateLocation(values: {
    locationID: string;
    positionX: number;
    positionY: number;
    positionZ: number;
    orientationX: number;
    orientationY: number;
    orientationZ: number;
    orientationW: number;
  }) {
    socketIO &&
      socketIO.emit("LocationCreate", {
        messageType: "LocationCreate",
        locationID: values.locationID,
        position: {
          x: values.positionX,
          y: values.positionY,
          z: values.positionZ,
        },
        orientation: {
          x: values.orientationX,
          y: values.orientationY,
          z: values.orientationZ,
          w: values.orientationW,
        },
        locationStatus: "UNCONNECTED",
      });
  }

  function handleUpdateLocation(values: {
    locationID: string;
    positionX: number;
    positionY: number;
    positionZ: number;
  }) {
    socketIO &&
      socketIO.emit("LocationUpdate", {
        messageType: "LocationUpdate",
        locationID: values.locationID,
        locationStatus: "CONNECTED",
        position: {
          x: values.positionX,
          y: values.positionY,
          z: values.positionZ,
        },
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

  function handleGetJobs(values: { since: string; until: string }) {
    socketIO &&
      socketIO.emit("JobQuery", {
        since: values?.since, // JSON.stringify(new Date())
        until: values?.until, // JSON.stringify(new Date())
      });
  }

  function handleDeleteJob(values: { jobID: string }) {
    socketIO &&
      socketIO.emit("JobRemove", {
        mesageType: "JobRemove",
        jobID: values.jobID,
      });
  }

  function handleReducer(state: any, action: any) {}

  const [missionReducer, dispatcher] = useReducer<any>(handleReducer, {
    jobs: [],
    locations: [],
  });

  const [missions, setMissions] = useState<any>([
    // {
    //   id: randomstring.generate(8),
    //   name: "Mission 1",
    //   active: true,
    //   waypoints: [],
    // },
    // {
    //   id: randomstring.generate(8),
    //   name: "Mission 2",
    //   active: true,
    //   waypoints: [],
    // },
    // {
    //   id: randomstring.generate(8),
    //   name: "Mission 3",
    //   active: true,
    //   waypoints: [],
    // },
  ]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeMission, setActiveMission] = useState<number>(-1);
  const [hoverWaypoint, setHoverWaypoint] = useState<number>(-1);
  const [isCostMapActive, setIsCostMapActive] = useState<boolean>(false);
  const [sceneScale, setSceneScale] = useState<number>(1);
  const [rosMapDetails, setRosMapDetails] = useState<any>({
    x: 0,
    y: 0,
  });
  const [rightClickRosMapCoordinates, setRightClickRosMapCoordinates] =
    useState<any>();

  const rosWaypointsWeb = new ROSLIB.Topic({
    ros: ros,
    name: "/way_points_web",
    messageType: "std_msgs/msg/String",
  });

  useEffect(() => {
    ros && rosWaypointsWeb.subscribe(function (message: any) {});

    return () => {
      rosWaypointsWeb.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddMissions() {
    let temp = [...missions];
    temp.push({
      id: randomstring.generate(8),
      name: `Mission ${missions.length + 1}`,
      active: true,
      waypoints: [],
    });
    setMissions(temp);
  }
  function handleAddWaypointToMission({
    type,
    x,
    y,
  }: {
    type: string;
    x?: number;
    y?: number;
  }) {
    let temp = [...missions];
    temp[activeMission].waypoints.push({
      id: randomstring.generate(8),
      name: "Waypoint",
      taskType: type,
      coordinates: {
        x: x || rightClickRosMapCoordinates?.x,
        y: y || rightClickRosMapCoordinates?.y,
        z: 0,
      },
    });
    setMissions(temp);
  }
  function handleExportJSON() {
    var blob = new Blob([JSON.stringify(missions)], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `missions.json`);
  }
  function handleImportJSON(file: any) {
    if (file.type === "application/json") {
      const fileReader = new FileReader();
      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        setMissions(JSON.parse(e.target?.result as string));
      };
    } else {
      toast.error("Invalid file type. Please upload a JSON file.");
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const waypointRequest = {
    id: "STRING OR INTEGER",
    name: "STRING",
    waypoints: [
      {
        id: "STRING OR INTEGER",
        name: "STRING (WAYPOINT #1)",
        taskType: "STRING",
      },
      {
        id: "STRING OR INTEGER",
        name: "STRING (WAYPOINT #2)",
        taskType: "STRING",
      },
    ],
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const waypointResponse = {
    id: "STRING OR INTEGER",
    name: "STRING",
    missionState: "STRING => `success` | `running` | `error` ",
    waypoints: [
      {
        coordinates: {
          x: 0,
          y: 0,
          z: 0,
        },
        id: "STRING OR INTEGER",
        name: "STRING (WAYPOINT 1)",
        taskType: "STRING",
        taskState: "STRING => `waiting` | `success` | `running` | `error` ",
      },
      {
        coordinates: {
          x: 0,
          y: 0,
          z: 0,
        },
        id: "STRING OR INTEGER",
        name: "STRING (WAYPOINT 2)",
        taskType: "STRING",
        taskState: "STRING => `waiting` ||`success` || `running` || `error`",
      },
    ],
  };

  function handleStartMission(mission: any) {
    rosWaypointsWeb.publish({
      data: JSON.stringify(mission),
    });
  }

  return (
    <MissionContext.Provider
      value={{
        missions,
        setMissions,
        activeMission,
        setActiveMission,
        hoverWaypoint,
        setHoverWaypoint,
        isCostMapActive,
        setIsCostMapActive,
        isDragging,
        setIsDragging,
        sceneScale,
        setSceneScale,
        rosMapDetails,
        setRosMapDetails,
        rightClickRosMapCoordinates,
        setRightClickRosMapCoordinates,
        handleExportJSON,
        handleImportJSON,
        handleAddMissions,
        handleAddWaypointToMission,
        handleStartMission,
        missionReducer,
      }}
    >
      {children}
    </MissionContext.Provider>
  );
};
