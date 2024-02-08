import { IGithubToken } from "../global/github.interface";

export interface IuseGithub {
  githubToken: IGithubToken | null;
  githubAuth: boolean;
}
