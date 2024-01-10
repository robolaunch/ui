import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useMemo, useState } from "react";
import useBarcode from "../../hooks/useBarcode";
import { useFrame } from "@react-three/fiber";

export default function Robot3D() {
  const { robotLocation } = useBarcode();

  const meshRef: any = useRef();
  const [robotModel, setRobotModel] = useState(null);

  useMemo(() => {
    const loader = new GLTFLoader();
    loader.load(
      "/models/robotModel.glb",
      (gltf: any) => {
        console.log("Robot model loaded:", gltf);
        setRobotModel(gltf.scene);
      },
      (gltf: any) => {
        console.log("Robot model loading:", gltf);
      },
      (error) => {
        console.error("Error loading the 3D model:", error);
      },
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
      position={[robotLocation?.y, 0, robotLocation?.x]}
      rotation={[0, robotLocation?.z, 0]}
    />
  );
}
