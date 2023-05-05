import axiosInterceptorGithub from "../../utils/axios.interceptor.github";

export async function getGithubUserRepositories(): Promise<any> {
  try {
    const { data } = await axiosInterceptorGithub.get(
      "https://api.github.com/user/repos"
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getGithubRepositoryBranches({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}): Promise<any> {
  try {
    const { data } = await axiosInterceptorGithub.get(
      `https://api.github.com/repos/${owner}/${repo}/branches`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
