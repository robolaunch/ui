import { ReactElement } from "react";
import { FullScreenHandle } from "react-full-screen";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

interface IFullScreenService {
  handleFullScreen: FullScreenHandle;
}

export default function FullScreenService({
  handleFullScreen,
}: IFullScreenService): ReactElement {
  return (
    <button
      className="flex cursor-pointer flex-col items-center gap-1 text-light-700 transition-all duration-200 hover:scale-90 hover:text-primary-400"
      onClick={
        handleFullScreen?.active
          ? handleFullScreen.exit
          : handleFullScreen.enter
      }
    >
      {handleFullScreen?.active ? (
        <BsFullscreenExit size={16} />
      ) : (
        <BsFullscreen size={16} />
      )}
      <p className="whitespace-nowrap text-[0.62rem]">Full Screen</p>
    </button>
  );
}
