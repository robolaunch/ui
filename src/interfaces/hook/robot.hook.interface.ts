export interface IuseRobot {
  activeTab: string;
  setActiveTab: any;
  responsePhysicalInstance: any;
  responseRobot: any;
  responseBuildManager: any;
  responseLaunchManagers: any;
  isRobotReady: boolean;
  iFrameId: number;
  setIFrameId: any;
  ros: any;
  setRos: any;
  topicList: any;
  setTopicList: any;
  isSettedCookie: boolean | null;
  setIsSettedCookie: any;
  connectionsReducer: any;
  handleForceUpdate: any;
  handleResetRobot: () => void;
}
