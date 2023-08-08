import React, { ReactElement, useState } from "react";
import RemoteDesktopViewersTab from "../RemoteDesktopViewersTab/RemoteDesktopViewersTab";
import RemoteDesktopChatTab from "../RemoteDesktopChatTab/RemoteDesktopChatTab";
import RemoteDesktopHeader from "../RemoteDesktopHeader/RemoteDesktopHeader";
import { useComponentSize } from "react-use-size/dist/useComponentSize";
import RemoteDesktopReadmeTab from "../RemoteDesktopReadmeTab/RemoteDesktopReadmeTab";

export default function RemoteDesktopTabs(): ReactElement {
  const [activeTab, setActiveTab] = useState<"Chat" | "Viewers" | "Readme">(
    "Chat"
  );

  const { ref, height } = useComponentSize();

  function handleChangeActiveTab(tab: "Chat" | "Viewers" | "Readme") {
    setActiveTab(tab);
  }

  return (
    <div className="h-full flex flex-col justify-between">
      <RemoteDesktopHeader
        activeTab={activeTab}
        handleChangeActiveTab={handleChangeActiveTab}
      />
      <div ref={ref} className="h-full flex flex-col overflow-y-auto">
        {(() => {
          switch (activeTab) {
            case "Chat":
              return <RemoteDesktopChatTab height={height} />;
            case "Viewers":
              return <RemoteDesktopViewersTab height={height} />;
            case "Readme":
              return <RemoteDesktopReadmeTab height={height} readMe={""} />;
          }
        })()}
      </div>
    </div>
  );
}
