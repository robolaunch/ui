import React, { Fragment, ReactElement, useState } from "react";
import { Marker } from "react-simple-maps";

interface IWorldMapMarker {
  city: any;
}

export default function WorldMapMarker({
  city,
}: IWorldMapMarker): ReactElement {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  console.log(city);

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
        r={isHovered ? 72 : 12}
      />
      {isHovered && (
        <Fragment>
          <text
            className="animate__animated animate__fadeIn"
            fontSize={18}
            y={-8}
            textAnchor="middle"
            fill="#000"
          >
            {city?.awsRegion}
          </text>
          <text
            className="animate__animated animate__fadeIn"
            fontSize={18}
            y={28}
            textAnchor="middle"
            fill="#000"
          >
            Count: {city?.count}
          </text>
        </Fragment>
      )}
    </Marker>
  );
}
