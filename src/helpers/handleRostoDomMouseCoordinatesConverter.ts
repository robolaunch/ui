export default function handleRostoDomMouseCoordinatesConverter({
  rosMapWebsocketWidth,
  rosMapWebsocketHeight,
  rosMapWidth,
  rosMapHeight,
  waypointX,
  waypointY,
}: any) {
  return {
    x:
      ((rosMapWebsocketWidth / rosMapWidth) * (rosMapWidth / 2 - waypointX) -
        rosMapWebsocketWidth) *
        -1 -
      10,

    y: (rosMapWebsocketHeight / rosMapHeight) * (rosMapHeight / 2 - waypointY),
  };
}
