import Control3D from "../Control3D/Control3D";
import { Canvas } from "@react-three/fiber";
import React, { ReactElement } from "react";
import Light3D from "../Light3D/Light3D";
import Floor3D from "../Floor3D/Floor3D";

interface IScene3D {
  children?: ReactElement | ReactElement[];
  ros?: any;
}

export default function Scene3D({
  children,
  ros,
}: IScene3D): ReactElement<IScene3D> {
  return (
    <Canvas dpr={[1, 1]} gl={{ powerPreference: "high-performance" }}>
      {children}
      <Light3D />
      <Control3D />
      <Floor3D ros={ros} />
    </Canvas>
  );
}
