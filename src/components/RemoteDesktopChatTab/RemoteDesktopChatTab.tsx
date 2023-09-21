import { css } from "@emotion/css";
import React, { ReactElement, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import useVDI from "../../hooks/useVDI";
import InputText from "../InputText/InputText";

interface IRemoteDesktopChatTab {
  height: number;
}

export default function RemoteDesktopChatTab({
  height,
}: IRemoteDesktopChatTab): ReactElement {
  const { handleSendMessage, remoteDesktopReducer } = useVDI();
  const [message, setMessage] = useState<string>("");

  const cssScrollBottom = css({
    height: height - 88,
  });

  return (
    <div className="flex h-full flex-col justify-between p-2">
      <div
        className="overflow-y-hidden"
        style={{
          height: `${height - 88}px`,
        }}
      >
        <ScrollToBottom className={cssScrollBottom}>
          {remoteDesktopReducer?.messages?.map(
            (message: any, index: number) => {
              return (
                <div
                  key={index}
                  className="animate__animated animate__fadeIn grid grid-cols-6 gap-2 pb-2"
                >
                  <div className="col-span-1 flex h-10 w-10 items-center justify-center rounded-full bg-layer-primary-300 font-semibold text-layer-primary-700">
                    {remoteDesktopReducer?.members
                      ?.filter((member: any) => member.id === message.id)[0]
                      ?.displayname[0]?.toUpperCase()}
                  </div>
                  <div className="col-span-5 flex flex-col">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold">
                        {
                          remoteDesktopReducer?.members?.filter(
                            (member: any) => member.id === message.id,
                          )[0]?.displayname
                        }
                      </span>
                      <span className="text-xs font-light">
                        {message?.time}
                      </span>
                    </div>
                    <p className="break-words text-xs">{message?.content}</p>
                  </div>
                </div>
              );
            },
          )}
        </ScrollToBottom>
      </div>

      <InputText
        onChange={(e) => setMessage(e.target.value)}
        onSubmitEnter={() => {
          handleSendMessage(message);
          setMessage("");
        }}
        placeholder="Message"
        value={message}
      />
    </div>
  );
}
