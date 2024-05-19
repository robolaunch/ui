import { Fragment, ReactElement } from "react";
import Card from "../Card/Card";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import BarcodeManagementControls from "../BarcodeManagementControls/BarcodeManagementControls";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import useTaskManagement from "../../hooks/useTaskManagement";

interface IBarcodeManagementWorkspace {
  children: ReactElement | ReactElement[];
}
export default function BarcodeManagementWorkspace({
  children,
}: IBarcodeManagementWorkspace): ReactElement {
  const handleFullScreen = useFullScreenHandle();

  const { setBoardScale } = useTaskManagement();

  return (
    <Card className="relative">
      <FullScreen
        className="relative h-full w-full bg-white"
        handle={handleFullScreen}
      >
        <TransformWrapper
          initialPositionX={512}
          initialPositionY={-512 + 128 + 64}
          smooth={true}
          centerOnInit={false}
          centerZoomedOut={false}
          limitToBounds={false}
          minScale={0.01}
          maxScale={10}
          onPanningStart={(
            ref: ReactZoomPanPinchRef,
            event: MouseEvent | TouchEvent,
          ) => {
            console.log(ref, event);
          }}
          onWheel={(e) => {
            setBoardScale(e.state.scale);
          }}
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
