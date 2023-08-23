import React, { ReactElement } from "react";

export default function KeycloakLoadingPage(): ReactElement {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 animate__animated animate__fadeIn">
      <img
        src="/images/ring.svg"
        alt=""
        className="w-28 animate-spin bg-layer-light-50 rounded-full shadow"
      />
      <img
        src="/images/rocket.svg"
        alt=""
        className="fixed pb-1 w-14 animate-pulse"
      />
    </div>
  );
}
