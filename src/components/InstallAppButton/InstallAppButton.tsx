import React, { ReactElement, useEffect, useState } from "react";
import { TbCloudDownload } from "react-icons/tb";

export default function InstallAppButton(): ReactElement {
  const [beforeInstallPromptEvent, setBeforeInstallPromptEvent] =
    useState<any>(null);

  useEffect(() => {
    const beforeInstallHandler = (e: any) => {
      e.preventDefault();
      setBeforeInstallPromptEvent(e);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallHandler);

    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
    };
  }, []);

  const handleInstallClick = () => {
    if (beforeInstallPromptEvent) {
      beforeInstallPromptEvent.prompt();
    }
  };

  if (!beforeInstallPromptEvent) {
    return <></>;
  }

  return (
    <div
      onClick={handleInstallClick}
      className="transition-300 hover:bg-light-100 rounded p-2"
    >
      <TbCloudDownload size={28} />
    </div>
  );
}
