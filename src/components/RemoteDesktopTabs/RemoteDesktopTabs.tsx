import React, { Fragment, ReactElement, useContext, useState } from "react";
import InputText from "../InputText/InputText";
import { useComponentSize } from "react-use-size/dist/useComponentSize";
import { StreamContext } from "../../contexts/StreamContext";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Button from "../Button/Button";
import { MdStopScreenShare } from "react-icons/md";

export default function RemoteDesktopTabs(): ReactElement {
  const [message, setMessage] = useState<string>("");
  const { handleSendMessage, remoteDesktopReducer }: any =
    useContext(StreamContext);

  const { ref, height } = useComponentSize();
  const { width } = useWindowDimensions();

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

  return (
    <Fragment>
      <ul className="w-full flex items-center justify-center gap-8 p-2">
        {tabs.map((tab: any, index: number) => {
          return (
            <div
              className="flex flex-col gap-3 cursor-pointer"
              onClick={() => handleChangeActiveTab(tab.name)}
              key={index}
            >
              <li
                className={`text-xs font-medium px-2 transition-all duration-500 ${
                  tab.name === activeTab
                    ? "text-layer-primary-500"
                    : "text-layer-light-500"
                } `}
              >
                {tab.name}
              </li>
              <div
                className={`w-full h-[2px] transition-all duration-500 ${
                  tab.name === activeTab
                    ? "bg-layer-primary-500"
                    : "bg-transparent"
                } `}
              />
            </div>
          );
        })}
      </ul>
      {(() => {
        switch (activeTab) {
          case "Chat":
            return (
              <div className="h-full flex flex-col justify-between px-2">
                <div ref={ref} className={` h-full`}>
                  <div
                    className="flex flex-col gap-2 scrollbar-hide overflow-auto"
                    style={{ height: height - 28 + "px" }}
                  >
                    {remoteDesktopReducer?.messages?.map(
                      (message: any, index: number) => {
                        return (
                          <div className="flex gap-4" key={index}>
                            <div className="flex items-center justify-center rounded-full h-10 w-10 font-semibold bg-layer-primary-300 text-layer-primary-700">
                              {
                                // eslint-disable-next-line array-callback-return
                                remoteDesktopReducer?.members?.map(
                                  (mem: any) => {
                                    if (mem.id === message.id) {
                                      return mem.displayname[0].toUpperCase();
                                    }
                                  }
                                )
                              }
                            </div>
                            <div className="flex flex-col">
                              <div className="text-xs font-semibold">
                                {
                                  // eslint-disable-next-line array-callback-return
                                  remoteDesktopReducer?.members?.map(
                                    (mem: any) => {
                                      if (mem.id === message.id) {
                                        return mem.displayname;
                                      }
                                    }
                                  )
                                }
                              </div>
                              <div className="text-xs break-words w-[210px]">
                                {message.content}
                              </div>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
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
          case "Viewers":
            return (
              <div
                className="h-full flex flex-col gap-6 px-2 scrollbar-hide overflow-auto"
                style={{ height: width / 2.75 }}
              >
                {remoteDesktopReducer?.members?.map(
                  (member: any, index: number) => {
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
                            <span className="text-xs font-normal">
                              Team User
                            </span>
                          </div>
                        </div>
                        <Button
                          className="w-9 h-9 text-xs flex items-center justify-center"
                          text={<MdStopScreenShare size={20} />}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            );
        }
      })()}
    </Fragment>
  );
}
