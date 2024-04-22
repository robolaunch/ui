import { ReactElement } from "react";
import Card from "../../../components/Card/Card";

export default function RobotLogs(): ReactElement {
  return (
    <div className="flex h-full w-full gap-6">
      <Card className="relative flex !h-full !w-80 flex-col gap-2 overflow-auto p-5">
        <div
          className={`flex w-full cursor-pointer flex-col items-center justify-center gap-1 text-xs text-primary-500`}
        >
          <span>Logs</span>
          <div className={`h-[2px] w-full bg-primary-500`} />
        </div>
      </Card>
      <Card>
        <></>
      </Card>
    </div>
  );
}
