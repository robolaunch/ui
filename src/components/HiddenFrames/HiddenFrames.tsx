import React, { ReactElement } from "react";

interface IHiddenFrames {
  type: "vdi" | "ros" | "ide";
  url: string;
  onLoad: () => void;
}

export default function HiddenFrames({
  type,
  url,
  onLoad,
}: IHiddenFrames): ReactElement {
  return (
    <iframe
      title={type}
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-downloads"
      allow="microphone; camera; usb; midi; encrypted-media; autoplay; clipboard-write; clipboard-read"
      className="hidden"
      src={url || ""}
      onLoad={() => {
        setTimeout(() => {
          onLoad();
        }, 4000);
      }}
    />
  );
}
