import { ReactElement } from "react";
import { IJob } from "../../interfaces/context/misssion.context.interface";
import Card from "../Card/Card";

interface IRMTaskJobCard {
  job: IJob;
}

export default function RMTaskJobCard({ job }: IRMTaskJobCard): ReactElement {
  return (
    <Card className="!h-fit p-4 text-xs shadow-sm">
      <div className="flex h-full items-center justify-between">
        <div className="wh-full flex flex-col justify-between gap-2">
          {[
            {
              name: "Job ID",
              value: job.jobID,
            },
            {
              name: "Job Priority",
              value: job.priority,
            },
            {
              name: "Job Status",
              value: job.jobStatus,
            },
            {
              name: "Job Deadline",
              value: job.deadline,
            },
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

          <label className="flex flex-col gap-1">
            <span className="font-semibold text-dark-800">Job Waypoints:</span>
            <span className="text-dark-700">
              <div className="flex flex-col">
                {job?.taskList?.map((waypoint, index) => {
                  return (
                    <label className="flex gap-1" key={index}>
                      <span className="font-semibold text-dark-800">
                        {waypoint.LocationId}:
                      </span>
                      <span className="text-dark-700">
                        {waypoint.ActionName}
                      </span>
                    </label>
                  );
                })}
              </div>
            </span>
          </label>
        </div>
        <p>buttons</p>
      </div>
    </Card>
  );
}
