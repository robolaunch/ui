import React, { ReactElement, useEffect, useState } from "react";

interface IHiddenFrames {
  type: "vdi" | "ros";
  url: string;
  onLoad: () => void;
}

export default function HiddenFrames({
  type,
  url,
  onLoad,
}: IHiddenFrames): ReactElement {
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    console.log("renew vdi token");

    const timer = setInterval(() => {
      type && setReload(true);
    }, 60000);

    setTimeout(() => {
      setReload(false);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [type, reload]);

  return (
    <iframe
      title={type}
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-downloads"
      allow="microphone; camera; usb; midi; encrypted-media; autoplay; clipboard-write; clipboard-read"
      className="hidden"
      src={!reload ? url : ""}
      onLoad={() => {
        setTimeout(() => {
          onLoad();
        }, 1000);
      }}
    />
  );
}
