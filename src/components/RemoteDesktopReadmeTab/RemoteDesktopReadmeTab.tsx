import React, { ReactElement } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface IRemoteDesktopReadmeTab {
  height: number;
  readMe: string;
}

export default function RemoteDesktopReadmeTab({
  height,
  readMe,
}: IRemoteDesktopReadmeTab): ReactElement {
  return (
    <div className="flex h-full flex-col justify-between p-2">
      <div className="overflow-y-hidden">
        <MarkdownPreview
          className="h-full"
          source={readMe || "Readme not found"}
          wrapperElement={{
            "data-color-mode": "light",
          }}
        />
      </div>
    </div>
  );
}
