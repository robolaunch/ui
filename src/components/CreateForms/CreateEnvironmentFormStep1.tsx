import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";
import CreateRobotStorage from "../CreateRobotStorage/CreateRobotStorage";
import { createRobot } from "../../toolkit/RobotSlice";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import Seperator from "../Seperator/Seperator";
import { useParams } from "react-router-dom";
import useCreateRobot from "../../hooks/useCreateRobot";
import useMain from "../../hooks/useMain";
import InfoTip from "../InfoTip/InfoTip";
import Button from "../Button/Button";
import { useFormik } from "formik";
import { toast } from "sonner";
import CreateRobotFormCancelButton from "../CreateRobotFormCancelButton/CreateRobotFormCancelButton";
import { CreateEnvironmentsFormStep1Validations } from "../../validations/EnvironmentsValidations";
import EnvironmentSelector from "../EnvironmentSelector/EnvironmentSelector";

interface ICreateEnvironmentFormStep1 {
  isImportRobot?: boolean;
}

export default function CreateEnvironmentFormStep1({
  isImportRobot,
}: ICreateEnvironmentFormStep1): ReactElement {
  const { robotData, setRobotData }: any = useCreateRobot();
  const { selectedState, handleCreateRobotNextStep } = useMain();
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const dispatch = useAppDispatch();
  const { getRobot } = useFunctions();
  const url = useParams();

  useEffect(() => {
    if (!responseRobot && isImportRobot) {
      handleGetRobot();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGetRobot() {
    getRobot(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.roboticsCloud?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName || url?.robotName,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseRobot,
        setRobotData: setRobotData,
      }
    );
  }

  const formik = useFormik({
    validationSchema: CreateEnvironmentsFormStep1Validations,
    initialValues: robotData?.step1,

    onSubmit: async () => {
      formik.setSubmitting(true);

      if (isImportRobot) {
        await dispatch(
          createRobot({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.roboticsCloud?.region,
            fleetName: selectedState?.fleet?.name,
            robotName: formik.values?.robotName,
            physicalInstanceName: robotData?.step1?.isVirtualRobot
              ? undefined
              : robotData?.step1?.physicalInstanceName,
            distributions: formik.values?.rosDistros,
            bridgeEnabled: formik.values?.isEnabledROS2Bridge,
            vdiEnabled: formik.values?.remoteDesktop?.isEnabled,
            vdiSessionCount: formik.values?.remoteDesktop?.sessionCount,
            ideEnabled: formik.values?.isEnabledIde,
            storageAmount: formik.values?.robotStorage,
            gpuEnabledForCloudInstance:
              formik.values?.gpuEnabledForCloudInstance,
            workspaces: responseRobot?.robotWorkspaces,
          })
        );

        toast.success(
          "Robot updated successfully. Redirecting to fleet page..."
        );
        setTimeout(() => {
          window.location.href = `/${
            selectedState?.organization?.organizationName?.split("_")[1]
          }/${selectedState?.roboticsCloud?.name}/${
            selectedState?.instance?.name
          }/${selectedState?.fleet?.name}/${robotData?.step1?.robotName}}`;
        }, 2000);
      }

      formik.setSubmitting(false);
      handleCreateRobotNextStep();
    },
  });

  useEffect(() => {
    setRobotData({
      ...robotData,
      step1: formik.values,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  useEffect(() => {
    if (formik.values.isVirtualRobot) {
      formik.setFieldValue("physicalInstanceName", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.isVirtualRobot]);

  return (
    <Fragment>
      {
        <CreateRobotFormLoader
          loadingText="Loading..."
          loadingItems={[]}
          isLoading={isImportRobot ? !responseRobot : false}
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 animate__animated animate__fadeIn relative"
          >
            {/* RobotName */}
            <div>
              <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
                Environment Name:
                <InfoTip content="Type a new robot name." />
              </div>
              <InputText
                {...formik.getFieldProps("robotName")}
                className="!text-sm"
                disabled={formik.isSubmitting || isImportRobot}
                inputHoverText={
                  formik.isSubmitting || isImportRobot
                    ? "You can't change robot name because this robot is created before."
                    : ""
                }
              />
              <InputError
                error={formik.errors.robotName}
                touched={formik.touched.robotName}
              />
            </div>
            {/* RobotName */}

            {/* Environment Selector */}
            <EnvironmentSelector formik={formik} />
            {/* Environment Selector */}

            {formik.values.application?.name && <Seperator />}
            <div className="flex flex-col gap-4">
              {/* Robot Storage */}
              <CreateRobotStorage
                formik={formik}
                isImportRobot={isImportRobot}
              />
              {/* Robot Storage */}

              <Seperator />

              {/* Robot Services */}
              <div className="flex items-center gap-4">
                <div className="flex gap-2 w-full">
                  <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700">
                    VDI: Session Count (
                    {formik?.values?.remoteDesktop?.sessionCount} User) :
                    <InfoTip
                      content="Session Count is the number of simultaneous remote desktop sessions that can be created for the robot. Each session is independent of the other, meaning that each session can be used by a different user. The session count is expandable, meaning that you can increase the session count at any time."
                      rightTip
                    />
                  </div>
                  <input
                    min="1"
                    max="10"
                    type="range"
                    autoComplete="off"
                    {...formik.getFieldProps("remoteDesktop.sessionCount")}
                    className="w-full"
                    style={{
                      appearance: "auto",
                      padding: "0px",
                      color: "#AC2DFE",
                      accentColor: "currentcolor",
                    }}
                    disabled={formik.isSubmitting}
                  />
                </div>
              </div>
              {/* Robot Services */}
            </div>
            <div className="flex gap-2 mt-10 ">
              {!isImportRobot && (
                <CreateRobotFormCancelButton disabled={formik.isSubmitting} />
              )}
              <Button
                disabled={
                  !formik.isValid ||
                  formik.isSubmitting ||
                  JSON.stringify(formik.initialValues) ===
                    JSON.stringify(formik.values)
                }
                type="submit"
                className="!h-11 text-xs"
                text={
                  formik.isSubmitting ? (
                    <img
                      className="w-10 h-10"
                      src="/svg/general/loading.svg"
                      alt="loading"
                    />
                  ) : isImportRobot ? (
                    "Update Robot"
                  ) : (
                    `Next Step`
                  )
                }
              />
            </div>
          </form>
        </CreateRobotFormLoader>
      }
    </Fragment>
  );
}
