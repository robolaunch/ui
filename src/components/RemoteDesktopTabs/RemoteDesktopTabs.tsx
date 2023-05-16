import React, { ReactElement, useState } from "react";
import InputText from "../InputText/InputText";
import { useComponentSize } from "react-use-size/dist/useComponentSize";
import Button from "../Button/Button";
import { MdStopScreenShare } from "react-icons/md";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";
import useRemoteDesktopStream from "../../hooks/useRemoteDesktopStream";

export default function RemoteDesktopTabs(): ReactElement {
  const [message, setMessage] = useState<string>("");
  const { handleSendMessage, remoteDesktopReducer } = useRemoteDesktopStream();

  const { ref, height } = useComponentSize();

  const [activeTab, setActiveTab] = useState<string>("Chat");

  function handleChangeActiveTab(tab: string) {
    setActiveTab(tab);
  }

  const tabs = [
    {
      name: "Chat",
    },
    {
      name: "Viewers",
    },
  ];

  const cssScrollBottom = css({
    height: height - 88,
  });

  return (
    <div className="h-full flex flex-col justify-between">
      <ul className="w-full flex items-center justify-center gap-8 p-2">
        {tabs.map((tab: any, index: number) => {
          return (
            <li
              className="flex flex-col gap-3 cursor-pointer"
              onClick={() => handleChangeActiveTab(tab.name)}
              key={index}
            >
              <div
                className={`text-xs font-medium px-2 transition-all duration-500 ${
                  tab.name === activeTab
                    ? "text-layer-primary-500"
                    : "text-layer-light-500"
                } `}
              >
                {tab.name}
              </div>
              <div
                className={`w-full h-[2px] transition-all duration-500 ${
                  tab.name === activeTab
                    ? "bg-layer-primary-500"
                    : "bg-transparent"
                } `}
              />
            </li>
          );
        })}
      </ul>
      <div ref={ref} className="h-full flex flex-col overflow-y-auto">
        {activeTab === "Viewers" ? (
          <div style={{ height: `${height}px` }}>
            {remoteDesktopReducer?.members?.map(
              (member: any, index: number) => {
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
                        <span className="text-xs font-light">
                          Organization User
                        </span>
                      </div>
                    </div>
                    <Button
                      className="!w-9 !h-9 text-xs flex items-center justify-center"
                      text={<MdStopScreenShare size={20} />}
                    />
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col justify-between p-2">
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
                        className="grid grid-cols-6 gap-2 pb-2 animate__animated animate__fadeIn"
                      >
                        <div className="col-span-1 flex items-center justify-center rounded-full h-10 w-10 font-semibold bg-layer-primary-300 text-layer-primary-700">
                          {remoteDesktopReducer?.members
                            ?.filter(
                              (member: any) => member.id === message.id
                            )[0]
                            ?.displayname[0]?.toUpperCase()}
                        </div>
                        <div className="col-span-5 flex flex-col">
                          <div className="flex gap-3 items-center">
                            <span className="text-sm font-semibold">
                              {
                                remoteDesktopReducer?.members?.filter(
                                  (member: any) => member.id === message.id
                                )[0]?.displayname
                              }
                            </span>
                            <span className="text-xs font-light">
                              {message?.time}
                            </span>
                          </div>
                          <p className="text-xs break-words">
                            {message?.content}
                          </p>
                        </div>
                      </div>
                    );
                  }
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
        )}
      </div>
    </div>
  );
}
