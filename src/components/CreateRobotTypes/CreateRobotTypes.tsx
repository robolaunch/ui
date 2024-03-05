import { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import InputError from "../InputError/InputError";
import InfoTip from "../InfoTip/InfoTip";
import { FormikProps } from "formik";
import { toast } from "sonner";
import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import { IPhysicalInstance } from "../../interfaces/global/physicalInstance.interface";

interface ICreateRobotTypes {
  formik: FormikProps<IEnvironmentStep1>;
  isImportRobot?: boolean;
  isDeployMode?: boolean;
}

export default function CreateRobotTypes({
  formik,
  isImportRobot,
  isDeployMode,
}: ICreateRobotTypes): ReactElement {
  const [responsePhysicalInstances, setResponsePhysicalInstances] = useState<
    IPhysicalInstance[] | null
  >();

  const { getPhysicalInstancesFC } = useFunctions();

  useEffect(() => {
    if (!responsePhysicalInstances && !formik.values.details.isVirtualRobot) {
      handleGetPhysicalInstances();
    }

    responsePhysicalInstances?.filter(
      (instance) =>
        instance?.k8sStatus !== "Connected" ||
        instance?.connectionStatus !== "Connected" ||
        instance?.status !== "Connected",
    )?.length &&
      setResponsePhysicalInstances(
        responsePhysicalInstances?.filter(
          (instance) =>
            instance?.k8sStatus === "Connected" &&
            instance?.connectionStatus === "Connected" &&
            instance?.status === "Connected",
        ) || [],
      );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [responsePhysicalInstances, formik.values.details.isVirtualRobot]);

  async function handleGetPhysicalInstances() {
    setResponsePhysicalInstances(
      (await getPhysicalInstancesFC(false, false)) as IPhysicalInstance[],
    );
  }

  useEffect(() => {
    if (formik.values.details.isVirtualRobot) {
      formik.setFieldValue("details.physicalInstanceName", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.details.isVirtualRobot]);

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
              name: isDeployMode ? "Virtual Instance" : "Virtual Robot",
              isVirtualRobot: true,
              disabled: isImportRobot,
            },
            {
              name: isDeployMode ? "Physical Instance" : "Hybrid Robot",
              isVirtualRobot: false,
              disabled: isImportRobot,
            },
          ]?.map((robotType, index: number) => (
            <div
              title={
                robotType?.disabled
                  ? "You can't change robot type because this robot is created before."
                  : ""
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
              {responsePhysicalInstances?.map((instance, index: number) => (
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
                          "details.physicalInstanceName",
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
              ))}
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
