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
      {!second || !minute || !hour ? (
        <img
          className="h-10 w-10"
          src="/svg/general/loading.svg"
          alt="loading"
        />
      ) : (
        Array.apply(null, Array(3))?.map((_, index: number) => {
          return (
            <div
              key={index}
              className="animate__animated animate__fadeIn flex flex-col items-center"
            >
              <span className={`text-xl`}>
                {index === 0 ? hour : index === 1 ? minute : second}
              </span>
              <span className="text-xs">
                {index === 0 ? "Hours" : index === 1 ? "Minutes" : "Seconds"}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
}
