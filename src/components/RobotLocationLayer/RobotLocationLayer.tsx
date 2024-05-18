import { ReactElement, useEffect, useState } from "react";
import useFunctions from "../../hooks/useFunctions";
import { FaLocationArrow } from "react-icons/fa6";
import { Tooltip } from "@nextui-org/react";
import BoardPointToolTipContent from "../BoardPointToolTipContent/BoardPointToolTipContent";

export default function RobotLocationLayer(): ReactElement {
  const { getLocationFC } = useFunctions();

  const [location, setLocation] = useState<{
    translation: {
      x: number;
      y: number;
      z: number;
    };
    rotation: {
      x: number;
      y: number;
      z: number;
      w: number;
    };
  } | null>(null);

  useEffect(() => {
    handleGet();

    const timer = setInterval(() => {
      handleGet();
    }, 6000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleGet() {
    setLocation(await getLocationFC());
  }

  function quaternionToYaw(q: { x: number; y: number; z: number; w: number }) {
    // Assuming q is an object with properties x, y, z, and w
    const { x, y, z, w } = q;

    // Yaw calculation from quaternion
    const siny_cosp = 2 * (w * z + x * y);
    const cosy_cosp = 1 - 2 * (y * y + z * z);
    const yaw = Math.atan2(siny_cosp, cosy_cosp);

    return (yaw * 180) / Math.PI; // The yaw angle in radians
  }

  return (
    <Tooltip
      content={
        <BoardPointToolTipContent type="robot" robotPosition={location} />
      }
    >
      <div
        style={{
          position: "absolute",
          left: `${(location?.translation?.x || 0) * 100}px`,
          bottom: `${(location?.translation?.y || 0) * 100}px`,
          zIndex: 50,
          rotate: `${
            -quaternionToYaw(
              location?.rotation || {
                x: 0,
                y: 0,
                z: 0,
                w: 0,
              },
            ) + 45
          }deg`,
        }}
      >
        <FaLocationArrow className="text-secondary-500" />
      </div>
    </Tooltip>
  );
}
