import CFAddWorkspaceButton from "../CFAddWorkspaceButton/CFAddWorkspaceButton";
import CFWorkspacesMapper from "../CFWorkspacesMapper/CFWorkspacesMapper";
import { Fragment, ReactElement, useEffect, useState } from "react";
import CFRobotButtons from "../CFRobotButtons/CFRobotButtons";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import { useParams } from "react-router-dom";
import CFLoader from "../CFLoader/CFLoader";
import useMain from "../../hooks/useMain";
import useForm from "../../hooks/useForm";

interface ICFStep2 {
  isImportRobot?: boolean;
}

export default function CFStep2({ isImportRobot }: ICFStep2): ReactElement {
  const [responseRobot, setResponseRobot] = useState<any>(undefined);

  const { robotData, setRobotData, selectedState, applicationMode } = useMain();
  const [isLoadingImportRobot, setIsLoadingImportRobot] =
    useState<boolean>(true);
  const { getRobotFC, getFleetsFC, getNamespacesFC, getApplicationFC } =
    useFunctions();
  const url = useParams();

  const { step2Formik: formik } = useForm();

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

  async function handleGetRobot() {
    setResponseRobot(
      await getRobotFC(
        false,
        robotData?.step1?.details?.name || url?.robotName!,
      ),
    );
  }

  async function handleGetEnvironment() {
    setResponseRobot(
      await getApplicationFC(!responseRobot, url?.robotName as string),
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
