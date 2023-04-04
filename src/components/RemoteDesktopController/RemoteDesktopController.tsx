import { useKeycloak } from "@react-keycloak/web";
import React, { ReactElement, useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import VolumeControl from "../VolumeControl/VolumeControl";
import Button from "../Button/Button";

interface IRemoteDesktopController {
  remoteDesktopReducer: any;
  client: any;
  video: any;
  handleMute: any;
}

export default function RemoteDesktopController({
  remoteDesktopReducer,
  client,
  video,
  handleMute,
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
        <div className="w-full flex items-center justify-center rounded-t-lg gap-10 p-2 bg-layer-light-50">
          <div>
            {remoteDesktopReducer?.currentResolution?.width}x
            {remoteDesktopReducer?.currentResolution?.height}
          </div>
          <div>
            <VolumeControl
              isMuted={remoteDesktopReducer?.isMuted}
              handleVolumeControl={handleVolumeControl}
              handleMute={handleMute}
            />
          </div>
          <div>
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

                return "Took Control";
              })()}
              onClick={() => handleControl()}
              className="text-xs h-10 w-36"
            />
          </div>
        </div>
      )}
    </div>
  );
}
