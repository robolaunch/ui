import { Canvas } from "@react-three/fiber";
import React, { ReactElement } from "react";
import Light3D from "../Light3D/Light3D";
import Control3D from "../Control3D/Control3D";
import Floor3D from "../Floor3D/Floor3D";
import Machine3D from "../Machine3D/Machine3D";

interface IScene3D {
  children?: ReactElement | ReactElement[];
}

export default function Scene3D({
  children,
}: IScene3D): ReactElement<IScene3D> {
  return (
    <Canvas dpr={[1, 1]} gl={{ powerPreference: "high-performance" }}>
      {children}

      <Machine3D
        item={{
          barcodes: [""],
          coordinates: {
            x: 1,
            y: 1,
            z: 1,
          },
        }}
      />

      <Light3D />
      <Control3D />
      <Floor3D />
    </Canvas>
  );
}
