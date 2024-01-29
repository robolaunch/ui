import { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import InputError from "../InputError/InputError";
import useMain from "../../hooks/useMain";
import InfoTip from "../InfoTip/InfoTip";
import { FormikProps } from "formik";
import { toast } from "sonner";
import { IEnvironmentStep1 } from "../../interfaces/envitonment.step1.interface";

interface ICreateRobotTypes {
  formik: FormikProps<IEnvironmentStep1>;
  isImportRobot?: boolean;
}

export default function CreateRobotTypes({
  formik,
  isImportRobot,
}: ICreateRobotTypes): ReactElement {
  const [responsePhysicalInstances, setResponsePhysicalInstances] =
    useState<any>(undefined);
  const { selectedState } = useMain();

  const { getPhysicalInstances } = useFunctions();

  useEffect(() => {
    if (!responsePhysicalInstances && !formik.values.details.isVirtualRobot) {
      handleGetPhysicalInstances();
    }

    responsePhysicalInstances?.filter(
      (instance: any) =>
        instance?.federationPhase !== "Connected" ||
        instance?.multicastPhase !== "Connected" ||
        instance?.phase !== "Connected",
    )?.length &&
      setResponsePhysicalInstances(
        responsePhysicalInstances?.filter(
          (instance: any) =>
            instance?.federationPhase === "Connected" &&
            instance?.multicastPhase === "Connected" &&
            instance?.phase === "Connected",
        ) || [],
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsePhysicalInstances, formik.values.details.isVirtualRobot]);

  function handleGetPhysicalInstances() {
    getPhysicalInstances(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.region!,
      },
      { setResponse: setResponsePhysicalInstances },
    );
  }

  return (
    <Fragment>
      <div
        data-tut="create-robot-step1-type"
        className="flex flex-col gap-2 pb-2"
      >
        <div className="flex min-w-fit gap-1 text-xs font-medium text-light-700">
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
                formik.values.details.isVirtualRobot ===
                robotType?.isVirtualRobot
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
                      "details.isVirtualRobot",
                      robotType?.isVirtualRobot,
                    );
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-xs text-light-800">
                  {robotType?.name}
                </span>
              </div>
              <div className="absolute inset-0 flex items-start justify-end p-2"></div>
            </div>
          ))}
        </div>
      </div>

      {!formik.values?.details.isVirtualRobot &&
      Array.isArray(responsePhysicalInstances) ? (
        responsePhysicalInstances?.length > 0 ? (
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex min-w-fit gap-1 text-xs font-medium text-light-700">
              Physical Instances:
              <InfoTip content="Select the physical instance you want to hybrid robot to be deployed on." />
            </div>
            <div className="flex gap-6">
              {responsePhysicalInstances?.map(
                (instance: any, index: number) => (
                  <div
                    key={index}
                    className={`relative flex w-40 cursor-pointer items-center justify-center gap-1 rounded border-2 p-4  ${
                      formik.values.details.physicalInstanceName ===
                      instance?.name
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
                            "tree.physicalInstance.name",
                            instance?.name,
                          );
                    }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-xs text-light-800">
                        {instance?.name}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-start justify-end p-2"></div>
                  </div>
                ),
              )}
            </div>
            <InputError
              error={formik.errors.details?.physicalInstanceName}
              touched={true}
            />
          </div>
        ) : (
          <div className="relative m-2 h-8">
            <SidebarInfo text="You need to create a physical instance first" />
          </div>
        )
      ) : (
        !formik.values.details.isVirtualRobot && (
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
