import * as Yup from "yup";

export const createInstanceSchema = Yup.object().shape({
  cloudInstanceName: Yup.string()
    .required("Cloud Instance name is required.")
    .min(3, "Minimum 3 characters.")
    .max(12, "Maximum 12 characters."),
  instanceType: Yup.string().required("Type is required"),
});
