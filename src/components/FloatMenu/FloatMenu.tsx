import { useState } from "react";
import { CircleMenu, CircleMenuItem } from "react-circular-menu";
import { AiOutlineCode, AiOutlinePlus } from "react-icons/ai";
import { handleAddWidget } from "../../helpers/gridStack";
import {
  BsBatteryFull,
  BsCameraVideo,
  BsJoystick,
  BsPinMap,
} from "react-icons/bs";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { IoMdCodeWorking } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import { BiErrorCircle } from "react-icons/bi";

interface IFloatMenu {
  grid: any;
  type: string;
  ros: any;
  topicList: any;
  localStoragePath: string;
  handleRemoveWidget: any;
  handleForceUpdate: any;
}

export function FloatMenu({
  grid,
  type,
  ros,
  topicList,
  localStoragePath,
  handleRemoveWidget,
  handleForceUpdate,
}: IFloatMenu) {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div className="fixed bottom-5  left-1/2 right-1/2 z-10 block">
      <CircleMenu
        startAngle={180}
        rotationAngle={180}
        itemSize={2}
        radius={12}
        rotationAngleInclusive={true}
        menuToggleElement={
          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-layer-light-200 bg-layer-light-50 transition-all duration-500 hover:scale-90 hover:bg-layer-light-100">
            <AiOutlinePlus
              size={24}
              className={`text-layer-dark-900 ${
                isOpenMenu && "rotate-45"
              } transition-all duration-500`}
            />
          </div>
        }
        onMenuToggle={(isOpen) => {
          setIsOpenMenu(isOpen);
        }}
      >
        <CircleMenuItem
          tooltip="Camera"
          className="!border !border-layer-light-600 shadow-xl hover:scale-90 hover:!bg-layer-light-200"
          onClick={() =>
            handleAddWidget({
              widget: "RosCameraWidget",
              grid,
              type,
              ros,
              topicList,
              localStoragePath,
              handleRemoveWidget,
              handleForceUpdate,
            })
          }
        >
          <BsCameraVideo size={24} className="text-layer-light-800" />
        </CircleMenuItem>

        <CircleMenuItem
          tooltip="cmd_vel Logs"
          className="!border !border-layer-light-600 shadow-xl hover:scale-90 hover:!bg-layer-light-200"
          onClick={() =>
            handleAddWidget({
              widget: "RosCmdVelWidget",
              grid,
              type,
              ros,
              topicList,
              localStoragePath,
              handleRemoveWidget,
              handleForceUpdate,
            })
          }
        >
          <AiOutlineCode size={26} className="text-layer-light-800" />
        </CircleMenuItem>

        <CircleMenuItem
          tooltip="Topic List"
          className="!border !border-layer-light-600 shadow-xl hover:scale-90 hover:!bg-layer-light-200"
          onClick={() =>
            handleAddWidget({
              grid,
              widget: "RosTopicListWidget",
              type,
              ros,
              topicList,
              localStoragePath,
              handleRemoveWidget,
              handleForceUpdate,
            })
          }
        >
          <AiOutlineUnorderedList size={26} className="text-layer-light-800" />
        </CircleMenuItem>

        <CircleMenuItem
          tooltip="ros_out Logs"
          className="!border !border-layer-light-600 shadow-xl hover:scale-90 hover:!bg-layer-light-200"
          onClick={() =>
            handleAddWidget({
              grid,
              widget: "RosRosOutWidget",
              type,
              ros,
              topicList,
              localStoragePath,
              handleRemoveWidget,
              handleForceUpdate,
            })
          }
        >
          <IoMdCodeWorking size={26} className="text-layer-light-800" />
        </CircleMenuItem>

        <CircleMenuItem
          tooltip="Map"
          className="!border !border-layer-light-600 shadow-xl hover:scale-90 hover:!bg-layer-light-200"
          onClick={() =>
            handleAddWidget({
              grid,
              widget: "RosMapWidget",
              type,
              ros,
              topicList,
              localStoragePath,
              handleRemoveWidget,
              handleForceUpdate,
            })
          }
        >
          <BsPinMap size={20} className="text-layer-light-800" />
        </CircleMenuItem>

        <CircleMenuItem
          tooltip="Network"
          className="!border !border-layer-light-600 shadow-xl hover:scale-90 hover:!bg-layer-light-200"
          onClick={() =>
            handleAddWidget({
              grid,
              widget: "RosNetworkWidget",
              type,
              ros,
              topicList,
              localStoragePath,
              handleRemoveWidget,
              handleForceUpdate,
            })
          }
        >
          <BsPinMap size={20} className="text-layer-light-800" />
        </CircleMenuItem>

        <CircleMenuItem
          tooltip="Resorce Usage"
          className="!border !border-layer-light-600 shadow-xl hover:scale-90 hover:!bg-layer-light-200"
          onClick={() =>
            handleAddWidget({
              grid,
              widget: "RosResourceUsageWidget",
              type,
              ros,
              topicList,
              localStoragePath,
              handleRemoveWidget,
              handleForceUpdate,
            })
          }
        >
          <GoGraph size={20} className="text-layer-light-800" />
        </CircleMenuItem>

        <CircleMenuItem
          tooltip="Emergency Control"
          className="!border !border-layer-light-600 shadow-xl hover:scale-90 hover:!bg-layer-light-200"
          onClick={() =>
            handleAddWidget({
              grid,
              widget: "RosEmergencyControlWidget",
              type,
              ros,
              topicList,
              localStoragePath,
              handleRemoveWidget,
              handleForceUpdate,
            })
          }
        >
          <BiErrorCircle size={20} className="text-layer-light-800" />
        </CircleMenuItem>

        <CircleMenuItem
          tooltip="Battery"
          className="!border !border-layer-light-600 shadow-xl hover:scale-90 hover:!bg-layer-light-200"
          onClick={() =>
            handleAddWidget({
              grid,
              widget: "RosBatteryWidget",
              type,
              ros,
              topicList,
              localStoragePath,
              handleRemoveWidget,
              handleForceUpdate,
            })
          }
        >
          <BsBatteryFull size={22} className="text-layer-light-800" />
        </CircleMenuItem>

        <CircleMenuItem
          tooltip="Joystick"
          className="!border !border-layer-light-600 shadow-xl hover:scale-90 hover:!bg-layer-light-200"
          onClick={() =>
            handleAddWidget({
              grid,
              widget: "RosJoystickWidget",
              type,
              ros,
              topicList,
              localStoragePath,
              handleRemoveWidget,
              handleForceUpdate,
            })
          }
        >
          <BsJoystick size={22} className="text-layer-light-800" />
        </CircleMenuItem>
      </CircleMenu>
    </div>
  );
}
