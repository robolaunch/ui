import React, { Fragment, ReactElement } from "react";

interface IGridLines {
  columns: number | undefined;
  rows: number | undefined;
}

export default function GridLines({ columns, rows }: IGridLines): ReactElement {
  return (
    <Fragment>
      <div className={`w-full h-full absolute inset-0 flex justify-between`}>
        {[...Array(columns)].map((_, i) => {
          return (
            <div
              key={i}
              className={`w-full h-full border border-[#dddddd35]`}
            />
          );
        })}
      </div>
      <div className={`w-full h-full absolute inset-0 flex flex-col`}>
        {[...Array(rows)].map((_, i) => {
          return (
            <div
              key={i}
              className={`w-full h-full border border-[#dddddd35]`}
            />
          );
        })}
      </div>
    </Fragment>
  );
}
