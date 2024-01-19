import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Item, Menu, Separator, Submenu } from "react-contexify";
import getWaypointIcon from "../../helpers/GetWaypointIcon";
import { IoSettingsOutline } from "react-icons/io5";
import { ReactElement } from "react";

interface ITaskManagementContextMenu {
  handleAddWaypointToMission: ({
    type,
    x,
    y,
  }: {
    type: string;
    x?: number;
    y?: number;
  }) => void;
  MENU_ID: string;
  activeMission: number;
  handleCostMap: () => void;
  isCostMapActive: boolean;
}

export default function TaskManagementContextMenu({
  handleAddWaypointToMission,
  MENU_ID,
  activeMission,
  handleCostMap,
  isCostMapActive,
}: ITaskManagementContextMenu): ReactElement {
  return (
    <Menu className="flex flex-col gap-2" id={MENU_ID}>
      <Item className="hover:!bg-light-100" onClick={() => {}}>
        <div className="flex items-center gap-2 text-light-500">
          {getWaypointIcon({
            type: "go",
            size: 20,
          })}
          <span className="text-sm">Go now</span>
        </div>
      </Item>
      <Item
        disabled={activeMission === -1 ? true : false}
        onClick={() => handleAddWaypointToMission({ type: "wait" })}
      >
        <div className="flex items-center gap-2 text-light-500">
          {getWaypointIcon({
            type: "wait",
            size: 20,
          })}
          <span className="text-sm">Add Wait Task</span>
        </div>
      </Item>
      <Item
        disabled={activeMission === -1 ? true : false}
        onClick={() =>
          handleAddWaypointToMission({
            type: "move",
          })
        }
      >
        <div className="flex items-center gap-2 text-light-500">
          {getWaypointIcon({
            type: "move",
            size: 20,
          })}
          <span className="text-sm">Add Move Task</span>
        </div>
      </Item>
      <Item
        disabled={activeMission === -1 ? true : false}
        onClick={() =>
          handleAddWaypointToMission({
            type: "picture",
          })
        }
      >
        <div className="flex items-center gap-2 text-light-500">
          {getWaypointIcon({
            type: "picture",
            size: 20,
          })}
          <span className="text-sm">Add Picture Task</span>
        </div>
      </Item>
      <Separator />
      <Submenu
        label={
          <div className="flex items-center gap-2 text-light-500">
            <IoSettingsOutline size={20} />
            <span className="text-sm">Map Settings</span>
          </div>
        }
      >
        <Item onClick={() => handleCostMap()}>
          <div className="flex items-center gap-2 text-light-500">
            {isCostMapActive ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
            <span className="text-sm">
              {isCostMapActive ? "Hide Cost Map" : "Show Cost Map"}
            </span>
          </div>
        </Item>
      </Submenu>
    </Menu>
  );
}
