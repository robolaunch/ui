import { Html, useCursor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useState } from "react";
import Barcode from "react-barcode";
import * as THREE from "three";
import create from "zustand";

const useStore = create((set: any) => ({
  target: null,
  setTarget: (target: any) => set({ target }),
}));

export default function Machine3D(props: any) {
  const setTarget = useStore((state) => state.setTarget);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const meshRef: any = useRef();

  const { camera } = useThree();
  const frustum: any = useMemo(() => new THREE.Frustum(), []);
  const [isBoxInFrustum, setIsBoxInFrustum] = useState(true);

  useFrame(() => {
    if (!meshRef.current) return; // Geçerlilik kontrolü

    meshRef.current.updateMatrixWorld(); // Kutunun dünya koordinatlarındaki pozisyonunu güncelle

    frustum.setFromMatrix(
      new THREE.Matrix4().multiplyMatrices(
        camera.projectionMatrix,
        camera.matrixWorldInverse
      )
    ); // Kameraların görüş açısına ait frustum'ı oluştur

    // Kutunun dünya koordinatlarındaki pozisyonunu frustum ile kontrol et
    if (frustum.intersectsObject(meshRef.current)) {
      setIsBoxInFrustum(true);
    } else {
      setIsBoxInFrustum(false);
    }
  });

  if (!isBoxInFrustum) {
    return null; // Render nothing if the box is outside the frustum
  }

  return (
    <mesh
      {...props}
      onClick={(e) => setTarget(e.object)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={0.96}
    >
      <boxBufferGeometry args={[1, props.barcodes?.length, 1]} />
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
          >
            {props.barcodes?.map((barcode: any, barcodeIndex: number) => {
              return (
                <div className="flex items-center justify-center w-40 h-20 bg-yellow-400 border-[2px] border-layer-dark-800">
                  {barcode ? (
                    <Barcode
                      fontSize={16}
                      height={24}
                      width={0.5}
                      value={barcode}
                      background="transparent"
                    />
                  ) : (
                    "None"
                  )}
                </div>
              );
            })}
          </Html>
          {/* Front Face */}

          {/* Back Face */}
          <Html
            className="relative inset-0 flex flex-col items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[0, 0.1, -0.505]}
            transform
            occlude
          >
            {props.barcodes?.map((barcode: any, barcodeIndex: number) => {
              return (
                <div className="flex items-center justify-center w-40 h-20 bg-yellow-400 border-[2px] border-layer-dark-800">
                  {barcode ? (
                    <Barcode
                      fontSize={16}
                      height={24}
                      width={0.5}
                      value={barcode}
                      background="transparent"
                    />
                  ) : (
                    "None"
                  )}
                </div>
              );
            })}
          </Html>
          {/* Back Face */}

          {/* Right Face */}
          <Html
            className="relative inset-0 flex flex-col items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[0.501, 0.1, 0]}
            rotation={[0, Math.PI / 2, 0]}
            transform
            occlude
          >
            {props.barcodes?.map((barcode: any, barcodeIndex: number) => {
              return (
                <div className="flex items-center justify-center w-40 h-20 bg-yellow-400 border-[2px] border-layer-dark-800">
                  {barcode ? (
                    <Barcode
                      fontSize={16}
                      height={24}
                      width={0.5}
                      value={barcode}
                      background="transparent"
                    />
                  ) : (
                    "None"
                  )}
                </div>
              );
            })}
          </Html>
          {/* Right Face */}

          {/* Left Face */}
          <Html
            className="relative inset-0 flex flex-col items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[-0.505, 0.1, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            transform
            occlude
          >
            {props.barcodes?.map((barcode: any, barcodeIndex: number) => {
              return (
                <div className="flex items-center justify-center w-40 h-20 bg-yellow-400 border-[2px] border-layer-dark-800">
                  {barcode ? (
                    <Barcode
                      fontSize={16}
                      height={24}
                      width={0.5}
                      value={barcode}
                      background="transparent"
                    />
                  ) : (
                    "None"
                  )}
                </div>
              );
            })}
          </Html>
          {/* Left Face */}
        </group>
      )}
    </mesh>
  );
}
