import React, { Fragment, ReactElement, useEffect, useState } from "react";
import {
  IRobotLaunchStep,
  IRobotWorkspace,
} from "../../interfaces/robotInterfaces";
import useCreateRobot from "../../hooks/useCreateRobot";
import { FormikProps, useFormik } from "formik";
import InputText from "../InputText/InputText";
import InputError from "../InputError/InputError";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import {
  createRobotLaunchManager,
  deleteRobotLaunchManager,
} from "../../resources/RobotSlice";
import Button from "../Button/Button";
import { toast } from "sonner";
import useFunctions from "../../hooks/useFunctions";
import CreateRobotFormLoader from "../CreateRobotFormLoader/CreateRobotFormLoader";
import InputSelect from "../InputSelect/InputSelect";
import { Editor } from "@monaco-editor/react";
import CreateRobotFormCodeScope from "../CreateRobotFormCodeScope/CreateRobotFormCodeScope";
import CreateRobotFormEnvItem from "../CreateRobotFormEnvItem/CreateRobotFormEnvItem";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import organizationNameViewer from "../../helpers/organizationNameViewer";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import { useParams } from "react-router-dom";

interface ICreateRobotFormStep4 {
  isImportRobot?: boolean;
  robotDataLaunchIndex?: number;
}

export default function CreateRobotFormStep4({
  isImportRobot,
  robotDataLaunchIndex,
}: ICreateRobotFormStep4): ReactElement {
  const { robotData, setRobotData } = useCreateRobot();
  const { selectedState } = useSidebar();
  const dispatch = useAppDispatch();
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const { handleSetterResponseBuildManager } = useFunctions();
  const { handleAddENVToLaunchStep } = useCreateRobot();
  const url = useParams();

  const formik: FormikProps<IRobotLaunchStep> = useFormik<IRobotLaunchStep>({
    initialValues:
      robotData?.step4?.robotLaunchSteps[
        robotDataLaunchIndex ? robotDataLaunchIndex : 0
      ],
    onSubmit: async (values: any) => {
      formik.setSubmitting(true);

      await dispatch(
        createRobotLaunchManager({
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
        handleSetterResponseBuildManager(
          robotData?.step1?.robotName,
          setResponseBuildManager
        );
      }

      const timer = setInterval(() => {
        !isImportRobot &&
          handleSetterResponseBuildManager(
            robotData?.step1?.robotName,
            setResponseBuildManager
          );
      }, 10000);

      if (
        !responseBuildManager?.robotClusters.filter(
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

    console.log(formik.values);
    console.log(robotData);

    // eslint-disable-next-line
  }, [formik.values]);

  return (
    <CreateRobotFormLoader
      isLoading={
        !responseBuildManager ||
        responseBuildManager?.robotClusters.filter(
          (item: any) => item?.buildManagerStatus !== "Ready"
        )?.length
      }
      loadingItems={responseBuildManager?.robotClusters.map((item: any) => {
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
        className="flex flex-col gap-4 animate__animated animate__fadeIn "
      >
        <div className="flex flex-col gap-7 p-4">
          <div>
            <InputText
              {...formik.getFieldProps(`name`)}
              placeholder="Launch Manager Name"
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
            <InputSelect
              {...formik.getFieldProps(`workspace`)}
              placeholder="Workspace"
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
          <div className="flex flex-col gap-2">
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
        </div>

        {isImportRobot ? (
          <CreateRobotFormDeleteButton
            onClick={async () => {
              await dispatch(
                deleteRobotLaunchManager({
                  organizationId: selectedState?.organization?.organizationId,
                  roboticsCloudName: selectedState?.roboticsCloud?.name,
                  instanceId: selectedState?.instance?.instanceId,
                  region: selectedState?.instance?.region,
                  robotName: robotData?.step1?.robotName,
                  fleetName: selectedState?.fleet?.name,
                  physicalInstanceName: robotData?.step1?.physicalInstanceName,
                  launchManagerName: formik.values?.name,
                })
              );

              toast.success("Launch Step deleted successfully");

              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }}
            text="Delete Launch Step"
          />
        ) : (
          <Button
            type="submit"
            disabled={!formik?.isValid || formik.isSubmitting}
            className="w-full !h-11 text-xs"
            text={url?.robotName ? `Add Launch Step` : `Create Robot`}
          />
        )}
      </form>
    </CreateRobotFormLoader>
  );
}
