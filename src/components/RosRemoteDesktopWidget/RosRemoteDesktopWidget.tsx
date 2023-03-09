import React, { ReactElement, useEffect, useRef } from "react";
import { MdOutlineScreenShare } from "react-icons/md";
import RosWidgetLayout from "../../layouts/RosWidgetLayout";
import { useComponentSize } from "react-use-size";

interface IRosRemoteDesktopWidget {
  id: number;
  handleRemoveWidget: (id: number) => void;
}

export default function RosRemoteDesktopWidget({
  id,
  handleRemoveWidget,
}: IRosRemoteDesktopWidget): ReactElement {
  const client = useRef<any>(null);
  const peer = useRef<any>(null);
  const candidate = useRef<any>(null);
  const channel = useRef<any>(null);
  const video = useRef<any>(null);

  const { user } = JSON.parse(localStorage.getItem("persist:user") || "{}");

  const { ref, width, height } = useComponentSize();

  useEffect(() => {
    const onTrack = (event: RTCTrackEvent) => {
      if (event.track.kind === "video") {
        video.current.srcObject = event.streams[0];
      }
    };

    client.current = new WebSocket(`ws://localhost:8080/ws?password=admin`);

    client.current.onmessage = (e: any) => {
      const { event, ...payload } = JSON.parse(e.data);

      if (event === "signal/candidate") {
        const newPayload = JSON.parse(payload.data);
        if (peer.current) {
          peer.current.addIceCandidate(newPayload);
        } else {
          candidate.current = newPayload;
        }
      }

      if (event === "signal/provide") {
        const { sdp } = payload;
        peer.current = new RTCPeerConnection();
        // @ts-ignore
        peer.current.ontrack = onTrack.bind(this);

        channel.current = peer.current.createDataChannel("data");
        peer.current.addIceCandidate(candidate.current);
        peer.current.setRemoteDescription({ type: "offer", sdp });

        peer.current.createAnswer().then((d: any) => {
          peer.current!.setLocalDescription(d);
          client.current!.send(
            JSON.stringify({
              event: "signal/answer",
              sdp: d.sdp,
              displayname: user?.username,
            })
          );
        });
      }

      return () => {
        client.current.close();
      };
    };
  }, []);

  return (
    <RosWidgetLayout
      id={id}
      type="RosRemoteDesktopWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<MdOutlineScreenShare size={20} className="text-layer-light-400" />}
      title="Remote Desktop"
    >
      <div ref={ref} className="flex items-center justify-center h-full">
        <video
          onContextMenu={(e) => e.preventDefault()}
          className="absolute top-0 bottom-0"
          playsInline
          ref={video}
          autoPlay
          muted
          style={{
            position: "relative",
            backgroundColor: "#000",
            width: width - 10,
            height: height - 10,
          }}
        />
      </div>
    </RosWidgetLayout>
  );
}
