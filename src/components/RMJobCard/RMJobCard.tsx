import { ReactElement } from "react";
import useTaskManagement from "../../hooks/useTaskManagement";
import { IJob } from "../../interfaces/task-management.interface";
import RMTaskJobCardButtonsV2 from "../RMTaskJobCardButtonsV2/RMTaskJobCardButtonsV2";
import AccordionV2 from "../Accordion/AccordionV2";
import RMJobCardWaypointSection from "../RMJobCardWaypointSection/RMJobCardWaypointSection";

interface IRMJobCard {
  job: IJob;
  index: number;
}

export default function RMJobCard({ job, index }: IRMJobCard): ReactElement {
  const { setActiveJob, activeJob } = useTaskManagement();

  return (
    <AccordionV2
      id={index}
      isOpen={index === activeJob}
      handleOpen={() => {
        index === activeJob ? setActiveJob(undefined) : setActiveJob(index);
      }}
      header={
        <div className="w-full text-sm font-semibold">{job.job_name}</div>
      }
    >
      <div className="flex h-full flex-col items-center justify-between gap-4 text-xs">
        <div className="flex w-full justify-between p-2">
          <div className="flex flex-col justify-between gap-2">
            {[
              {
                name: "Job ID",
                value: job.job_id,
              },
              {
                name: "Job Name",
                value: job.job_name,
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
          </div>
          <RMTaskJobCardButtonsV2 job={job} />
        </div>
        <RMJobCardWaypointSection job={job} />
      </div>
    </AccordionV2>
  );
}
