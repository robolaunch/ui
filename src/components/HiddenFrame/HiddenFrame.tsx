import React, { Fragment, ReactElement, useEffect, useState } from "react";

interface IHiddenFrame {
  url: string;
}

export default function HiddenFrame({ url }: IHiddenFrame): ReactElement {
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => {
      url && setActive(!active);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [active, url]);

  return (
    <Fragment>
      {active && (
        <iframe
          title="iframe"
          allow="clipboard-read"
          className="absolute -top-[9999px]"
          src={url ? url.replace("wss://", "https://") + "health" : ""}
          onLoad={() => console.log("iframe loaded")}
        />
      )}
    </Fragment>
  );
}
