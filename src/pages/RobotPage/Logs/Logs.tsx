import React, { ReactElement } from "react";
import { LogViewer } from "@patternfly/react-log-viewer";

export default function Logs(): ReactElement {
  return (
    <div>
      <LogViewer data={"data1"} />
    </div>
  );
}
