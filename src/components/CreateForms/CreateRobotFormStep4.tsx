import React, { Fragment, ReactElement, useEffect, useState } from "react";
import {
  IRobotLaunchStep,
  IRobotWorkspace,
} from "../../interfaces/robotInterfaces";
import useRobot from "../../hooks/useRobot";
import { FormikProps, useFormik } from "formik";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import { useAppDispatch } from "../../hooks/redux";
import useMain from "../../hooks/useMain";
import { createLaunchManager } from "../../toolkit/RobotSlice";
import Button from "../Button/Button";
import { toast } from "sonner";
import useFunctions from "../../hooks/useFunctions";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";
import InputSelect from "../InputSelect/InputSelect";
import { Editor } from "@monaco-editor/react";
import CreateRobotFormCodeScope from "../CreateRobotFormCodeScope/CreateRobotFormCodeScope";
import CreateRobotFormEnvItem from "../CreateRobotFormEnvItem/CreateRobotFormEnvItem";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { organizationNameViewer } from "../../functions/GeneralFunctions";
import { useParams } from "react-router-dom";
import InfoTip from "../InfoTip/InfoTip";
import * as Yup from "yup";
import RobotDeleteLaunchManagerButton from "../RobotDeleteLaunchManagerButton/RobotDeleteLaunchManagerButton";

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
  const { robotData, setRobotData, handleAddENVToLaunchStep } = useRobot();
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
        })
      ),
    }),
    onSubmit: async (values: any) => {
      formik.setSubmitting(true);

      await dispatch(
        createLaunchManager({
          organizationId: selectedState?.organization?.organizationId,
          roboticsCloudName: selectedState?.roboticsCloud?.name,
          instanceId: selectedState?.instance?.instanceId,
          region: selectedState?.instance?.region,
          physicalInstanceName: robotData?.step1?.physicalInstanceName,
          fleetName: selectedState?.fleet?.name,
          robotName: robotData?.step1?.robotName,
          launchManagerName: values?.name,
          robotLaunchSteps: [
            robotData?.step4?.robotLaunchSteps[
              robotDataLaunchIndex ? robotDataLaunchIndex : 0
            ],
          ],
        })
      );

      toast.success(
        isImportRobot
          ? "Robot updated successfully"
          : "Robot Launch Manager created successfully. Redirecting to robot page..."
      );

      setTimeout(() => {
        window.location.href = `/${organizationNameViewer({
          organizationName: selectedState?.organization?.organizationName,
          capitalization: false,
        })}/${selectedState?.roboticsCloud?.name}/${
          selectedState?.instance?.name
        }/${selectedState?.fleet?.name}/${robotData?.step1?.robotName}`;
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

      if (
        !responseBuildManager?.robotClusters?.filter(
          (robotCluster: any) =>
            robotCluster?.buildManagerStatus !== "EnvironmentReady"
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
    [responseBuildManager]
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
            }
          ),
        },
      };
    });

    // eslint-disable-next-line
  }, [formik.values]);

  function handleGetBuildManager() {
    getBuildManager(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: robotData?.step1?.robotName,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseBuildManager,
        setRobotData: true,
      }
    );
  }

  return (
    <CreateRobotFormLoader
      isLoading={
        !responseBuildManager ||
        responseBuildManager?.robotClusters?.filter(
          (item: any) => item?.buildManagerStatus !== "Ready"
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
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 animate__animated animate__fadeIn"
      >
        <div>
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
            Launch Manager Name:
            <InfoTip content="Type a new launch manager name." />
          </div>
          <InputText
            {...formik.getFieldProps(`name`)}
            disabled={isImportRobot || formik?.isSubmitting}
            className="!text-sm"
          />
          <InputError
            // @ts-ignore
            error={formik?.errors?.name}
            touched={formik?.touched?.name}
          />
        </div>

        <div>
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
            Workspace:
            <InfoTip content="Select a workspace." />
          </div>
          <InputSelect
            {...formik.getFieldProps(`workspace`)}
            disabled={isImportRobot || formik?.isSubmitting}
          >
            <Fragment>
              {!formik?.values?.workspace && <option value=""></option>}
              {robotData?.step2?.workspaces?.map(
                (workspace: IRobotWorkspace, index: number) => (
                  <option key={index} value={workspace.name}>
                    {workspace.name}
                  </option>
                )
              )}
            </Fragment>
          </InputSelect>
          <InputError
            error={
              // @ts-ignore
              formik?.errors?.workspace
            }
            touched={formik?.touched?.workspace}
          />
        </div>

        <div>
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
            Bash Code:
            <InfoTip content="Type Bash code" />
          </div>
          <Editor
            height="140px"
            defaultLanguage="shell"
            defaultValue={formik?.values?.entryPointCmd}
            value={formik?.values?.entryPointCmd}
            options={{
              readOnly: isImportRobot || formik?.isSubmitting,
              minimap: {
                enabled: false,
              },
              fontSize: 12,
              fontFamily: "monospace",
              lineDecorationsWidth: 10,
              wordWrap: "on",
              lineNumbersMinChars: 3,
              folding: false,
              padding: {
                top: 6,
                bottom: 6,
              },
            }}
            theme="vs-dark"
            onChange={(e: any) => {
              formik.setValues({
                ...formik.values,
                entryPointCmd: e,
              });
            }}
          />
          <InputError
            error={
              // @ts-ignore
              formik?.errors?.entryPointCmd
            }
            touched={true}
          />
        </div>
        <CreateRobotFormCodeScope
          virtualInstanceDisabled={isImportRobot || formik?.isSubmitting}
          physicalInstanceDisabled={isImportRobot || formik?.isSubmitting}
          virtualInstanceChecked={formik.values?.instancesName?.includes(
            selectedState?.instance?.name
          )}
          virtualInstanceOnChange={() => {
            formik.setValues({
              ...formik.values,
              instancesName: formik.values.instancesName.includes(
                selectedState?.instance?.name
              )
                ? formik.values.instancesName.filter(
                    (item) => item !== selectedState?.instance?.name
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
                robotData?.step1?.physicalInstanceName
              )
                ? formik.values.instancesName.filter(
                    (item) => item !== robotData?.step1?.physicalInstanceName
                  )
                : [
                    ...formik.values.instancesName,
                    robotData?.step1?.physicalInstanceName,
                  ],
            });
          }}
          isVisiblePhysicalInstanceCheckbox={
            robotData?.step1?.physicalInstanceName
          }
          error={
            // @ts-ignore
            formik?.errors?.instancesName
          }
        />
        <div className="flex flex-col gap-2 pb-12">
          <div className="min-w-fit flex gap-1 text-xs font-medium text-layer-light-700 pb-3">
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

          <CreateRobotFormAddButton
            onClick={() => handleAddENVToLaunchStep(formik)}
            disabled={isImportRobot || formik?.isSubmitting}
          />
        </div>

        {!isImportRobot ? (
          <Button
            type="submit"
            disabled={!formik?.isValid || formik.isSubmitting}
            className="w-full !h-11 text-xs"
            text={url?.robotName ? `Add Launch Step` : `Create Robot`}
          />
        ) : (
          <RobotDeleteLaunchManagerButton
            launchManagerName={formik.values?.name}
          />
        )}
      </form>
    </CreateRobotFormLoader>
  );
}
