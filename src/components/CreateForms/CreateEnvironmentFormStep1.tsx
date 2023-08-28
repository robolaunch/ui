import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormVDISessionCount from "../CreateRobotFormVDISessionCount/CreateRobotFormVDISessionCount";
import CreateRobotFormGpuResource from "../CreateRobotFormGpuResource/CreateRobotFormGpuResource";
import CreateRobotFormCancelButton from "../CreateRobotFormCancelButton/CreateRobotFormCancelButton";
import { CreateEnvironmentsFormStep1Validations } from "../../validations/EnvironmentsValidations";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";
import EnvironmentSelector from "../EnvironmentSelector/EnvironmentSelector";
import CreateRobotStorage from "../CreateRobotStorage/CreateRobotStorage";
import useCreateRobot from "../../hooks/useCreateRobot";
import { createRobot } from "../../toolkit/RobotSlice";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import InputError from "../InputError/InputError";
import InputText from "../InputText/InputText";
import Seperator from "../Seperator/Seperator";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import InfoTip from "../InfoTip/InfoTip";
import Button from "../Button/Button";
import { useFormik } from "formik";
import { toast } from "sonner";

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
  const { getEnvironment } = useFunctions();
  const url = useParams();

  useEffect(() => {
    if (!responseRobot && isImportRobot) {
      handleGetEnvironment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGetEnvironment() {
    getEnvironment(
      {
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name,
        environmentName: url?.robotName!,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        setResponse: setResponseRobot,
        setRobotData: true,
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
            organizationId: selectedState?.organization?.organizationId!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.roboticsCloud?.region!,
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
            <EnvironmentSelector
              formik={formik}
              isImportRobot={isImportRobot}
            />
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
              <CreateRobotFormVDISessionCount
                formik={formik}
                disabled={isImportRobot}
              />
              {/* Robot Services */}

              <Seperator />

              <CreateRobotFormGpuResource
                formik={formik}
                disabled={isImportRobot}
              />
            </div>

            {!url.robotName && (
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
                      "Update Application"
                    ) : (
                      `Next Step`
                    )
                  }
                />
              </div>
            )}
          </form>
        </CreateRobotFormLoader>
      }
    </Fragment>
  );
}
