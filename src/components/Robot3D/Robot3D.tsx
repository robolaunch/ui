import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import create from "zustand";
import useBarcode from "../../hooks/useBarcode";

const useStore = create((set: any) => ({
  target: null,
  setTarget: (target: any) => set({ target }),
}));

export default function Robot3D() {
  const setTarget = useStore((state) => state.setTarget);
  const { robotLocation } = useBarcode();

  const meshRef: any = useRef();

  const { camera } = useThree();
  const frustum: any = useMemo(() => new THREE.Frustum(), []);
  const [isBoxInFrustum, setIsBoxInFrustum] = useState(true);

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.updateMatrixWorld();

    frustum.setFromMatrix(
      new THREE.Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      )
    );
    if (frustum.intersectsObject(meshRef.current)) {
      setIsBoxInFrustum(true);
    } else {
      setIsBoxInFrustum(false);
    }
  });

  if (!isBoxInFrustum) {
    return null;
  }

  return (
    <mesh
      onClick={(e) => setTarget(e.object)}
      position={[robotLocation?.x || 0, 0.125, robotLocation?.y || 0]}
    >
      <boxBufferGeometry args={[0.25, 0.25, 0.25]} />
      <meshNormalMaterial />
    </mesh>
  );
}
