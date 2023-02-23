/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useEffect, useState, Fragment } from "react";
// @ts-ignore
import randomstring from "randomstring";
import InputSelect from "../../../components/InputSelect/InputSelect";
import Button from "../../../components/Button/Button";

const RemoteDesktop = () => {
  const video = useRef<any>(null);
  const peer = useRef<any>(null);
  const controlReq = useRef<any>(false);
  const candidate = useRef<any>(null);
  const client = useRef<any>(null);
  const channel = useRef<any>(null);
  const [currentResolution, setCurrentResolution] = useState<any>(null);
  const [allResolutions, setAllResolutions] = useState<any>(null);

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
              displayname: randomstring.generate(7),
            })
          );
        });
      }

      if (event === "screen/resolution") {
        if (
          currentResolution?.width !== payload.width &&
          currentResolution?.height !== payload.height
        ) {
          setCurrentResolution(payload);
        }
      }

      if (event === "screen/configurations") {
        setAllResolutions(payload.configurations);
      }
    };
  }, []);

  // Mouse Events
  let buffer: ArrayBuffer;
  let payload: DataView;
  useEffect(() => {
    video.current?.addEventListener("mousemove", (key: any) => {
      // 0x01;
      if (typeof video.current === "undefined") return;

      const rect = video.current?.getBoundingClientRect();
      if (rect) {
        buffer = new ArrayBuffer(7);
        payload = new DataView(buffer);
        payload.setUint8(0, 0x01);
        payload.setUint16(1, 4, true);
        payload.setUint16(
          3,
          Math.round(
            (Number(currentResolution?.width) / rect.width) *
              (key.clientX - rect.left)
          ),
          true
        );
        payload.setUint16(
          5,
          Math.round(
            (Number(currentResolution?.height) / rect.height) *
              (key.clientY - rect.top)
          ),
          true
        );

        if (
          typeof buffer !== "undefined" &&
          channel.current.readyState === "open"
        ) {
          channel.current!.send(buffer);
        }
      }
    });

    video.current?.addEventListener("mousedown", (key: any) => {
      // 0x01;
      key.preventDefault();
      if (controlReq) {
        buffer = new ArrayBuffer(11);
        payload = new DataView(buffer);
        payload.setUint8(0, 0x03);
        payload.setUint16(1, 8, true);
        payload.setBigUint64(3, BigInt(key.button + 1), true);
        if (
          typeof buffer !== "undefined" &&
          channel.current.readyState === "open"
        ) {
          channel.current!.send(buffer);
        }
      }
    });

    video.current?.addEventListener("mouseup", (key: any) => {
      // 0x01;
      if (controlReq) {
        buffer = new ArrayBuffer(11);
        payload = new DataView(buffer);
        payload.setUint8(0, 0x04);
        payload.setUint16(1, 8, true);
        payload.setBigUint64(3, BigInt(key.button + 1), true);
        if (
          typeof buffer !== "undefined" &&
          channel.current.readyState === "open"
        ) {
          channel.current!.send(buffer);
        }
      }
    });

    video.current?.addEventListener("wheel", (key: any) => {
      // 0x01;
      if (controlReq) {
        buffer = new ArrayBuffer(7);
        payload = new DataView(buffer);
        payload.setUint8(0, 0x02);
        payload.setUint16(1, 4, true);
        payload.setInt16(3, key.deltaX / -100, true);
        payload.setInt16(5, key.deltaY / -100, true);
        if (
          typeof buffer !== "undefined" &&
          channel.current.readyState === "open"
        ) {
          channel.current!.send(buffer);
          console.log("cancelled!");
        }
      }
    });
  }, [currentResolution]);

  function handleChangeResolution(e: any) {
    client.current.send(
      JSON.stringify({
        event: "screen/set",
        width: e.width,
        height: e.height,
        rate: 60,
      })
    );
  }

  function handleSetFullScreen() {
    video.current?.requestFullscreen();
  }

  function handleControl() {
    if (!controlReq.current) {
      client.current.send(JSON.stringify({ event: "control/request" }));
      controlReq.current = true;
    } else {
      client.current.send(JSON.stringify({ event: "control/release" }));
      controlReq.current = false;
    }
  }

  return (
    <div className="max-h-[40vh]">
      <div className="flex ">
        <div tabIndex={1}>
          <video
            onContextMenu={(e) => e.preventDefault()}
            playsInline
            ref={video}
            autoPlay
            muted
            style={{
              backgroundColor: "#000",
              maxHeight: "50rem",
              minHeight: "50rem",
            }}
          />
        </div>
        <div className="flex gap-4">
          <div>
            <InputSelect
              onChange={(e: any) => {
                handleChangeResolution({
                  width: Number(e.target.value.split("x")[0]),
                  height: Number(e.target.value.split("x")[1]),
                });
              }}
            >
              <Fragment>
                {allResolutions &&
                  Object.keys(allResolutions).map((key: any) => {
                    return (
                      <option
                        key={key}
                        value={
                          allResolutions[
                            key.width + "x" + allResolutions[key].height
                          ]
                        }
                        defaultChecked={
                          allResolutions[key].width ===
                            currentResolution?.width &&
                          allResolutions[key].height ===
                            currentResolution?.height
                        }
                      >
                        {allResolutions[key].width}x{allResolutions[key].height}
                      </option>
                    );
                  })}
              </Fragment>
            </InputSelect>
          </div>
          <div>
            <Button text="Full Screen" onClick={() => handleSetFullScreen()} />
          </div>
          <div>
            <Button text="Control" onClick={() => handleControl()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteDesktop;
