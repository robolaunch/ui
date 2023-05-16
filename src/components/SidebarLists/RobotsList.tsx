import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch } from "../../hooks/redux";
import { SidebarContext } from "../../contexts/SidebarContext";

interface IRobotsList {
  reload: boolean;
  setItemCount: any;
}

export default function RobotsList({
  reload,
  setItemCount,
}: IRobotsList): ReactElement {
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [responseRobots, setResponseRobots] = useState<any>([]);
  const { selectedState }: any = useContext(SidebarContext);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);
    // dispatch
    setTimeout(() => setLoading(false), 2000);
  }, [dispatch, reload]);

  return (
    <Fragment>
      {loading ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <Fragment>
          {responseRobots.map((robot: any, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="robot"
                name={robot?.robotName}
                description={`Active Robot Count: ${robot?.activeRobotCount}`}
                url={`/${robot?.robotName}`}
                data={robot}
                selected={robot.robotName === selectedState?.robot?.robotName}
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
