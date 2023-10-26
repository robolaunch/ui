import React, { ReactElement, useEffect, useState } from "react";
import {
  envOnPremiseFleet,
  envOnPremiseRobot,
} from "../../helpers/envProvider";
import CreateRobotFormCancelButton from "../CreateRobotFormCancelButton/CreateRobotFormCancelButton";
import { CreateEnvironmentFormStep2Validations } from "../../validations/EnvironmentsValidations";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";
import CreateFormWorkspaces from "../CreateFormWorkspaces/CreateFormWorkspaces";
import { CreateRobotFormStep2Validations } from "../../validations/RobotsValidations";
import { IRobotWorkspaces } from "../../interfaces/robotInterfaces";
import { getGuideItem } from "../../functions/handleGuide";
import useCreateRobot from "../../hooks/useCreateRobot";
import useFunctions from "../../hooks/useFunctions";
import { FormikProps, useFormik } from "formik";
import TourGuide from "../TourGuide/TourGuide";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import Button from "../Button/Button";
import { toast } from "sonner";

interface ICreateRobotFormStep2 {
  isImportRobot?: boolean;
}

export default function CreateRobotFormStep2({
  isImportRobot,
}: ICreateRobotFormStep2): ReactElement {
  const [responseFleet, setResponseFleet] = useState<any>(undefined);
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const { selectedState, handleCreateRobotNextStep, setSidebarState } =
    useMain();
  const { robotData, setRobotData, handleAddWorkspaceStep } = useCreateRobot();
  const [isLoadingImportRobot, setIsLoadingImportRobot] =
    useState<boolean>(true);
  const {
    getRobot,
    getFleet,
    getEnvironment,
    getNamespace,
    createRobot,
    updateRobot,
    createEnvironment,
  } = useFunctions();
  const url = useParams();

  const formik: FormikProps<IRobotWorkspaces> = useFormik<IRobotWorkspaces>({
    validationSchema: envOnPremiseRobot
      ? CreateEnvironmentFormStep2Validations
      : CreateRobotFormStep2Validations,
    initialValues: robotData?.step2,
    onSubmit: async () => {
      formik.setSubmitting(true);

      if (envOnPremiseRobot) {
        createEnvironment();
      } else if (isImportRobot) {
        updateRobot();
        toast.success("Robot updated successfully");
        window.location.reload();
      } else if (robotData?.step1?.isDevelopmentMode) {
        setSidebarState((prevState: any) => ({
          ...prevState,
          isCreateMode: false,
          page: "robot",
        }));
      } else {
        createRobot();
        handleCreateRobotNextStep();
      }

      formik.setSubmitting(false);
    },
  });

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
        envOnPremiseRobot ? handleGetEnvironment() : handleGetRobot();
        setTimeout(() => {
          setIsLoadingImportRobot(false);
        }, 2000);
      } else {
        if (!responseFleet) {
          envOnPremiseFleet ? handleGetNamespace() : handleGetFleet();
        }
      }

      const timer = setInterval(() => {
        if (!isImportRobot && !robotData?.step1?.isVirtualRobot) {
          envOnPremiseFleet ? handleGetNamespace() : handleGetFleet();
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
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName,
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
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name,
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
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
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
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        namespaceName: selectedState?.fleet?.name,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseFleet,
      },
    );
  }

  return (
    <CreateRobotFormLoader
      isLoading={
        isImportRobot
          ? isLoadingImportRobot
          : !responseFleet ||
            (envOnPremiseFleet
              ? responseFleet?.namespaceStatus !== "Active"
              : responseFleet?.fleetStatus !== "Ready")
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
                status:
                  responseFleet?.fleetStatus || responseFleet?.namespaceStatus,
              },
            ]
      }
    >
      <form
        onSubmit={formik.handleSubmit}
        className="animate__animated animate__fadeIn flex flex-col gap-4"
      >
        <div
          data-tut="create-robot-step2-workspaces"
          className="flex flex-col gap-2"
        >
          <CreateFormWorkspaces
            formik={formik}
            responseRobot={responseRobot}
            isImportRobot={isImportRobot}
          />
        </div>

        <div data-tut="create-robot-step2-workspace-add-button">
          <CreateRobotFormAddButton
            onClick={() => handleAddWorkspaceStep(formik)}
          />
        </div>

        {!(envOnPremiseRobot && url?.robotName ? true : false) && (
          <div className="mt-10 flex w-full flex-col gap-6">
            <div className="flex gap-2">
              {!isImportRobot && (
                <CreateRobotFormCancelButton disabled={formik.isSubmitting} />
              )}
              <Button
                type="submit"
                disabled={
                  !formik?.isValid ||
                  formik.isSubmitting ||
                  JSON.stringify(formik.initialValues) ===
                    JSON.stringify(formik.values) ||
                  (envOnPremiseRobot && url?.robotName ? true : false)
                }
                loading={formik.isSubmitting}
                className="!h-11 w-full text-xs"
                text={
                  formik.isSubmitting ? (
                    <img
                      className="h-10 w-10"
                      src="/svg/general/loading.svg"
                      alt="loading"
                    />
                  ) : isImportRobot ? (
                    `Update Robot`
                  ) : robotData?.step1?.isDevelopmentMode ? (
                    envOnPremiseRobot ? (
                      `Create Application with Workspaces`
                    ) : (
                      `Create Robot`
                    )
                  ) : (
                    `Next Step`
                  )
                }
              />
            </div>
          </div>
        )}
      </form>
      <TourGuide
        hiddenButton
        type="createRobotStep2"
        tourConfig={
          envOnPremiseRobot
            ? [
                getGuideItem("[data-tut='create-robot-step2-workspaces']"),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-add-button']",
                ),
                getGuideItem("[data-tut='create-robot-step2-workspace-name']"),

                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-delete-button']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-repositories']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-repository-add-button']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-repository-name']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-repository-url']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-repository-branch']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-repository-delete-button']",
                ),
              ]
            : [
                getGuideItem("[data-tut='create-robot-step2-workspaces']"),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-add-button']",
                ),
                getGuideItem("[data-tut='create-robot-step2-workspace-name']"),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-distro']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-delete-button']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-repositories']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-repository-add-button']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-repository-name']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-repository-url']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-repository-branch']",
                ),
                getGuideItem(
                  "[data-tut='create-robot-step2-workspace-repository-delete-button']",
                ),
              ]
        }
      />
    </CreateRobotFormLoader>
  );
}
