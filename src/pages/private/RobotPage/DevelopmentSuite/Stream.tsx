import React, {
  useRef,
  useEffect,
  useState,
  Fragment,
  ReactElement,
} from "react";
import InputSelect from "../../../../components/InputSelect/InputSelect";
// @ts-ignore
import GuacamoleKeyboard from "../../../../tools/GuacamoleKeyboard/guacamole-keyboard.ts";
import Button from "../../../../components/Button/Button";
import { GiSpeaker } from "react-icons/gi";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import VolumeControl from "../../../../components/VolumeControl/VolumeControl";
import { toast } from "sonner";
import { useAppSelector } from "../../../../hooks/redux";
import { RootState } from "../../../../resources/store.ts";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useComponentSize } from "react-use-size";

interface IStream {
  connectionURLs: any;
}

export default function Stream({ connectionURLs }: IStream): ReactElement {
  const video = useRef<any>(null);
  const peer = useRef<any>(null);
  const controller = useRef<any>(null);
  const candidate = useRef<any>(null);
  const client = useRef<any>(null);
  const channel = useRef<any>(null);
  const keyboard = useRef<any>(null);
  const overlay = useRef<any>(null);
  const roomMembers = useRef<any>([]);
  const [controllerState, setControllerState] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [roomMembersState, setRoomMembersState] = useState<any>([]);
  const allResolutions = useRef<any>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chatMessages, setChatMessages] = useState<any>([]);
  const { user } = useAppSelector((state: RootState) => state.user);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState<string>("Chat");
  const [isControllerOpen, setIsControllerOpen] = useState<boolean>(false);

  let currentResolution: any = null;

  useEffect(() => {
    const onTrack = (event: RTCTrackEvent) => {
      if (event.track.kind === "video") {
        video.current.srcObject = event.streams[0];
      }
    };

    client.current = new WebSocket(connectionURLs.remoteDesktopURL || "");

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

      if (event === "screen/resolution") {
        if (
          currentResolution?.width !== payload?.width &&
          currentResolution?.height !== payload?.height
        ) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          currentResolution = payload;
        }
      }

      if (event === "screen/configurations") {
        allResolutions.current = payload.configurations;
      }

      if (event === "member/list") {
        const { members } = payload;
        roomMembers.current = members;
        setRoomMembersState(members);
      }

      if (event === "member/connected") {
        toast.success(`${payload?.displayname} has joined the room`);

        roomMembers.current = roomMembers?.current?.filter(
          // eslint-disable-next-line array-callback-return
          (roomMember: any) => {
            if (roomMember.id !== payload?.id) {
              return roomMember;
            }
          }
        );

        roomMembers.current = [...roomMembers.current, payload];

        setRoomMembersState(roomMembers.current);
      }

      if (event === "member/disconnected") {
        toast.error(
          `${
            roomMembers.current?.filter(
              (member: any) => member.id === payload?.id
            )[0].displayname
          } has left the room`
        );

        roomMembers.current = roomMembers.current?.filter(
          (member: any) => member.id !== payload?.id
        );

        setRoomMembersState(roomMembers.current);
      }

      if (event === "chat/message") {
        setChatMessages((prev: any) => [...prev, payload]);
      }

      if (event === "control/request") {
        const { id } = payload;

        if (controller.current?.id === id) {
          toast.error(`
          ${controller.current?.displayname} has controls. However, we have sent him a notification that you want to take control
          `);
        }
      }

      if (event === "control/requesting") {
        const { id } = payload;
        if (controller.current?.id !== id) {
          toast.success(
            `${
              roomMembers.current?.filter((member: any) => member.id === id)[0]
                .displayname
            }
            is requesting control`
          );
        }
      }

      if (event === "control/release") {
        toast.success(
          `${controller.current?.displayname} has released control`
        );
        controller.current = null;
        setControllerState(controller.current);
      }

      if (event === "control/locked") {
        const { id } = payload;

        roomMembers?.current?.map((roomMember: any) => {
          if (roomMember.id === id) {
            toast.success(`${roomMember?.displayname} has taken control`);

            controller.current = roomMember;
            setControllerState(controller.current);
          }

          // eslint-disable-next-line array-callback-return
          return;
        });
      }

      if (event === "control/clipboard") {
        const { text } = payload;
        console.log(text);
        navigator.clipboard.writeText(text);
      }
    };

    return () => {
      client.current.close();
    };
  }, []);

  // Control Events
  var buffer: ArrayBuffer;
  var payload: DataView;
  useEffect(() => {
    keyboard.current = GuacamoleKeyboard();
    const targetElement: any = document.querySelector("body");

    keyboard.current.onkeydown = (key: number) => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      buffer = new ArrayBuffer(11);
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

      if (controller.current?.displayname === user?.username) {
        navigator.clipboard.readText().then((text) => {
          if (text.length > 0) {
            client.current!.send(
              JSON.stringify({
                event: "control/clipboard",
                text,
              })
            );
          }
        });
      }
    });

    video.current?.addEventListener("mousemove", (key: any) => {
      if (controller.current?.displayname === user?.username) {
        // 0x01;
        disableBodyScroll(targetElement);

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
      }
    });

    video.current?.addEventListener("mousedown", (key: any) => {
      // 0x01;
      key.preventDefault();
      if (controller.current?.displayname === user?.username) {
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
      if (controller.current?.displayname === user?.username) {
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
      if (controller.current?.displayname === user?.username) {
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

    video.current?.addEventListener("mouseleave", () => {
      enableBodyScroll(targetElement);
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

  function handleControl() {
    if (controller?.current?.displayname === user?.username) {
      client.current.send(JSON.stringify({ event: "control/release" }));
      return;
    }

    client.current.send(JSON.stringify({ event: "control/request" }));
  }

  function handleVolumeControl(volume: number) {
    video.current.volume = volume;
  }

  function handleMute() {
    setIsMuted(!isMuted);
  }

  function handleIsControllerOpen() {
    setIsControllerOpen(!isControllerOpen);
  }

  const { ref, height, width } = useComponentSize();

  useEffect(() => {
    console.log({ height, width });
  }, [height, width]);

  return (
    <div
      ref={ref}
      className="relative shadow-lg rounded-lg animate__animated animate__fadeIn transition-all duration-500"
    >
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
          }}
        />
        {isMuted && (
          <div
            onClick={() => handleMute()}
            className="absolute z-10 w-full h-full flex items-center justify-center top-0 bg-[#00000090] text-layer-light-50 cursor-pointer animate__animated animate__fadeIn"
          >
            <GiSpeaker size={48} />
          </div>
        )}
      </span>
      <div className="absolute left-4 bottom-4 flex items-center gap-2 text-xs text-layer-light-100">
        <div
          className={`h-[8px] w-[8px] rounded ${
            controllerState?.displayname
              ? "bg-layer-primary-500"
              : "bg-layer-secondary-400"
          }`}
        ></div>
        <div>{controllerState?.displayname || "none"}</div>
      </div>
      <div className="absolute w-full flex flex-col items-center bottom-0 ">
        <button
          className="bg-layer-light-50 rounded-t-lg px-1"
          onClick={() => handleIsControllerOpen()}
        >
          {isControllerOpen ? (
            <IoIosArrowDown size={20} />
          ) : (
            <IoIosArrowUp size={20} />
          )}
        </button>
        {isControllerOpen && (
          <div className="relative w-full flex items-center justify-center rounded-t-lg gap-10 p-2 bg-layer-light-50">
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
                  {allResolutions.current &&
                    Object.keys(allResolutions.current).map(
                      (key: any, index: number) => {
                        return (
                          <option
                            key={index}
                            value={
                              allResolutions.current[
                                key.width +
                                  "x" +
                                  allResolutions.current[key].height
                              ]
                            }
                            defaultChecked={
                              allResolutions.current[key].width ===
                                currentResolution?.width &&
                              allResolutions.current[key].height ===
                                currentResolution?.height
                            }
                          >
                            {allResolutions.current[key].width}x
                            {allResolutions.current[key].height}
                          </option>
                        );
                      }
                    )}
                </Fragment>
              </InputSelect>
            </div>
            {width > 512 && (
              <div>
                <VolumeControl
                  isMuted={isMuted}
                  handleVolumeControl={handleVolumeControl}
                  handleMute={handleMute}
                />
              </div>
            )}
            <div>
              <Button
                text={(() => {
                  if (controllerState?.displayname === user?.username) {
                    return "Release Control";
                  }

                  if (controllerState?.displayname) {
                    return "Request Control";
                  }

                  return "Took Control";
                })()}
                onClick={() => handleControl()}
                className="text-xs h-10 w-28"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
