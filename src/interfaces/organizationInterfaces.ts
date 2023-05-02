export interface IOrganization {
  isCurrentMemberUser: boolean;
  organizationId: string;
  organizationName: string;
  organizationPathLevel: number;
  teamCount: number;
  userCount: number;
}
