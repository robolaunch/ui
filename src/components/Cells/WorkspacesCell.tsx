import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { GoGitBranch } from "react-icons/go";

interface IWorkspacesCell {
  workspaces: any[];
}

export default function WorkspacesCell({
  workspaces,
}: IWorkspacesCell): ReactElement {
  const [githubWorkspaces, setGithubWorkspaces] = useState<any[]>([]);

  useEffect(() => {
    workspaces?.map(async (workspace: any) => {
      await axios
        .get(
          workspace?.url.replace(
            "https://github.com/",
            "https://api.github.com/repos/"
          )
        )
        .then((response) => {
          setGithubWorkspaces((prev) => [
            ...prev,
            {
              url: workspace?.url,
              description: response?.data?.description,
              branch: workspace?.branch,
              full_name: response?.data?.full_name,
            },
          ]);
        });
    });
  }, [workspaces]);

  return (
    <div className="flex flex-col items-center gap-2">
      {githubWorkspaces?.map((workspace: any, index: number) => {
        return (
          <div
            key={index}
            className="border border-layer-light-200 w-fit py-1.5 px-4 rounded shadow-md"
          >
            <div className="flex gap-2">
              <a
                target="_blank"
                rel="noreferrer"
                href={workspace?.url}
                className="flex gap-3 text-xs font-medium text-layer-secondary-700 hover:underline hover:text-layer-secondary-800 transition-300"
              >
                <div className="flex gap-1 items-center">
                  <img
                    className="w-3"
                    src="/svg/apps/github.svg"
                    alt="github"
                  />

                  <span> {workspace?.full_name}</span>
                </div>
                <div className="flex gap-1 items-center">
                  <GoGitBranch />
                  <span>{workspace?.branch}</span>
                </div>
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
