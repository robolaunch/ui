import { ReactElement } from "react";
import { MdMyLocation } from "react-icons/md";
import { IWaypoint } from "../../interfaces/task-management.interface";
import { BsArrowsMove } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";

interface IBPToolTipContent {
  type: "waypoint" | "center" | "robot";
  waypoint?: IWaypoint;
  robotPosition?: {
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
  } | null;
}

export default function BoardPointToolTipContent({
  type,
  waypoint,
  robotPosition,
}: IBPToolTipContent): ReactElement {
  const domTitle = () => {
    switch (type) {
      case "waypoint":
        return "Waypoint";
      case "center":
        return "Center Point";
      case "robot":
        return "Robot Position";
      default:
        return "";
    }
  };

  const domIcon = () => {
    switch (type) {
      case "waypoint":
        return <MdMyLocation size={18} />;
      case "center":
        return <BsArrowsMove size={18} />;
      case "robot":
        return <FaLocationArrow size={14} />;
      default:
        return "";
    }
  };

  const domContent = () => {
    switch (type) {
      case "waypoint":
        return (
          <ul className="flex flex-col items-center gap-1">
            <li>{waypoint!.waypoint_name}</li>
            <li>
              X: {waypoint!.position_x.toFixed(3)}
              {" | "}Y: {waypoint!.position_y.toFixed(3)}
              {" | "}Z: {waypoint!.position_z.toFixed(3)}
            </li>
            <li>
              W: {waypoint!.orientation_w.toFixed(3)}
              {" | "}
              X: {waypoint!.orientation_x.toFixed(3)}
              {" | "}
              Y: {waypoint!.orientation_y.toFixed(3)}
              {" | "}
              Z: {waypoint!.orientation_z.toFixed(3)}
            </li>
          </ul>
        );
      case "center":
        return (
          <ul className="flex flex-col items-center gap-1">
            <li>
              X: 0{" | "}Y: 0{" | "}Z: 0{" "}
            </li>{" "}
          </ul>
        );

      case "robot":
        return (
          <ul className="flex flex-col items-center gap-1">
            <li>
              X: {robotPosition?.translation?.x?.toFixed(3)}
              {" | "}Y: {robotPosition?.translation?.y?.toFixed(3)}
              {" | "}Z: {robotPosition?.translation?.z?.toFixed(3)}
            </li>
            <li>
              W: {robotPosition?.rotation?.w?.toFixed(3)}
              {" | "}
              X: {robotPosition?.rotation?.x?.toFixed(3)}
              {" | "}
              Y: {robotPosition?.rotation?.y?.toFixed(3)}
              {" | "}
              Z: {robotPosition?.rotation?.z?.toFixed(3)}
            </li>
          </ul>
        );

      default:
        return "";
    }
  };

  const domColor = () => {
    switch (type) {
      case "waypoint":
        return "bg-primary-950 text-primary-200";
      case "center":
        return "bg-red-950 text-red-200";
      case "robot":
        return "bg-secondary-950 text-secondary-200";
      default:
        return "";
    }
  };

  return (
    <div className={`flex flex-col gap-2 rounded p-2 text-xs ${domColor()}`}>
      <div className="flex items-center justify-center gap-1.5 ">
        {domIcon()}
        <p className="text-center font-bold">{domTitle()}</p>
      </div>
      {domContent() && <div>{domContent()}</div>}
    </div>
  );
}
