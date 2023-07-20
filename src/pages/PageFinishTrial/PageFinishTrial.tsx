import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function PageFinishTrial(): ReactElement {
  return (
    <CardLayout
      className={`flex flex-col justify-center items-center p-12 h-full gap-8 animate__animated animate__fadeIn transition-all duration-500 `}
      style={{
        backgroundImage: `url("/images/abstract2-white.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Fragment>
        <img className="w-24" src="/images/rocket.svg" alt="robolaunch" />
        <p className="font-semibold text-layer-dark-600">
          Your trial period has ended. Please contact us to continue using
          robolaunch.
        </p>
        <Link to={"/"}>
          <Button
            text={"Redirect to robolaunch"}
            className="!w-fit !h-fit p-2.5 !border-2 !border-layer-primary-300 !text-xs !bg-transparent !font-semibold !text-layer-primary-600 hover:!scale-90 transition-all duration-500"
          />
        </Link>
      </Fragment>
    </CardLayout>
  );
}
