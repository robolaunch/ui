import React, { Fragment, ReactElement, useEffect, useState } from "react";

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
    console.log(type, reload);

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
    <Fragment>
      {(() => {
        switch (type) {
          case "vdi":
            return (
              <iframe
                title="vdi"
                className="hidden"
                src={!reload ? url : ""}
                onLoad={() => {
                  setTimeout(() => {
                    onLoad();
                  }, 500);
                }}
              />
            );
          case "ros":
            return (
              <iframe
                title="ros"
                className="hidden"
                src={!reload ? url : ""}
                onLoad={() => {
                  setTimeout(() => {
                    onLoad();
                  }, 500);
                }}
              />
            );
        }
      })()}
    </Fragment>
  );
}
