import * as Yup from "yup";

export const createOrganizationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Organization name is required.")
    .matches(
      /^[a-z0-9-]{8,24}$/,
      "Minimum 8 to 24 characters, lowercase letters, numbers and hyphens only."
    ),
});

export const renameOrganizationSchema = Yup.object().shape({
  newOrganizationName: Yup.string()
    .required("Organization name is required.")
    .matches(
      /^[a-z0-9-]{8,24}$/,
      "Minimum 8 to 24 characters, lowercase letters, numbers and hyphens only."
    ),
});

export const deleteOrganizationSchema = (organizationName: any) =>
  Yup.object().shape({
    deleteOrganizationName: Yup.string()
      .required("Organization name is required")
      .matches(
        organizationName,
        `Organization name must match "${organizationName}" to delete.`
      ),
  });
