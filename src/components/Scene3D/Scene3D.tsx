import Control3D from "../Control3D/Control3D";
import { Canvas } from "@react-three/fiber";
import { Fragment, ReactElement } from "react";
import Light3D from "../Light3D/Light3D";
import Floor3D from "../Floor3D/Floor3D";

interface IScene3D {
  children?: ReactElement | ReactElement[];
}

export default function Scene3D({
  children,
}: IScene3D): ReactElement<IScene3D> {
  return (
    <Canvas dpr={[1, 1]} gl={{ powerPreference: "high-performance" }}>
      <Fragment>{children}</Fragment>
      <Light3D />
      <Control3D />
      <Floor3D />
    </Canvas>
  );
}
