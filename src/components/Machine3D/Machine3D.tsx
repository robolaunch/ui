import { Html, useCursor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { create } from "zustand";
import MachineBarcode from "../MachineBarcode/MachineBarcode";

interface IMachine3D {
  item: any;
}

export default function Machine3D({ item }: IMachine3D) {
  const useStore = create((set: any) => ({
    target: null,
    setTarget: (target: any) => set({ target }),
  }));

  const setTarget = useStore((state) => state.setTarget);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

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

  console.log(item);

  if (!isBoxInFrustum) {
    return null;
  }

  return (
    <mesh
      onClick={(e) => setTarget(e.object)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      scale={1}
      position={[
        item?.coordinates?.x,
        item?.barcodes?.length / 2,
        item?.coordinates?.y,
      ]}
      // position={[
      //   barcodeItem?.coordinates?.x,
      //   barcodeItem?.barcodes?.length / 2,
      //   barcodeItem?.coordinates?.y,
      // ]}
    >
      <boxBufferGeometry args={[0.25, item.barcodes?.length, 0.25]} />
      <meshNormalMaterial />
      {hovered && (
        <group>
          {/* Front Face */}
          <Html
            className="relative inset-0 flex flex-col items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[0, 0.1, 0.51]}
            transform
            occlude
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {item.barcodes?.map((barcode: any, barcodeIndex: number) => {
              return <MachineBarcode barcode={barcode?.barcode} />;
            })}
          </Html>
          {/* Front Face */}

          {/* Back Face */}
          <Html
            className="relative inset-0 flex flex-col items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[0, 0.1, -0.51]}
            transform
            occlude
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {item.barcodes?.map((barcode: any, barcodeIndex: number) => {
              return <MachineBarcode barcode={barcode?.barcode} />;
            })}
          </Html>
          {/* Back Face */}

          {/* Right Face */}
          <Html
            className="relative inset-0 flex flex-col items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[0.51, 0.1, 0]}
            rotation={[0, Math.PI / 2, 0]}
            transform
            occlude
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {item.barcodes?.map((barcode: any, barcodeIndex: number) => {
              return <MachineBarcode barcode={barcode?.barcode} />;
            })}
          </Html>
          {/* Right Face */}

          {/* Left Face */}
          <Html
            className="relative inset-0 flex flex-col items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[-0.51, 0.1, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            transform
            occlude
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {item.barcodes?.map((barcode: any, barcodeIndex: number) => {
              return <MachineBarcode barcode={barcode?.barcode} />;
            })}
          </Html>
          {/* Left Face */}
        </group>
      )}
    </mesh>
  );
}
