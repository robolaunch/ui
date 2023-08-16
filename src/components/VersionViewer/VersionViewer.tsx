import React, { ReactElement } from "react";
import packageJSON from "../../../package.json";
import { envFrontendUrl, isProduction } from "../../helpers/envProvider";

export default function VersionViewer(): ReactElement {
  const developmentURL = `http://localhost:3000${
    window.location.href?.split("robolaunch.cloud")[1] || ""
  }`;

  const productionURL = `${envFrontendUrl}${
    window.location.href?.split("3000")[1] || ""
  }`;

  return (
    <div
      onClick={() => {
        window.location.href = isProduction ? developmentURL : productionURL;
      }}
      className="fixed bottom-0 right-1 z-50 text-[0.64rem] text-layer-light-700 cursor-crosshair"
    >
      {isProduction ? "P" : "D"} {packageJSON?.version}
    </div>
  );
}
