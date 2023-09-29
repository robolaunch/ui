import React, { ReactElement } from "react";
import packageJSON from "../../../package.json";
import { isProduction } from "../../helpers/envProvider";

export default function VersionViewer(): ReactElement {
  return (
    <div className="fixed bottom-0 right-1 z-50 cursor-crosshair text-[0.64rem] text-layer-light-700">
      {isProduction ? "P" : "D"} {packageJSON?.version}
    </div>
  );
}
