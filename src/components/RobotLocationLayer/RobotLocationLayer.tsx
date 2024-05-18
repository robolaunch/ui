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
          rotate: `45deg`,
        }}
      >
        <FaLocationArrow className="text-secondary-500" />
      </div>
    </Tooltip>
  );
}
