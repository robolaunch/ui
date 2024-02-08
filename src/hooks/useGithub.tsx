import { useContext } from "react";
import { GithubContext } from "../contexts/GithubContext";
import { IuseGithub } from "../interfaces/hook/github.hook.interface";

const useGithub = () => {
  const useGithub: IuseGithub = useContext(GithubContext);

  return useGithub;
};

export default useGithub;
