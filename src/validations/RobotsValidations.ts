import * as Yup from "yup";

export const ImportRobotSetSidebarState = Yup.object().shape({
  organization: Yup.string().required("Organization is required."),
  roboticsCloud: Yup.string().required("Robotics Cloud is required."),
  fleet: Yup.string().required("Fleet is required."),
});

export const CFRobotStep1Validations = Yup.object().shape({
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
    vdi: Yup.object().shape({
      sessionCount: Yup.number().min(2, "At least one session is required"),
      customPorts: Yup.array().of(
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
    }),
    ide: Yup.object().shape({
      customPorts: Yup.array().of(
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
    }),
    ros: Yup.object().shape({
      rosDistros: Yup.array().min(
        1,
        "At least one ROS 2 Distribution is required",
      ),
    }),
  }),
  directories: Yup.object().shape({
    hostDirectories: Yup.array().of(
      Yup.object().shape({
        hostDirectory: Yup.string()
          .required("Directory is required.")
          .matches(/^\//, "Path must start with a '/'"),
        mountPath: Yup.string()
          .required("Path is required.")
          .matches(/^\//, "Path must start with a '/'"),
      }),
    ),
  }),
});

export const CFRobotStep2Validations = Yup.object().shape({
  workspaces: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Workspace Name is required"),
      workspaceDistro: Yup.string().required("Workspace Distro is required"),
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
