import React, { Fragment, ReactElement, useState } from "react";
import { handleLogout } from "../../functions/GeneralFunctions";
import useOnclickOutside from "react-cool-onclickoutside";
import { useKeycloak } from "@react-keycloak/web";
import { Link } from "react-router-dom";
import Gravatar from "react-gravatar";

export default function HeaderDropdownMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });

  const { keycloak } = useKeycloak();

  const liClassName =
    "hover:bg-light-100 pl-2 pr-6 py-3 transition-all duration-200 rounded cursor-pointer";

  return (
    <Fragment>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex cursor-pointer items-center justify-center"
      >
        <Gravatar
          email={keycloak?.tokenParsed?.email}
          className="h-9 w-9 rounded"
          default="mp"
        />
      </div>
      {isOpen && (
        <ul
          className="animate__animated animate__fadeInDown animate__faster border-light-100 bg-light-50 absolute right-4 top-[3.6rem] flex w-72 flex-col gap-1 rounded border p-2 text-sm shadow-lg"
          ref={ref}
        >
          <Link onClick={() => setIsOpen(false)} to={`/profile`}>
            <li className={`${liClassName} flex gap-3`}>
              <Gravatar
                email={keycloak?.tokenParsed?.email}
                className="h-13 w-13 rounded"
                default="mp"
              />
              <div className="flex flex-col">
                <span className="text-light-600 font-semibold">
                  {keycloak?.tokenParsed?.given_name +
                    " " +
                    keycloak?.tokenParsed?.family_name}
                </span>
                <span className="text-light-500 text-xs font-medium">
                  {keycloak?.tokenParsed?.preferred_username}
                </span>
                <span className="text-light-500 text-xs font-light">
                  {keycloak?.tokenParsed?.email}
                </span>
              </div>
            </li>
          </Link>
          <Link onClick={() => setIsOpen(false)} to={`/profile`}>
            <li className={liClassName}>Account Settings</li>
          </Link>
          <li
            className={liClassName}
            onClick={() => {
              handleLogout();
              keycloak.logout({
                redirectUri: window.location.origin,
              });
            }}
          >
            Signout
          </li>
        </ul>
      )}
    </Fragment>
  );
}
