import React, { ReactElement } from "react";
import useVDI from "../../hooks/useVDI";
import { MdStopScreenShare } from "react-icons/md";
import Button from "../Button/Button";

interface IRemoteDesktopViewersTab {
  height: number;
}

export default function RemoteDesktopViewersTab({
  height,
}: IRemoteDesktopViewersTab): ReactElement {
  const { remoteDesktopReducer } = useVDI();

  return (
    <div style={{ height: `${height}px` }}>
      {remoteDesktopReducer?.members?.map((member: any, index: number) => {
        return (
          <div
            className="animate__animated animate__fadeIn flex items-center justify-between p-2 text-sm"
            key={index}
          >
            <div className="flex gap-2">
              <div className="bg-primary-300 text-primary-700 flex h-10 w-10 items-center justify-center rounded-full font-semibold">
                {member?.displayname[0]?.toUpperCase()}
              </div>
              <div className="flex flex-col justify-between">
                <span className="text-xs font-semibold">
                  {member?.displayname}
                </span>
                <span className="text-xs font-light">Organization User</span>
              </div>
            </div>
            <Button
              className="flex !h-9 !w-9 items-center justify-center text-xs"
              text={<MdStopScreenShare size={20} />}
            />
          </div>
        );
      })}
    </div>
  );
}
