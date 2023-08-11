import React, { Fragment, ReactElement } from "react";

interface IHiddenVDIFrame {
  url: string;
}

export default function HiddenVDIFrame({ url }: IHiddenVDIFrame): ReactElement {
  return (
    <Fragment>
      {url && (
        <iframe
          title="iframe"
          allow="clipboard-read"
          className="absolute -top-[9999px]"
          src={url?.replace("wss://", "https://") + "health"}
        />
      )}
    </Fragment>
  );
}
