import * as Yup from "yup";

export const CFAppStep2Validations = Yup.object().shape({
  workspaces: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Workspace Name is required"),
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
