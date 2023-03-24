import React, { ReactElement } from "react";
import InputText from "../InputText/InputText";
import { useComponentSize } from "react-use-size/dist/useComponentSize";

interface IChatScreen {
  handleOnChangeMessage: any;
  handleSendMessage: any;
  chatMessages: any;
  inputValue: any;
  members: any;
}

export default function ChatScreen({
  handleOnChangeMessage,
  handleSendMessage,
  chatMessages,
  inputValue,
  members,
}: IChatScreen): ReactElement {
  const { ref, height } = useComponentSize();

  return (
    <div className="h-full flex flex-col justify-between px-2">
      <div ref={ref} className={` h-full`}>
        <div
          className="flex flex-col gap-2 scrollbar-hide overflow-auto"
          style={{ height: height - 28 + "px" }}
        >
          {chatMessages?.map((message: any, index: number) => {
            return (
              <div className="flex gap-4" key={index}>
                <div className="flex items-center justify-center rounded-full h-10 w-10 font-semibold bg-layer-primary-300 text-layer-primary-700">
                  {
                    // eslint-disable-next-line array-callback-return
                    members?.map((mem: any) => {
                      if (mem.id === message.id) {
                        return mem.displayname[0].toUpperCase();
                      }
                    })
                  }
                </div>
                <div className="flex flex-col">
                  <div className="text-xs font-semibold">
                    {
                      // eslint-disable-next-line array-callback-return
                      members?.map((mem: any) => {
                        if (mem.id === message.id) {
                          return mem.displayname;
                        }
                      })
                    }
                  </div>
                  <div className="text-xs break-words w-[210px]">
                    {message.content}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* {chatMessages?.length === 0 && (
        <div className="h-full flex flex-col gap-3 items-center justify-center">
          <TbMessageCircle2 size={24} className="text-layer-light-400" />
          <div className="text-xs text-layer-light-500">
            No messages yet. Start the conversation.
          </div>
        </div>
      )} */}
      <InputText
        onChange={(e) => handleOnChangeMessage(e.target.value)}
        onSubmitEnter={() => handleSendMessage()}
        placeholder="Message"
        value={inputValue}
      />
    </div>
  );
}
