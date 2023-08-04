import React, { ReactElement, useEffect, useState } from "react";

interface IHiddenFrame {
  url: string;
}

export default function HiddenFrame({ url }: IHiddenFrame): ReactElement {
  const [connection, setConnection] = useState<boolean>(true);

  useEffect(() => {
    setInterval(() => {
      setConnection(false);
      console.log("frame active");

      setTimeout(() => {
        setConnection(true);
        console.log("frame deactive");
      }, 5000);
    }, 100000);
  }, []);

  return (
    <iframe
      title="iframe"
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation allow-downloads"
      allow="microphone; camera; usb; midi; encrypted-media; autoplay; clipboard-write; clipboard-read"
      className="hidden"
      src={connection ? url || "" : ""}
    />
  );
}
