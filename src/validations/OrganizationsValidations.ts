import * as Yup from "yup";

export const LoginOrganizationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
  organization: Yup.object().shape({
    name: Yup.string().required("Organization is required."),
  }),
});

export const CreateOrganizationSchema = Yup.object().shape({
  name: Yup.string().required("Organization name is required."),
});
