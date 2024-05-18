import { Fragment, ReactElement } from "react";
import Card from "../Card/Card";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import BarcodeManagementControls from "../BarcodeManagementControls/BarcodeManagementControls";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

interface IBarcodeManagementWorkspace {
  children: ReactElement | ReactElement[];
}
export default function BarcodeManagementWorkspace({
  children,
}: IBarcodeManagementWorkspace): ReactElement {
  const handleFullScreen = useFullScreenHandle();

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
