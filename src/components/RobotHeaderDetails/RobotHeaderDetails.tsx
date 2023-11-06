import { ReactElement } from "react";
import ColorLabel from "../ColorLabel/ColorLabel";
import { useParams } from "react-router-dom";
import { AiOutlineTeam } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import useMain from "../../hooks/useMain";

export default function RobotHeaderDetails(): ReactElement {
  const url = useParams();
  const { selectedState } = useMain();

  return (
    <div
      data-tut="robot-information"
      className="flex h-full gap-8 text-layer-dark-600"
    >
      <span className="flex items-center gap-2">
        <span className="text-lg font-medium">{url?.robotName}</span>
        <ColorLabel />
      </span>
      <span className="flex items-center gap-2">
        <AiOutlineTeam size={16} />
        <span className="text-xs font-light">
          {url?.organizationName} Organization
        </span>
      </span>
      <span className="flex items-center gap-2">
        <IoLocationOutline size={16} />
        <span className="text-xs font-light">
          {selectedState?.roboticsCloud?.region}
        </span>
      </span>
    </div>
  );
}
