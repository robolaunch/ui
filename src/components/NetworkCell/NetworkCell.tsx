import React, { Fragment, ReactElement, useEffect } from "react";

interface INetworkCell {
  data: number[];
  networkInterface: string;
}

export default function NetworkCell({
  data,
  networkInterface,
}: INetworkCell): ReactElement {
  useEffect(() => {
    console.log("NetworkCell", data);
  }, [data]);

  return (
    <Fragment>
      {data?.map(
        (network: number, index: number) =>
          network && (
            <div
              key={index}
              className="flex flex-col gap-2 text-xs font-medium text-layer-light-700"
            >
              <div className="flex flex-col items-center justify-center gap-1">
                <div className="flex h-11 w-11 items-center justify-center text-center text-layer-light-700">
                  {network > 0 ? `${network} Mbps` : "Pending..."}
                </div>
                <span className="text-[0.66rem] text-layer-dark-500">
                  ({networkInterface}) {index === 0 ? "In" : "Out"}
                </span>
              </div>
            </div>
          ),
      )}
    </Fragment>
  );
}
