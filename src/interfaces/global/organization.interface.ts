export interface IOrganization {
  id: string;
  name: string;
}

export interface IOrganizationBE {
  isCurrentMemberUser: boolean;
  organizationId: string;
  organizationName: string;
  organizationPathLevel: number;
  teamCount: number;
  userCount: number;
}
