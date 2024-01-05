import { ReactElement } from "react";
import Toggle from "react-toggle";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setApplicationMode } from "../../toolkit/UserSlice";
import { envSwitchableMode } from "../../helpers/envProvider";

export default function ModeSwitcher(): ReactElement {
  const { applicationMode } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  return (
    <>
      <Toggle
        defaultChecked={applicationMode}
        icons={false}
        className={`toggle-color`}
        disabled={!envSwitchableMode}
        onChange={(e) => {
          setTimeout(() => {
            dispatch(setApplicationMode(e.target.checked));
            window.location.reload();
          }, 1000);
        }}
      />
    </>
  );
}
