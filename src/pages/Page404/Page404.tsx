import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function Page404(): ReactElement {
  return (
    <CardLayout
      className={`animate__animated animate__fadeIn flex h-full flex-col items-center justify-center gap-8 p-12 transition-all duration-500 `}
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
          This page could not be found.
        </p>
        <Link to={"/"}>
          <Button
            text={"Redirect to Home Page"}
            className="!h-fit !w-fit !border-2 !border-layer-primary-300 !bg-transparent p-2.5 !text-xs !font-semibold !text-layer-primary-600 transition-all duration-500 hover:!scale-90"
          />
        </Link>
      </Fragment>
    </CardLayout>
  );
}
