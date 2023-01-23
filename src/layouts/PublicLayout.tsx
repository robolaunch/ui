import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="basis-1/2">
        <Outlet />
      </div>
      <div
        style={{
          background: "linear-gradient(rgb(71, 16, 106), rgb(21, 83, 114))",
        }}
        className="basis-1/2 lg:hidden flex flex-col gap-4 justify-center items-center"
      >
        <img className="h-16" src="/images/robolaunch-horizontal.svg" alt="" />
        <h1 className="text-2xl font-medium text-white">
          Develop, Deploy and Manage at Scale!
        </h1>
        <p className="text-center px-20">
          robolaunch is a Cloud-Native Robotics Platform that provides the
          end-to-end infrastructure, software stack and tools for developing,
          simulating, deploying and operating ROS/ROS2 robots at scale.
        </p>
      </div>
    </div>
  );
};

export default PublicLayout;
