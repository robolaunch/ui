import { IEnvironmentStep1 } from "../../interfaces/environment/environment.step1.interface";
import CFAdvancedSettings from "../CFAdvancedSettings/CFAdvancedSettings";
import CFEnvironmentName from "../CFEnvironmentName/CFEnvironmentName";
import CFJupyterNotebook from "../CFJupyterNotebook/CFJupyterNotebook";
import CFEnvCategories from "../CFEnvCategories/CFEnvCategories";
import CFStorageRange from "../CFStorageRange/CFStorageRange";
import { Fragment, ReactElement, useEffect } from "react";
import CFEnvButtons from "../CFEnvButtons/CFEnvButtons";
import useFunctions from "../../hooks/useFunctions";
import CFGpuTypes from "../CFGpuTypes/CFGpuTypes";
import CFVDICount from "../CFVDICount/CFVDICount";
import Seperator from "../Seperator/Seperator";
import CFSection from "../CFSection/CFSection";
import CFGpuCore from "../CFGpuCore/CFGpuCore";
import CFSharing from "../CFSharing/CFSharing";
import { useParams } from "react-router-dom";
import CFLoader from "../CFLoader/CFLoader";
import useMain from "../../hooks/useMain";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";

interface ICFAppStep1 {
  isImportRobot?: boolean;
}

export default function CFAppStep1({
  isImportRobot = false,
}: ICFAppStep1): ReactElement {
  const {
    robotData,
    setRobotData,
    handleCreateRobotNextStep,
    setSidebarState,
  } = useMain();
  const { getApplicationFC, createEnvironment, createAppBuildManager } =
    useFunctions();
  const url = useParams();

  const formik = useFormik<IEnvironmentStep1>({
    validationSchema: Yup.object().shape({
      details: Yup.object().shape({
        name: Yup.string()
          .required("Application name is required.")
          .min(3, "Minimum 3 characters.")
          .max(16, "Maximum 16 characters.")
          .lowercase("Must be lowercase.")
          .matches(
            /^[a-z0-9]+(-[a-z0-9]+)*$/,
            "Must be lowercase with hyphen (-) only in the middle.",
          ),
      }),

      directories: Yup.object().shape({
        hostDirectories: Yup.array().of(
          Yup.object().shape({
            hostDirectory: Yup.string()
              .required("Directory is required.")
              .matches(/^\//, "Path must start with a '/'"),
            mountPath: Yup.string()
              .required("Path is required.")
              .matches(/^\//, "Path must start with a '/'"),
          }),
        ),
      }),

      applicationConfig: Yup.object().shape({
        domainName: Yup.string().required("Categories is required."),
        application: Yup.object().shape({
          name: Yup.string().required("Application model is required."),
        }),
      }),

      services: Yup.object().shape({
        vdi: Yup.object().shape({
          customPorts: Yup.array().of(
            Yup.object().shape({
              name: Yup.string()
                .required("Port name is required.")
                .min(4, "Minimum 4 characters.")
                .max(4, "Maximum 4 characters."),
              port: Yup.number()
                .required("Port is required.")
                .min(0, "Minimum 0.")
                .max(65535, "Maximum 65535."),
            }),
          ),
        }),
        ide: Yup.object().shape({
          customPorts: Yup.array().of(
            Yup.object().shape({
              name: Yup.string()
                .required("Port name is required.")
                .min(4, "Minimum 4 characters.")
                .max(4, "Maximum 4 characters.")
                .matches(
                  /^[a-z]+$/,
                  "Must be lowercase and english letters only.",
                ),
              port: Yup.number()
                .required("Port is required.")
                .min(0, "Minimum 0.")
                .max(65535, "Maximum 65535."),
            }),
          ),
          gpuModelName: Yup.string().required("GPU model is required."),
          gpuAllocation: Yup.number().min(1, "Minimum 1 core is required."),
        }),
      }),
      sharing: Yup.object().shape({
        alias: Yup.string().when("private", {
          is: false,
          then: Yup.string(),
          otherwise: Yup.string().required("Name is required."),
        }),
        private: Yup.boolean(),
        organization: Yup.boolean(),
        public: Yup.boolean(),
      }),
    }),
    initialValues: robotData?.step1,
    onSubmit: async () => {
      formik.setSubmitting(true);

      if (!formik.values.details.configureWorkspace) {
        if (isImportRobot) {
          await createEnvironment(false).then(async () => {
            toast.success("Application updated successfully");

            await createAppBuildManager();

            await setTimeout(() => {
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

        await createAppBuildManager();
      } else {
        formik.setSubmitting(false);
        handleCreateRobotNextStep();
      }
    },
  });

  useEffect(() => {
    if (!robotData?.step1?.details?.name && isImportRobot) {
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

  async function handleGetEnvironment() {
    await getApplicationFC(!robotData?.step1?.details?.name, url?.robotName!);
  }

  return (
    <CFLoader
      type="step1-app"
      loadingText="Loading..."
      loadingItems={[]}
      isLoading={isImportRobot ? !robotData?.step1?.details?.name : false}
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
        <CFSection>
          <CFSharing formik={formik} />
          <Seperator />
        </CFSection>
      </Fragment>

      <CFAdvancedSettings formik={formik} disabled={isImportRobot} />

      <Fragment>
        <CFEnvButtons formik={formik} isImportRobot={isImportRobot} />
      </Fragment>
    </CFLoader>
  );
}
