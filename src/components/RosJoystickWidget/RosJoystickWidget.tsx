import React, { ReactElement } from "react";
import { BsJoystick } from "react-icons/bs";
import RosWidgetLayout from "../../layouts/RosWidgetLayout";
import { Joystick } from "react-joystick-component";
import ROSLIB from "roslib";
import { useComponentSize } from "react-use-size";

interface IRosJoystickWidget {
  ros: any;
  id: number;
  handleRemoveWidget: (id: number) => void;
}

export default function RosJoystickWidget({
  ros,
  id,
  handleRemoveWidget,
}: IRosJoystickWidget): ReactElement {
  function moveHandler(event: any) {
    var cmdVel = new ROSLIB.Topic({
      ros: ros,
      name: "/cmd_vel",
      messageType: "geometry_msgs/Twist",
    });

    var twist = new ROSLIB.Message({
      linear: {
        x: Number(String(event.y).slice(0, 4)) / 1.5,
        y: 0.0,
        z: 0.0,
      },
      angular: {
        x: 0.0,
        y: 0.0,
        z: Number(String(event.x).slice(0, 4)) / -1.5,
      },
    });

    cmdVel.publish(twist);
  }

  const { ref, height } = useComponentSize();

  return (
    <RosWidgetLayout
      id={id}
      type="RosJoystickWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<BsJoystick size={20} className="text-layer-light-400" />}
      title="Joystick"
    >
      <div
        ref={ref}
        className="flex h-full items-center justify-center !overflow-hidden !scrollbar-hide"
      >
        <Joystick
          size={height / 1.75}
          sticky={false}
          move={(e: any) => {
            moveHandler(e);
          }}
          stop={() => {
            moveHandler({
              direction: "STOP",
              type: "stop",
              distance: 0,
              x: 0.0,
              y: 0.0,
            });
          }}
          baseColor="#e0f1fe"
          stickColor="#0ca0eb"
        ></Joystick>
      </div>
    </RosWidgetLayout>
  );
}
