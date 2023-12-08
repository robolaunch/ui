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
      className="text-light-700 hover:text-primary-400 flex cursor-pointer flex-col items-center gap-1 transition-all duration-200 hover:scale-90"
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
