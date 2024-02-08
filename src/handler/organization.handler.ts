import {
  IOrganization,
  IOrganizationBE,
} from "../interfaces/global/organization.interface";

function handleMapper(orgs: IOrganizationBE[]): IOrganization[] {
  return (
    orgs?.map((org) => {
      return {
        id: org.organizationId,
        name: org.organizationName,
      };
    }) || []
  );
}

export function orgsMapper(orgs: IOrganizationBE[]): IOrganization[] {
  return handleMapper(orgs);
}

export function orgMapper(
  orgs: IOrganizationBE[],
  filter: string,
): null | IOrganization {
  return (
    handleMapper(orgs).find(
      (org) =>
        org.name === (filter.includes("org_") ? filter : `org_${filter}`),
    ) || null
  );
}
