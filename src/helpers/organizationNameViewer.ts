import stringCapitalization from "./stringCapitalization";

interface IOrganizationNameViewer {
  organizationName: string;
}

export default function organizationNameViewer({
  organizationName,
}: IOrganizationNameViewer) {
  return stringCapitalization({
    str: organizationName.split("_")[1],
  });
}
