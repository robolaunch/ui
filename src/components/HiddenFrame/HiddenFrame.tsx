import React, { Fragment, ReactElement, useEffect, useState } from "react";

interface IHiddenFrame {
  url: string;
}

export default function HiddenFrame({ url }: IHiddenFrame): ReactElement {
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    setInterval(() => {
      url && setActive((prev) => !prev);
    }, 30000);
  }, [active, url]);

  return (
    <Fragment>
      <iframe
        title="iframe"
        allow="clipboard-read"
        className="absolute  grid-cols-1 gap-6"
        src={url ? url.replace("wss://", "https://") + "health" : ""}
        onLoad={() => console.log("iframe loaded")}
      />
    </Fragment>
  );
}
