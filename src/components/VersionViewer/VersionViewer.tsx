import React from "react";
import packageJSON from "../../../package.json";

export default function VersionViewer() {
  return (
    <div className="absolute bottom-0 right-1 z-50 text-[0.64rem] text-layer-light-700">
      {process.env.NODE_ENV === "production" ? "P" : "D"} {packageJSON?.version}
    </div>
  );
}
