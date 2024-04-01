import { ReactElement } from "react";

export default function Light3D(): ReactElement {
  return <directionalLight position={[1, 1, 1]} intensity={1} />;
}
