import { CreateEnvironmentsFormStep1Validations } from "../../validations/EnvironmentsValidations";
import CFConfigWorkspaces from "../CFConfigWorkspaces/CFConfigWorkspaces";
import CFAdvancedSettings from "../CFAdvancedSettings/CFAdvancedSettings";
import React, { ReactElement, useEffect, useState } from "react";
import CFEnvCategories from "../CFEnvCategories/CFEnvCategories";
import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import CFStorageRange from "../CFStorageRange/CFStorageRange";
import CFEnvButtons from "../CFEnvButtons/CFEnvButtons";
import useCreateRobot from "../../hooks/useCreateRobot";
import useFunctions from "../../hooks/useFunctions";
import CFGpuTypes from "../CFGpuTypes/CFGpuTypes";
import CFVDICount from "../CFVDICount/CFVDICount";
import CFEnvName from "../CFEnvName/CFEnvName";
import Seperator from "../Seperator/Seperator";
import CFSection from "../CFSection/CFSection";
import { useParams } from "react-router-dom";
import CFLoader from "../CFLoader/CFLoader";
import useMain from "../../hooks/useMain";
import { useFormik } from "formik";

interface ICreateEnvironmentFormStep1 {
  isImportRobot?: boolean;
}

export default function CreateEnvironmentFormStep1({
  isImportRobot,
}: ICreateEnvironmentFormStep1): ReactElement {
  const [responseRobot, setResponseRobot] = useState<any>(undefined);

  const { selectedState, handleCreateRobotNextStep } = useMain();
  const { getEnvironment, createEnvironment } = useFunctions();
  const { robotData, setRobotData }: any = useCreateRobot();
  const url = useParams();

  const formik = useFormik<IRobotStep1>({
    validationSchema: CreateEnvironmentsFormStep1Validations,
    initialValues: robotData?.step1,
    onSubmit: async () => {
      formik.setSubmitting(true);

      if (!formik.values.configureWorkspace) {
        await createEnvironment(true);
      } else {
        formik.setSubmitting(false);
        handleCreateRobotNextStep();
      }
    },
  });

  useEffect(() => {
    if (!responseRobot && isImportRobot) {
      handleGetEnvironment();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <CFLoader
      type="step1-app"
      loadingText="Loading..."
      loadingItems={[]}
      isLoading={isImportRobot ? !responseRobot : false}
      formik={formik}
    >
      <CFSection>
        <CFEnvName formik={formik} disabled={isImportRobot} />
        <Seperator />
      </CFSection>

      <CFSection>
        <CFEnvCategories formik={formik} disabled={isImportRobot} />
        <Seperator />
      </CFSection>

      <CFSection>
        <CFGpuTypes formik={formik} disabled={isImportRobot} />
        <Seperator />
      </CFSection>

      <CFSection>
        <CFVDICount formik={formik} disabled={isImportRobot} />
        <Seperator />
      </CFSection>

      <CFSection>
        <CFStorageRange formik={formik} disabled={isImportRobot} />
        <Seperator />
      </CFSection>

      <CFSection>
        <CFConfigWorkspaces formik={formik} disabled={isImportRobot} />
        <Seperator />
      </CFSection>

      <CFAdvancedSettings formik={formik} disabled={isImportRobot} />

      <CFEnvButtons formik={formik} disabled={isImportRobot} />
    </CFLoader>
  );
}
