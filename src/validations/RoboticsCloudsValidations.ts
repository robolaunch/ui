import * as Yup from "yup";

export const createRoboticsCloudSchema = Yup.object().shape({
  roboticsCloudName: Yup.string()
    .min(2, "Min 2 Character")
    .max(32, "Max 32 Character")
    .matches(/^\w[a-zA-Z@#0-9.]*$/, "Only english symbols and numbers")
    .required("Name is required"),
});
