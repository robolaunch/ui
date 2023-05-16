import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { SidebarListItem } from "./SidebarListItem";
import { SidebarContext } from "../../contexts/SidebarContext";
import { getOrganizations } from "../../resources/OrganizationSlice";
import { useAppDispatch } from "../../hooks/redux";

interface IOrganizationList {
  reload: boolean;
  setItemCount: any;
}

export default function OrganizationsList({
  reload,
  setItemCount,
}: IOrganizationList): ReactElement {
  const [responseOrganizations, setResponseOrganizations] =
    useState<any>(undefined);
  const { selectedState }: any = useContext(SidebarContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrganizations()).then((responseOrganizations: any) => {
      setResponseOrganizations(responseOrganizations?.payload?.data || []);
      setItemCount(responseOrganizations?.payload?.data?.length || 0);
    });
  }, [dispatch, setItemCount]);

  return (
    <Fragment>
      {!responseOrganizations?.length ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <Fragment>
          {responseOrganizations.map((organization: any, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="organization"
                name={organization?.organizationName}
                description={`Member Count: ${organization?.userCount}`}
                url={`/${organization?.organizationName}`}
                data={organization}
                selected={
                  organization.organizationName ===
                  selectedState?.organization?.organizationName
                }
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
