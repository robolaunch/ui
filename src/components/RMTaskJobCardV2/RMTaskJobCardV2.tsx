import { ReactElement } from "react";
import Card from "../Card/Card";
import { IJob } from "../../interfaces/task-management.interface";
import RMTaskJobCardButtonsV2 from "../RMTaskJobCardButtonsV2/RMTaskJobCardButtonsV2";

interface IRMTaskJobCardV2 {
  job: IJob;
}

export default function RMTaskJobCardV2({
  job,
}: IRMTaskJobCardV2): ReactElement {
  return (
    <Card className="!h-fit p-4 text-xs shadow-sm">
      <div className="flex h-full items-center justify-between">
        <div className="wh-full flex flex-col justify-between gap-2">
          {[
            {
              name: "Job ID",
              value: job.job_id,
            },
            {
              name: "Job Name",
              value: job.job_name,
            },
            // {
            //   name: "Job Waypoints",
            //   value: job.waypoints,
            // },
          ].map((item, index) => {
            return (
              <label className="flex gap-1" key={index}>
                <span className="font-semibold text-dark-800">
                  {item.name}:
                </span>
                <span className="text-dark-700">{item.value}</span>
              </label>
            );
          })}
        </div>
        <RMTaskJobCardButtonsV2 job={job} />
      </div>
    </Card>
  );
}
