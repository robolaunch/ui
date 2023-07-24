import React, { Fragment, ReactElement, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Gravatar from "react-gravatar";
import { handleLogout } from "../../functions/GeneralFunctions";
import { envTrialApp } from "../../helpers/envProvider";

export default function HeaderDropdownMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });

  const { keycloak } = useKeycloak();

  const liClassName =
    "hover:bg-layer-light-100 pl-2 pr-6 py-3 transition-all duration-200 rounded cursor-pointer";

  return (
    <Fragment>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-center cursor-pointer"
      >
        <Gravatar
          email={keycloak?.tokenParsed?.email}
          className="h-9 w-9 rounded"
          default="mp"
        />
      </div>
      {isOpen && (
        <ul
          className="flex flex-col gap-1 w-72 absolute right-4 top-[3.6rem] p-2 border border-layer-light-100 bg-layer-light-50 shadow-lg rounded text-sm animate__animated animate__fadeInDown animate__faster"
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
                <span className="text-layer-dark-700 font-semibold">
                  {keycloak?.tokenParsed?.given_name +
                    " " +
                    keycloak?.tokenParsed?.family_name}
                </span>
                <span className="text-layer-dark-300 text-xs font-medium">
                  {keycloak?.tokenParsed?.preferred_username}
                </span>
                <span className="text-layer-dark-300 text-xs font-light">
                  {keycloak?.tokenParsed?.email}
                </span>
              </div>
            </li>
          </Link>
          {!envTrialApp && (
            <Link onClick={() => setIsOpen(false)} to={`/profile`}>
              <li className={liClassName}>Account Settings</li>
            </Link>
          )}
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
