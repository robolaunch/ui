/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useRef, useEffect, useState, Fragment } from "react";
import InputSelect from "../../../components/InputSelect/InputSelect";
import GuacamoleKeyboard from "./guacamole-keyboard.ts";
import Button from "../../../components/Button/Button";
import { GiSpeaker } from "react-icons/gi";
// @ts-ignore
import randomstring from "randomstring";
import ChatScreen from "../../../components/ChatScreen/ChatScreen.tsx";

const RemoteDesktop = () => {
  const video = useRef<any>(null);
  const peer = useRef<any>(null);
  const controlReq = useRef<any>(false);
  const candidate = useRef<any>(null);
  const client = useRef<any>(null);
  const channel = useRef<any>(null);
  const keyboard = useRef<any>(null);
  const overlay = useRef<any>(null);
  const [allResolutions, setAllResolutions] = useState<any>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [members, setMembers] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any>([]);

  let currentResolution: any = null;

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
          currentResolution = payload;
        }
      }

      if (event === "screen/configurations") {
        setAllResolutions(payload.configurations);
      }

      if (event === "member/list") {
        const { members } = payload;

        setMembers(members);
      }

      if (event === "member/connected") {
        setMembers((prev: any) => {
          return [...prev, payload];
        });
      }

      if (event === "member/disconnected") {
        setMembers((prev: any) => {
          return prev?.filter((member: any) => member.id !== payload?.id);
        });
      }

      if (event === "chat/message") {
        setChatMessages((prev: any) => [...prev, payload]);
      }
    };
  }, []);

  // Control Events
  var buffer: ArrayBuffer;
  var payload: DataView;
  useEffect(() => {
    keyboard.current = GuacamoleKeyboard();

    keyboard.current.onkeydown = (key: number) => {
      buffer = new ArrayBuffer(11);
      payload = new DataView(buffer);
      payload.setUint8(0, 0x03);
      payload.setUint16(1, 8, true);
      payload.setBigUint64(3, BigInt(key), true);
      if (
        typeof buffer !== "undefined" &&
        channel.current!.readyState === "open"
      ) {
        channel.current!.send(buffer);
      }
    };

    keyboard.current.onkeyup = (key: number) => {
      buffer = new ArrayBuffer(11);
      payload = new DataView(buffer);
      payload.setUint8(0, 0x04);
      payload.setUint16(1, 8, true);
      payload.setBigUint64(3, BigInt(key), true);
      if (typeof buffer !== "undefined") {
        channel.current!.send(buffer);
      }
    };

    keyboard.current.listenTo(overlay.current);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    overlay.current.liste;

    video.current?.addEventListener("mouseenter", () => {
      overlay.current!.focus();
    });

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
        payload.setInt16(3, key.deltaX / -120, true);
        payload.setInt16(5, key.deltaY / -120, true);
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
  // Control Events

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
      video.current?.focus();
    } else {
      client.current.send(JSON.stringify({ event: "control/release" }));
      controlReq.current = false;
    }
  }

  function handleVolumeControl(volume: number) {
    video.current.volume = volume;
  }

  function handleMute() {
    setIsMuted(!isMuted);
  }

  return (
    <div className="bg-layer-light-50 p-2 shadow-lg rounded-lg">
      <div className="grid grid-cols-12 gap-2 " style={{ height: "51rem" }}>
        <div className="col-span-10 relative flex justify-center  bg-layer-dark-900">
          <span
            className="relative outline-none appearance-none"
            ref={overlay}
            tabIndex={1}
          >
            <video
              onContextMenu={(e) => e.preventDefault()}
              className="absolute top-0 bottom-0"
              playsInline
              ref={video}
              autoPlay
              muted={isMuted}
              style={{
                position: "relative",
                backgroundColor: "#000",
                height: "50rem",
              }}
            />
            {isMuted && (
              <div
                onClick={() => handleMute()}
                className="absolute z-10 w-full h-full flex items-center justify-center top-0 bg-[#00000075] text-layer-light-50 cursor-pointer animate__animated animate__fadeIn"
              >
                <GiSpeaker size={48} />
              </div>
            )}
          </span>
        </div>
        <div className="col-span-2 flex flex-col gap-4">
          <ChatScreen chatMessages={chatMessages} members={members} />
        </div>
      </div>
      <div className="flex gap-4 pt-4">
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
                Object.keys(allResolutions).map((key: any, index: number) => {
                  return (
                    <option
                      key={index}
                      value={
                        allResolutions[
                          key.width + "x" + allResolutions[key].height
                        ]
                      }
                      defaultChecked={
                        allResolutions[key].width ===
                          currentResolution?.width &&
                        allResolutions[key].height === currentResolution?.height
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
        <div>
          <input
            onChange={(e) => handleVolumeControl(Number(e.target.value) / 100)}
            type="range"
            min="1"
            max="100"
            defaultValue={100}
          />
        </div>
        <div>
          <Button text="Mute" onClick={() => handleMute()} />
        </div>
        <div>
          {members?.map((member: any, index: number) => {
            return (
              <div key={index}>
                <div className="flex items-center gap-2">
                  <div>{member.displayname}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RemoteDesktop;
