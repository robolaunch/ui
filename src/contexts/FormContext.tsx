import { createContext } from "react";
import { IEnvironmentStep1 } from "../interfaces/environment/environment.step1.interface";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import useMain from "../hooks/useMain";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { IEnvironmentStep3 } from "../interfaces/environment/environment.step3.interface";
import { IEnvironmentStep2 } from "../interfaces/environment/environment.step2.interface";
import { CFAppStep2Validations } from "../validations/AppsValidations";
import {
  CFRobotStep1Validations,
  CFRobotStep2Validations,
} from "../validations/RobotsValidations";
import { CFDeployStep1Validations } from "../validations/deploy.validations";

export const FormContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const {
    robotData,
    handleCreateRobotNextStep,
    setSidebarState,
    applicationMode,
    selectedState,
  } = useMain();

  const {
    createApplicationFC,
    createAppBuildManager,
    createBuildManager,
    createRobotFC,
    createRobotFC: updateRobotFC,
    addPhysicalInstanceToFleetFC,
    createDeployFC,
  } = useFunctions();

  const url = useParams();

  const step1Formik = useFormik<IEnvironmentStep1>({
    validationSchema: !robotData?.step1?.details?.isDeployMode
      ? CFRobotStep1Validations
      : CFDeployStep1Validations,
    initialValues: robotData?.step1,
    onSubmit: async () => {
      step1Formik.setSubmitting(true);

      if (robotData?.step1?.details?.isDeployMode) {
        await createDeployFC();

        if (url?.robotName) {
          toast.success(
            "Robot updated successfully. Redirecting to fleet page...",
          );
        }

        setSidebarState((prevState) => ({
          ...prevState,
          isCreateMode: false,
          page: "robot",
        }));

        return;
      }

      if (url?.robotName) {
        await updateRobotFC();

        toast.success(
          "Robot updated successfully. Redirecting to fleet page...",
        );
        setTimeout(() => {
          window.location.href = `/${
            selectedState?.organization?.name?.split("_")[1]
          }/${selectedState?.roboticsCloud?.name}/${
            selectedState?.instance?.name
          }/${selectedState?.fleet?.name}/${robotData?.step1?.details?.name}}`;
        }, 2000);
      } else if (!step1Formik.values?.details?.isVirtualRobot) {
        addPhysicalInstanceToFleetFC();
      }

      step1Formik.setSubmitting(false);
      handleCreateRobotNextStep();
    },
  });

  const step1AppFormik: FormikProps<IEnvironmentStep1> =
    useFormik<IEnvironmentStep1>({
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
            is: true,
            then: Yup.string().required("Name is required."),
            otherwise: Yup.string(),
          }),
          private: Yup.boolean(),
          organization: Yup.boolean(),
          public: Yup.boolean(),
        }),
      }),
      initialValues: robotData?.step1,
      onSubmit: async () => {
        step1AppFormik.setSubmitting(true);

        if (!step1AppFormik.values.details.configureWorkspace) {
          if (url?.robotName) {
            await createApplicationFC(false).then(async () => {
              toast.success("Application updated successfully");

              await createAppBuildManager();

              await setTimeout(() => {
                window.location.reload();
              }, 1000);
            });
          }

          await createApplicationFC(true).then(async () => {
            setSidebarState((prevState) => ({
              ...prevState,
              isCreateMode: false,
              page: "robot",
            }));
          });

          await createAppBuildManager();
        } else {
          step1AppFormik.setSubmitting(false);
          handleCreateRobotNextStep();
        }
      },
    });

  const step2Formik: FormikProps<IEnvironmentStep2> =
    useFormik<IEnvironmentStep2>({
      validationSchema: applicationMode
        ? CFAppStep2Validations
        : CFRobotStep2Validations,
      initialValues: robotData?.step2,
      onSubmit: async () => {
        step2Formik.setSubmitting(true);
        async function handleSubmit() {
          step2Formik.setSubmitting(false);

          if (url?.robotName) {
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

        if (applicationMode) {
          createApplicationFC(false).then(async () => {
            await handleSubmit();
          });
        } else {
          await createRobotFC().then(async () => {
            await handleSubmit();
          });
        }
      },
    });

  const step3Formik: FormikProps<IEnvironmentStep3> =
    useFormik<IEnvironmentStep3>({
      validationSchema: Yup.object().shape({
        // name: Yup.string().required("Build Manager Name is required"),
        steps: Yup.array().of(
          Yup.object().shape({
            name: Yup.string()
              .required("Step Name is required")
              .test("unique-name", "This name is already taken", (value) => {
                const temp = step3Formik.values.steps?.filter(
                  (item: any) => item.name === value && item,
                );
                return temp.length > 1 ? false : true;
              }),
            // workspace: Yup.string().required("Workspace is required"),
            isCommandCode: Yup.boolean(),
            command: Yup.string().when("isCommandCode", {
              is: true,
              then: Yup.string().required("Bash is required"),
              otherwise: Yup.string(),
            }),
            script: Yup.string().when("isCommandCode", {
              is: false,
              then: Yup.string().required("Script is required"),
              otherwise: Yup.string(),
            }),
            instanceScope: Yup.array().min(
              1,
              "At least one instance is required",
            ),
          }),
        ),
      }),
      initialValues: robotData?.step3!,
      onSubmit: async () => {
        step3Formik.setSubmitting(true);
        await createBuildManager().then(() => {
          if (url?.robotName) {
            toast.success("Robot updated successfully. Redirecting...");
            step3Formik.setSubmitting(true);
            setTimeout(() => {
              window.location.reload();
            }, 4000);
          } else {
            handleCreateRobotNextStep();
          }
        });
      },
    });

  return (
    <FormContext.Provider
      value={{
        step1Formik,
        step1AppFormik,
        step2Formik,
        step3Formik,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
