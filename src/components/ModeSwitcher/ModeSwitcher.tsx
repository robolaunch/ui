import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { envSwitchableMode } from "../../helpers/envProvider";
import { setApplicationMode } from "../../toolkit/UserSlice";
import { ReactElement } from "react";
import Toggle from "react-toggle";

export default function ModeSwitcher(): ReactElement {
  const { applicationMode } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  return (
    <Toggle
      defaultChecked={applicationMode}
      icons={false}
      className={`toggle-color`}
      disabled={!envSwitchableMode}
      onChange={(e) => {
        setTimeout(() => {
          dispatch(setApplicationMode(e.target.checked));
          document.body.classList.add(
            "animate__animated",
            "animate__fadeOut",
            "animate__faster",
          );
          window.location.reload();
        }, 1000);
      }}
    />
  );
}
