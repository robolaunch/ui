import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  firstName: Yup.string().required("First name is required."),
  lastName: Yup.string().required("Last name is required."),
  email: Yup.string().email("Invalid email.").required("Email is required."),
  userAgreement: Yup.boolean().oneOf([true], "User agreement is required."),
});

export const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  password: Yup.string().required("Password is required."),
});

export const ForgotPasswordSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
});

export const deleteUserFromOrganizationSchema = (username: any) =>
  Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .matches(username, `Username must match "${username}" to delete.`),
  });
