import { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Html,
  MapControls,
  OrbitControls,
  OrthographicCamera,
  useCursor,
} from "@react-three/drei";
import create from "zustand";
import useBarcodeManagement from "../../../hooks/useBarcodeManagement";
import Barcode from "react-barcode";
import * as THREE from "three";
import ROSLIB from "roslib";

const useStore = create((set: any) => ({
  target: null,
  setTarget: (target: any) => set({ target }),
}));

function Box(props: any) {
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
      scale={0.6}
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
            position={[0.505, 0.1, 0]}
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

function Plane(props: any) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeBufferGeometry args={[2500, 2500]} />
      <meshStandardMaterial color="#FFF" />
    </mesh>
  );
}

export default function App({ ros }: any) {
  const [robotLocation, setRobotLocation] = useState({
    x: 5,
    y: -4,
    z: 0,
  });

  useEffect(() => {
    var poseTopic = new ROSLIB.Topic({
      ros: ros,
      name: "/robot_position",
      messageType: "geometry_msgs/msg/PoseStamped",
    });

    poseTopic.subscribe(function (pose: any) {
      if (
        pose?.pose?.position?.x.toFixed(3) !== robotLocation?.x.toFixed(3) &&
        pose?.pose?.position?.y.toFixed(3) !== robotLocation?.y.toFixed(3)
      ) {
        setRobotLocation(pose?.pose?.position);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { barcodeItems } = useBarcodeManagement();

  return (
    <Canvas dpr={[1, 2]} gl={{ powerPreference: "high-performance" }}>
      {barcodeItems?.map((barcodeItem: any, barcodeItemIndex: number) => {
        return (
          <Box
            key={`${barcodeItemIndex}`}
            position={[
              barcodeItem?.coordinates?.x,
              barcodeItem?.barcodes?.length / 3.33,
              barcodeItem?.coordinates?.y,
            ]}
            barcodes={barcodeItem?.barcodes}
          />
        );
      })}
      <Box
        color="red"
        scale={0.1}
        position={[robotLocation?.x, 0.5, robotLocation?.y]}
      />
      <directionalLight position={[10, 15, 5]} />
      <Plane />

      <MapControls makeDefault enableDamping />
    </Canvas>
  );
}
