import React, { Fragment, ReactElement } from "react";
import InfoTip from "../InfoTip/InfoTip";
import { toast } from "sonner";
import Seperator from "../Seperator/Seperator";

interface IAdrinNetworkTypes {
  formik: any;
  isImportRobot?: boolean;
}

export default function AdrinNetworkTypes({
  formik,
  isImportRobot,
}: IAdrinNetworkTypes): ReactElement {
  return (
    <Fragment>
      <div className="flex flex-col gap-2">
        <div className="min-w-fit flex flex-wrap gap-1 text-xs font-medium text-layer-light-700">
          ADriN Regions:
          <InfoTip content="ADriN Region." />
        </div>
        <div className="flex gap-6">
          {["Region #1", "Region #2", "Region #3", "Region #4"]?.map(
            (region: string, index: number) => (
              <div
                title={
                  isImportRobot
                    ? "You can't change robot type because this robot is created before."
                    : ""
                }
                key={index}
                className={`relative flex justify-center items-center gap-1 border-2 p-4 rounded  w-full transition-all duration-300 ${
                  formik.values?.adrinRegion === region
                    ? isImportRobot
                      ? "border-layer-primary-300"
                      : "border-layer-primary-600 shadow"
                    : "border-layer-light-100"
                } ${isImportRobot ? "cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => {
                  isImportRobot
                    ? toast.error("You can't change robot type in update mode")
                    : formik.setFieldValue("adrinRegion", region);
                }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-xs text-layer-light-800">{region}</span>
                </div>
                <div className="absolute inset-0 flex items-start justify-end p-2"></div>
              </div>
            )
          )}
        </div>
      </div>

      <Seperator />

      <div className="flex flex-col gap-2">
        <div className="min-w-fit flex flex-wrap gap-1 text-xs font-medium text-layer-light-700">
          ADriN Types:
          <InfoTip content="ADriN Types." />
        </div>
        <div className="flex gap-6">
          {["Central", "Data", "Video"]?.map((type: string, index: number) => (
            <div
              title={
                isImportRobot
                  ? "You can't change robot type because this robot is created before."
                  : ""
              }
              key={index}
              className={`relative flex justify-center items-center gap-1 border-2 p-4 rounded  w-full transition-all duration-300 ${
                formik.values?.adrinTypes === type
                  ? isImportRobot
                    ? "border-layer-primary-300"
                    : "border-layer-primary-600 shadow"
                  : "border-layer-light-100"
              } ${isImportRobot ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => {
                isImportRobot
                  ? toast.error("You can't change robot type in update mode")
                  : formik.setFieldValue("adrinTypes", type);
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-layer-light-800">{type}</span>
              </div>
              <div className="absolute inset-0 flex items-start justify-end p-2"></div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
