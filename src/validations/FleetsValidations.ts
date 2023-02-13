import * as Yup from "yup";

export const createFleetSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(8, "Min 8 Character")
    .matches(/^[a-z]*$/, "Only lowercase english characters"),
});
