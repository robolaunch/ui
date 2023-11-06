import RobotHeaderTabs from "../RobotHeaderTabs/RobotHeaderTabs";
import RobotResource from "../RobotResource/RobotResource";
import Connections from "../Connections/Connections";
import { IoLocationOutline } from "react-icons/io5";
import ColorLabel from "../ColorLabel/ColorLabel";
import CardLayout from "../../layouts/CardLayout";
import { AiOutlineTeam } from "react-icons/ai";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";

export default function RobotHeader(): ReactElement {
  const { selectedState } = useMain();
  const url = useParams();

  return (
    <div data-tut="robot-header" className="col-span-full">
      <CardLayout className="flex w-full flex-col gap-8 px-8 !pb-0 pt-6">
        <div className="flex items-center justify-between">
          <div data-tut="robot-information" className="flex h-full gap-8">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">{url?.robotName}</span>
              <ColorLabel />
            </div>
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
          <div className="hidden h-full gap-8 text-xs font-medium text-layer-dark-400 md:flex">
            <div className="flex  flex-col items-end justify-around gap-2.5">
              <Connections />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <RobotHeaderTabs />
          <RobotResource />
        </div>
      </CardLayout>
    </div>
  );
}
