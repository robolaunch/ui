import React, { ReactElement } from "react";

interface IColorCell {
  text: string;
  color: "green" | "red" | "yellow" | "blue" | "gray";
}

export default function ColorCell({ text, color }: IColorCell): ReactElement {
  return (
    <div className="flex items-center justify-center">
      <p
        className={`text-xs w-fit h-hit py-1 px-3 rounded-lg ${
          color === "green"
            ? "text-green-600"
            : color === "red"
            ? "text-red-600"
            : color === "yellow"
            ? "text-yellow-600"
            : color === "blue"
            ? "text-blue-600"
            : color === "gray"
            ? "text-gray-600"
            : ""
        }
      
      ${
        color === "green"
          ? "bg-green-100"
          : color === "red"
          ? "bg-red-100"
          : color === "yellow"
          ? "bg-yellow-100"
          : color === "blue"
          ? "bg-blue-100"
          : color === "gray"
          ? "bg-gray-100"
          : ""
      }
      `}
      >
        {text}
      </p>
    </div>
  );
}
