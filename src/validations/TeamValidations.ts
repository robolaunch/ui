import * as Yup from "yup";

export const CreateTeamSchema = Yup.object().shape({
  name: Yup.string().required("Team name is required."),
});

export const RenameTeamSchema = Yup.object().shape({
  newTeamName: Yup.string().required("Team name is required."),
});
