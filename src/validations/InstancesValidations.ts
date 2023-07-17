import * as Yup from "yup";

export const createInstanceSchema = Yup.object().shape({
  cloudInstanceName: Yup.string()
    .required("Instance name is required.")
    .min(3, "Minimum 3 characters.")
    .max(16, "Maximum 16 characters.")
    .lowercase("Must be lowercase.")
    .matches(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Must be lowercase with hyphen (-) only in the middle."
    ),
  instanceType: Yup.string().required("Type is required"),
});
