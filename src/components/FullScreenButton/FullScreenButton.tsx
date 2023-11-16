import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

interface IFullScreenButton {
  isFullScreen: boolean;
  handleFullScreen: () => void;
}

export default function FullScreenButton({
  isFullScreen,
  handleFullScreen,
}: IFullScreenButton) {
  return (
    <button
      className="flex cursor-pointer flex-col items-center gap-1 text-layer-light-700 transition-all duration-200 hover:scale-90 hover:text-layer-primary-400"
      onClick={handleFullScreen}
    >
      {isFullScreen ? (
        <BsFullscreenExit size={20} />
      ) : (
        <BsFullscreen size={20} />
      )}
      <p className="text-[0.60rem]">Full Screen</p>
    </button>
  );
}