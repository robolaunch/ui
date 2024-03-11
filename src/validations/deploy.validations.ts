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
  services: Yup.object().shape({
    ros: Yup.object().shape({
      bridgeDistro: Yup.string().required("Bridge Distro is required."),
    }),
  }),
  launchContainers: Yup.array().of(
    Yup.object().shape({
      container: Yup.object().shape({
        name: Yup.string().required("Container name is required."),
        image: Yup.string().required("Image is required."),
        command: Yup.string().required("Command is required."),
        mountedVolumes: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required("Volume name is required."),
            mountPath: Yup.string().required("Mount path is required."),
          }),
        ),
        environmentVariables: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required(
              "Environment variable name is required.",
            ),
            value: Yup.string().required(
              "Environment variable value is required.",
            ),
          }),
        ),
      }),
    }),
  ),
});
