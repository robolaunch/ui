import { ReactElement, useEffect, useState } from "react";
import useFunctions from "../../hooks/useFunctions";

export default function RobotLocationLayer(): ReactElement {
  const { getLocationFC } = useFunctions();

  const [location, setLocation] = useState<{
    translation: {
      x: number;
      y: number;
      z: number;
    };
    orientation: {
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
    <div
      className="absolute h-4 w-4 rounded-full bg-secondary-500"
      style={{
        left: `${(location?.translation?.x || 0) * 100}px`,
        bottom: `${(location?.translation?.y || 0) * 100}px`,
        zIndex: 50,
      }}
    />
  );
}
