import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect, createContext, useRef, useReducer } from "react";
import { toast } from "sonner";
import GuacamoleKeyboard from "../tools/GuacamoleKeyboard/guacamole-keyboard.ts";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

export const StreamContext: any = createContext<any>(null);

interface IStreamContext {
  connectionURLs: any;
  children: any;
}

// eslint-disable-next-line
export default ({ connectionURLs, children }: IStreamContext) => {
  const video = useRef<any>(null);
  const peer = useRef<any>(null);
  const candidate = useRef<any>(null);
  const client = useRef<any>(null);
  const channel = useRef<any>(null);
  const keyboard = useRef<any>(null);
  const overlay = useRef<any>(null);

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

  function handleMute() {
    dispatcher({
      type: "change/isMuted",
      payload: !remoteDesktopReducer?.isMuted,
    });
  }

  function handleSendMessage(message: string) {
    if (message.length > 0) {
      client.current.send(
        JSON.stringify({ event: "chat/message", content: message })
      );
    }
  }

  return (
    <StreamContext.Provider
      value={{
        remoteDesktopReducer,
        client,
        overlay,
        video,
        handleMute,
        handleSendMessage,
      }}
    >
      {children}
    </StreamContext.Provider>
  );
};
