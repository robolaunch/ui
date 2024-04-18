import { ReactElement } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import BarcodeManagement2D from "./BarcodeManagement2D";
import BarcodeManagementControls from "../../../components/BarcodeManagementControls/BarcodeManagementControls";
import Card from "../../../components/Card/Card";
import BarcodeManagementSidebar from "../../../components/BarcodeManagementSidebar/BarcodeManagementSidebar";

export default function BarcodeManagement(): ReactElement {
  const handleFullScreen = useFullScreenHandle();

  return (
    <div className="flex h-full w-full gap-6">
      <BarcodeManagementSidebar />
      <Card className="relative">
        <FullScreen
          className="relative h-full w-full"
          handle={handleFullScreen}
        >
          <BarcodeManagement2D />
          <BarcodeManagementControls
            handleFullScreen={
              handleFullScreen.active
                ? handleFullScreen.exit
                : handleFullScreen.enter
            }
          />
        </FullScreen>
      </Card>
    </div>
  );
}
