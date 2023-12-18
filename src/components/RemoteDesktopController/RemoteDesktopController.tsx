import RestartService from "../RestartServiceButton/RestartServiceButton";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import VolumeControl from "../VolumeControl/VolumeControl";
import ServiceLogs from "../ServiceLogs/ServiceLogs";
import FileBrowser from "../FileBrowser/FileBrowser";
import { useKeycloak } from "@react-keycloak/web";
import { ReactElement, useState } from "react";
import Button from "../Button/Button";
import FullScreenService from "../FullScreenService/FullScreenService";
import { FullScreenHandle } from "react-full-screen";
import useVDI from "../../hooks/useVDI";

interface IRemoteDesktopController {
  handleFullScreen: FullScreenHandle;
}

export default function RemoteDesktopController({
  handleFullScreen,
}: IRemoteDesktopController): ReactElement {
  const [isControllerOpen, setIsControllerOpen] = useState<boolean>(false);

  const { keycloak } = useKeycloak();

  const { remoteDesktopReducer, client, video, handleMute } = useVDI();

  function handleIsControllerOpen() {
    setIsControllerOpen(!isControllerOpen);
  }

  function handleControl() {
    if (
      remoteDesktopReducer?.controller?.displayname ===
      keycloak?.tokenParsed?.preferred_username
    ) {
      client.current.send(JSON.stringify({ event: "control/release" }));
      return;
    }

    client.current.send(JSON.stringify({ event: "control/request" }));
  }

  function handleVolumeControl(volume: number) {
    video.current.volume = volume;
  }

  return (
    <div className="absolute bottom-0 flex flex-col items-center ">
      <button
        className="rounded-t-lg border-x-2 border-t-2 border-light-200 bg-light-50 bg-opacity-75 px-1"
        onClick={() => handleIsControllerOpen()}
      >
        {isControllerOpen ? (
          <IoIosArrowDown size={20} className="text-light-700" />
        ) : (
          <IoIosArrowUp size={20} className="text-light-700" />
        )}
      </button>
      {isControllerOpen && (
        <div className="flex w-full items-center justify-center gap-6 rounded-t-lg bg-light-50 bg-opacity-75 px-3 pb-1.5 pt-3">
          <FullScreenService handleFullScreen={handleFullScreen} />

          <FileBrowser type="vdi" />

          <ServiceLogs type="vdi" />

          <RestartService type="vdi" />

          <RestartService type="soft-vdi" />

          <VolumeControl
            isMuted={remoteDesktopReducer?.isMuted}
            handleVolumeControl={handleVolumeControl}
            handleMute={handleMute}
          />

          <Button
            text={(() => {
              if (
                remoteDesktopReducer?.controller?.displayname ===
                keycloak?.tokenParsed?.preferred_username
              ) {
                return "Release Control";
              }

              if (remoteDesktopReducer?.controller?.displayname) {
                return "Request Control";
              }

              return "Take Control";
            })()}
            onClick={() => handleControl()}
            className="!h-11 !w-36 text-xs"
          />
        </div>
      )}
    </div>
  );
}
