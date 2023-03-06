import React, {
  Fragment,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { GridStack } from "gridstack";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../hooks/redux";
import { RootState } from "../../../../app/store";
import { FloatMenu } from "../../../../components/FloatMenu/FloatMenu";
import { GridLayout } from "../../../../layouts/GridLayout";
import "gridstack/dist/gridstack.min.css";
import "gridstack/dist/gridstack-extra.css";
import ROSLIB from "roslib";
import TeleoperationControlBar from "../../../../components/TeleoperationControlBar/TeleoperationControlBar";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
interface ITeleoperation {
  ros: any;
  topicList: string[];
  connectionURLs: any;
  handleForceUpdate: (page: string) => void;
}

export default function Teleoperation({
  ros,
  topicList,
  connectionURLs,
  handleForceUpdate,
}: ITeleoperation): ReactElement {
  const [grid, setGrid] = useState<any>();
  const { currentOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );

  const { user } = useAppSelector((state: RootState) => state.user);

  const url = useParams();
  const localStoragePath = `teleoperation_${currentOrganization.name}_${url.teamName}_${url.roboticsCloudName}_${url.fleetName}_${url.robotName}`;
  const [gridLayout, setGridLayout] = useState<any>(() => {
    if (localStorage.getItem(localStoragePath)) {
      return JSON.parse(
        // @ts-ignore
        localStorage.getItem(localStoragePath)
      );
    }

    return [];
  });
  const [cameraData, setCameraData] = useState<string>("");
  const [isRemoteDesktopStream, setIsRemoteDesktopStream] =
    useState<boolean>(false);
  const [selectableTopic, setSelectableTopic] = useState<any>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("");

  useEffect(() => {
    const grid: any = GridStack.init({
      float: true,
      acceptWidgets: true,
      alwaysShowResizeHandle: true,
      removable: false,
      resizable: {
        handles: "e, se, s, sw, w",
      },
      row: 20,
      cellHeight: 50,
    });

    setGrid(grid);

    grid.on("change", function () {
      setTimeout(() => {
        window.localStorage.setItem(
          // @ts-ignore
          localStoragePath,
          JSON.stringify(grid.save(true, true).children)
        );
      }, 1000);
    });
  }, [localStoragePath]);

  function handleRemoveWidget(id: number) {
    const temp = JSON.parse(
      // @ts-ignore
      localStorage.getItem(localStoragePath)
    );

    temp.splice(id, 1);

    window.localStorage.setItem(
      // @ts-ignore
      localStoragePath,
      JSON.stringify(temp)
    );

    handleForceUpdate("Teleoperation");
  }

  useEffect(() => {
    setSelectableTopic([]);
    topicList?.map((topic: any) => {
      if (topic.type === "sensor_msgs/msg/CompressedImage") {
        setSelectableTopic((prev: any) => [...prev, topic]);
      }
      return null;
    });
  }, [topicList]);

  useEffect(() => {
    setCameraData("");
    const cameraCompressedTopic = new ROSLIB.Topic({
      ros: ros,
      name: selectedTopic,
      messageType: "sensor_msgs/msg/CompressedImage",
    });

    if (!isRemoteDesktopStream) {
      cameraCompressedTopic?.subscribe(function (message: any) {
        setCameraData("data:image/jpg;base64," + message.data);
      });
    }

    return () => {
      cameraCompressedTopic.unsubscribe();
    };
  }, [isRemoteDesktopStream, selectedTopic, ros]);

  const video = useRef<any>(null);
  const peer = useRef<any>(null);
  const client = useRef<any>(null);
  const candidate = useRef<any>(null);
  const channel = useRef<any>(null);

  // webRTC Stream
  useEffect(() => {
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

    if (isRemoteDesktopStream) {
      const onTrack = (event: RTCTrackEvent) => {
        if (event.track.kind === "video") {
          video.current.srcObject = event.streams[0];
        }
        handleChangeResolution({
          width: 1920,
          height: 1080,
        });
      };

      client.current = new WebSocket(connectionURLs.remoteDesktopURL);

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
      };
    } else {
      client?.current?.close();
    }

    return () => {
      client?.current?.close();
    };
  }, [isRemoteDesktopStream]);
  // webRTC Stream

  const handleFullScreen = useFullScreenHandle();

  return (
    <Fragment>
      <FullScreen className="relative" handle={handleFullScreen}>
        <div
          className="col-span-1 grid-stack w-full z-0 shadow-lg rounded"
          style={{
            height: handleFullScreen.active ? "100vh" : "unset",
            backgroundImage: `url(${cameraData})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <GridLayout
            gridLayout={gridLayout}
            ros={ros}
            topicList={topicList}
            localStoragePath={localStoragePath}
            handleRemoveWidget={handleRemoveWidget}
          />
          {isRemoteDesktopStream && (
            <div className="absolute inset-0 -z-10">
              <video
                onContextMenu={(e) => e.preventDefault()}
                className="absolute top-0 bottom-0"
                playsInline
                ref={video}
                autoPlay
                muted={true}
                style={{
                  position: "relative",
                  backgroundColor: "#000",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          )}
        </div>

        <TeleoperationControlBar
          selectedTopic={selectedTopic}
          selectableTopic={selectableTopic}
          setSelectedTopic={setSelectedTopic}
          isRemoteDesktopStream={isRemoteDesktopStream}
          setIsRemoteDesktopStream={setIsRemoteDesktopStream}
          handleFullScreen={handleFullScreen}
        />
      </FullScreen>

      <FloatMenu
        grid={grid}
        type="Teleoperation"
        ros={ros}
        topicList={topicList}
        localStoragePath={localStoragePath}
        handleRemoveWidget={handleRemoveWidget}
        handleForceUpdate={handleForceUpdate}
      />
    </Fragment>
  );
}
