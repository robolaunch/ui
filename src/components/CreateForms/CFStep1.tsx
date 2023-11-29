import { CFRobotStep1Validations } from "../../validations/RobotsValidations";
import CreateRobotFormCancelButton from "../CFCancelButton/CFCancelButton";
import { addPhysicalInstanceToFleet } from "../../toolkit/InstanceSlice";
import { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotTypes from "../CreateRobotTypes/CreateRobotTypes";
import CreateRobotStorage from "../CFStorageRange/CFStorageRange";
import CFBridgeToggle from "../CFBridgeToggle/CFBridgeToggle";
import { IDetails } from "../../interfaces/robotInterfaces";
import { envApplication } from "../../helpers/envProvider";
import CreateRobotFormLoader from "../CFLoader/CFLoader";
import useCreateRobot from "../../hooks/useCreateRobot";
import CFRosDistros from "../CFRosDistros/CFRosDistros";
import { createRobot } from "../../toolkit/RobotSlice";
import CFGPUToggle from "../CFGPUToggle/CFGPUToggle";
import CFRobotName from "../CFRobotName/CFRobotName";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import CFVDICount from "../CFVDICount/CFVDICount";
import CFSection from "../CFSection/CFSection";
import Seperator from "../Seperator/Seperator";
import CFDevMode from "../CFDevMode/CFDevMode";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import Button from "../Button/Button";
import { useFormik } from "formik";
import { toast } from "sonner";

interface ICFStep1 {
  isImportRobot?: boolean;
}

export default function CFStep1({ isImportRobot }: ICFStep1): ReactElement {
  const { robotData, setRobotData } = useCreateRobot();
  const { selectedState, handleCreateRobotNextStep } = useMain();
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const { getRobot, getEnvironment } = useFunctions();
  const url = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!responseRobot && isImportRobot) {
      envApplication ? handleGetEnvironment() : handleGetRobot();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGetRobot() {
    getRobot(
      {
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName || url?.robotName!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseRobot,
        setRobotData: true,
      },
    );
  }

  function handleGetEnvironment() {
    getEnvironment(
      {
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name,
        environmentName: url?.robotName!,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        setResponse: setResponseRobot,
        setRobotData: true,
      },
    );
  }

  const formik = useFormik<IDetails>({
    validationSchema: CFRobotStep1Validations,
    initialValues: robotData?.step1,
    onSubmit: async () => {
      formik.setSubmitting(true);

      if (isImportRobot) {
        await dispatch(
          createRobot({
            organizationId: selectedState?.organization?.organizationId!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.instanceId!,
            region: selectedState?.roboticsCloud?.region!,
            robotName: robotData?.step1?.robotName,
            fleetName: selectedState?.fleet?.name,
            physicalInstanceName: robotData?.step1?.isVirtualRobot
              ? undefined
              : robotData?.step1?.physicalInstanceName,
            distributions: robotData?.step1?.rosDistros,
            bridgeEnabled: robotData?.step1?.isEnabledROS2Bridge,
            vdiEnabled: robotData?.step1?.remoteDesktop?.isEnabled,
            vdiSessionCount: robotData?.step1?.remoteDesktop?.sessionCount,
            ideEnabled: robotData?.step1?.isEnabledIde,
            storageAmount: robotData?.step1?.robotStorage,
            gpuEnabledForCloudInstance:
              robotData?.step1?.gpuEnabledForCloudInstance,
            workspaces: robotData.step2.workspaces,
          }),
        );

        toast.success(
          "Robot updated successfully. Redirecting to fleet page...",
        );
        setTimeout(() => {
          window.location.href = `/${selectedState?.organization?.organizationName?.split(
            "_",
          )[1]}/${selectedState?.roboticsCloud?.name}/${selectedState?.instance
            ?.name}/${selectedState?.fleet?.name}/${robotData?.step1
            ?.robotName}}`;
        }, 2000);
      } else if (!formik.values?.isVirtualRobot) {
        await dispatch(
          addPhysicalInstanceToFleet({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.roboticsCloud?.region,
            robolaunchFederatedFleetsName: selectedState?.fleet?.name,
            robolaunchPhysicalInstancesName:
              robotData.step1.physicalInstanceName,
          }),
        );
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
          type="step1-robot"
          loadingText="Loading..."
          loadingItems={[]}
          isLoading={isImportRobot ? !responseRobot : false}
          formik={formik}
        >
          <CFSection>
            <CFRobotName formik={formik} isImportRobot={isImportRobot} />
          </CFSection>

          <Seperator />

          <CFSection>
            <CreateRobotTypes formik={formik} isImportRobot={isImportRobot} />
          </CFSection>

          <Seperator />

          <CFSection>
            <CFRosDistros formik={formik} isImportRobot={isImportRobot} />
          </CFSection>

          <Seperator />

          <CFSection>
            <CreateRobotStorage formik={formik} disabled={isImportRobot} />
          </CFSection>

          <Seperator />

          <div className="flex items-center gap-4">
            <CFBridgeToggle formik={formik} isImportRobot={isImportRobot} />

            <CFVDICount formik={formik} disabled={isImportRobot} />
          </div>

          <Seperator />

          <CFSection>
            <CFGPUToggle formik={formik} isImportRobot={isImportRobot} />
          </CFSection>

          <Seperator />

          <Fragment>
            {!isImportRobot && (
              <CFDevMode formik={formik} isImportRobot={isImportRobot} />
            )}
          </Fragment>

          <div className="mt-10 flex gap-2 ">
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
              loading={formik.isSubmitting}
              text={isImportRobot ? "Update Robot" : `Next Step`}
            />
          </div>
        </CreateRobotFormLoader>
      }
    </Fragment>
  );
}
