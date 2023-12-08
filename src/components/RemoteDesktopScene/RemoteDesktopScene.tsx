import React, { ReactElement } from "react";
import { GiSpeaker } from "react-icons/gi";
import RemoteDesktopController from "../RemoteDesktopController/RemoteDesktopController";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import useVDI from "../../hooks/useVDI";

interface IRemoteDesktopScene {
  isControllerActive: boolean;
}

export default function RemoteDesktopScene({
  isControllerActive,
}: IRemoteDesktopScene): ReactElement {
  const { remoteDesktopReducer, client, overlay, video, handleMute } = useVDI();

  const handleFullScreen = useFullScreenHandle();

  return (
    <FullScreen handle={handleFullScreen}>
      <div className="relative flex h-full w-full justify-center">
        <span
          className="relative appearance-none outline-none"
          ref={overlay}
          tabIndex={1}
        >
          <video
            onContextMenu={(e) => e.preventDefault()}
            className={`absolute bottom-0 top-0 lg:min-h-[20rem] xl:min-h-[30rem] 2xl:min-h-[40rem]`}
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
              className="animate__animated animate__fadeIn text-light-50 absolute top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center bg-[#00000090]"
            >
              <GiSpeaker size={48} />
            </div>
          )}
        </span>
        <div className="text-light-100 absolute bottom-4 left-4 flex items-center gap-2 text-xs">
          <div
            className={`h-[8px] w-[8px] rounded ${
              remoteDesktopReducer?.controller?.displayname
                ? "bg-primary-500"
                : "bg-secondary-400"
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
