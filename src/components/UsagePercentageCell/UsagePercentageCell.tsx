import { ReactElement } from "react";
import PercentageWidget from "../PercentageBar/PercentageBar";

interface IUsagePercentageCell {
  type: "cpu";
}

export default function UsagePercentageCell({
  type,
}: IUsagePercentageCell): ReactElement {
  return (
    <div className="col-span-1 flex h-full w-full flex-col items-center justify-evenly bg-slate-500">
      <p className="text-xs font-medium">CPU</p>
      <PercentageWidget percentage={1} />
      <p
        style={{
          fontSize: "0.66rem",
          lineHeight: "0.75rem",
        }}
      >
        asd
      </p>
    </div>
  );
}
