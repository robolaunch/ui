import React, { ReactElement } from "react";

interface ICreateFormGpuTypesGridItem {
  formik: any;
  disabled?: boolean;
  type: any;
  index: number;
}

export default function CreateFormGpuTypesGridItem({
  formik,
  disabled,
  type,
  index,
}: ICreateFormGpuTypesGridItem): ReactElement {
  return (
    <div
      key={index}
      className={`transition-300 flex flex-col items-center justify-center gap-2 rounded border-2 px-1 py-3 text-xs capitalize
                ${
                  formik.values.ideGpuResourceType === type?.resourceName
                    ? "border-primary "
                    : "border-gray-300 "
                }
                ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      onClick={() => {
        !disabled &&
          formik.setFieldValue("ideGpuResourceType", type?.resourceName);
      }}
    >
      <span>{type?.resourceName}</span>
      <span>
        {type?.allocated}/{type?.capacity}
      </span>
    </div>
  );
}
