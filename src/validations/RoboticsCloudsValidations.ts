import * as Yup from "yup";

export const createRoboticsCloudSchema = Yup.object().shape({
  roboticsCloudName: Yup.string()
    .required("Robotics Cloud name is required.")
    .min(3, "Minimum 3 characters.")
    .max(12, "Maximum 12 characters.")
    .lowercase("Must be lowercase."),
  provider: Yup.string().required("Provider is required"),
  region: Yup.string().required("Region is required"),
});
