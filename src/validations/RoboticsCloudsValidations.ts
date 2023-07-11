import * as Yup from "yup";

export const createRoboticsCloudSchema = Yup.object().shape({
  roboticsCloudName: Yup.string()
    .min(3, "Text must be at least 3 characters long")
    .max(12, "Text must be at most 12 characters long"),
  provider: Yup.string().required("Provider is required"),
  region: Yup.string().required("Region is required"),
});
