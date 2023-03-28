import React, { Fragment, ReactElement, useState } from "react";
import useOnclickOutside from "react-cool-onclickoutside";
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

export default function HeaderDropdownMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });

  const { keycloak } = useKeycloak();

  return (
    <Fragment>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-center rounded h-10 w-10 font-semibold bg-layer-primary-100 border border-layer-primary-200 text-layer-primary-700 cursor-pointer uppercase"
      >
        {keycloak?.tokenParsed?.given_name[0]}
      </div>
      {isOpen && (
        <ul
          className="flex flex-col gap-7 w-60 absolute right-4 top-14 p-2 border border-layer-light-100 bg-layer-light-50 shadow-lg rounded text-sm animate__animated animate__fadeInDown animate__faster"
          ref={ref}
        >
          <Link
            to={`#`}
            className="flex gap-3 hover:bg-layer-light-100 pl-2 pr-6 py-3 rounded transition-all duration-200"
          >
            <div className="flex items-center justify-center rounded h-10 w-10 font-semibold bg-layer-primary-100 border border-layer-primary-200 text-layer-primary-700 cursor-pointer uppercase">
              {keycloak?.tokenParsed?.given_name[0]}
            </div>
            <div className="flex flex-col">
              <span className="text-layer-dark-700 font-semibold">
                {keycloak?.tokenParsed?.given_name +
                  " " +
                  keycloak?.tokenParsed?.family_name}
              </span>
              <span className="text-layer-dark-300 text-xs">
                {keycloak?.tokenParsed?.preferred_username}
              </span>
            </div>
          </Link>
          <li>Account Settings</li>
          <li
            onClick={() => {
              keycloak.logout({
                redirectUri: window.location.origin + "/logout",
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
