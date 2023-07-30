import React, { ReactElement } from "react";
import { MapControls } from "@react-three/drei";

export default function Control3D(): ReactElement {
  return <MapControls makeDefault enableDamping />;
}
