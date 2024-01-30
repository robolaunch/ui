import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import CFConfigWorkspaces from "../CFConfigWorkspaces/CFConfigWorkspaces";
import CFAdvancedSettings from "../CFAdvancedSettings/CFAdvancedSettings";
import { CFAppStep1Validations } from "../../validations/AppsValidations";
import CFEnvironmentName from "../CFEnvironmentName/CFEnvironmentName";
import CFJupyterNotebook from "../CFJupyterNotebook/CFJupyterNotebook";
import { Fragment, ReactElement, useEffect, useState } from "react";
import CFEnvCategories from "../CFEnvCategories/CFEnvCategories";
import CFStorageRange from "../CFStorageRange/CFStorageRange";
import useCreateRobot from "../../hooks/useCreateRobot";
import CFEnvButtons from "../CFEnvButtons/CFEnvButtons";
import useFunctions from "../../hooks/useFunctions";
import CFGpuTypes from "../CFGpuTypes/CFGpuTypes";
import CFVDICount from "../CFVDICount/CFVDICount";
import Seperator from "../Seperator/Seperator";
import CFSection from "../CFSection/CFSection";
import CFGpuCore from "../CFGpuCore/CFGpuCore";
import { useParams } from "react-router-dom";
import CFLoader from "../CFLoader/CFLoader";
import useMain from "../../hooks/useMain";
import { useFormik } from "formik";
import { toast } from "sonner";

interface ICFAppStep1 {
  isImportRobot?: boolean;
}

export default function CFAppStep1({
  isImportRobot = false,
}: ICFAppStep1): ReactElement {
  const [responseRobot, setResponseRobot] = useState<any>(undefined);

  const { selectedState, handleCreateRobotNextStep, setSidebarState } =
    useMain();
  const { getEnvironment, createEnvironment } = useFunctions();
  const { robotData, setRobotData } = useCreateRobot();
  const url = useParams();

  const formik = useFormik<IEnvironmentStep1>({
    validationSchema: CFAppStep1Validations,
    initialValues: robotData?.step1,
    onSubmit: async () => {
      formik.setSubmitting(true);

      if (!formik.values.details.configureWorkspace) {
        if (isImportRobot) {
          await createEnvironment(false).then(async () => {
            toast.success("Application updated successfully");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        }

        await createEnvironment(true).then(async () => {
          setSidebarState((prevState) => ({
            ...prevState,
            isCreateMode: false,
            page: "robot",
          }));
        });
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

  function handleGetEnvironment() {
    getEnvironment(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name!,
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
        <CFEnvironmentName formik={formik} disabled={isImportRobot} />
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

      <Fragment>
        {robotData.step1.services.ide.gpuModelName && (
          <CFSection>
            <CFGpuCore formik={formik} />
            <Seperator />
          </CFSection>
        )}
      </Fragment>

      <CFSection>
        <CFVDICount formik={formik} />
        <Seperator />
      </CFSection>

      <CFSection>
        <CFStorageRange formik={formik} disabled={isImportRobot} />
        <Seperator />
      </CFSection>

      <Fragment>
        {!isImportRobot && (
          <CFSection>
            <CFJupyterNotebook formik={formik} />
            <Seperator />
          </CFSection>
        )}
      </Fragment>

      <Fragment>
        {!isImportRobot && (
          <CFSection>
            <CFConfigWorkspaces formik={formik} disabled={isImportRobot} />
            <Seperator />
          </CFSection>
        )}
      </Fragment>

      <CFAdvancedSettings formik={formik} disabled={isImportRobot} />

      <Fragment>
        <CFEnvButtons formik={formik} isImportRobot={isImportRobot} />
      </Fragment>
    </CFLoader>
  );
}
