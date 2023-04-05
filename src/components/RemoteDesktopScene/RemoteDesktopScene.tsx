import React, { ReactElement, useContext } from "react";
import { GiSpeaker } from "react-icons/gi";
import RemoteDesktopController from "../RemoteDesktopController/RemoteDesktopController";
import { StreamContext } from "../../contexts/StreamContext";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

interface IRemoteDesktopScene {
  isControllerActive: boolean;
}

export default function RemoteDesktopScene({
  isControllerActive,
}: IRemoteDesktopScene): ReactElement {
  const { remoteDesktopReducer, client, overlay, video, handleMute }: any =
    useContext(StreamContext);

  const handleFullScreen = useFullScreenHandle();

  return (
    <FullScreen handle={handleFullScreen}>
      <div className="relative w-full h-full flex justify-center">
        <span
          className="relative outline-none appearance-none"
          ref={overlay}
          tabIndex={1}
        >
          <video
            onContextMenu={(e) => e.preventDefault()}
            className="absolute top-0 bottom-0"
            playsInline
            ref={video}
            autoPlay
            muted={remoteDesktopReducer?.isMuted}
            style={{
              position: "relative",
              backgroundColor: "#000",
            }}
          />
          {isControllerActive && remoteDesktopReducer?.isMuted && (
            <div
              onClick={() => handleMute()}
              className="absolute z-10 w-full h-full flex items-center justify-center top-0 bg-[#00000090] text-layer-light-50 cursor-pointer animate__animated animate__fadeIn"
            >
              <GiSpeaker size={48} />
            </div>
          )}
        </span>
        <div className="absolute left-4 bottom-4 flex items-center gap-2 text-xs text-layer-light-100">
          <div
            className={`h-[8px] w-[8px] rounded ${
              remoteDesktopReducer?.controller?.displayname
                ? "bg-layer-primary-500"
                : "bg-layer-secondary-400"
            }`}
          ></div>
          <div>
            {remoteDesktopReducer?.controller?.displayname || "No Controller"}{" "}
            <span>
              {remoteDesktopReducer?.currentResolution?.width}x
              {remoteDesktopReducer?.currentResolution?.height}
            </span>
          </div>
        </div>
        {isControllerActive && (
          <RemoteDesktopController
            remoteDesktopReducer={remoteDesktopReducer}
            client={client}
            video={video}
            handleMute={handleMute}
            handleFullScreen={handleFullScreen}
          />
        )}
      </div>
    </FullScreen>
  );
}
