import { Dispatch, Fragment, ReactElement, SetStateAction } from "react";
import Card from "../Card/Card";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import BarcodeManagementControls from "../BarcodeManagementControls/BarcodeManagementControls";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface IBarcodeManagementWorkspace {
  children: ReactElement | ReactElement[];
  dragging: boolean;
  setDragging: Dispatch<SetStateAction<boolean>>;
}
export default function BarcodeManagementWorkspace({
  children,
  dragging,
  setDragging,
}: IBarcodeManagementWorkspace): ReactElement {
  const handleFullScreen = useFullScreenHandle();

  return (
    <Card className="relative">
      <FullScreen
        className="relative h-full w-full bg-white"
        handle={handleFullScreen}
      >
        <TransformWrapper
          initialPositionX={650}
          initialPositionY={325}
          smooth={true}
          centerOnInit={false}
          centerZoomedOut={false}
          limitToBounds={false}
          minScale={0.01}
          maxScale={10}
          onPanningStart={() => !dragging && setDragging(true)}
          onPanningStop={() => dragging && setDragging(false)}
          onPinchingStart={() => !dragging && setDragging(true)}
          onPinchingStop={() => dragging && setDragging(false)}
          onWheelStart={() => !dragging && setDragging(true)}
          onWheelStop={() => dragging && setDragging(false)}
          onZoomStart={() => !dragging && setDragging(true)}
          onZoomStop={() => dragging && setDragging(false)}
        >
          <TransformComponent>
            <Fragment>{children}</Fragment>
          </TransformComponent>
        </TransformWrapper>
        <BarcodeManagementControls
          handleFullScreen={
            handleFullScreen.active
              ? handleFullScreen.exit
              : handleFullScreen.enter
          }
        />
      </FullScreen>
    </Card>
  );
}
