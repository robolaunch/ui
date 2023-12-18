import React, { Fragment, ReactElement, useState } from "react";
import CardLayout from "../../../layouts/CardLayout";
import BarcodeManagement3D from "./BarcodeManagement3D";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import BarcodeManagement2D from "./BarcodeManagement2D";
import BarcodeModeToggle from "../../../components/BarcodeModeToggle/BarcodeModeToggle";

export default function BarcodeManagement({ ros }: any): ReactElement {
  const [activeTab, setActiveTab] = useState<"2D" | "3D">("3D");
  const handleFullScreen = useFullScreenHandle();

  return (
    <CardLayout className="!relative h-[40rem]">
      <FullScreen className="!relative h-full" handle={handleFullScreen}>
        <Fragment>
          {activeTab === "2D" ? (
            <BarcodeManagement2D />
          ) : (
            <BarcodeManagement3D ros={ros} />
          )}
        </Fragment>
      </FullScreen>
      <BarcodeModeToggle
        handleFullScreen={handleFullScreen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </CardLayout>
  );
}
