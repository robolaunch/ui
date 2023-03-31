import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

interface IPage404 {
  description?: string;
  className?: string;
  buttonText?: string;
  buttonURL?: any;
}

export default function Page404({
  description,
  className,
  buttonText,
  buttonURL,
}: IPage404): ReactElement {
  return (
    <CardLayout
      className={`flex flex-col justify-center items-center p-12 h-full gap-8 animate__animated animate__fadeIn transition-all duration-500 ${className}`}
      style={{
        backgroundImage: `url("/images/abstract2-white.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Fragment>
        <p className="font-semibold text-layer-dark-600">
          {description ? description : "This page could not be found."}
        </p>
        <Link to={buttonURL ? buttonURL : "/"}>
          <Button
            text={buttonText ? buttonText : "Redirect to Home Page"}
            className="!w-fit !h-fit p-2.5 !border-2 !border-layer-primary-300 !text-xs !bg-transparent !font-semibold !text-layer-primary-600 hover:!scale-90 transition-all duration-500"
          />
        </Link>
      </Fragment>
    </CardLayout>
  );
}
