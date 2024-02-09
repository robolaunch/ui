import { IEnvironmentStep2 } from "../../interfaces/environment/environment.step2.interface";
import CFAddWorkspaceButton from "../CFAddWorkspaceButton/CFAddWorkspaceButton";
import { CFRobotStep2Validations } from "../../validations/RobotsValidations";
import CFWorkspacesMapper from "../CFWorkspacesMapper/CFWorkspacesMapper";
import { CFAppStep2Validations } from "../../validations/AppsValidations";
import { Fragment, ReactElement, useEffect, useState } from "react";
import CFRobotButtons from "../CFRobotButtons/CFRobotButtons";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import CFLoader from "../CFLoader/CFLoader";
import useMain from "../../hooks/useMain";
import { useFormik } from "formik";
import { toast } from "sonner";

interface ICFStep2 {
  isImportRobot?: boolean;
}

export default function CFStep2({ isImportRobot }: ICFStep2): ReactElement {
  const [responseRobot, setResponseRobot] = useState<any>(undefined);

  const {
    robotData,
    setRobotData,
    selectedState,
    handleCreateRobotNextStep,
    setSidebarState,
    applicationMode,
  } = useMain();
  const [isLoadingImportRobot, setIsLoadingImportRobot] =
    useState<boolean>(true);
  const {
    getRobot,
    getFleetsFC,
    getNamespacesFC,
    getEnvironment,
    createEnvironment,
    createRobot,
  } = useFunctions();
  const url = useParams();

  const formik = useFormik<IEnvironmentStep2>({
    validationSchema: applicationMode
      ? CFAppStep2Validations
      : CFRobotStep2Validations,
    initialValues: robotData?.step2,
    onSubmit: async () => {
      formik.setSubmitting(true);

      if (applicationMode) {
        createEnvironment(false).then(async () => {
          await handleSubmit();
        });
      } else {
        await createRobot().then(async () => {
          await handleSubmit();
        });
      }
    },
  });

  async function handleSubmit() {
    formik.setSubmitting(false);

    if (isImportRobot) {
      toast.success("Robot updated successfully");
      return window.location.reload();
    }

    if (robotData?.step1?.details.isDevelopmentMode) {
      setSidebarState((prevState: any) => {
        return {
          ...prevState,
          isCreateMode: false,
          page: "robot",
        };
      });
    } else {
      handleCreateRobotNextStep();
    }
  }

  useEffect(() => {
    setRobotData({
      ...robotData,
      step2: formik.values,
    });
    // eslint-disable-next-line
  }, [formik.values]);

  useEffect(
    () => {
      if (isImportRobot) {
        applicationMode ? handleGetEnvironment() : handleGetRobot();
        setTimeout(() => {
          setIsLoadingImportRobot(false);
        }, 2000);
      } else {
        if (!selectedState?.fleet) {
          applicationMode ? handleGetNamespace() : handleGetFleet();
        }
      }

      const timer = setInterval(() => {
        if (!isImportRobot && !robotData?.step1?.details.isVirtualRobot) {
          applicationMode ? handleGetNamespace() : handleGetFleet();
        }
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedState?.fleet],
  );

  useEffect(() => {
    console.log("ERROR", robotData);
  }, [robotData]);

  function handleGetRobot() {
    getRobot(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name!,
        robotName: robotData?.step1?.details.name,
      },
      {
        ifErrorNavigateTo404: false,
        setRobotData: true,
        setResponse: setResponseRobot,
      },
    );
  }

  function handleGetEnvironment() {
    getEnvironment(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name!,
        environmentName: url?.robotName as string,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        setResponse: setResponseRobot,
        setRobotData: true,
      },
    );
  }

  async function handleGetFleet() {
    await getFleetsFC(false, false, selectedState?.fleet?.name!);
  }

  async function handleGetNamespace() {
    await getNamespacesFC(false, false, selectedState?.fleet?.name!);
  }

  return (
    <CFLoader
      type="workspace"
      isLoading={
        isImportRobot
          ? isLoadingImportRobot
          : !selectedState?.fleet ||
            (applicationMode
              ? selectedState?.fleet?.status !== "Active"
              : selectedState?.fleet?.status !== "Ready")
      }
      loadingText={
        isImportRobot
          ? "Loading..."
          : "Please wait while we preparing your robot. This may take a few minutes."
      }
      loadingItems={
        isImportRobot
          ? []
          : [
              {
                name: selectedState?.fleet?.name,
                status:
                  selectedState?.fleet?.status || selectedState?.fleet?.status,
              },
            ]
      }
      formik={formik}
    >
      {isImportRobot && applicationMode && !formik.values.workspaces?.length ? (
        <SidebarInfo text={`No Workspace Available`} />
      ) : (
        <Fragment>
          <CFWorkspacesMapper
            formik={formik}
            responseRobot={responseRobot}
            isImportRobot={isImportRobot}
          />

          <CFAddWorkspaceButton formik={formik} disabled={isImportRobot} />
        </Fragment>
      )}

      <Fragment>
        {!(applicationMode && url?.robotName) && (
          <CFRobotButtons
            formik={formik}
            step={2}
            isImportRobot={isImportRobot}
          />
        )}
      </Fragment>
    </CFLoader>
  );
}
