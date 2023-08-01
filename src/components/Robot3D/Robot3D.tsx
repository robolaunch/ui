import React, { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { create } from "zustand";
import useBarcode from "../../hooks/useBarcode";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const useStore = create((set) => ({
  target: null,
  setTarget: (target: any) => set({ target }),
}));

export default function Robot3D() {
  const setTarget = useStore((state: any) => state.setTarget);
  const { robotLocation } = useBarcode();

  const meshRef: any = useRef();
  const [robotModel, setRobotModel] = useState(null);

  useMemo(() => {
    const loader = new GLTFLoader();
    loader.load(
      "/models/robot.glb",
      (gltf: any) => {
        console.log("Robot model loaded:", gltf);
        setRobotModel(gltf.scene);
      },
      undefined,
      (error) => {
        console.error("Error loading the 3D model:", error);
      }
    );
  }, []);

  useFrame(() => {
    if (!meshRef.current || !robotModel) return;

    meshRef.current.updateMatrixWorld();
  });

  if (!robotModel) {
    return null;
  }

  return (
    <primitive
      object={robotModel}
      ref={meshRef}
      onClick={(e: any) => setTarget(e.object)}
      position={[robotLocation?.y, 0, robotLocation?.x]}
      rotation={[0, robotLocation?.z, 0]}
    />
  );
}
