import * as Yup from "yup";

export const createFleetSchema = Yup.object().shape({
  name: Yup.string()
    .required("Fleet name is required.")
    .min(3, "Minimum 3 characters.")
    .max(16, "Maximum 16 characters.")
    .lowercase("Must be lowercase.")
    .matches(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      "Must be lowercase with hyphen (-) only in the middle."
    ),
});
