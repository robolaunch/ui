import { Fragment, ReactElement, useState } from "react";
import BarcodeManagement3D from "./BarcodeManagement3D";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import BarcodeManagement2D from "./BarcodeManagement2D";
import BarcodeManagementControls from "../../../components/BarcodeManagementControls/BarcodeManagementControls";
import Card from "../../../components/Card/Card";

export default function BarcodeManagement({ ros }: any): ReactElement {
  const [activeTab, setActiveTab] = useState<"2D" | "3D">("3D");

  const handleFullScreen = useFullScreenHandle();

  return (
    <Card className="relative">
      <FullScreen className="relative h-full w-full" handle={handleFullScreen}>
        <Fragment>
          {activeTab === "2D" ? (
            <BarcodeManagement2D />
          ) : (
            <BarcodeManagement3D ros={ros} />
          )}
        </Fragment>
        <BarcodeManagementControls
          handleFullScreen={
            handleFullScreen.active
              ? handleFullScreen.exit
              : handleFullScreen.enter
          }
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </FullScreen>
    </Card>
  );
}
