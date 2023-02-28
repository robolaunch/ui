import React, { ReactElement } from "react";
import { BsFillVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

interface IVolumeControl {
  handleVolumeControl: (volume: number) => void;
  handleMute: () => void;
  isMuted: boolean;
}

export default function VolumeControl({
  handleVolumeControl,
  handleMute,
  isMuted,
}: IVolumeControl): ReactElement {
  return (
    <div className="flex items-center gap-2 transition-all duration-500">
      <button onClick={() => handleMute()}>
        {isMuted ? (
          <BsVolumeMuteFill size={24} />
        ) : (
          <BsFillVolumeUpFill size={24} />
        )}
      </button>
      <input
        className="h-[3px]"
        onChange={(e) => handleVolumeControl(Number(e.target.value) / 100)}
        type="range"
        min="1"
        max="100"
        defaultValue={100}
      />
    </div>
  );
}
