import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import RestartService from "../RestartService/RestartService";
import VolumeControl from "../VolumeControl/VolumeControl";
import React, { ReactElement, useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import Button from "../Button/Button";

interface IRemoteDesktopController {
  remoteDesktopReducer: any;
  client: any;
  video: any;
  handleMute: any;
  handleFullScreen: any;
}

export default function RemoteDesktopController({
  remoteDesktopReducer,
  client,
  video,
  handleMute,
  handleFullScreen,
}: IRemoteDesktopController): ReactElement {
  const [isControllerOpen, setIsControllerOpen] = useState<boolean>(false);

  const { keycloak } = useKeycloak();

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
        className="rounded-t-lg border-x-2 border-t-2 border-layer-light-200 bg-layer-light-50 px-1"
        onClick={() => handleIsControllerOpen()}
      >
        {isControllerOpen ? (
          <IoIosArrowDown size={20} className="text-layer-dark-700" />
        ) : (
          <IoIosArrowUp size={20} className="text-layer-dark-700" />
        )}
      </button>
      {isControllerOpen && (
        <div className="flex w-full items-center justify-center gap-6 rounded-t-lg bg-layer-light-50 px-4 py-2 ">
          {handleFullScreen.active ? (
            <button onClick={handleFullScreen.exit}>
              <BsFullscreenExit
                size={24}
                className="text-layer-light-700 transition-all duration-200 hover:scale-90 hover:text-layer-primary-400"
              />
            </button>
          ) : (
            <button onClick={handleFullScreen.enter}>
              <BsFullscreen
                size={24}
                className="text-layer-light-700 transition-all duration-200 hover:scale-90 hover:text-layer-primary-400"
              />
            </button>
          )}
          {/* <TfiReload size={20} onClick={() => setScreenResolution()} /> */}

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
            className="h-10 !w-40 text-xs"
          />
        </div>
      )}
    </div>
  );
}
