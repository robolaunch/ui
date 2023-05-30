import * as Yup from "yup";

export const ImportRobotSetSidebarState = Yup.object().shape({
  organization: Yup.string().required("Organization is required."),
  roboticsCloud: Yup.string().required("Robotics Cloud is required."),
  fleet: Yup.string().required("Fleet is required."),
});

export const CreateRobotFormStep1Validations = Yup.object().shape({
  robotName: Yup.string().required("Robot name is required"),
  physicalInstanceName: Yup.string().when("isVirtualRobot", {
    is: false,
    then: Yup.string().required("Physical Instance is required"),
    otherwise: Yup.string().notRequired(),
  }),
  remoteDesktop: Yup.object().shape({
    isEnabled: Yup.boolean().notRequired(),
    sessionCount: Yup.number().when("remoteDesktop.isEnabled", {
      is: true,
      then: Yup.number().required("Session Count is required"),
      otherwise: Yup.number().notRequired(),
    }),
  }),
  rosDistros: Yup.array().min(1, "At least one ROS Distro is required"),
});
