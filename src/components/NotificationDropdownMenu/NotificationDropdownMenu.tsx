import React, { Fragment, ReactElement, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { TbNotification } from "react-icons/tb";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function NotificationDropdownMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });

  const notifications = [
    {
      type: "a",
      title: "Notification Title #1",
      description: "Notification description",
    },
    {
      type: "b",
      title: "Notification Title #2",
      description: "Notification description",
    },
  ];

  return (
    <Fragment>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex cursor-pointer items-center justify-center"
      >
        <TbNotification size={32} />
      </div>
      {isOpen && (
        <ul
          className="animate__animated animate__fadeInDown animate__faster border-light-100 bg-light-50 absolute right-4 top-14 flex w-[28rem] flex-col gap-1 rounded border p-2 text-sm shadow-lg"
          ref={ref}
        >
          {notifications.map((notification: any, notificationIndex: number) => {
            return (
              <li
                className="hover:bg-light-100 cursor-pointer rounded py-3 pl-2 pr-6 transition-all duration-200"
                key={notificationIndex}
              >
                <div className="flex w-full items-center justify-between">
                  <div id="info" className="flex flex-col gap-1">
                    <p className="text-light-600 text-sm font-medium">
                      {notification?.title}
                    </p>
                    <span className="text-light-500 text-xs font-medium">
                      {notification?.description}
                    </span>
                  </div>
                  <div id="control" className="flex gap-4">
                    <AiOutlineCheckCircle
                      className="hover:text-light-50 text-primary-500 hover:bg-primary-500 rounded-full"
                      size={26}
                    />
                    <AiOutlineCloseCircle
                      className="hover:text-light-50 rounded-full text-red-500 hover:bg-red-500"
                      size={26}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Fragment>
  );
}
