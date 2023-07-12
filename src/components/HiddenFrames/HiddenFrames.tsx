import React, { Fragment, ReactElement } from "react";

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
  return (
    <Fragment>
      {(() => {
        switch (type) {
          case "vdi":
            return (
              <iframe
                title="vdi"
                className="hidden"
                src={url}
                onLoad={onLoad}
              />
            );
          case "ros":
            return (
              <iframe
                title="ros"
                className="hidden"
                src={url}
                onLoad={onLoad}
              />
            );
        }
      })()}
    </Fragment>
  );
}
