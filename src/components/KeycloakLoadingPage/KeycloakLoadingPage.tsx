import React, { ReactElement } from "react";

export default function KeycloakLoadingPage(): ReactElement {
  return (
    <div className="animate__animated animate__fadeIn absolute inset-0 z-50 flex flex-col items-center justify-center">
      <img
        src="/images/ring.svg"
        alt=""
        className="bg-light-50 w-28 animate-spin rounded-full shadow"
      />
      <img
        src="/images/rocket.svg"
        alt=""
        className="fixed w-14 animate-pulse pb-1"
      />
    </div>
  );
}
