import { envApplication, isProduction } from "../../helpers/envProvider";
import packageJSON from "../../../package.json";
import { ReactElement } from "react";

export default function VersionViewer(): ReactElement {
  return (
    <div className="fixed bottom-0 right-1 z-50 cursor-crosshair">
      <p className="flex gap-1 text-[0.64rem] text-light-700">
        {isProduction ? "P" : "D"}
        {envApplication ? "A" : "R"}
        {" - "}v{packageJSON?.version}
      </p>
    </div>
  );
}
