import React, { ReactElement } from "react";
import RosWidgetLayout from "../../layouts/RosWidgetLayout";

interface IRosRemoteDesktopWidget {
  id: number;
  ros: any;
  handleRemoveWidget: any;
}

export default function RosRemoteDesktopWidget({
  id,
  ros,
  handleRemoveWidget,
}: IRosRemoteDesktopWidget): ReactElement {
  return (
    <RosWidgetLayout
      id={id}
      type="RosRemoteDesktopWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<></>}
      title="RemoteDesktop"
    >
      <>---</>
    </RosWidgetLayout>
  );
}
