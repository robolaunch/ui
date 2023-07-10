import * as Yup from "yup";

export const createRoboticsCloudSchema = Yup.object().shape({
  roboticsCloudName: Yup.string()
    .min(3, "Text must be at least 3 characters long")
    .max(12, "Text must be at most 12 characters long")
    .test(
      "first-character",
      "First character must be a lowercase letter",
      function (value) {
        if (value) {
          const firstChar = value[0];
          return firstChar === firstChar.toLowerCase();
        }
        return true;
      }
    )
    .test(
      "second-character",
      "Second character must be a lowercase letter or a digit",
      function (value) {
        if (value) {
          const secondChar = value[1];
          return /^[a-z\d]$/.test(secondChar);
        }
        return true;
      }
    )
    .test(
      "dash-followed-by-alnum",
      "A lowercase letter or a digit must follow the dash (-)",
      function (value) {
        if (value) {
          return /^(?:-[a-z\d]+)?$/.test(value.substring(2));
        }
        return true;
      }
    )
    .matches(/^[a-z][a-z\d](?:-[a-z\d]+)$/, "Invalid text format"),
  provider: Yup.string().required("Provider is required"),
  region: Yup.string().required("Region is required"),
});
