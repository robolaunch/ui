import React from "react";
import { Outlet } from "react-router-dom";
import ParticleImage, {
  ParticleForce,
  ParticleOptions,
  Vector,
  forces,
} from "react-particle-image";

const PublicLayout = () => {
  const particleOptions: ParticleOptions = {
    filter: ({ x, y, image }) => {
      // Get pixel
      const pixel = image.get(x, y);
      // Make a particle for this pixel if blue > 50 (range 0-255)
      return pixel.b > 50;
    },
    color: ({ x, y, image }) => "#61dafb",
    radius: () => Math.random() * 1.5 + 0.5,
    mass: () => 40,
    friction: () => 0.15,
    initialPosition: ({ canvasDimensions }) => {
      return new Vector(
        canvasDimensions.width / 2,
        canvasDimensions.height / 2
      );
    },
  };
  const motionForce = (x: number, y: number): ParticleForce => {
    return forces.disturbance(x, y, 5);
  };

  return (
    <div className="flex flex-row h-screen animate__animated animate__fadeIn">
      <div className="basis-1/2 xl:basis-full flex justify-center items-center h-full animate__animated animate__fadeInLeft">
        <Outlet />
      </div>
      <div
        style={{
          background: "linear-gradient(rgb(71, 16, 106), rgb(21, 83, 114))",
        }}
        className="basis-1/2 xl:hidden flex flex-col gap-4 justify-center items-center text-white"
      >
        <ParticleImage
          className="h-64 animate__animated animate__fadeInDown"
          src="/images/rocket.png"
          scale={0.75}
          entropy={20}
          maxParticles={2000}
          particleOptions={particleOptions}
          mouseMoveForce={motionForce}
          touchMoveForce={motionForce}
          backgroundColor="transparent"
          alt="Robolaunch"
        />
        <h1 className="text-2xl font-semibold animate__animated animate__fadeInUp">
          Develop, Deploy and Manage at Scale!
        </h1>
        <p className="text-sm text-center font-light px-20 animate__animated animate__fadeInUp">
          robolaunch is a Cloud-Native Robotics Platform that provides the
          end-to-end infrastructure, software stack and tools for developing,
          simulating, deploying and operating ROS/ROS2 robots at scale.
        </p>
      </div>
    </div>
  );
};

export default PublicLayout;
