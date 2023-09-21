import React, { Fragment, ReactElement } from "react";

interface IGridLines {
  columns: number | undefined;
  rows: number | undefined;
}

export default function GridLines({ columns, rows }: IGridLines): ReactElement {
  return (
    <Fragment>
      <div className={`absolute inset-0 flex h-full w-full justify-between`}>
        {[...Array(Math.round(columns!))].map((_, i) => {
          return (
            <div
              key={i}
              className={`h-full w-full border border-[#dddddd35]`}
            />
          );
        })}
      </div>
      <div className={`absolute inset-0 flex h-full w-full flex-col`}>
        {[...Array(Math.round(rows!))].map((_, i) => {
          return (
            <div
              key={i}
              className={`h-full w-full border border-[#dddddd35]`}
            />
          );
        })}
      </div>
    </Fragment>
  );
}
