import * as Yup from "yup";

export const CFDeployStep1Validations = Yup.object().shape({
  details: Yup.object().shape({
    name: Yup.string()
      .required("Robot name is required.")
      .min(3, "Minimum 3 characters.")
      .max(16, "Maximum 16 characters.")
      .lowercase("Must be lowercase.")
      .matches(
        /^[a-z0-9]+(-[a-z0-9]+)*$/,
        "Must be lowercase with hyphen (-) only in the middle.",
      ),
    physicalInstanceName: Yup.string().when("isVirtualRobot", {
      is: false,
      then: Yup.string().required("Physical Instance is required"),
      otherwise: Yup.string().notRequired(),
    }),
  }),
});
