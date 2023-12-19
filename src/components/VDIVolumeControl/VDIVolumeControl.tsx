import React, { ReactElement } from "react";
import { BsFillVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";
import useVDI from "../../hooks/useVDI";

export default function VDIVolumeControl(): ReactElement {
  const { remoteDesktopReducer, video, handleMute } = useVDI();

  function handleVolumeControl(volume: number) {
    video.current.volume = volume;
  }

  return (
    <div className="flex items-center gap-2 transition-all duration-500">
      <button onClick={() => handleMute()}>
        {remoteDesktopReducer?.isMuted ? (
          <BsVolumeMuteFill size={24} className="text-light-700" />
        ) : (
          <BsFillVolumeUpFill size={24} className="text-light-700" />
        )}
      </button>
      <input
        className="h-[3px] w-24"
        onChange={(e) => handleVolumeControl(Number(e.target.value) / 100)}
        type="range"
        min="1"
        max="100"
        defaultValue={100}
      />
    </div>
  );
}
