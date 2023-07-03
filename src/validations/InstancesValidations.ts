import * as Yup from "yup";

export const createInstanceSchema = Yup.object().shape({
  cloudInstanceName: Yup.string().required("Name is required"),
  instanceType: Yup.string().required("Type is required"),
});
