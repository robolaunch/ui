import { Html, useCursor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import MachineBarcode from "../MachineBarcode/MachineBarcode";

interface IMachine3D {
  item: {
    barcodes: any[];
    coordinates: {
      x: number;
      y: number;
      z: number;
    };
  };
}

export default function Machine3D({ item }: IMachine3D) {
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

  if (!isBoxInFrustum) {
    return null;
  }

  return (
    <mesh
      onPointerEnter={() => !hovered && setHovered(true)}
      onPointerLeave={() => hovered && setHovered(false)}
      scale={1}
      position={[
        item?.coordinates?.y,
        item?.barcodes?.length / 2,
        item?.coordinates?.x,
      ]}
    >
      <boxBufferGeometry args={[0.75, item.barcodes?.length, 0.75]} />
      <meshNormalMaterial />
      {hovered && (
        <group>
          {/* Front Face */}
          <Html
            className="relative inset-0 flex flex-col items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[0, 0.1, 0.378]}
            transform
            occlude
            onMouseEnter={() => !hovered && setHovered(true)}
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
            position={[0, 0.1, -0.378]}
            transform
            occlude
            onMouseEnter={() => !hovered && setHovered(true)}
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
            position={[0.378, 0.1, 0]}
            rotation={[0, Math.PI / 2, 0]}
            transform
            occlude
            onMouseEnter={() => !hovered && setHovered(true)}
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
            position={[-0.378, 0.1, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            transform
            occlude
            onMouseEnter={() => !hovered && setHovered(true)}
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