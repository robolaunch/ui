import React, { ReactElement } from "react";
import { BsPinMap } from "react-icons/bs";
import WidgetLayout from "../../layouts/WidgetLayout";

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
    <WidgetLayout
      id={id}
      type="RosMapWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<BsPinMap size={20} className="text-layer-light-400" />}
      title="Map"
    >
      <div className="flex flex-col gap-2 overflow-auto scrollbar-hide p-2">
        {ros?.socket?.url && (
          <iframe
            title="map"
            style={{ minWidth: "100%", minHeight: "100%" }}
            src={"/html/rosMap.html?" + ros.socket.url}
          />
        )}
      </div>
    </WidgetLayout>
  );
}
