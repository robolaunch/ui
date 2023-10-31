import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { IRobotLaunchStep } from "../../interfaces/robotInterfaces";
import RobotDeleteLaunchManagerButton from "../RobotDeleteLaunchManagerButton/RobotDeleteLaunchManagerButton";
import CreateRobotFormCancelButton from "../CFCancelButton/CFCancelButton";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import CreateRobotFormCodeScope from "../CreateRobotFormCodeScope/CreateRobotFormCodeScope";
import CreateRobotFormEnvItem from "../CreateRobotFormEnvItem/CreateRobotFormEnvItem";
import CreateRobotFormLoader from "../CFLoader/CFLoader";
import { organizationNameViewer } from "../../functions/GeneralFunctions";
import { createLaunchManager } from "../../toolkit/RobotSlice";
import useCreateRobot from "../../hooks/useCreateRobot";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import { FormikProps, useFormik } from "formik";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";
import InfoTip from "../InfoTip/InfoTip";
import Button from "../Button/Button";
import { toast } from "sonner";
import * as Yup from "yup";
import CFLaunchName from "../CFLaunchName/CFLaunchName";
import CFLaunchWorkspace from "../CFLaunchWorkspace/CFLaunchWorkspace";
import CFLaunchCode from "../CFLaunchCode/CFLaunchCode";

interface ICreateRobotFormStep4 {
  isImportRobot?: boolean;
  robotDataLaunchIndex?: number;
  robotClusters?: any[];
}

