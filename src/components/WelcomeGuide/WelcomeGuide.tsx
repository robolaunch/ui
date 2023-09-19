import React, { ReactElement } from "react";

export default function WelcomeGuide(): ReactElement {
  return (
    <div className="flex flex-col items-center text-center gap-6">
      <h3 className="text-xl font-semibold ">Welcome to Robolaunch</h3>
      <p>
        robolaunch is a Cloud-Native Robotics Platform that provides the
        end-to-end infrastructure, software stack and tools for developing,
        simulating, deploying and operating ROS/ROS2 robots at scale.
      </p>{" "}
    </div>
  );
}
