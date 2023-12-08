import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { getPhysicalInstances } from "../../toolkit/InstanceSlice";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import { useAppDispatch } from "../../hooks/redux";
import InputError from "../InputError/InputError";
import useMain from "../../hooks/useMain";
import InfoTip from "../InfoTip/InfoTip";
import { toast } from "sonner";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik";

interface ICreateRobotTypes {
  formik: FormikProps<IDetails>;
  isImportRobot?: boolean;
}

export default function CreateRobotTypes({
  formik,
  isImportRobot,
}: ICreateRobotTypes): ReactElement {
  const [responsePhysicalInstances, setResponsePhysicalInstances] =
    useState<any>(undefined);
  const dispatch = useAppDispatch();
  const { selectedState } = useMain();

  useEffect(() => {
    !formik.values?.isVirtualRobot &&
      !Array.isArray(responsePhysicalInstances) &&
      dispatch(
        getPhysicalInstances({
          organizationId: selectedState?.organization?.organizationId,
          roboticsCloudName: selectedState?.roboticsCloud?.name,
          instanceId: selectedState?.instance?.instanceId,
          region: selectedState?.instance?.region,
        }),
      ).then((response: any) => {
        setResponsePhysicalInstances(
          response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchPhysicalInstances?.filter(
            (instance: any) =>
              instance?.federationPhase === "Connected" &&
              instance?.multicastPhase === "Connected" &&
              instance?.phase === "Connected",
          ) || [],
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
      <div
        data-tut="create-robot-step1-type"
        className="flex flex-col gap-2 pb-2"
      >
        <div className="text-light-700 flex min-w-fit gap-1 text-xs font-medium">
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
              title={
                robotType?.disabled &&
                "You can't change robot type because this robot is created before."
              }
              key={index}
              className={`relative flex w-full items-center justify-center gap-1 rounded border-2 p-3 transition-all duration-300 ${
                formik.values?.isVirtualRobot === robotType?.isVirtualRobot
                  ? robotType?.disabled
                    ? "border-primary-300"
                    : "border-primary-400 shadow"
                  : "border-light-100"
              } ${
                robotType?.disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={() => {
                robotType?.disabled
                  ? toast.error("You can't change robot type in update mode")
                  : formik.setFieldValue(
                      "isVirtualRobot",
                      robotType?.isVirtualRobot,
                    );
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-light-800 text-xs">
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
          <div className="flex flex-col gap-2 pt-1">
            <div className="text-light-700 flex min-w-fit gap-1 text-xs font-medium">
              Physical Instances:
              <InfoTip content="Select the physical instance you want to hybrid robot to be deployed on." />
            </div>
            <div className="flex gap-6">
              {responsePhysicalInstances?.map(
                (instance: any, index: number) => (
                  <div
                    key={index}
                    className={`relative flex w-40 cursor-pointer items-center justify-center gap-1 rounded border-2 p-4  ${
                      formik.values?.physicalInstanceName === instance?.name
                        ? "border-primary-400 shadow"
                        : "border-light-100"
                    } transition-all duration-300
               `}
                    onClick={() => {
                      isImportRobot
                        ? toast.error(
                            "You can't change physical instance in update mode",
                          )
                        : formik.setFieldValue(
                            "physicalInstanceName",
                            instance?.name,
                          );
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-light-800 text-xs">
                        {instance?.name}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-start justify-end p-2"></div>
                  </div>
                ),
              )}
            </div>
            <InputError
              error={formik.errors?.physicalInstanceName}
              touched={true}
            />
          </div>
        ) : (
          <div className="relative m-2 h-8">
            <SidebarInfo text="You need to create a physical instance first" />
          </div>
        )
      ) : (
        !formik.values?.isVirtualRobot && (
          <div className="relative h-8">
            <img
              className="mx-auto w-12"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          </div>
        )
      )}
    </Fragment>
  );
}
