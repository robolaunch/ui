import { ReactElement } from "react";

interface IPercentageWidget {
  percentage?: number;
  size?: number;
  title?: string;
  isHiddenCircle?: boolean;
}

export default function PercentageWidget({
  percentage,
  size = 58,
  title,
  isHiddenCircle,
}: IPercentageWidget): ReactElement {
  const strokeWidth = 4; // Border kalınlığı
  const radius = size * 0.44 - strokeWidth; // Çemberin yarıçapı
  const circumference = 2 * Math.PI * radius; // Çemberin çevresi
  const dashOffset = circumference - (circumference * (percentage || 0)) / 100; // Dolgu başlangıç noktası

  const center = size * 0.5; // Merkez koordinatları

  if (typeof percentage === "undefined" || typeof percentage === "function") {
    return (
      <img className="h-14 w-14" src="/svg/general/loading.svg" alt="loading" />
    );
  }

  return (
    <div
      className="flex flex-col items-center gap-1"
      style={{ textAlign: "center" }}
    >
      <svg
        className="animate__animated animate_fadeIn relative"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={isHiddenCircle ? "transparent" : "#cbd0d8"}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#0B5ED7"
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
          fontSize={size * 0.205}
          fontWeight="semibold"
          fill="#000"
        >
          {percentage + (!isHiddenCircle ? "%" : "Mbps")}
        </text>
      </svg>
      {title && (
        <p
          style={{
            fontSize: "0.66rem",
            lineHeight: "0.75rem",
          }}
        >
          {title}
        </p>
      )}
    </div>
  );
}
