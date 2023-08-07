import React, { ReactElement } from "react";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

interface ITickCell {
  tick: boolean;
}

export default function TickCell({ tick }: ITickCell): ReactElement {
  return (
    <div className="flex items-center justify-center">
      {tick ? (
        <BsCheckCircle className="text-green-500 w-5 h-5" />
      ) : (
        <BsXCircle className="text-blue-500 w-5 h-5" />
      )}
    </div>
  );
}
