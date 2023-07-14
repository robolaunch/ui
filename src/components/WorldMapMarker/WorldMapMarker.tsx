import React, { ReactElement, useState } from "react";
import { Marker } from "react-simple-maps";

interface IWorldMapMarker {
  city: any;
}

export default function WorldMapMarker({
  city,
}: IWorldMapMarker): ReactElement {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Marker
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={city?.awsRegion}
      coordinates={[city?.lng, city?.lat]}
      className="cursor-pointer"
    >
      <circle
        fill="#35B8FA"
        stroke="#FFF"
        className="relative transition-300 text-lg animate__animated animate__pulse animate__infinite"
        r={isHovered ? 36 : 12}
      />
      {isHovered && (
        <text
          className="animate__animated animate__fadeIn"
          fontSize={28}
          y={10}
          textAnchor="middle"
          fill="#000"
        >
          {city?.count}
        </text>
      )}
    </Marker>
  );
}
