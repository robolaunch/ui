import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useCursor } from "@react-three/drei";
import create from "zustand";
import useBarcodeManagement from "../../../hooks/useBarcodeManagement";
import { Html } from "@react-three/drei";

const useStore = create((set: any) => ({
  target: null,
  setTarget: (target: any) => set({ target }),
}));

function Box(props: any) {
  const setTarget = useStore((state) => state.setTarget);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);
  return (
    <mesh
      {...props}
      onClick={(e) => setTarget(e.object)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={0.94}
    >
      <boxGeometry />
      <meshNormalMaterial />
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
  const { barcodeItems }: any = useBarcodeManagement();
  console.log(barcodeItems);
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
              />
            );
          }
        );
      })}

      <Plane />
      <directionalLight position={[10, 10, 5]} />

      <OrbitControls makeDefault />
    </Canvas>
  );
}
