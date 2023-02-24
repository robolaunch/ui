import React, { ReactElement } from "react";
import InputTextArea from "../InputTextArea/InputTextArea";
import Button from "../Button/Button";

interface IChatScreen {
  chatMessages: any;
  members: any;
}

export default function ChatScreem({
  chatMessages,
  members,
}: IChatScreen): ReactElement {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex flex-col gap-4 h-[44rem] overflow-auto">
        {chatMessages?.map((message: any, index: number) => {
          return (
            <div className="flex gap-4 text-sm" key={index}>
              <div className="flex items-center justify-center rounded-full h-10 w-10 font-semibold bg-layer-primary-300 text-layer-primary-700">
                {members?.map((mem: any) => {
                  if (mem.id === message.id) {
                    return mem.displayname[0].toUpperCase();
                  }
                })}
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">
                  {members?.map((mem: any) => {
                    if (mem.id === message.id) {
                      return mem.displayname;
                    }
                  })}
                </div>
                <div className="break-words w-[210px]">{message.content}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-5">
        <div className="col-span-4">
          <InputTextArea placeholder="Message" />
        </div>
        <div className="col-span-1">
          <Button text="Send" />
        </div>
      </div>
    </div>
  );
}
