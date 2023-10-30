import React, { ReactElement, useEffect, useState } from "react";
import { CreateEnvironmentsFormStep1Validations } from "../../validations/EnvironmentsValidations";
import CFConfigWorkspaces from "../CFConfigWorkspaces/CFConfigWorkspaces";
import CFAdvancedSettings from "../CFAdvancedSettings/CFAdvancedSettings";
import CFGpuResourceRange from "../CFGpuResourceRange/CFGpuResourceRange";
import CreateFormLoader from "../CFLoader/CFLoader";
import CFEnvCategories from "../CFEnvCategories/CFEnvCategories";
import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import CFStorageRange from "../CFStorageRange/CFStorageRange";
import CFCancelButton from "../CFCancelButton/CFCancelButton";
import useCreateRobot from "../../hooks/useCreateRobot";
import useFunctions from "../../hooks/useFunctions";
import CFGpuTypes from "../CFGpuTypes/CFGpuTypes";
import CFVDICount from "../CFVDICount/CFVDICount";
import CFEnvName from "../CFEnvName/CFEnvName";
import Seperator from "../Seperator/Seperator";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import Button from "../Button/Button";
import { useFormik } from "formik";

interface ICreateEnvironmentFormStep1 {
  isImportRobot?: boolean;
}

export default function CreateEnvironmentFormStep1({
  isImportRobot,
}: ICreateEnvironmentFormStep1): ReactElement {
  const [responseRobot, setResponseRobot] = useState<any>(undefined);

  const { selectedState, setSidebarState, handleCreateRobotNextStep } =
    useMain();
  const { getEnvironment, createEnvironment } = useFunctions();
  const { robotData, setRobotData }: any = useCreateRobot();
  const url = useParams();

  const formik = useFormik<IRobotStep1>({
    validationSchema: CreateEnvironmentsFormStep1Validations,
    initialValues: robotData?.step1,
    onSubmit: async () => {
      formik.setSubmitting(true);
      if (!formik.values.configureWorkspace) {
        createEnvironment(async () => {
          setSidebarState((prevState: any) => {
            return {
              ...prevState,
              isCreateMode: false,
              page: "robot",
            };
          });
        }, true);
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
        instanceId: selectedState?.instance?.instanceId,
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
    <CreateFormLoader
      type="step1-app"
      loadingText="Loading..."
      loadingItems={[]}
      isLoading={isImportRobot ? !responseRobot : false}
      formik={formik}
    >
      <CFEnvName formik={formik} isImportRobot={isImportRobot} />

      <Seperator />

      <CFEnvCategories formik={formik} isImportRobot={isImportRobot} />

      <Seperator />

      <CFGpuTypes formik={formik} isImportRobot={isImportRobot} />

      <Seperator />

      <CFStorageRange formik={formik} isImportRobot={isImportRobot} />

      <Seperator />

      <CFVDICount formik={formik} disabled={isImportRobot} />

      <Seperator />

      <CFGpuResourceRange formik={formik} disabled={isImportRobot} />

      <Seperator />

      <CFConfigWorkspaces formik={formik} isImportRobot={isImportRobot} />

      <Seperator />

      <CFAdvancedSettings formik={formik} isImportRobot={isImportRobot} />

      <div className="mt-10 flex gap-2">
        <CFCancelButton disabled={formik.isSubmitting || isImportRobot} />
        <Button
          disabled={!formik.isValid || formik.isSubmitting || isImportRobot}
          type="submit"
          className="!h-11 text-xs"
          text={
            formik.isSubmitting ? (
              <img
                className="h-10 w-10"
                src="/svg/general/loading.svg"
                alt="loading"
              />
            ) : formik.values.configureWorkspace ? (
              "Next Step"
            ) : (
              "Create Application"
            )
          }
        />
      </div>
    </CreateFormLoader>
  );
}
