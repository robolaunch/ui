import React, { ReactElement, useEffect } from "react";
import { BsPinMap } from "react-icons/bs";
import { useComponentSize } from "react-use-size";
import RosWidgetLayout from "../../layouts/RosWidgetLayout";

interface IRosMapWidget {
  ros: any;
  id: number;
  handleRemoveWidget: (id: number) => void;
}

export default function RosMapWidget({
  ros,
  id,
  handleRemoveWidget,
}: IRosMapWidget): ReactElement {
  return (
    <RosWidgetLayout
      id={id}
      type="RosMapWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<BsPinMap size={20} className="text-layer-light-400" />}
      title="Map"
    >
      <div className="relative h-full">
        {ros?.socket?.url && (
          <iframe
            className="absolute inset-0"
            title="map"
            style={{ minWidth: "100%", minHeight: "100%" }}
            src={"/html/rosMap.html?" + ros.socket.url}
          />
        )}
      </div>
    </RosWidgetLayout>
  );
}
