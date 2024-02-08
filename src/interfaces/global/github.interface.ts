export interface IGithubToken {
  access_token: string;
  exp: number;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
  userId: number;
}
