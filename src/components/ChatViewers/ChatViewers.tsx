import React, { ReactElement } from "react";
import Button from "../Button/Button";
import { MdStopScreenShare } from "react-icons/md";
import useWindowDimensions from "../../hooks/useWindowDimensions";
interface IChatViewers {
  roomMembersState: any;
}

export default function ChatViewers({
  roomMembersState,
}: IChatViewers): ReactElement {
  const { width } = useWindowDimensions();

  return (
    <div
      className="h-full flex flex-col gap-6 px-2 scrollbar-hide overflow-auto"
      style={{ height: width / 2.75 }}
    >
      {roomMembersState?.map((member: any, index: number) => {
        return (
          <div
            className="flex items-center justify-between text-sm"
            key={index}
          >
            <div className="flex gap-2">
              <div className="flex items-center justify-center rounded-full h-10 w-10 font-semibold bg-layer-primary-300 text-layer-primary-700">
                {member?.displayname[0]?.toUpperCase()}
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-xs font-semibold">
                  {member?.displayname}
                </span>
                <span className="text-xs font-normal">Team User</span>
              </div>
            </div>
            <Button
              className="w-9 h-9 text-xs flex items-center justify-center"
              text={<MdStopScreenShare size={20} />}
            />
          </div>
        );
      })}
    </div>
  );
}
