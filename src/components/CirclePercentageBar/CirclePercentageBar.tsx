import ContentLoader from "react-content-loader";
import { Fragment, ReactElement } from "react";

interface ICirclePercentageBar {
  percentage: number;
  size?: number;
  title?: string;
  hiddenCircle?: boolean;
  content?: ReactElement;
}

export default function CirclePercentageBar({
  percentage = -1,
  size = 50,
  title = "",
  hiddenCircle = false,
  content,
}: ICirclePercentageBar): ReactElement {
  const strokeWidth = 4; // Border kalınlığı
  const radius = size * 0.44 - strokeWidth; // Çemberin yarıçapı
  const circumference = 2 * Math.PI * radius; // Çemberin çevresi
  const dashOffset = circumference - (circumference * percentage) / 100; // Dolgu başlangıç noktası

  const center = size * 0.5; // Merkez koordinatları

  return (
    <div
      className="flex flex-col items-center gap-1"
      style={{ textAlign: "center" }}
    >
      {percentage === -1 ? (
        <ContentLoader
          width={100}
          height={120}
          viewBox="0 0 100 120"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <circle cx="50" cy="50" r="44" />
          <rect x="0" y="100" rx="5" ry="5" width="100" height="10" />
        </ContentLoader>
      ) : (
        <Fragment>
          <svg
            className="animate__animated animate_fadeIn relative"
            width={content ? size * 1.75 : size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            fill="none"
          >
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke={hiddenCircle ? "transparent" : "#cbd0d8"}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke={hiddenCircle ? "transparent" : "#0B5ED7"}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${center} ${center})`}
            />
            <text
              x={center}
              y={center}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={size * 0.25}
              fontWeight="semibold"
              fill="#000"
            >
              {typeof percentage === "number" ? percentage + "%" : content}
            </text>
          </svg>
          <p
            style={{
              fontSize: "0.66rem",
              lineHeight: "0.75rem",
            }}
          >
            {title}
          </p>
        </Fragment>
      )}
    </div>
  );
}
