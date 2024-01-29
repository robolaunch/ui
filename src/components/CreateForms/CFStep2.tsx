import CFAddWorkspaceButton from "../CFAddWorkspaceButton/CFAddWorkspaceButton";
import { CFRobotStep2Validations } from "../../validations/RobotsValidations";
import CFWorkspacesMapper from "../CFWorkspacesMapper/CFWorkspacesMapper";
import { CFAppStep2Validations } from "../../validations/AppsValidations";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import CFRobotButtons from "../CFRobotButtons/CFRobotButtons";
import useCreateRobot from "../../hooks/useCreateRobot";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import CFLoader from "../CFLoader/CFLoader";
import useMain from "../../hooks/useMain";
import { useFormik } from "formik";
import { toast } from "sonner";
import { IFleet } from "../../interfaces/fleet.interface";
import { INamespace } from "../../interfaces/namespace.interface";

interface ICFStep2 {
  isImportRobot?: boolean;
}

export default function CFStep2({ isImportRobot }: ICFStep2): ReactElement {
  const [responseFleet, setResponseFleet] = useState<
    IFleet | INamespace | undefined
  >(undefined);
  const [responseRobot, setResponseRobot] = useState<any>(undefined);

  const {
    selectedState,
    handleCreateRobotNextStep,
    setSidebarState,
    applicationMode,
  } = useMain();
  const { robotData, setRobotData } = useCreateRobot();
  const [isLoadingImportRobot, setIsLoadingImportRobot] =
    useState<boolean>(true);
  const {
    getRobot,
    getFleet,
    getEnvironment,
    getNamespace,
    createEnvironment,
    createRobot,
  } = useFunctions();
  const url = useParams();

  const formik = useFormik<IWorkspaces>({
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
        if (!responseFleet) {
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
    [responseFleet],
  );

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

  function handleGetFleet() {
    getFleet(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseFleet,
      },
    );
  }

  function handleGetNamespace() {
    getNamespace(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.region!,
        namespaceName: selectedState?.fleet?.name!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseFleet,
      },
    );
  }

  return (
    <CFLoader
      type="workspace"
      isLoading={
        isImportRobot
          ? isLoadingImportRobot
          : !responseFleet ||
            (applicationMode
              ? responseFleet?.status !== "Active"
              : responseFleet?.status !== "Ready")
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
                name: responseFleet?.name,
                status: responseFleet?.status || responseFleet?.status,
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
