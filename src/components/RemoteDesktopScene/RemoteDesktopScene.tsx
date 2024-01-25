import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { GiSpeaker } from "react-icons/gi";
import useVDI from "../../hooks/useVDI";
import { ReactElement } from "react";
import ControlBar from "../ControlBar/ControlBar";

interface IRemoteDesktopScene {
  isControllerActive: boolean;
}

export default function RemoteDesktopScene({
  isControllerActive,
}: IRemoteDesktopScene): ReactElement {
  const { remoteDesktopReducer, overlay, video, handleMute } = useVDI();

  const handleFullScreen = useFullScreenHandle();

  return (
    <FullScreen
      className={`${handleFullScreen?.active && "h-full w-full"}`}
      handle={handleFullScreen}
    >
      <div className="relative ">
        <span
          className="my-auto h-fit w-fit appearance-none outline-none"
          ref={overlay}
          tabIndex={1}
        >
          <video
            onContextMenu={(e) => e.preventDefault()}
            playsInline
            ref={video}
            autoPlay
            muted={remoteDesktopReducer?.isMuted}
            style={{
              width: "100%",
              backgroundColor: "#000",
            }}
          />
          {isControllerActive && remoteDesktopReducer?.isMuted && (
            <div
              onClick={() => handleMute()}
              className="animate-fadeIn absolute top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center bg-[#00000090] text-light-50"
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
            {remoteDesktopReducer?.currentResolution?.width || ""}x
            {remoteDesktopReducer?.currentResolution?.height || ""}
          </div>
        </div>
        {isControllerActive && (
          <ControlBar handleFullScreen={handleFullScreen} type="vdi" />
        )}
      </div>
    </FullScreen>
  );
}
