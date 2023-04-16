import React, { ReactElement } from "react";

export default function RosControlBar(): ReactElement {
  return (
    <div className="absolute bottom-4 w-full flex items-center justify-center">
      <div className="flex rounded-lg border border-layer-light-200 bg-layer-light-50 text-xs">
        <span className="py-2 px-4 hover:bg-layer-light-100 transition-all duration-300">
          controlbar
        </span>
        <span className="py-2 px-4 hover:bg-layer-light-100 transition-all duration-300">
          controlbar
        </span>{" "}
        <span className="py-2 px-4 hover:bg-layer-light-100 transition-all duration-300">
          Emergency Stop
        </span>
      </div>
    </div>
  );
}
