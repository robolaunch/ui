export default function handleDomtoRosMouseCoordinatesConverter({
  domMapMouseX,
  domMapMouseY,
  sceneScale,
  rosMapWebsocketWidth,
  rosMapWebsocketHeight,
  rosMapWidth,
  rosMapHeight,
}: any) {
  return {
    x:
      domMapMouseX / sceneScale / (rosMapWebsocketWidth / rosMapWidth) -
      rosMapWidth / 2,

    y:
      (domMapMouseY / sceneScale / (rosMapWebsocketHeight / rosMapHeight) -
        rosMapHeight / 2) *
      -1,
  };
}
