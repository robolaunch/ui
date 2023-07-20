import React, { ReactElement } from "react";

interface ITimeCounter {
  second: number | string;
  minute: number | string;
  hour: number | string;
}

export default function TimeCounter({
  second,
  minute,
  hour,
}: ITimeCounter): ReactElement {
  return (
    <div className="flex gap-5">
      {Array.apply(null, Array(3))?.map((_, index: number) => {
        return (
          <div className="flex flex-col items-center">
            <span className="text-xl" key={index}>
              {index === 0 ? hour : index === 1 ? minute : second}
            </span>
            <span className="text-xs">
              {index === 0 ? "Hours" : index === 1 ? "Minutes" : "Seconds"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
