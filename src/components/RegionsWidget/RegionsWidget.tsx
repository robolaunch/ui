import React, { ReactElement, useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Widget from "../../layouts/WidgetLayout";
import { GoGraph } from "react-icons/go";
import world from "../../mock/world.json";
import WorldMapMarker from "../WorldMapMarker/WorldMapMarker";

interface IRegionsWidget {
  title: string;
  responseData: string[];
}

export default function RegionsWidget({
  title,
  responseData,
}: IRegionsWidget): ReactElement {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData([
      {
        cityName: "Frankfurt",
        awsRegion: "eu-central-1",
        lng: 8.682127,
        lat: 50.110924,
        count:
          responseData?.filter((item: string) => item === "eu-central-1")
            ?.length || 0,
      },
      {
        cityName: "London",
        awsRegion: "eu-west-2",
        lng: -0.118092,
        lat: 51.509865,
        count:
          responseData?.filter((item: string) => item === "eu-west-2")
            ?.length || 0,
      },
      {
        cityName: "N. Virginia",
        awsRegion: "us-east-1",
        lng: -77.036133,
        lat: 38.89511,
        count:
          responseData?.filter((item: string) => item === "us-east-1")
            ?.length || 0,
      },
      {
        cityName: "Ohio",
        awsRegion: "us-east-2",
        lng: -82.907123,
        lat: 40.417287,
        count:
          responseData?.filter((item: string) => item === "us-east-2")
            ?.length || 0,
      },
      {
        cityName: "N. California",
        awsRegion: "us-west-1",
        lng: -122.419418,
        lat: 37.774929,
        count:
          responseData?.filter((item: string) => item === "us-west-1")
            ?.length || 0,
      },
      {
        cityName: "Tokyo",
        awsRegion: "ap-northeast-1",
        lng: 139.691711,
        lat: 35.689487,
        count:
          responseData?.filter((item: string) => item === "ap-northeast-1")
            ?.length || 0,
      },
    ]);
  }, [responseData]);

  return (
    <Widget
      dataTut="regions-widget"
      title={`${title} Regions`}
      subtitle={`Locations of the ${title}`}
      icon={<GoGraph size={20} className="text-layer-light-700" />}
    >
      <ComposableMap className="w-full h-full -mt-5">
        <Geographies geography={world}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#AAA" />
            ))
          }
        </Geographies>
        {data.map((city: any) => {
          return (
            city?.count && <WorldMapMarker key={city?.awsRegion} city={city} />
          );
        })}
      </ComposableMap>
    </Widget>
  );
}
