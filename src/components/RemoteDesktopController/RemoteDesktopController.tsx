import { useKeycloak } from "@react-keycloak/web";
import React, { ReactElement, useContext, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import VolumeControl from "../VolumeControl/VolumeControl";
import Button from "../Button/Button";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { StreamContext } from "../../contexts/StreamContext";
import { TfiReload } from "react-icons/tfi";
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

  const { setScreenResolution }: any = useContext(StreamContext);

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
    <div className="absolute flex flex-col items-center bottom-0 ">
      <button
        className="bg-layer-light-50 rounded-t-lg px-1"
        onClick={() => handleIsControllerOpen()}
      >
        {isControllerOpen ? (
          <IoIosArrowDown size={20} />
        ) : (
          <IoIosArrowUp size={20} />
        )}
      </button>
      {isControllerOpen && (
        <div className="w-full flex items-center justify-center rounded-t-lg gap-6 px-4 py-2 bg-layer-light-50">
          {handleFullScreen.active ? (
            <button onClick={handleFullScreen.exit}>
              <BsFullscreenExit
                size={24}
                className="text-layer-light-700 hover:scale-90 hover:text-layer-primary-400 transition-all duration-200"
              />
            </button>
          ) : (
            <button onClick={handleFullScreen.enter}>
              <BsFullscreen
                size={24}
                className="text-layer-light-700 hover:scale-90 hover:text-layer-primary-400 transition-all duration-200"
              />
            </button>
          )}
          <TfiReload size={20} onClick={() => setScreenResolution()} />

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
            className="text-xs h-10 !w-40"
          />
        </div>
      )}
    </div>
  );
}
