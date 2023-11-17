import { Fragment, ReactElement } from "react";

interface IInstanceNetworkCell {
  type: "in" | "out";
  mbps?: number;
  interfaceName?: string;
}

export default function InstanceNetworkCell({
  type,
  mbps,
  interfaceName,
}: IInstanceNetworkCell): ReactElement {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex h-12 w-12 flex-col items-center  justify-center  text-[0.70rem]">
        {typeof mbps === "number" ? (
          <Fragment>
            <p>{mbps || "0.000"}</p>
            <p>Mbps</p>
          </Fragment>
        ) : (
          <p>...</p>
        )}
      </div>
      <p className="text-[0.66rem]">
        {interfaceName ? `(${interfaceName}) ${type}` : "Pending..."}
      </p>
    </div>
  );
}
