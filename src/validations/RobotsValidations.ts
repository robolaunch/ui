import * as Yup from "yup";

export const ImportRobotSetSidebarState = Yup.object().shape({
  organization: Yup.string().required("Organization is required."),
  roboticsCloud: Yup.string().required("Robotics Cloud is required."),
  fleet: Yup.string().required("Fleet is required."),
});

export const CreateRobotStep1 = Yup.object().shape({
  name: Yup.string().required("Name is required."),
});
