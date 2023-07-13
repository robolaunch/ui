import * as Yup from "yup";

export const createFleetSchema = Yup.object().shape({
  name: Yup.string()
    .required("Fleet name is required.")
    .min(3, "Minimum 3 characters.")
    .max(12, "Maximum 12 characters.")
    .lowercase("Must be lowercase."),
});
