import React, { Fragment, ReactElement, useEffect, useState } from "react";
import CreateRobotFormVDISessionCount from "../CreateRobotFormVDISessionCount/CreateRobotFormVDISessionCount";
import CreateRobotFormCancelButton from "../CreateRobotFormCancelButton/CreateRobotFormCancelButton";
import { CreateEnvironmentsFormStep1Validations } from "../../validations/EnvironmentsValidations";
import CreateRobotFormGpuResource from "../CreateRobotFormGpuResource/CreateRobotFormGpuResource";
import CreateFormAdvancedSettings from "../CreateFormAdvancedSettings/CreateFormAdvancedSettings";
import CreateFormLoader from "../CreateFormLoader/CreateFormLoader";
import EnvironmentSelector from "../EnvironmentSelector/EnvironmentSelector";
import CreateRobotStorage from "../CreateRobotStorage/CreateRobotStorage";
import CreateFormGpuTypes from "../CreateFormGpuTypes/CreateFormGpuTypes";
import FormInputToggle from "../FormInputToggle/FormInputToggle";
import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import FormInputText from "../FormInputText/FormInputText";
import useCreateRobot from "../../hooks/useCreateRobot";
import useFunctions from "../../hooks/useFunctions";
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
      if (formik.values.configureWorkspace) {
        createEnvironment(() => {
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
    <Fragment>
      {
        <CreateFormLoader
          type="step1-app"
          loadingText="Loading..."
          loadingItems={[]}
          isLoading={isImportRobot ? !responseRobot : false}
          formik={formik}
        >
          <FormInputText
            labelName="Environment Name:"
            labelInfoTip="Type a new environment name."
            dataTut="create-application-step1-name"
            disabled={formik.isSubmitting || isImportRobot}
            inputHoverText="You can't change environment name because this environment is created before."
            inputProps={formik.getFieldProps("robotName")}
            inputError={formik.errors.robotName}
            inputTouched={formik.touched.robotName}
          />

          <Seperator />

          <EnvironmentSelector formik={formik} isImportRobot={isImportRobot} />

          <Seperator />

          <CreateFormGpuTypes formik={formik} isImportRobot={isImportRobot} />

          <Seperator />

          <CreateRobotStorage formik={formik} isImportRobot={isImportRobot} />

          <Seperator />

          <CreateRobotFormVDISessionCount
            formik={formik}
            disabled={isImportRobot}
          />

          <Seperator />

          <CreateRobotFormGpuResource
            formik={formik}
            disabled={isImportRobot}
          />

          <Seperator />

          <FormInputToggle
            labelName="Configure Workspaces:"
            labelInfoTip="Configure Workspaces"
            dataTut="create-robot-step1-ros2-bridge"
            disabled={isImportRobot}
            checked={formik?.values?.configureWorkspace}
            onChange={(e: boolean) => {
              formik.setFieldValue("configureWorkspace", e);
            }}
          />

          <Seperator />

          <CreateFormAdvancedSettings
            formik={formik}
            isImportRobot={isImportRobot}
          />

          <div className="mt-10 flex gap-2">
            <CreateRobotFormCancelButton
              disabled={formik.isSubmitting || isImportRobot}
            />
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
                ) : isImportRobot ? (
                  "Update Application"
                ) : (
                  "Create Application"
                )
              }
            />
          </div>
        </CreateFormLoader>
      }
    </Fragment>
  );
}
