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
    const workspacesData = workspaces;

    setGithubWorkspaces([]);
    workspacesData?.forEach(async (workspace: any) => {
      try {
        const response = await axios.get(
          workspace?.url.replace(
            "https://github.com/",
            "https://api.github.com/repos/",
          ),
        );

        setGithubWorkspaces((prev) => [
          ...prev,
          {
            url: workspace?.url,
            description: response?.data?.description,
            branch: workspace?.branch,
            full_name: response?.data?.full_name,
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      {githubWorkspaces?.map((workspace: any, index: number) => {
        return (
          <div
            key={index}
            className="w-fit rounded border border-layer-light-200 px-4 py-1.5 shadow-md"
          >
            <div className="flex gap-2">
              <a
                target="_blank"
                rel="noreferrer"
                href={workspace?.url}
                className="transition-300 flex gap-3 text-xs font-medium text-layer-secondary-700 hover:text-layer-secondary-800 hover:underline"
              >
                <div className="flex items-center gap-1">
                  <img
                    className="w-3"
                    src="/svg/apps/github.svg"
                    alt="github"
                  />
                  <span> {workspace?.full_name}</span>
                </div>
                <div className="flex items-center gap-1">
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
