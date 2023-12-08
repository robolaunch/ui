import { envApplication, isProduction } from "../../helpers/envProvider";
import packageJSON from "../../../package.json";
import { ReactElement } from "react";

export default function VersionViewer(): ReactElement {
  return (
    <div className="fixed bottom-0 right-1 z-50 cursor-crosshair">
      <p className="text-light-700 flex gap-1 text-[0.64rem]">
        <span>{isProduction ? "P" : "D"}</span>
        <span>{packageJSON?.version}</span>
        <span>{envApplication ? "A" : "R"}</span>
      </p>
    </div>
  );
}
