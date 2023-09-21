import ReactDOMServer from "react-dom/server";
import RosCameraWidget from "../components/RosCameraWidget/RosCameraWidget";
import RosTopicListWidget from "../components/RosTopicListWidget/RosTopicListWidget";
import RosCmdVelWidget from "../components/RosCmdVelWidget/RosCmdVelWidget";
import RosRosOutWidget from "../components/RosRosOutWidget/RosRosOutWidget";
import RosMapWidget from "../components/RosMapWidget/RosMapWidget";
import RosNetworkWidget from "../components/RosNetworkWidget/RosNetworkWidget";
import RosResourceUsageWidget from "../components/RosResourceUsageWidget/RosResourceUsageWidget";
import RosEmergencyControlWidget from "../components/RosEmergencyControlWidget/RosEmergencyControlWidget";
import RosBatteryWidget from "../components/RosBatteryWidget/RosBatteryWidget";
import RosJoystickWidget from "../components/RosJoystickWidget/RosJoystickWidget";

interface IhandleAddWidget {
  grid: any;
  widget: string;
  type: string;
  ros: any;
  topicList: any;
  localStoragePath: string;
  handleRemoveWidget: (id: number) => void;
  handleForceUpdate: (page: string) => void;
}

export function handleAddWidget({
  grid,
  widget,
  type,
  ros,
  topicList,
  localStoragePath,
  handleRemoveWidget,
  handleForceUpdate,
}: IhandleAddWidget) {
  const temp = grid.save(true, true).children;
  temp.push({
    x: null,
    y: null,
    w: 3,
    h: 3,
    content:
      widget === "RosCameraWidget"
        ? ReactDOMServer.renderToString(
            <RosCameraWidget
              id={grid.save(true, true).children.length}
              ros={ros}
              topicList={topicList}
              localStoragePath={localStoragePath}
              handleRemoveWidget={handleRemoveWidget}
            />,
          )
        : widget === "RosTopicListWidget"
        ? ReactDOMServer.renderToString(
            <RosTopicListWidget
              id={grid.save(true, true).children.length}
              ros={ros}
              handleRemoveWidget={handleRemoveWidget}
            />,
          )
        : widget === "RosCmdVelWidget"
        ? ReactDOMServer.renderToString(
            <RosCmdVelWidget
              id={grid.save(true, true).children.length}
              ros={ros}
              handleRemoveWidget={handleRemoveWidget}
            />,
          )
        : widget === "RosRosOutWidget"
        ? ReactDOMServer.renderToString(
            <RosRosOutWidget
              id={grid.save(true, true).children.length}
              ros={ros}
              handleRemoveWidget={handleRemoveWidget}
            />,
          )
        : widget === "RosMapWidget"
        ? ReactDOMServer.renderToString(
            <RosMapWidget
              id={grid.save(true, true).children.length}
              ros={ros}
              handleRemoveWidget={handleRemoveWidget}
            />,
          )
        : widget === "RosNetworkWidget"
        ? ReactDOMServer.renderToString(
            <RosNetworkWidget
              id={grid.save(true, true).children.length}
              ros={ros}
              handleRemoveWidget={handleRemoveWidget}
            />,
          )
        : widget === "RosResourceUsageWidget"
        ? ReactDOMServer.renderToString(
            <RosResourceUsageWidget
              id={grid.save(true, true).children.length}
              ros={ros}
              handleRemoveWidget={handleRemoveWidget}
            />,
          )
        : widget === "RosEmergencyControlWidget"
        ? ReactDOMServer.renderToString(
            <RosEmergencyControlWidget
              id={grid.save(true, true).children.length}
              ros={ros}
              handleRemoveWidget={handleRemoveWidget}
            />,
          )
        : widget === "RosBatteryWidget"
        ? ReactDOMServer.renderToString(
            <RosBatteryWidget
              id={grid.save(true, true).children.length}
              ros={ros}
              handleRemoveWidget={handleRemoveWidget}
            />,
          )
        : widget === "RosJoystickWidget" &&
          ReactDOMServer.renderToString(
            <RosJoystickWidget
              id={grid.save(true, true).children.length}
              ros={ros}
              handleRemoveWidget={handleRemoveWidget}
            />,
          ),
  });
  window.localStorage.setItem(
    // @ts-ignore
    localStoragePath,
    JSON.stringify(temp),
  );

  handleForceUpdate(type);
}

interface IhandleSaveLayout {
  grid: any;
  localStoragePath: string;
}

export function handleSaveLayout({
  grid,
  localStoragePath,
}: IhandleSaveLayout) {
  window.localStorage.setItem(
    // @ts-ignore
    localStoragePath,
    JSON.stringify(grid.save(true, true).children),
  );
}
