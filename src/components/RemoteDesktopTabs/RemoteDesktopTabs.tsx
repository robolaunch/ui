import { ReactElement, useState } from "react";
import RemoteDesktopViewersTab from "../RemoteDesktopViewersTab/RemoteDesktopViewersTab";
import RemoteDesktopChatTab from "../RemoteDesktopChatTab/RemoteDesktopChatTab";
import RemoteDesktopHeader from "../RemoteDesktopHeader/RemoteDesktopHeader";
import { useComponentSize } from "react-use-size/dist/useComponentSize";

export default function RemoteDesktopTabs(): ReactElement {
  const [activeTab, setActiveTab] = useState<"Chat" | "Viewers" | "Readme">(
    "Chat",
  );

  const { ref, height } = useComponentSize();

  function handleChangeActiveTab(tab: "Chat" | "Viewers" | "Readme") {
    setActiveTab(tab);
  }

  return (
    <div className="flex h-full flex-col justify-between">
      <RemoteDesktopHeader
        activeTab={activeTab}
        handleChangeActiveTab={handleChangeActiveTab}
      />
      <div ref={ref} className="flex h-full flex-col overflow-y-auto">
        {(() => {
          switch (activeTab) {
            case "Chat":
              return <RemoteDesktopChatTab height={height} />;
            case "Viewers":
              return <RemoteDesktopViewersTab height={height} />;
          }
        })()}
      </div>
    </div>
  );
}
