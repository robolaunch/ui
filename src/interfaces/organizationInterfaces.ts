export interface IOrganization {
  isCurrentMemberUser: boolean;
  organizationId: string;
  organizationName: string;
  organizationPathLevel: number;
  teamCount: number;
  userCount: number;
}

export interface IcreateOrganizationRequest {
  name: string;
}

export interface IgetOrganizationUsersRequest {
  name: string;
  organizationId: string;
}

export interface IgetOrganizationAdminsRequest {
  name: string;
  organizationId: string;
}

export interface IgetOrganizationGuestsRequest {
  name: string;
  organizationId: string;
}
