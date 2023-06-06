import React, { ReactElement, useEffect, useState } from "react";
import CardLayout from "../../../layouts/CardLayout";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

interface ICodeEditor {
  ideURL: any;
}

export default function CodeEditor({ ideURL }: ICodeEditor): ReactElement {
  const [loading, setLoading] = useState<boolean>(true);
  const handleFullScreen = useFullScreenHandle();
  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <CardLayout loading={loading}>
      <FullScreen className="relative" handle={handleFullScreen}>
        <iframe
          className={`w-full animate__animated animate__fadeIn ${
            handleFullScreen?.active ? "h-screen" : "h-[55rem]"
          }`}
          src={ideURL}
          title="Code Editor"
        />
        {handleFullScreen.active ? (
          <button
            className="absolute bottom-3 right-3"
            onClick={handleFullScreen.exit}
          >
            <BsFullscreenExit
              size={24}
              className="text-layer-light-700 hover:scale-90 hover:text-layer-primary-400 transition-all duration-200"
            />
          </button>
        ) : (
          <button
            className="absolute bottom-3 right-3"
            onClick={handleFullScreen.enter}
          >
            <BsFullscreen
              size={24}
              className=" text-layer-light-700 hover:scale-90 hover:text-layer-primary-400 transition-all duration-200"
            />
          </button>
        )}
      </FullScreen>
    </CardLayout>
  );
}
