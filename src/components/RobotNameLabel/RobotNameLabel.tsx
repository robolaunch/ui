import ColorLabel from "../ColorLabel/ColorLabel";
import { useParams } from "react-router-dom";
import { ReactElement } from "react";

export default function RobotNameLabel(): ReactElement {
  const url = useParams();

  return (
    <span className="flex items-center gap-2">
      <span className="text-lg font-medium">{url?.robotName}</span>
      <ColorLabel />
    </span>
  );
}
