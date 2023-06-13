import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, useCursor } from "@react-three/drei";
import create from "zustand";
import useBarcodeManagement from "../../../hooks/useBarcodeManagement";
import Barcode from "react-barcode";

const useStore = create((set: any) => ({
  target: null,
  setTarget: (target: any) => set({ target }),
}));

function Box(props: any) {
  const setTarget = useStore((state) => state.setTarget);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  console.log(props);

  return (
    <mesh
      {...props}
      onClick={(e) => setTarget(e.object)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={0.98}
    >
      <boxGeometry />
      <meshNormalMaterial />
      <group>
        {/* Front Face */}
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
          <Html
            className="relative inset-0 flex items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[0, 0.1, 0.51]}
            transform
            occlude
          >
            <div className="flex items-center justify-center w-40 h-20 bg-yellow-400 border-[2px] border-layer-dark-800">
              {props?.barcode ? (
                <Barcode
                  fontSize={16}
                  height={24}
                  width={0.5}
                  value={props?.barcode}
                  background="transparent"
                />
              ) : (
                <span className="text-xs">None</span>
              )}
            </div>
          </Html>
        </mesh>

        {/* Back Face */}
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
          <Html
            className="relative inset-0 flex items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[0, 0.1, -0.505]}
            transform
            occlude
          >
            <div className="flex items-center justify-center w-40 h-20 bg-yellow-400 border-[2px] border-layer-dark-800">
              {props?.barcode ? (
                <Barcode
                  fontSize={16}
                  height={24}
                  width={0.5}
                  value={props?.barcode}
                  background="transparent"
                />
              ) : (
                <span className="text-xs">None</span>
              )}
            </div>
          </Html>
        </mesh>

        {/* Right Face */}
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
          <Html
            className="relative inset-0 flex items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[0.505, 0.1, 0]}
            rotation={[0, Math.PI / 2, 0]}
            transform
            occlude
          >
            <div className="flex items-center justify-center w-40 h-20 bg-yellow-400 border-[2px] border-layer-dark-800">
              {props?.barcode ? (
                <Barcode
                  fontSize={16}
                  height={24}
                  width={0.5}
                  value={props?.barcode}
                  background="transparent"
                />
              ) : (
                <span className="text-xs">None</span>
              )}
            </div>
          </Html>
        </mesh>

        {/* Left Face */}
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
          <Html
            className="relative inset-0 flex items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[-0.505, 0.1, 0]}
            rotation={[0, -Math.PI / 2, 0]}
            transform
            occlude
          >
            <div className="flex items-center justify-center w-40 h-20 bg-yellow-400 border-[2px] border-layer-dark-800">
              {props?.barcode ? (
                <Barcode
                  fontSize={16}
                  height={24}
                  width={0.5}
                  value={props?.barcode}
                  background="transparent"
                />
              ) : (
                <span className="text-xs">None</span>
              )}
            </div>
          </Html>
        </mesh>

        {/* Top Face */}
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
          <Html
            className="relative inset-0 flex items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[0, 0.505, 0.1]}
            rotation={[Math.PI / 2, 0, 0]}
            transform
            occlude
          >
            <div className="flex items-center justify-center w-40 h-20 bg-yellow-400 border-[2px] border-layer-dark-800">
              {props?.barcode ? (
                <Barcode
                  fontSize={16}
                  height={24}
                  width={0.5}
                  value={props?.barcode}
                  background="transparent"
                />
              ) : (
                <span className="text-xs">None</span>
              )}
            </div>
          </Html>
        </mesh>

        {/* Bottom Face */}
        <mesh>
          <boxGeometry />
          <meshNormalMaterial />
          <Html
            className="relative inset-0 flex items-center justify-center w-full h-full"
            distanceFactor={1.5}
            position={[0, -0.505, -0.1]}
            rotation={[-Math.PI / 2, 0, 0]}
            transform
            occlude
          >
            <div className="flex items-center justify-center w-40 h-20 bg-yellow-400 border-[2px] border-layer-dark-800">
              {props?.barcode ? (
                <Barcode
                  fontSize={16}
                  height={24}
                  width={0.5}
                  value={props?.barcode}
                  background="transparent"
                />
              ) : (
                <span className="text-xs">None</span>
              )}
            </div>
          </Html>
        </mesh>
      </group>
    </mesh>
  );
}

function Plane(props: any) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeBufferGeometry args={[2500, 2500]} />
      <meshStandardMaterial color="#FFF" />
    </mesh>
  );
}

export default function App() {
  const { barcodeItems } = useBarcodeManagement();
  return (
    <Canvas dpr={[1, 2]}>
      {barcodeItems?.map((barcodeItem: any, barcodeItemIndex: number) => {
        return barcodeItem?.barcodes?.map(
          (barcode: any, barcodeIndex: number) => {
            return (
              <Box
                key={`${barcodeItemIndex}-${barcodeIndex}`}
                position={[
                  barcodeItem?.coordinates?.x,
                  barcodeIndex,
                  barcodeItem?.coordinates?.y,
                ]}
                barcode={barcode}
              />
            );
          }
        );
      })}

      <directionalLight position={[10, 10, 5]} />
      <Plane />

      <OrbitControls makeDefault />
    </Canvas>
  );
}
