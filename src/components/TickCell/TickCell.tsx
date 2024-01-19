import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { ReactElement } from "react";

interface ITickCell {
  tick: boolean;
}

export default function TickCell({ tick }: ITickCell): ReactElement {
  return (
    <div className="flex items-center justify-center">
      {tick ? (
        <BsCheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <BsXCircle className="h-5 w-5 text-blue-500" />
      )}
    </div>
  );
}
