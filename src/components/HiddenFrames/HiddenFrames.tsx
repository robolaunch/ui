import React, { Fragment, ReactElement } from "react";

interface IHiddenFrames {
  type: "vdi" | "ros";
  url: string;
}

export default function HiddenFrames({
  type,
  url,
}: IHiddenFrames): ReactElement {
  return (
    <Fragment>
      {(() => {
        switch (type) {
          case "vdi":
            return <iframe title="vdi" className="hidden" src={url} />;
          case "ros":
            return <iframe title="ros" className="hidden" src={url} />;
        }
      })()}
    </Fragment>
  );
}
