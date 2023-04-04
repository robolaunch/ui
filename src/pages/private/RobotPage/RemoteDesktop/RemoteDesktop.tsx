import React, { useRef, useEffect, useState, useReducer } from "react";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import ChatScreen from "../../../../components/ChatScreen/ChatScreen";
import ChatViewers from "../../../../components/ChatViewers/ChatViewers";
import GuacamoleKeyboard from "./guacamole-keyboard.ts";
import RemoteDesktopController from "../../../../components/RemoteDesktopController/RemoteDesktopController.tsx";
import CardLayout from "../../../../layouts/CardLayout";
import { useKeycloak } from "@react-keycloak/web";
import { GiSpeaker } from "react-icons/gi";
import { toast } from "sonner";
interface IRemoteDesktop {
  connectionURLs: any;
}

const RemoteDesktop = ({ connectionURLs }: IRemoteDesktop) => {
  const video = useRef<any>(null);
  const peer = useRef<any>(null);
  const candidate = useRef<any>(null);
  const client = useRef<any>(null);
  const channel = useRef<any>(null);
  const keyboard = useRef<any>(null);
  const overlay = useRef<any>(null);
  const [message, setMessage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("Chat");
  const { keycloak } = useKeycloak();

  const [remoteDesktopReducer, dispatcher] = useReducer(handleReducer, {
    members: [],
    messages: [],
    controller: null,
    currentResolution: null,
    isMuted: true,
  });

  function handleReducer(state: any, action: any) {
    switch (action.type) {
      case "change/isMuted":
        return {
          ...state,
          isMuted: action.payload,
        };
      case "member/list":
        return {
          ...state,
          members: action.payload,
        };
      case "member/connected":
        toast.success(`${action.payload?.displayname} has joined the room`);
        return {
          ...state,
          members: [...state.members, action.payload],
        };
      case "member/disconnected":
        toast.error(
          `${
            state.members.filter(
              (member: any) => member.id === action.payload?.id
            )[0]?.displayname
          } has left the room`
        );

        return {
          ...state,
          members: state.members.filter(
            (member: any) => member.id !== action.payload.id
          ),
        };

      case "control/request":
        if (state?.controller?.id !== action.payload?.id) {
          toast.error(`
          ${state?.controller?.displayname} has controls. However, we have sent him a notification that you want to take control
          `);
        }
        break;

      case "control/requesting":
        if (state?.controller?.id !== action.payload?.id) {
          toast.error(`
          ${state?.controller?.displayname} has controls. However, we have sent him a notification that you want to take control
          `);
        }
        break;

      case "control/release":
        toast.success(`
          ${state.controller?.displayname} has released the controls
          `);
        return {
          ...state,
          controller: null,
        };

      case "control/locked":
        toast.success(
          `${
            state.members.filter(
              (member: any) => member.id === action.payload.id
            )[0]?.displayname
          } has taken control`
        );

        return {
          ...state,
          controller: state.members.filter(
            (member: any) => member.id === action.payload.id
          )[0],
        };

      case "screen/resolution":
        return {
          ...state,
          currentResolution: action.payload,
        };

      case "chat/message":
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
    }
  }

  useEffect(() => {
    console.log(remoteDesktopReducer);
  }, [remoteDesktopReducer]);

  function handleChangeActiveTab(tab: string) {
    setActiveTab(tab);
  }

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
              displayname: keycloak?.tokenParsed?.preferred_username,
            })
          );
        });
      }

      if (event === "screen/resolution") {
        dispatcher({
          type: event,
          payload: payload,
        });
      }

      if (event === "member/list") {
        dispatcher({
          type: event,
          payload: payload.members,
        });
      }

      if (event === "member/connected") {
        if (
          keycloak?.tokenParsed?.preferred_username !== payload?.displayname
        ) {
          dispatcher({
            type: event,
            payload: payload,
          });
        }
      }

      if (event === "member/disconnected") {
        dispatcher({
          type: event,
          payload: payload,
        });
      }

      if (event === "chat/message") {
        dispatcher({
          type: event,
          payload: payload,
        });
      }

      if (event === "control/request") {
        dispatcher({
          type: event,
          payload: payload,
        });
      }

      if (event === "control/requesting") {
        dispatcher({
          type: event,
          payload: payload,
        });
      }

      if (event === "control/release") {
        dispatcher({
          type: event,
          payload: payload,
        });
      }
      if (event === "control/locked") {
        dispatcher({
          type: event,
          payload: payload,
        });
      }

      if (event === "control/clipboard") {
        const { text } = payload;
        navigator?.clipboard?.writeText(text);
      }
    };

    return () => {
      client.current.close();
    };
  }, []);

  // Control Events

  useEffect(() => {
    var buffer: ArrayBuffer;
    var payload: DataView;
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

      if (
        remoteDesktopReducer?.controller?.displayname ===
        keycloak?.tokenParsed?.preferred_username
      ) {
        navigator?.clipboard?.readText().then((text) => {
          if (text?.length > 0) {
            client?.current!.send(
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
      if (
        remoteDesktopReducer?.controller?.displayname ===
        keycloak?.tokenParsed?.preferred_username
      ) {
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
              (Number(remoteDesktopReducer?.currentResolution?.width) /
                rect.width) *
                (key.clientX - rect.left)
            ),
            true
          );
          payload.setUint16(
            5,
            Math.round(
              (Number(remoteDesktopReducer?.currentResolution?.height) /
                rect.height) *
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
      if (
        remoteDesktopReducer?.controller?.displayname ===
        keycloak?.tokenParsed?.preferred_username
      ) {
        buffer = new ArrayBuffer(11);
        payload = new DataView(buffer);
        payload.setUint8(0, 0x03);
        payload.setUint16(1, 8, true);
        payload.setBigUint64(3, BigInt(key.button + 1), true);
        if (channel.current.readyState === "open") {
          channel.current!.send(buffer);
        }
      }
    });

    video.current?.addEventListener("mouseup", (key: any) => {
      // 0x01;
      if (
        remoteDesktopReducer?.controller?.displayname ===
        keycloak?.tokenParsed?.preferred_username
      ) {
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
      if (
        remoteDesktopReducer?.controller?.displayname ===
        keycloak?.tokenParsed?.preferred_username
      ) {
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
  }, [remoteDesktopReducer]);
  // Control Events

  function handleMute() {
    dispatcher({
      type: "change/isMuted",
      payload: !remoteDesktopReducer?.isMuted,
    });
  }

  function handleSendMessage() {
    if (message.length > 0) {
      client.current.send(
        JSON.stringify({ event: "chat/message", content: message })
      );
      setMessage("");
    }
  }

  function handleOnChangeMessage(message: any) {
    setMessage(message);
  }

  const tabs = [
    {
      name: "Chat",
    },
    {
      name: "Viewers",
    },
  ];

  return (
    <CardLayout>
      <div className="grid grid-cols-12">
        <div className="col-span-7 md:col-span-8 lg:col-span-9 2xl:col-span-10 relative flex justify-center  bg-layer-dark-900 min-h-[52rem]">
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
              muted={remoteDesktopReducer?.isMuted}
              style={{
                position: "relative",
                backgroundColor: "#000",
              }}
            />
            {remoteDesktopReducer?.isMuted && (
              <div
                onClick={() => handleMute()}
                className="absolute z-10 w-full h-full flex items-center justify-center top-0 bg-[#00000090] text-layer-light-50 cursor-pointer animate__animated animate__fadeIn"
              >
                <GiSpeaker size={48} />
              </div>
            )}
          </span>
          <RemoteDesktopController
            remoteDesktopReducer={remoteDesktopReducer}
            client={client}
            video={video}
            handleMute={handleMute}
          />
          <div className="absolute left-4 bottom-4 flex items-center gap-2 text-xs text-layer-light-100">
            <div
              className={`h-[8px] w-[8px] rounded ${
                remoteDesktopReducer?.controller?.displayname
                  ? "bg-layer-primary-500"
                  : "bg-layer-secondary-400"
              }`}
            ></div>
            <div>{remoteDesktopReducer?.controller?.displayname || "none"}</div>
          </div>
        </div>
        <div className="col-span-5 md:col-span-4 lg:col-span-3 2xl:col-span-2 flex flex-col">
          <ul className="w-full flex items-center justify-center gap-8 p-2">
            {tabs.map((tab: any, index: number) => {
              return (
                <div
                  className="flex flex-col gap-3 cursor-pointer"
                  onClick={() => handleChangeActiveTab(tab.name)}
                  key={index}
                >
                  <li
                    className={`text-xs font-medium px-2 transition-all duration-500 ${
                      tab.name === activeTab
                        ? "text-layer-primary-500"
                        : "text-layer-light-500"
                    } `}
                  >
                    {tab.name}
                  </li>
                  <div
                    className={`w-full h-[2px] transition-all duration-500 ${
                      tab.name === activeTab
                        ? "bg-layer-primary-500"
                        : "bg-transparent"
                    } `}
                  />
                </div>
              );
            })}
          </ul>
          {(() => {
            switch (activeTab) {
              case "Chat":
                return (
                  <ChatScreen
                    inputValue={message}
                    handleOnChangeMessage={handleOnChangeMessage}
                    handleSendMessage={handleSendMessage}
                    chatMessages={remoteDesktopReducer?.messages}
                    members={remoteDesktopReducer?.members}
                  />
                );
              case "Viewers":
                return (
                  <ChatViewers
                    roomMembersState={remoteDesktopReducer?.members}
                  />
                );
            }
          })()}
        </div>
      </div>
    </CardLayout>
  );
};

export default RemoteDesktop;
