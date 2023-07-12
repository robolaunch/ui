import React from "react";
import packageJSON from "../../../package.json";

export default function VersionViewer() {
  return (
    <div
      onClick={() => {
        if (process.env.NODE_ENV === "development") {
          window.location.href = `${process.env.REACT_APP_FRONTEND_URL}${
            window.location.href?.split("3000")[1] || ""
          }`;
        } else if (process.env.NODE_ENV === "production") {
          window.location.href = `http://localhost:3000${
            window.location.href?.split("robolaunch.cloud")[1] || ""
          }`;
        }
      }}
      className="fixed bottom-0 right-1 z-50 text-[0.64rem] text-layer-light-700 cursor-crosshair"
    >
      {process.env.NODE_ENV === "production" ? "P" : "D"} {packageJSON?.version}
    </div>
  );
}
