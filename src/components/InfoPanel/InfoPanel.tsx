import React, { ReactElement } from "react";
import { RiErrorWarningFill } from "react-icons/ri";

interface IInfoPanel {
  type: "error" | "warning" | "info" | "success";
  loading?: boolean;
}

export default function InfoPanel({ type, loading }: IInfoPanel): ReactElement {
  return (
    <div
      className={`w-full flex gap-4 items-center rounded-lg p-4 border ${
        type === "info"
          ? "bg-layer-secondary-100 border-layer-secondary-500"
          : type === "success"
          ? "bg-green-100 border-green-500"
          : type === "warning"
          ? "bg-yellow-100 border-yellow-500"
          : "bg-red-100 border-red-500"
      }`}
    >
      {loading ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <RiErrorWarningFill
          className={`text-2xl ${
            type === "info"
              ? "text-layer-secondary-600"
              : type === "success"
              ? "text-green-600"
              : type === "warning"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
          size={32}
        />
      )}
      <div className="flex flex-col gap-2">
        <div className="font-medium text-sm">
          You Are Changing Your Password
        </div>
        <p className="text-xs text-layer-dark-500">
          If you want to change your password, we will send you an email
        </p>
      </div>
    </div>
  );
}
