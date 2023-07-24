import React, { Fragment, ReactElement, useEffect, useState } from "react";
import InfoTip from "../InfoTip/InfoTip";
import { toast } from "sonner";
import InputError from "../InputError/InputError";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import { getPhysicalInstances } from "../../toolkit/InstanceSlice";

interface ICreateRobotTypes {
  formik: any;
  isImportRobot?: boolean;
}

export default function CreateRobotTypes({
  formik,
  isImportRobot,
}: ICreateRobotTypes): ReactElement {
  const [responsePhysicalInstances, setResponsePhysicalInstances] =
    useState<any>(undefined);
  const dispatch = useAppDispatch();
  const { selectedState } = useSidebar();

  useEffect(() => {
    !formik.values?.isVirtualRobot &&
      !Array.isArray(responsePhysicalInstances) &&
      dispatch(
        getPhysicalInstances({
          organizationId: selectedState?.organization?.organizationId,
          roboticsCloudName: selectedState?.roboticsCloud?.name,
          instanceId: selectedState?.instance?.instanceId,
          region: selectedState?.instance?.region,
        })
      ).then((response: any) => {
        console.log(response);
        setResponsePhysicalInstances(
          response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchPhysicalInstances?.filter(
            (instance: any) =>
              instance?.federationPhase === "Connected" &&
              instance?.multicastPhase === "Connected" &&
              instance?.phase === "Connected"
          ) || []
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dispatch,
    formik.values.isVirtualRobot,
    selectedState?.instance?.instanceId,
    selectedState?.instance?.region,
    selectedState?.organization?.organizationId,
    selectedState?.roboticsCloud?.name,
  ]);

  return (
    <Fragment>
      <div className="flex flex-col gap-1.5">
        <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
          Robot Type:
          <InfoTip content="Select the type of robot you want to create." />
        </div>
        <div className="flex gap-6">
          {[
            {
              name: "Virtual Robot",
              isVirtualRobot: true,
              disabled: isImportRobot,
            },
            {
              name: "Hybrid Robot",
              isVirtualRobot: false,
              disabled: isImportRobot,
            },
          ]?.map((robotType: any, index: number) => (
            <div
              key={index}
              className={`relative flex justify-center items-center gap-1 border-2 p-4 rounded  w-full transition-all duration-300 ${
                formik.values?.isVirtualRobot === robotType?.isVirtualRobot
                  ? robotType?.disabled
                    ? "border-layer-primary-300"
                    : "border-layer-primary-600 shadow"
                  : "border-layer-light-100"
              } ${
                robotType?.disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                robotType?.disabled
                  ? toast.error("You can't change robot type in update mode")
                  : formik.setFieldValue(
                      "isVirtualRobot",
                      robotType?.isVirtualRobot
                    );
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-layer-light-800">
                  {robotType?.name}
                </span>
              </div>
              <div className="absolute inset-0 flex items-start justify-end p-2"></div>
            </div>
          ))}
        </div>
      </div>

      {!formik.values?.isVirtualRobot &&
      Array.isArray(responsePhysicalInstances) ? (
        responsePhysicalInstances?.length > 0 ? (
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
              Physical Instances:
              <InfoTip content="Select the physical instance you want to hybrid robot to be deployed on." />
            </div>
            <div className="flex gap-6">
              {responsePhysicalInstances?.map(
                (instance: any, index: number) => (
                  <div
                    key={index}
                    className={`relative flex justify-center items-center gap-1 border-2 p-4 rounded cursor-pointer w-40  ${
                      formik.values?.physicalInstanceName === instance?.name
                        ? "border-layer-primary-600 shadow"
                        : "border-layer-light-100"
                    } transition-all duration-300
               `}
                    onClick={() => {
                      isImportRobot
                        ? toast.error(
                            "You can't change physical instance in update mode"
                          )
                        : formik.setFieldValue(
                            "physicalInstanceName",
                            instance?.name
                          );
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs text-layer-light-800">
                        {instance?.name}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-start justify-end p-2"></div>
                  </div>
                )
              )}
            </div>
            <InputError
              error={formik.errors?.physicalInstanceName}
              touched={true}
            />
          </div>
        ) : (
          <div className="relative h-8">
            <SidebarInfo text="You need to create a physical instance first" />
          </div>
        )
      ) : (
        !formik.values?.isVirtualRobot && (
          <div className="relative h-8">
            <img
              className="w-12 mx-auto"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          </div>
        )
      )}
    </Fragment>
  );
}
