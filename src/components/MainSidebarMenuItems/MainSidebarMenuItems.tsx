import { Fragment, ReactElement } from "react";
import SideBarMenuItem from "../SidebarMenuItem/SideBarMenuItem";
import useMain from "../../hooks/useMain";

export default function MainSidebarMenuItems(): ReactElement {
  const { applicationMode } = useMain();

  return (
    <Fragment>
      <SideBarMenuItem
        type="organization"
        description="You can access all your organizations here."
      />
      <SideBarMenuItem
        type="roboticscloud"
        description="You can access all your regions here."
      />
      <SideBarMenuItem
        type="instance"
        description="You can access all your instances here."
      />
      <SideBarMenuItem
        type="fleet"
        description={
          applicationMode
            ? "You can access all your namespaces here."
            : "You can access all your fleets here."
        }
      />
      <SideBarMenuItem
        type="robot"
        description={
          applicationMode
            ? "You can access all your applications here."
            : "You can access all your robots here."
        }
      />
    </Fragment>
  );
}
