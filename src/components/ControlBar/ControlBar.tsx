import RestartService from "../RestartServiceButton/RestartServiceButton";
import FullScreenService from "../FullScreenService/FullScreenService";
import VDIVolumeControl from "../VDIVolumeControl/VDIVolumeControl";
import VDIControlButton from "../VDIControlButton/VDIControlButton";
import { ReactElement, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import FileBrowser from "../FileBrowser/FileBrowser";
import ServiceJobs from "../ServiceJobs/ServiceJobs";
import ServiceLogs from "../ServiceLogs/ServiceLogs";
import { FullScreenHandle } from "react-full-screen";

interface IControlBar {
  type: "ide" | "vdi" | "jupyter-notebook";
  handleFullScreen: FullScreenHandle;
}

export default function ControlBar({
  type,
  handleFullScreen,
}: IControlBar): ReactElement {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div className="absolute bottom-0 left-1/2 right-1/2 flex flex-col items-center">
      <button
        className="rounded-t-lg bg-light-100 px-3 py-0.5"
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        {isOpenMenu ? (
          <MdOutlineKeyboardArrowDown />
        ) : (
          <MdOutlineKeyboardArrowUp />
        )}
      </button>
      {isOpenMenu && (
        <div className="flex items-center gap-6 rounded-t-lg bg-light-100 px-6 pb-2 pt-3">
          <FileBrowser type={type} />
          <ServiceJobs type={type} />
          <ServiceLogs type={type} />
          <RestartService type={type} />
          <FullScreenService handleFullScreen={handleFullScreen} />

          {type === "vdi" && <VDIVolumeControl />}

          {type === "vdi" && <VDIControlButton />}
        </div>
      )}
    </div>
  );
}