export default function CreateRobotFormStep4({
  isImportRobot,
  robotDataLaunchIndex,
  robotClusters,
}: ICreateRobotFormStep4): ReactElement {
  const { robotData, setRobotData, handleAddENVToLaunchStep } =
    useCreateRobot();
  const { selectedState } = useMain();
  const dispatch = useAppDispatch();
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const { getBuildManager } = useFunctions();
  const url = useParams();

  const formik: FormikProps<IRobotLaunchStep> = useFormik<IRobotLaunchStep>({
    initialValues:
      robotData?.step4?.robotLaunchSteps[
        robotDataLaunchIndex ? robotDataLaunchIndex : 0
      ],
    validationSchema: Yup.object({
      name: Yup.string().required("Launch manager name is required"),
      workspace: Yup.string().required("Workspace is required"),
      entryPointCmd: Yup.string().required("Code is required"),
      instancesName: Yup.array().min(1, "Instance scope is required"),
      robotLmEnvs: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Environment name is required"),
          value: Yup.string().required("Environment value is required"),
        }),
      ),
    }),
    onSubmit: async (values: any) => {
      formik.setSubmitting(true);

      await dispatch(
        createLaunchManager({
          organizationId: selectedState?.organization?.organizationId!,
          roboticsCloudName: selectedState?.roboticsCloud?.name!,
          instanceId: selectedState?.instance?.instanceId!,
          region: selectedState?.instance?.region!,
          physicalInstanceName: robotData?.step1?.physicalInstanceName,
          fleetName: selectedState?.fleet?.name,
          robotName: robotData?.step1?.robotName,
          launchManagerName: values?.name,
          robotLaunchSteps: [
            robotData?.step4?.robotLaunchSteps[
              robotDataLaunchIndex ? robotDataLaunchIndex : 0
            ],
          ],
        }),
      );

      toast.success(
        isImportRobot
          ? "Robot updated successfully"
          : "Robot Launch Manager created successfully. Redirecting to robot page...",
      );

      setTimeout(() => {
        window.location.href = `/${organizationNameViewer({
          organizationName: selectedState?.organization?.organizationName!,
          capitalization: false,
        })}/${selectedState?.roboticsCloud?.name}/${selectedState?.instance
          ?.name}/${selectedState?.fleet?.name}/${robotData?.step1?.robotName}`;
      }, 1000);
    },
  });

  useEffect(
    () => {
      if (!responseBuildManager) {
        handleGetBuildManager();
      }

      const timer = setInterval(() => {
        !isImportRobot && handleGetBuildManager();
      }, 10000);

      console.log(responseBuildManager);
      if (
        !responseBuildManager?.robotClusters?.filter(
          (robotCluster: any) => robotCluster?.buildManagerStatus !== "Ready",
        )?.length &&
        !isImportRobot
      ) {
        clearInterval(timer);
      }

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [responseBuildManager],
  );

  useEffect(() => {
    setRobotData((prevState: any) => {
      return {
        ...prevState,
        step4: {
          ...prevState.step4,

          robotLaunchSteps: prevState?.step4?.robotLaunchSteps?.map(
            (step: any, index: number) => {
              const stepIndex = robotDataLaunchIndex ? robotDataLaunchIndex : 0;

              if (index === stepIndex) {
                return formik.values;
              } else {
                return step;
              }
            },
          ),
        },
      };
    });

    // eslint-disable-next-line
  }, [formik.values]);

  function handleGetBuildManager() {
    getBuildManager(
      {
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.instance?.region!,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseBuildManager,
        setRobotData: true,
      },
    );
  }

  return (
    <Fragment>
      <CreateRobotFormLoader
        type="launch"
        isLoading={
          !responseBuildManager ||
          responseBuildManager?.robotClusters?.filter(
            (item: any) => item?.buildManagerStatus !== "Ready",
          )?.length
        }
        loadingItems={responseBuildManager?.robotClusters?.map((item: any) => {
          return {
            name: item?.name,
            status: item?.buildManagerStatus,
          };
        })}
        loadingText={
          isImportRobot
            ? "Loading..."
            : `Please wait while we create your robot. This may take a few minutes.`
        }
        formik={formik}
      >
        <CFLaunchName formik={formik} disabled={isImportRobot} />

        <CFLaunchWorkspace formik={formik} disabled={isImportRobot} />

        <CFLaunchCode formik={formik} disabled={isImportRobot} />

        <CreateRobotFormCodeScope
          virtualInstanceDisabled={isImportRobot || formik?.isSubmitting}
          physicalInstanceDisabled={isImportRobot || formik?.isSubmitting}
          virtualInstanceChecked={formik.values?.instancesName?.includes(
            selectedState?.instance?.name,
          )}
          virtualInstanceOnChange={() => {
            formik.setValues({
              ...formik.values,
              instancesName: formik.values.instancesName.includes(
                selectedState?.instance?.name,
              )
                ? formik.values.instancesName.filter(
                    (item) => item !== selectedState?.instance?.name,
                  )
                : [
                    ...formik.values.instancesName,
                    selectedState?.instance?.name,
                  ],
            });
          }}
          physicalInstanceOnChange={(e) => {
            formik.setValues({
              ...formik.values,
              instancesName: formik.values.instancesName.includes(
                robotData?.step1?.physicalInstanceName,
              )
                ? formik.values.instancesName.filter(
                    (item) => item !== robotData?.step1?.physicalInstanceName,
                  )
                : [
                    ...formik.values.instancesName,
                    robotData?.step1?.physicalInstanceName,
                  ],
            });
          }}
          error={
            // @ts-ignore
            formik?.errors?.instancesName
          }
        />
        <div
          data-tut="create-robot-step4-environments"
          className="flex flex-col gap-2"
        >
          <div className="flex min-w-fit gap-1 pb-3 text-xs font-medium text-layer-light-700">
            Environment Variables:
            <InfoTip content="Type Environment Variables" />
          </div>
          {formik?.values?.robotLmEnvs?.map((env: any, envIndex: number) => {
            return (
              <CreateRobotFormEnvItem
                key={envIndex}
                formik={formik}
                envIndex={envIndex}
                disabled={isImportRobot || formik?.isSubmitting}
              />
            );
          })}

          <div data-tut="create-robot-step4-environments-add-button">
            <CreateRobotFormAddButton
              onClick={() => handleAddENVToLaunchStep(formik)}
              disabled={isImportRobot || formik?.isSubmitting}
            />
          </div>
        </div>

        <div className="mt-10 flex gap-2">
          {!isImportRobot ? (
            <Fragment>
              {!url?.robotName && (
                <CreateRobotFormCancelButton disabled={formik.isSubmitting} />
              )}
              <Button
                type="submit"
                disabled={!formik?.isValid || formik.isSubmitting}
                className="!h-11 w-full text-xs"
                text={url?.robotName ? `Add Launch Step` : `Create Robot`}
              />
            </Fragment>
          ) : (
            <RobotDeleteLaunchManagerButton
              launchManagerName={formik.values?.name}
            />
          )}
        </div>
      </CreateRobotFormLoader>
      {!isImportRobot &&
        !(
          !responseBuildManager ||
          responseBuildManager?.robotClusters?.filter(
            (item: any) => item?.buildManagerStatus !== "Ready",
          )?.length
        )}
    </Fragment>
  );
}
