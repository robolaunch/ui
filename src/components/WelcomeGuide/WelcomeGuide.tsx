import React, { ReactElement } from "react";

export default function WelcomeGuide(): ReactElement {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <h3 className="text-2xl font-bold ">Welcome to robolaunch</h3>
      <p>
        We're thrilled to have you on board! Let's get started with a quick tour
        to help you navigate all the incredible features and possibilities. It
        will only take a few minutes.
      </p>{" "}
    </div>
  );
}
