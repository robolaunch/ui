import React, { Fragment, ReactElement, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../app/store";
import useOnclickOutside from "react-cool-onclickoutside";
import { Link } from "react-router-dom";
import InputSelect from "../InputSelect/InputSelect";
import { useKeycloak } from "@react-keycloak/web";

export default function HeaderDropdownMenu(): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAppSelector((state: RootState) => state.user);

  const ref = useOnclickOutside(() => {
    setIsOpen(false);
  });

  const { organizations }: any = useAppSelector(
    (state: RootState) => state.organization
  );

  const { keycloak } = useKeycloak();

  return (
    <Fragment>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex items-center justify-center rounded h-10 w-10 font-semibold bg-layer-primary-100 border border-layer-primary-200 text-layer-primary-700 cursor-pointer uppercase"
      >
        {user?.username[0]}
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
              {user?.username[0]}
            </div>
            <div className="flex flex-col">
              <span className="text-layer-dark-700 font-semibold">
                {user?.firstName + " " + user?.lastName}
              </span>
              <span className="text-layer-dark-300 text-xs">
                {user?.username}
              </span>
            </div>
          </Link>
          <li className="flex flex-col gap-1">
            <span className="text-xs text-layer-dark-500">
              Active Organization
            </span>
            <InputSelect className="text-layer-dark-600">
              {organizations?.map((organization: any, index: number) => {
                return (
                  <option key={index} value={organization.name}>
                    {organization.name}
                  </option>
                );
              })}
            </InputSelect>
          </li>
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
