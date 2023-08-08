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
            className="flex items-center justify-between text-sm p-2 animate__animated animate__fadeIn"
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
                <span className="text-xs font-light">Organization User</span>
              </div>
            </div>
            <Button
              className="!w-9 !h-9 text-xs flex items-center justify-center"
              text={<MdStopScreenShare size={20} />}
            />
          </div>
        );
      })}
    </div>
  );
}
