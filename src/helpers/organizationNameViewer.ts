import stringCapitalization from "./stringCapitalization";

interface IOrganizationNameViewer {
  organizationName: string;
  capitalization?: boolean;
}

export default function organizationNameViewer({
  organizationName,
  capitalization = true,
}: IOrganizationNameViewer) {
  if (capitalization) {
    return stringCapitalization({
      str: organizationName?.split("_")[1],
    });
  }

  return organizationName?.split("_")[1];
}
