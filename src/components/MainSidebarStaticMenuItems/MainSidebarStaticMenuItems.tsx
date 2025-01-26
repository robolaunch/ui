import { Fragment, ReactElement } from "react";
import SidebarStaticItem from "../SidebarStaticItem/SidebarStaticItem";

export default function MainSidebarStaticMenuItems(): ReactElement {
  return (
    <Fragment>
      <SidebarStaticItem
        to="/data-science"
        imgSrc={`/svg/general/datascience/datascience-dark.svg`}
      />
    </Fragment>
  );
}
