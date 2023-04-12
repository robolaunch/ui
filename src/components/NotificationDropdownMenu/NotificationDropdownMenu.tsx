import React, { Fragment, ReactElement, useContext, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { TbNotification } from "react-icons/tb";
import { ApiContext } from "../../contexts/ApiContext";
import { IApiInterface } from "../../types/ApiInterface";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function NotificationDropdownMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });

  const { api }: IApiInterface = useContext(ApiContext);

  // useEffect(() => {
  //   api.getInvitedOrganizations().then((res: any) => {
  //     console.log(res);
  //   });
  // }, [api]);

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
        className="flex items-center justify-center cursor-pointer"
      >
        <TbNotification size={32} />
      </div>
      {isOpen && (
        <ul
          className="flex flex-col gap-1 w-[28rem] absolute right-4 top-14 p-2 border border-layer-light-100 bg-layer-light-50 shadow-lg rounded text-sm animate__animated animate__fadeInDown animate__faster"
          ref={ref}
        >
          {notifications.map((notification: any, notificationIndex: number) => {
            return (
              <li
                className="hover:bg-layer-light-100 pl-2 pr-6 py-3 transition-all duration-200 rounded cursor-pointer"
                key={notificationIndex}
              >
                <div className="w-full flex items-center justify-between">
                  <div id="info" className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-layer-dark-600">
                      {notification?.title}
                    </p>
                    <span className="text-xs font-medium text-layer-light-500">
                      {notification?.description}
                    </span>
                  </div>
                  <div id="control" className="flex gap-4">
                    <AiOutlineCheckCircle
                      className="text-layer-primary-500 hover:text-layer-light-50 hover:bg-layer-primary-500 rounded-full"
                      size={26}
                    />
                    <AiOutlineCloseCircle
                      className="text-red-500 hover:text-layer-light-50 hover:bg-red-500 rounded-full"
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
