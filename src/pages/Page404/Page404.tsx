import { Fragment, ReactElement } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";

export default function Page404(): ReactElement {
  return (
    <Card
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
        <p className="font-semibold text-light-600">
          This page could not be found.
        </p>
        <Link to={"/"}>
          <Button
            text={"Redirect to Home Page"}
            className="!h-fit !w-fit !border-2 !border-primary-300 !bg-transparent p-2.5 !text-xs !font-semibold !text-primary-400 transition-all duration-500 hover:!scale-90"
          />
        </Link>
      </Fragment>
    </Card>
  );
}
