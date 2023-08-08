import * as Yup from "yup";

export const ImportRobotSetSidebarState = Yup.object().shape({
  organization: Yup.string().required("Organization is required."),
  roboticsCloud: Yup.string().required("Robotics Cloud is required."),
  fleet: Yup.string().required("Fleet is required."),
});

export const CreateRobotFormStep1Validations = Yup.object().shape({
  robotName: Yup.string()
    .required("Robot name is required.")
    .min(3, "Minimum 3 characters.")
    .max(16, "Maximum 16 characters.")
    .lowercase("Must be lowercase.")
    .matches(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Must be lowercase with hyphen (-) only in the middle."
    ),
  physicalInstanceName: Yup.string().when("isVirtualRobot", {
    is: false,
    then: Yup.string().required("Physical Instance is required"),
    otherwise: Yup.string().notRequired(),
  }),
  rosDistros: Yup.array().min(1, "At least one ROS Distro is required"),
  remoteDesktop: Yup.object().shape({
    isEnabled: Yup.boolean().notRequired(),
    sessionCount: Yup.number().when("remoteDesktop.isEnabled", {
      is: true,
      then: Yup.number().required("Session Count is required"),
      otherwise: Yup.number().notRequired(),
    }),
  }),
});

export const CreateRobotFormStep2Validations = Yup.object().shape({
  workspaces: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Workspace Name is required"),
      workspaceDistro: Yup.string().required("Workspace Distro is required"),
      robotRepositories: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Repository Name is required"),
          url: Yup.string().required("Repository URL is required"),
          branch: Yup.string().required("Branch is required"),
        })
      ),
    })
  ),
});
