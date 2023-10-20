import * as Yup from "yup";

export const CreateEnvironmentsFormStep1Validations = Yup.object().shape({
  robotName: Yup.string()
    .required("Environment name is required.")
    .min(3, "Minimum 3 characters.")
    .max(16, "Maximum 16 characters.")
    .lowercase("Must be lowercase.")
    .matches(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Must be lowercase with hyphen (-) only in the middle.",
    ),
  domainName: Yup.string().required("Categories is required."),
  application: Yup.object().shape({
    name: Yup.string().required("Environment is required."),
  }),
  ideCustomPorts: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required("Port name is required.")
        .min(4, "Minimum 4 characters.")
        .max(4, "Maximum 4 characters.")
        .matches(/^[a-z]+$/, "Must be lowercase and english letters only."),
      port: Yup.number()
        .required("Port is required.")
        .min(0, "Minimum 0.")
        .max(65535, "Maximum 65535."),
    }),
  ),
  vdiCustomPorts: Yup.array().of(
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
});

export const CreateEnvironmentFormStep2Validations = Yup.object().shape({
  workspaces: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Workspace Name is required"),
      robotRepositories: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Repository Name is required"),
          url: Yup.string().required("Repository URL is required"),
          branch: Yup.string().required("Branch is required"),
        }),
      ),
    }),
  ),
});
