import React, { Fragment } from "react";

export default function Floor3D(props: any) {
  return (
    <Fragment>
      <color attach="background" args={["#FFFFF0"]} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeBufferGeometry args={[2500, 2500]} />
        <meshStandardMaterial color="#f5e5ff" />
      </mesh>
    </Fragment>
  );
}
