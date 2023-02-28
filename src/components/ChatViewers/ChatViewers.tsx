import React, { ReactElement } from "react";

interface IChatViewers {
  roomMembersState: any;
}

export default function ChatViewers({
  roomMembersState,
}: IChatViewers): ReactElement {
  return (
    <div className="h-full flex flex-col gap-2">
      {roomMembersState?.map((member: any, index: number) => {
        return (
          <div className="flex gap-4 text-sm" key={index}>
            <div className="flex items-center justify-center rounded-full h-10 w-10 font-semibold bg-layer-primary-300 text-layer-primary-700">
              {member.displayname[0].toUpperCase()}
            </div>
            <div className="flex flex-col">
              <div className="text-xs font-semibold">{member.displayname}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
