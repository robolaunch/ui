import RemoteDesktopController from "../RemoteDesktopController/RemoteDesktopController";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { GiSpeaker } from "react-icons/gi";
import useVDI from "../../hooks/useVDI";
import { ReactElement } from "react";

interface IRemoteDesktopScene {
  isControllerActive: boolean;
}

export default function RemoteDesktopScene({
  isControllerActive,
}: IRemoteDesktopScene): ReactElement {
  const { remoteDesktopReducer, overlay, video, handleMute } = useVDI();

  const handleFullScreen = useFullScreenHandle();

  return (
    <FullScreen className="h-full w-full" handle={handleFullScreen}>
      <div className="relative flex h-full w-full justify-center">
        <span
          className="relative appearance-none outline-none"
          ref={overlay}
          tabIndex={1}
        >
          <video
            onContextMenu={(e) => e.preventDefault()}
            className={`absolute bottom-0 top-0 h-full`}
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
              className="animate__animated animate__fadeIn absolute top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center bg-[#00000090] text-light-50"
            >
              <GiSpeaker size={48} />
            </div>
          )}
        </span>
        <div className="absolute bottom-4 left-4 flex items-center gap-2  ">
          <div
            className={`h-2.5 w-2.5 rounded ${
              remoteDesktopReducer?.controller?.displayname
                ? "bg-primary-500"
                : "bg-secondary-400"
            }`}
          />
          <div className="text-xs text-light-200">
            {remoteDesktopReducer?.controller?.displayname || "No Controller"}{" "}
            {remoteDesktopReducer?.currentResolution?.width || "None"}x
            {remoteDesktopReducer?.currentResolution?.height || "None"}
          </div>
        </div>
        {isControllerActive && (
          <RemoteDesktopController handleFullScreen={handleFullScreen} />
        )}
      </div>
    </FullScreen>
  );
}
