import { AiOutlinePauseCircle } from "react-icons/ai";
import { BsFlag, BsCameraVideo } from "react-icons/bs";

export default function getWaypointIcon({
  type,
  size,
}: {
  type: string;
  size?: number;
}) {
  const iconSize = size || 20;

  switch (type) {
    case "move":
      return <BsFlag size={iconSize} />;
    case "wait":
      return <AiOutlinePauseCircle size={iconSize} />;
    case "picture":
      return <BsCameraVideo size={iconSize} />;
  }
}
