export default function handleRostoDomMouseCoordinatesConverter({
  rosMapWebsocketWidth,
  rosMapWebsocketHeight,
  rosMapWidth,
  rosMapHeight,
  waypointX,
  waypointY,
  sceneScale,
}: any) {
  return {
    x:
      ((rosMapWebsocketWidth / rosMapWidth) * (rosMapWidth / 2 - waypointX) -
        rosMapWebsocketWidth) *
      -1,

    y: (rosMapWebsocketHeight / rosMapHeight) * (rosMapHeight / 2 - waypointY),
  };
}
