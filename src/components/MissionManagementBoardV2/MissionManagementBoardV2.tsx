import { ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

interface IMissionManagementBoardV2 {
  ros?: any;
}

export default function MissionManagementBoardV2({
  ros,
}: IMissionManagementBoardV2): ReactElement {
  return (
    <div className="col-span-10 h-full md:col-span-5 lg:col-span-6 xl:col-span-7 2xl:col-span-8">
      <CardLayout className="!relative h-full">
        <TransformWrapper
          initialPositionX={650}
          initialPositionY={325}
          smooth={true}
          centerOnInit={false}
          centerZoomedOut={false}
          limitToBounds={false}
          minScale={0.01}
          maxScale={2}
        >
          <TransformComponent>
            <>
              <>
                <div className="z-50 h-1 w-1 rounded-full bg-red-500" />
                <div
                  style={{
                    width: "10000px",
                    height: "10000px",
                    backgroundColor: "blue",
                    position: "absolute",
                    top: "-50px",
                    left: "-50px",
                  }}
                >
                  <p>Region #1</p>
                </div>
              </>
            </>
          </TransformComponent>
        </TransformWrapper>
      </CardLayout>
    </div>
  );
}
